import React, { useEffect, useRef } from 'react';
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
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const scrollAnimation = () => {
        if (scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight) {
          scrollElement.scrollTop = 0;
        } else {
          scrollElement.scrollTop += 1;
        }
      };

      const intervalId = setInterval(scrollAnimation, 50);

      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <Card className="w-full h-[400px] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Recent Badge Awards</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={scrollRef} className="h-[320px] overflow-hidden">
          <div className="space-y-4">
            {recentBadges.concat(recentBadges).map((badge, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3">
                  <Badge className="px-2 py-1 text-xs">{badge.name}</Badge>
                  <span className="text-sm font-medium text-gray-700">{badge.recipient}</span>
                </div>
                <span className="text-xs text-gray-500">{badge.date}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBadgesFeed;
