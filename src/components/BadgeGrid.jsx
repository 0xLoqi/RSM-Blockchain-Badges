import React, { useState, useEffect } from 'react';
import { useAddress } from "@thirdweb-dev/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { alchemy } from '../lib/alchemy';
import { Link } from 'react-router-dom';

const contractAddress = "0x959cf5441d19dfc7a497aaa455b1ccbd430274db";
const editionIds = ["1", "2", "3"];

const sampleImages = [
  "https://i.imgur.com/KwxWbRB.gif",
  "https://i.imgur.com/tspXtQQ.gif",
  "https://i.imgur.com/DKW0Xy4.gif",
  "https://i.imgur.com/BCwQU6x.gif"
];

const sampleBadges = [
  {
    name: "Cammed Up",
    description: "Awarded for turning on your webcam during 5 meetings.",
    weight: 200,
  },
  {
    name: "Question Master",
    description: "Earned for asking a thoughtful question during any session.",
    weight: 300,
  },
  {
    name: "Chat Contributor",
    description: "Earned for contributing meaningfully in chat.",
    weight: 300,
  },
  {
    name: "Brunch Buddy",
    description: "Given for attending any Brunch and Learn session.",
    weight: 200,
  },
  {
    name: "Office Hours Hero",
    description: "Awarded for each office hours session attended.",
    weight: 300,
  },
  {
    name: "Client Collaborator",
    description: "Given for successfully completing a project with a blockchain client.",
    weight: 800,
  },
  {
    name: "Feedback Champion",
    description: "Awarded for offering detailed and constructive feedback.",
    weight: 400,
  },
  {
    name: "Blockchain Basics",
    description: "Completed the Blockchain Basics course.",
    weight: 500,
  }
].map((badge, index) => ({
  ...badge,
  image: sampleImages[index % sampleImages.length]
}));

// Function to shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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

      // Fetch transfer history
      const transfers = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toAddress: address,
        contractAddresses: [contractAddress],
        category: ["erc721", "erc1155"],
      });
      console.log("All transfers:", transfers.transfers);

      const fetchedBadges = await Promise.all(ownedEditions.map(async nft => {
        console.log("Processing NFT:", nft.tokenId);
        const metadata = await alchemy.nft.getNftMetadata(contractAddress, nft.tokenId);
        
        console.log("All transfers for debugging:");
        transfers.transfers.forEach(t => {
          console.log(`Transfer - TokenID: ${t.tokenId}, From: ${t.from}, To: ${t.to}`);
        });
        
        // Sort transfers by block number (ascending order)
        const sortedTransfers = transfers.transfers.sort((a, b) => parseInt(a.blockNum, 16) - parseInt(b.blockNum, 16));
        
        // Find the first transfer to this address for this contract
        const firstTransfer = sortedTransfers.find(t => t.to.toLowerCase() === address.toLowerCase());
        
        let isEarned = false;
        let transferFrom = 'No transfer found';
        
        if (firstTransfer) {
          isEarned = firstTransfer.from === "0x0000000000000000000000000000000000000000";
          transferFrom = firstTransfer.from;
        }
        
        console.log(`NFT ${nft.tokenId} isEarned:`, isEarned);
        console.log(`NFT ${nft.tokenId} from address:`, transferFrom);

        // Determine the name
        let name = metadata.title || metadata.name || metadata.rawMetadata?.name;
        if (!name) {
          name = `Badge ${nft.tokenId}`;
          console.warn(`No name found for NFT ${nft.tokenId}, using fallback:`, name);
        }

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
          name: name,
          description: metadata.description || metadata.rawMetadata?.description || 'No description available',
          image: imageUrl,
          attributes: metadata.rawMetadata?.attributes || [],
          external_url: metadata.rawMetadata?.external_url,
          animation_url: metadata.rawMetadata?.animation_url,
          background_color: metadata.rawMetadata?.background_color,
          isEarned: isEarned,
          isOwned: true,
          transferFrom: transferFrom
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
    const randomSampleBadges = shuffleArray([...sampleBadges]).slice(0, 6);
    return (
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 blur-sm">
          {randomSampleBadges.map((badge, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-6">
                <h3 className="text-xl font-semibold">{badge.name}</h3>
              </CardHeader>
              <CardContent className="p-6">
                <img src={badge.image} alt={badge.name} className="w-full h-48 object-contain mb-4" />
                <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                <Badge variant="secondary">{badge.weight} points</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Your Badge Collection Awaits!</h3>
            <p className="mb-6 text-lg">Participate in challenges and activities to start earning badges.</p>
            <Link to="/faq" className="text-blue-500 hover:text-blue-600 font-semibold text-lg">
              Learn How to Earn Badges
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredBadges = badges.filter(badge => 
    filterType === 'all' || 
    (filterType === 'earned' && badge.isEarned === true) || 
    (filterType === 'collected' && badge.isEarned === false)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredBadges.map((badge) => (
        <Card key={badge.tokenId} className="cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => setSelectedBadge(badge)}>
          <CardHeader className="p-6">
            <h3 className="text-xl font-semibold">{badge.name}</h3>
          </CardHeader>
          <CardContent className="p-6">
            {badge.image && <img src={badge.image} alt={badge.name} className="w-full h-48 object-contain mb-4" />}
            <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
            <Badge variant="secondary">{badge.isEarned ? 'Earned' : 'Collected'}</Badge>
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