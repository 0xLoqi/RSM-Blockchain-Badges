import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentBadges = [
  { name: "Cammed Up", recipient: "Alice Johnson", date: "2024-03-20" },
  { name: "Question Master", recipient: "Bob Smith", date: "2024-03-19" },
  { name: "Chat Contributor", recipient: "Charlie Brown", date: "2024-03-18" },
  { name: "Brunch Buddy", recipient: "Diana Prince", date: "2024-03-17" },
  { name: "Office Hours Hero", recipient: "Ethan Hunt", date: "2024-03-16" },
  { name: "Client Collaborator", recipient: "Fiona Apple", date: "2024-03-15" },
  { name: "Feedback Champion", recipient: "George Lucas", date: "2024-03-14" },
  { name: "Community Builder", recipient: "Hannah Montana", date: "2024-03-13" },
  { name: "Blockchain Explorer", recipient: "Ian McKellen", date: "2024-03-12" },
  { name: "Learning Streak", recipient: "Julia Roberts", date: "2024-03-11" },
];

const RecentBadgesFeed = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Badge Awards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBadges.map((badge, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <Badge className="mr-2">{badge.name}</Badge>
                <span className="text-sm text-gray-600">{badge.recipient}</span>
              </div>
              <span className="text-sm text-gray-500">{badge.date}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBadgesFeed;