import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Lock } from 'lucide-react'; // Import the Lock icon from lucide-react

const badges = [
  { name: "Cammed Up", description: "Awarded for turning on your webcam during 5 meetings.", image: "https://i.imgur.com/KwxWbRB.gif", date: "2024-03-15", score: 200, tier: "Tier II", count: 1, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0x123" }, type: "earned" },
  { name: "Question Master", description: "Earned for asking a thoughtful question during any session.", image: "https://i.imgur.com/yalOOoN.gif", date: "2024-02-28", score: 300, tier: "Tier III", count: 2, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0x456" }, type: "collected" },
  { name: "Chat Contributor", description: "Earned for contributing meaningfully in chat.", image: "https://i.imgur.com/KwxWbRB.gif", date: "2024-01-10", score: 300, tier: "Tier III", count: 1, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0x789" }, type: "earned" },
  { name: "Brunch Buddy", description: "Given for attending any Brunch and Learn session.", image: "https://i.imgur.com/tspXtQQ.gif", date: "2023-12-05", score: 200, tier: "Tier II", count: 3, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0xabc" }, type: "collected" },
  { name: "Office Hours Hero", description: "Awarded for each office hours session attended.", image: "https://i.imgur.com/yalOOoN.gif", date: "2023-11-20", score: 300, tier: "Tier III", count: 1, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0xdef" }, type: "earned" },
  { name: "Feedback Champion", description: "Earned for providing valuable feedback on sessions.", image: "https://i.imgur.com/yalOOoN.gif", date: "2023-10-15", score: 250, tier: "Tier II", count: 2, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0xghi" }, type: "collected" },
  { name: "Blockchain Explorer", description: "Awarded for completing the Blockchain Basics course.", image: "https://i.imgur.com/yalOOoN.gif", date: "2023-09-01", score: 400, tier: "Tier IV", count: 1, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0xjkl" }, type: "earned" },
  { name: "Smart Contract Wizard", description: "Earned for deploying your first smart contract.", image: "https://i.imgur.com/tspXtQQ.gif", date: "2023-08-10", score: 500, tier: "Tier V", count: 4, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0xmno" }, type: "collected" },
];

const BadgeGrid = ({ filterType }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const filteredBadges = badges.filter(badge => badge.type === filterType);

  const getTierColor = (tier) => {
    switch (tier) {
      case "Tier I": return "bg-blue-500";
      case "Tier II": return "bg-green-500";
      case "Tier III": return "bg-yellow-500";
      case "Tier IV": return "bg-purple-500";
      case "Tier V": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBadges.map((badge, index) => (
          <Card
            key={index}
            className={`hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105 overflow-hidden ${filterType === 'earned' ? 'border-2 border-green-500' : ''
              }`}
            onClick={() => setSelectedBadge(badge)}
          >
            <CardHeader className="text-center relative p-4">
              {filterType === 'collected' && badge.count > 1 && (
                <div className="absolute top-2 right-2 bg-[#0393d4] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  x{badge.count}
                </div>
              )}
              {filterType === 'earned' && (
                <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <Lock size={16} />
                </div>
              )}
            </CardHeader>
            <CardContent className="flex flex-col items-center p-4 space-y-4">
              <div className="relative">
                <img src={badge.image} alt={badge.name} className="w-48 h-48 object-contain" />
              </div>
              <Badge className="bg-[#3f9c35] text-white font-semibold px-3 py-1 text-base">{badge.name}</Badge>
              <p className="text-sm text-gray-500">
                {filterType === 'earned' ? 'Earned' : 'Collected'}: {badge.date}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedBadge} onOpenChange={() => setSelectedBadge(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedBadge?.name}</DialogTitle>
            <DialogDescription className="text-lg">{selectedBadge?.description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center mt-4">
            <img src={selectedBadge?.image} alt={selectedBadge?.name} className="w-80 h-80 object-contain mb-4" />
            <Badge className={`${getTierColor(selectedBadge?.tier)} text-white font-semibold px-3 py-1 text-lg mb-2`}>{selectedBadge?.tier}</Badge>
            <Badge className="bg-[#3f9c35] text-white font-semibold px-3 py-1 text-lg mb-2">{selectedBadge?.name}</Badge>
            <p className="text-lg text-gray-700 mt-2">Earned: {selectedBadge?.date}</p>
            <p className="text-xl font-bold mt-1">Score: {selectedBadge?.score}</p>
            <div className="mt-4 text-left w-full">
              <h3 className="text-xl font-semibold mb-2">Metadata:</h3>
              <p><strong>Issuer:</strong> {selectedBadge?.metadata.issuer}</p>
              <p><strong>Blockchain:</strong> {selectedBadge?.metadata.blockchain}</p>
              <p><strong>Token ID:</strong> {selectedBadge?.metadata.tokenId}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BadgeGrid;
