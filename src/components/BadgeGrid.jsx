import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const badges = [
  { name: "Technical Member", description: "Blockchain Community Technical Member" },
  { name: "Smart Contract Expert", description: "Mastered Solidity programming" },
  { name: "DApp Developer", description: "Created a stunning decentralized application" },
  { name: "Blockchain Pioneer", description: "Completed first transaction on Base" },
  { name: "Crypto Enthusiast", description: "Active participation in blockchain community" },
];

const BadgeGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {badges.map((badge, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>
              <Card className="hover:shadow-neon transition-shadow duration-300 bg-retro-purple border-4 border-retro-yellow">
                <CardHeader className="text-center">
                  <CardTitle className="text-retro-yellow text-2xl">{badge.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <img src="/sample-badge.png" alt={badge.name} className="w-32 h-32 object-contain mb-4" />
                  <Badge className="bg-retro-green text-retro-purple font-bold px-4 py-2">{badge.name}</Badge>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <CardDescription className="text-retro-yellow bg-retro-purple p-2 rounded">{badge.description}</CardDescription>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default BadgeGrid;
