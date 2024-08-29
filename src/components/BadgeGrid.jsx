import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Zap, Leaf, Coffee, Code, Palette } from 'lucide-react';

const badges = [
  { name: "Blockchain Pioneer", icon: <Zap className="h-8 w-8 text-yellow-500" />, description: "Completed first transaction on Base" },
  { name: "Green Coder", icon: <Leaf className="h-8 w-8 text-green-500" />, description: "Deployed an eco-friendly smart contract" },
  { name: "Coffee Brewer", icon: <Coffee className="h-8 w-8 text-brown-500" />, description: "Stayed awake for 24 hours coding" },
  { name: "Code Ninja", icon: <Code className="h-8 w-8 text-purple-500" />, description: "Mastered Solidity programming" },
  { name: "UI Wizard", icon: <Palette className="h-8 w-8 text-pink-500" />, description: "Created a stunning dApp interface" },
];

const BadgeGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {badges.map((badge, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center">
                    <Award className="h-6 w-6 text-blue-500 mr-2" />
                    {badge.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  {badge.icon}
                  <Badge className="mt-2" variant="secondary">{badge.name}</Badge>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <CardDescription>{badge.description}</CardDescription>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default BadgeGrid;