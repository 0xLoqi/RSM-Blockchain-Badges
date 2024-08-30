import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const badgesData = [
  {
    "name": "Cammed Up",
    "behavior_to_incentivize": "Use your webcam during meetings.",
    "description": "Awarded for turning on your webcam during 5 meetings.",
    "weight": 200,
    "image": "https://i.imgur.com/KwxWbRB.gif"
  },
  {
    "name": "Question Master",
    "behavior_to_incentivize": "Ask insightful questions during sessions.",
    "description": "Earned for asking a thoughtful question during any session.",
    "weight": 300,
    "image": "https://i.imgur.com/tspXtQQ.gif"
  },
  {
    "name": "Chat Contributor",
    "behavior_to_incentivize": "Active participation in chat discussions.",
    "description": "Earned for contributing meaningfully in chat.",
    "weight": 300,
    "image": "https://i.imgur.com/KwxWbRB.gif"
  },
  {
    "name": "Brunch Buddy",
    "behavior_to_incentivize": "Attend a Blockchain Brunch and Learn session.",
    "description": "Given for attending any Brunch and Learn session.",
    "weight": 200,
    "image": "https://i.imgur.com/tspXtQQ.gif"
  },
  {
    "name": "Office Hours Hero",
    "behavior_to_incentivize": "Attend office hours for blockchain discussions.",
    "description": "Awarded for each office hours session attended.",
    "weight": 300,
    "image": "https://i.imgur.com/KwxWbRB.gif"
  },
  {
    "name": "Client Collaborator",
    "behavior_to_incentivize": "Work with a blockchain client.",
    "description": "Given for successfully completing a project with a blockchain client.",
    "weight": 800,
    "image": "https://i.imgur.com/tspXtQQ.gif"
  },
  {
    "name": "Feedback Champion",
    "behavior_to_incentivize": "Provide actionable feedback after sessions.",
    "description": "Awarded for offering detailed and constructive feedback.",
    "weight": 400,
    "image": "https://i.imgur.com/KwxWbRB.gif"
  },
  {
    "name": "Community Builder",
    "behavior_to_incentivize": "Invite a colleague to join the blockchain community.",
    "description": "Earned when a colleague joins the community through your referral.",
    "weight": 500,
    "image": "https://i.imgur.com/tspXtQQ.gif"
  },
  {
    "name": "Blockchain Explorer",
    "behavior_to_incentivize": "Participate in new blockchain initiatives.",
    "description": "Awarded for getting involved in pilot projects or new initiatives.",
    "weight": 600,
    "image": "https://i.imgur.com/KwxWbRB.gif"
  },
  {
    "name": "Learning Streak",
    "behavior_to_incentivize": "Consistent participation in learning sessions.",
    "description": "Awarded for attending 3 sessions in a row (Brunch, Office Hours, etc.).",
    "weight": 400,
    "image": "https://i.imgur.com/tspXtQQ.gif"
  },
  {
    "name": "Content Creator",
    "behavior_to_incentivize": "Contribute content or resources to the community.",
    "description": "Earned for sharing valuable content like articles, tools, or resources.",
    "weight": 700,
    "image": "https://i.imgur.com/KwxWbRB.gif"
  },
  {
    "name": "Innovator",
    "behavior_to_incentivize": "Suggest and implement a new feature or improvement.",
    "description": "Awarded for proposing and successfully implementing a new idea.",
    "weight": 700,
    "image": "https://i.imgur.com/tspXtQQ.gif"
  }
];

const AllBadges = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBadge, setSelectedBadge] = useState(null);

  const filteredBadges = badgesData.filter(badge =>
    badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    badge.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBadgeClick = useCallback((badge) => {
    setSelectedBadge(badge);
  }, []);

  return (
    <div className="p-4">
      <Input
        type="text"
        placeholder="Search badges..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
        {filteredBadges.map((badge, index) => (
          <Card key={index} className="hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={() => handleBadgeClick(badge)}>
            <CardHeader>
              <CardTitle>{badge.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={badge.image} alt={badge.name} className="w-full h-32 object-contain mb-2" />
              <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
              <Badge className="bg-blue-500 text-white">{badge.weight} points</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={!!selectedBadge} onOpenChange={() => setSelectedBadge(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedBadge?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <img src={selectedBadge?.image} alt={selectedBadge?.name} className="w-full h-48 object-contain mb-4" />
            <p className="text-sm mb-2"><strong>Description:</strong> {selectedBadge?.description}</p>
            <p className="text-sm mb-2"><strong>Behavior to Incentivize:</strong> {selectedBadge?.behavior_to_incentivize}</p>
            <Badge className="bg-blue-500 text-white">{selectedBadge?.weight} points</Badge>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllBadges;
