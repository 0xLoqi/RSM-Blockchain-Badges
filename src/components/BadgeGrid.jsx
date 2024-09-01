import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const badges = [
  { name: "Technical Member", description: "Blockchain Community Technical Member", image: "https://i.imgur.com/KwxWbRB.gif", date: "2024-03-15", score: 100, tier: "Tier I", count: 2, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0x123" } },
  { name: "Smart Contract Expert", description: "Mastered Solidity programming", image: "https://i.imgur.com/KwxWbRB.gif", date: "2024-02-28", score: 150, tier: "Tier II", count: 1, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0x456" } },
  { name: "DApp Developer", description: "Created a stunning decentralized application", image: "https://i.imgur.com/tspXtQQ.gif", date: "2024-01-10", score: 200, tier: "Tier III", count: 3, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0x789" } },
  { name: "Blockchain Pioneer", description: "Completed first transaction on Base", image: "https://i.imgur.com/KwxWbRB.gif", date: "2023-12-05", score: 50, tier: "Tier IV", count: 1, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0xabc" } },
  { name: "Crypto Enthusiast", description: "Active participation in blockchain community", image: "https://i.imgur.com/tspXtQQ.gif", date: "2023-11-20", score: 75, tier: "Tier V", count: 2, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0xdef" } },
];

const BadgeGrid = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <Card
            key={index}
            className="hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
            onClick={() => setSelectedBadge(badge)}
          >
            <CardHeader className="text-center relative p-2">
              {badge.count > 1 && (
                <div className="absolute top-1 right-1 bg-[#0393d4] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  x{badge.count}
                </div>
              )}
            </CardHeader>
            <CardContent className="flex flex-col items-center p-2 space-y-2">
              <div className="relative">
                <img src={badge.image} alt={badge.name} className="w-64 h-64 object-contain" />
              </div>
              <Badge className="bg-[#3f9c35] text-white font-semibold px-2 py-0.5 text-sm">{badge.name}</Badge>
              <Badge className={`${getTierColor(badge.tier)} text-white font-semibold px-2 py-0.5 text-xs`}>{badge.tier}</Badge>
              <p className="text-xs text-gray-500">Earned: {badge.date}</p>
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
