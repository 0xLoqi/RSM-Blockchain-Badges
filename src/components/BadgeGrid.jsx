import React, { useState, useEffect } from 'react';
import { useAddress } from "@thirdweb-dev/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { alchemy } from '../lib/alchemy';

const contractAddress = "0x959cf5441d19dfc7a497aaa455b1ccbd430274db";
const editionIds = ["1", "2", "3"];

const BadgeGrid = ({ filterType }) => {
  const [badges, setBadges] = useState([]);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const address = useAddress();

  useEffect(() => {
    if (address) {
      fetchBadges();
    }
  }, [address, filterType]);

  const fetchBadges = async () => {
    setIsLoading(true);
    try {
      const nfts = await alchemy.nft.getNftsForOwner(address, {
        contractAddresses: [contractAddress],
      });

      const ownedEditions = nfts.ownedNfts.filter(nft => 
        editionIds.includes(nft.tokenId)
      );

      const transfers = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toAddress: address,
        contractAddresses: [contractAddress],
        category: ["erc721", "erc1155"],
      });

      const earnedEditions = ownedEditions.filter(nft => {
        const transfer = transfers.transfers.find(t => t.tokenId === nft.tokenId);
        return transfer && transfer.from === "0x0000000000000000000000000000000000000000";
      });

      const collectedEditions = ownedEditions.filter(nft => 
        !earnedEditions.some(earned => earned.tokenId === nft.tokenId)
      );

      const fetchedBadges = await Promise.all((filterType === 'earned' ? earnedEditions : collectedEditions).map(async nft => {
        const metadata = await alchemy.nft.getNftMetadata(contractAddress, nft.tokenId);
        return {
          tokenId: nft.tokenId,
          name: metadata.title,
          description: metadata.description,
          image: metadata.media && metadata.media[0] ? metadata.media[0].gateway : null,
          attributes: metadata.rawMetadata?.attributes || [],
          external_url: metadata.rawMetadata?.external_url,
          animation_url: metadata.rawMetadata?.animation_url,
          background_color: metadata.rawMetadata?.background_color
        };
      }));

      setBadges(fetchedBadges);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading badges...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <Card key={badge.tokenId} className="cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => setSelectedBadge(badge)}>
          <CardHeader className="p-4">
            <h3 className="text-lg font-semibold">{badge.name}</h3>
          </CardHeader>
          <CardContent className="p-4">
            {badge.image && <img src={badge.image} alt={badge.name} className="w-full h-32 object-contain mb-2" />}
            <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
            <Badge variant="secondary">{filterType === 'earned' ? 'Earned' : 'Collected'}</Badge>
          </CardContent>
        </Card>
      ))}

      <Dialog open={!!selectedBadge} onOpenChange={() => setSelectedBadge(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedBadge?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedBadge?.image && <img src={selectedBadge.image} alt={selectedBadge.name} className="w-full h-48 object-contain mb-4" />}
            <p className="text-sm mb-2"><strong>Description:</strong> {selectedBadge?.description}</p>
            {selectedBadge?.attributes && (
              <div className="mb-2">
                <strong>Attributes:</strong>
                <ul>
                  {selectedBadge.attributes.map((attr, index) => (
                    <li key={index}>{attr.trait_type}: {attr.value}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedBadge?.external_url && (
              <p className="text-sm mb-2">
                <strong>External URL:</strong> <a href={selectedBadge.external_url} target="_blank" rel="noopener noreferrer">{selectedBadge.external_url}</a>
              </p>
            )}
            <Badge variant="secondary">{filterType === 'earned' ? 'Earned' : 'Collected'}</Badge>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BadgeGrid;