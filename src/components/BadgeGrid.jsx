import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const badges = [
  { name: "Technical Member", description: "Blockchain Community Technical Member", image: "https://i.imgur.com/tspXtQQ.gif", date: "2024-03-15" },
  { name: "Smart Contract Expert", description: "Mastered Solidity programming", image: "https://imgur.com/a/qfsJvOO", date: "2024-02-28" },
  { name: "DApp Developer", description: "Created a stunning decentralized application", image: "https://i.imgur.com/tspXtQQ.gif", date: "2024-01-10" },
  { name: "Blockchain Pioneer", description: "Completed first transaction on Base", image: "https://imgur.com/a/qfsJvOO", date: "2023-12-05" },
  { name: "Crypto Enthusiast", description: "Active participation in blockchain community", image: "https://i.imgur.com/tspXtQQ.gif", date: "2023-11-20" },
];

const BadgeGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {badges.map((badge, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-primary">{badge.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <img src={badge.image} alt={badge.name} className="w-24 h-24 object-contain mb-4" />
                  <Badge className="bg-secondary text-white font-semibold px-3 py-1">{badge.name}</Badge>
                  <p className="text-sm text-gray-500 mt-2">Earned: {badge.date}</p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <CardDescription className="text-gray-700 bg-white p-2 rounded shadow-md">{badge.description}</CardDescription>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default BadgeGrid;
