import React, { useEffect } from 'react';
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
  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    const scrollSpeed = 1; // Adjust this value for speed

    const scrollContent = () => {
      if (scrollContainer) {
        scrollContainer.scrollTop += scrollSpeed;
        if (scrollContainer.scrollTop >= scrollContainer.scrollHeight - scrollContainer.clientHeight) {
          scrollContainer.scrollTop = 0;
        }
      }
    };

    const intervalId = setInterval(scrollContent, 50); // Adjust the interval for smoothness

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Badge Awards</CardTitle>
      </CardHeader>
      <CardContent>
        <div id="scroll-container" className="max-h-40 overflow-hidden relative">
          <div className="space-y-4">
            {recentBadges.map((badge, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <Badge className="mr-2">{badge.name}</Badge>
                  <span className="text-sm text-foreground dark:text-gray-300">{badge.recipient}</span>
                </div>
                <span className="text-sm text-muted-foreground dark:text-gray-400">{badge.date}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBadgesFeed;
