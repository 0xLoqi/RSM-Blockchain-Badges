import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const badges = [
  { name: "Technical Member", description: "Blockchain Community Technical Member", image: "https://imgur.com/a/qfsJvOO.gif", date: "2024-03-15", score: 100, tier: "Bronze", count: 2, metadata: { issuer: "RSM", blockchain: "Ethereum", tokenId: "0x123" } },
  { name: "Smart Contract Expert", description: "Mastered Solidity programming", image: "https://i.imgur.com/KwxWbRB.gif", date: "2024-02-28", score: 150, tier: "Silver", count: 1, metadata: { issuer: "RSM", blockchain: "Polygon", tokenId: "0x456" } },
  { name: "DApp Developer", description: "Created a stunning decentralized application", image: "https://i.imgur.com/tspXtQQ.gif", date: "2024-01-10", score: 200, tier: "Gold", count: 3, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0x789" } },
  { name: "Blockchain Pioneer", description: "Completed first transaction on Base", image: "https://i.imgur.com/KwxWbRB.gif", date: "2023-12-05", score: 50, tier: "Bronze", count: 1, metadata: { issuer: "RSM", blockchain: "Base", tokenId: "0xabc" } },
  { name: "Crypto Enthusiast", description: "Active participation in blockchain community", image: "https://i.imgur.com/tspXtQQ.gif", date: "2023-11-20", score: 75, tier: "Silver", count: 2, metadata: { issuer: "RSM", blockchain: "Ethereum", tokenId: "0xdef" } },
];

const BadgeGrid = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const getTierColor = (tier) => {
    switch (tier) {
      case "Bronze": return "bg-amber-600";
      case "Silver": return "bg-gray-400";
      case "Gold": return "bg-yellow-400";
      default: return "bg-blue-500";
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {badges.map((badge, index) => (
          <Card 
            key={index} 
            className="hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => setSelectedBadge(badge)}
          >
            <CardHeader className="text-center relative">
              <CardTitle className="text-2xl text-[#0393d4]">{badge.name}</CardTitle>
              <Badge className={`absolute top-2 right-2 ${getTierColor(badge.tier)} text-white font-semibold px-3 py-1`}>{badge.tier}</Badge>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative">
                <img src={badge.image} alt={badge.name} className="w-64 h-64 object-contain mb-4" />
                {badge.count > 1 && (
                  <div className="absolute -bottom-2 -right-2 bg-[#0393d4] text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                    x{badge.count}
                  </div>
                )}
              </div>
              <Badge className="bg-[#3f9c35] text-white font-semibold px-3 py-1 text-lg">{badge.name}</Badge>
              <p className="text-sm text-gray-500 mt-2">Earned: {badge.date}</p>
              <p className="text-lg font-bold mt-1">Score: {badge.score}</p>
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
            <img src={selectedBadge?.image} alt={selectedBadge?.name} className="w-64 h-64 object-contain mb-4" />
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
