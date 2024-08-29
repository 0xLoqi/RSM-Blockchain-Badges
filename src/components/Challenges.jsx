import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const challengesData = [
  { name: "Smart Contract Challenge", deadline: "2024-04-01", participants: 42 },
  { name: "DApp Design Sprint", deadline: "2024-04-15", participants: 28 },
  { name: "Blockchain Trivia", deadline: "2024-04-30", participants: 56 },
];

const Challenges = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Active Challenges</CardTitle>
      </CardHeader>
      <CardContent>
        {challengesData.map((challenge, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{challenge.name}</h3>
            <p className="text-sm text-gray-600 mb-2">Deadline: {challenge.deadline}</p>
            <p className="text-sm text-gray-600 mb-2">Participants: {challenge.participants}</p>
            <Button variant="outline" className="w-full">Join Challenge</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Challenges;