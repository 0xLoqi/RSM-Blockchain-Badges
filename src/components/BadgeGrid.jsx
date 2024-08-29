import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const badges = [
  { name: "Technical Member", description: "Blockchain Community Technical Member", image: "https://i.imgur.com/tspXtQQ.gif", date: "2024-03-15", score: 100 },
  { name: "Smart Contract Expert", description: "Mastered Solidity programming", image: "https://i.imgur.com/KwxWbRB.gif", date: "2024-02-28", score: 150 },
  { name: "DApp Developer", description: "Created a stunning decentralized application", image: "https://i.imgur.com/tspXtQQ.gif", date: "2024-01-10", score: 200 },
  { name: "Blockchain Pioneer", description: "Completed first transaction on Base", image: "https://i.imgur.com/KwxWbRB.gif", date: "2023-12-05", score: 50 },
  { name: "Crypto Enthusiast", description: "Active participation in blockchain community", image: "https://i.imgur.com/tspXtQQ.gif", date: "2023-11-20", score: 75 },
];

const BadgeGrid = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {badges.map((badge, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedBadge(badge)}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-[#0393d4]">{badge.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <img src={badge.image} alt={badge.name} className="w-48 h-48 object-contain mb-4" />
              <Badge className="bg-[#3f9c35] text-white font-semibold px-3 py-1">{badge.name}</Badge>
              <p className="text-sm text-gray-500 mt-2">Earned: {badge.date}</p>
              <p className="text-sm font-bold mt-1">Score: {badge.score}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedBadge} onOpenChange={() => setSelectedBadge(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedBadge?.name}</DialogTitle>
            <DialogDescription>{selectedBadge?.description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center mt-4">
            <img src={selectedBadge?.image} alt={selectedBadge?.name} className="w-48 h-48 object-contain mb-4" />
            <Badge className="bg-[#3f9c35] text-white font-semibold px-3 py-1">{selectedBadge?.name}</Badge>
            <p className="text-sm text-gray-500 mt-2">Earned: {selectedBadge?.date}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BadgeGrid;
