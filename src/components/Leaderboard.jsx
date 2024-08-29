import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const leaderboardData = [
  { name: "Alice", score: 1250, avatar: "A" },
  { name: "Bob", score: 1100, avatar: "B" },
  { name: "Charlie", score: 950, avatar: "C" },
  { name: "David", score: 900, avatar: "D" },
  { name: "Eve", score: 850, avatar: "E" },
];

const Leaderboard = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        {leaderboardData.map((user, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-lg font-semibold mr-4">{index + 1}</span>
              <Avatar className="mr-4">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.avatar}`} />
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
              <span className="text-lg">{user.name}</span>
            </div>
            <span className="text-lg font-semibold">{user.score}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;