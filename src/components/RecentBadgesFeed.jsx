import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentBadges = [
  { name: "Cammed Up", recipient: "Alice Johnson", date: "2024-03-20", points: 200 },
  { name: "Question Master", recipient: "Bob Smith", date: "2024-03-19", points: 300 },
  { name: "Chat Contributor", recipient: "Charlie Brown", date: "2024-03-18", points: 300 },
  { name: "Brunch Buddy", recipient: "Diana Prince", date: "2024-03-17", points: 200 },
  { name: "Office Hours Hero", recipient: "Ethan Hunt", date: "2024-03-16", points: 300 },
  { name: "Client Collaborator", recipient: "Fiona Apple", date: "2024-03-15", points: 800 },
  { name: "Feedback Champion", recipient: "George Lucas", date: "2024-03-14", points: 400 },
  { name: "Community Builder", recipient: "Hannah Montana", date: "2024-03-13", points: 500 },
  { name: "Blockchain Explorer", recipient: "Ian McKellen", date: "2024-03-12", points: 600 },
  { name: "Learning Streak", recipient: "Julia Roberts", date: "2024-03-11", points: 250 },
];

const RecentBadgesFeed = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollContent = () => {
      if (scrollContainer.scrollTop >= scrollContainer.scrollHeight / 2) {
        scrollContainer.scrollTop = 0;
      } else {
        scrollContainer.scrollTop += 1;
      }
    };

    const intervalId = setInterval(scrollContent, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Badge Awards</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={scrollRef} className="max-h-48 overflow-hidden relative">
          <div className="space-y-4">
            {[...recentBadges, ...recentBadges].map((badge, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-[#3f9c35] text-white text-xs px-2 py-1 rounded-full">
                    +{badge.points}
                  </Badge>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                      {badge.recipient}
                    </span>
                    <span className="text-xs font-semibold text-foreground dark:text-gray-300 italic">
                      earned a <span className="not-italic underline decoration-dotted decoration-[#3f9c35]">{badge.name}</span> badge
                    </span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground dark:text-gray-400">{badge.date}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBadgesFeed;
