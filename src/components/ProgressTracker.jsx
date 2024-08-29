import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const progressData = [
  { name: "Blockchain Basics", progress: 80 },
  { name: "Smart Contract Development", progress: 60 },
  { name: "DApp Creation", progress: 40 },
  { name: "Tokenomics", progress: 20 },
];

const ProgressTracker = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {progressData.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-sm font-medium">{item.progress}%</span>
            </div>
            <Progress value={item.progress} className="w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;