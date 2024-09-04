import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const leaderboardData = [
  { name: "Alice", badgeScore: 575, avatar: "A" },
  { name: "Bob", badgeScore: 500, avatar: "B" },
  { name: "Charlie", badgeScore: 450, avatar: "C" },
  { name: "David", badgeScore: 400, avatar: "D" },
  { name: "Eve", badgeScore: 375, avatar: "E" },
];

const Leaderboard = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Top 5 Badge Holders</CardTitle>
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
            <span className="text-lg font-semibold">{user.badgeScore} pts</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
