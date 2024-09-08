import React, { useState, useEffect } from 'react';
import { useAddress } from "@thirdweb-dev/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { alchemy } from '../lib/alchemy';
import { Link } from 'react-router-dom';

const contractAddress = "0x959cf5441d19dfc7a497aaa455b1ccbd430274db";
const editionIds = ["1", "2", "3"];

const DefaultBadge = () => (
  <Card className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
    <CardHeader className="p-4">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
    </CardHeader>
    <CardContent className="p-4">
      <div className="h-32 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-1/4"></div>
    </CardContent>
  </Card>
);

const BadgeGrid = ({ filterType }) => {
  const [badges, setBadges] = useState([]);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const address = useAddress();

  useEffect(() => {
    if (address) {
      fetchBadges();
    } else {
      setIsLoading(false);
    }
  }, [address, filterType]);

  const fetchBadges = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching NFTs for address:", address);
      const nfts = await alchemy.nft.getNftsForOwner(address, {
        contractAddresses: [contractAddress],
      });
      console.log("NFTs received from Alchemy:", nfts);

      const ownedEditions = nfts.ownedNfts.filter(nft => 
        editionIds.includes(nft.tokenId)
      );
      console.log("Owned editions:", ownedEditions);

      const fetchedBadges = await Promise.all(ownedEditions.map(async nft => {
        console.log("Fetching metadata for NFT:", nft.tokenId);
        const metadata = await alchemy.nft.getNftMetadata(contractAddress, nft.tokenId);
        console.log("Metadata received for NFT", nft.tokenId, ":", metadata);
        
        // Safely access the image URL
        let imageUrl = null;
        if (metadata.media && metadata.media.length > 0) {
          imageUrl = metadata.media[0].gateway;
        } else if (metadata.rawMetadata && metadata.rawMetadata.image) {
          imageUrl = metadata.rawMetadata.image;
        } else if (metadata.image && metadata.image.cachedUrl) {
          imageUrl = metadata.image.cachedUrl;
        }
        
        console.log("Image URL for NFT", nft.tokenId, ":", imageUrl);

        return {
          tokenId: nft.tokenId,
          name: metadata.title || `Badge ${nft.tokenId}`,
          description: metadata.description || 'No description available',
          image: imageUrl,
          attributes: metadata.rawMetadata?.attributes || [],
          external_url: metadata.rawMetadata?.external_url,
          animation_url: metadata.rawMetadata?.animation_url,
          background_color: metadata.rawMetadata?.background_color
        };
      }));

      console.log("Fetched badges:", fetchedBadges);

      setBadges(fetchedBadges || []); // Ensure badges is always an array
    } catch (err) {
      console.error("Error in fetchBadges:", err);
      setError(err.message);
      setBadges([]); // Set badges to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading badges...</div>;
  if (error) return <div>Error: {error}</div>;

  // Check if badges is undefined or empty
  if (!badges || badges.length === 0) {
    return (
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 blur-sm">
          {[...Array(8)].map((_, index) => (
            <DefaultBadge key={index} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Start Your Badge Collection!</h3>
            <p className="mb-4">Connect your wallet and participate in challenges to earn badges.</p>
            <Link to="/faq" className="text-blue-500 hover:text-blue-600 font-semibold">
              Learn How to Earn Badges
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            {selectedBadge?.attributes && selectedBadge.attributes.length > 0 && (
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
            {selectedBadge?.animation_url && (
              <p className="text-sm mb-2">
                <strong>Animation URL:</strong> <a href={selectedBadge.animation_url} target="_blank" rel="noopener noreferrer">View Animation</a>
              </p>
            )}
            {selectedBadge?.background_color && (
              <p className="text-sm mb-2">
                <strong>Background Color:</strong> <span style={{backgroundColor: `#${selectedBadge.background_color}`, padding: '2px 5px', borderRadius: '3px'}}>{`#${selectedBadge.background_color}`}</span>
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