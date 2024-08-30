import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const leaderboardData = [
  { rank: 1, name: "Alice Johnson", score: 1200, badges: ["Cammed Up", "Question Master", "Chat Contributor"] },
  { rank: 2, name: "Bob Smith", score: 1150, badges: ["Brunch Buddy", "Office Hours Hero"] },
  { rank: 3, name: "Charlie Brown", score: 1100, badges: ["Client Collaborator", "Feedback Champion"] },
  { rank: 4, name: "Diana Prince", score: 1050, badges: ["Community Builder", "Blockchain Explorer"] },
  { rank: 5, name: "Ethan Hunt", score: 1000, badges: ["Learning Streak", "Content Creator"] },
  { rank: 6, name: "Fiona Apple", score: 950, badges: ["Innovator", "Cammed Up"] },
  { rank: 7, name: "George Lucas", score: 900, badges: ["Question Master", "Chat Contributor"] },
  { rank: 8, name: "Hannah Montana", score: 850, badges: ["Brunch Buddy", "Office Hours Hero"] },
  { rank: 9, name: "Ian McKellen", score: 800, badges: ["Client Collaborator", "Feedback Champion"] },
  { rank: 10, name: "Julia Roberts", score: 750, badges: ["Community Builder", "Blockchain Explorer"] },
];

const DetailedLeaderboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = leaderboardData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.badges.some(badge => badge.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="Search by name or badge..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Badges</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((user) => (
            <TableRow key={user.rank}>
              <TableCell>{user.rank}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.score}</TableCell>
              <TableCell>{user.badges.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DetailedLeaderboard;