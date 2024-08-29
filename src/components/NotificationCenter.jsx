import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const notifications = [
  { id: 1, message: "You've earned a new badge!", type: "badge" },
  { id: 2, message: "New challenge available: Smart Contract Sprint", type: "challenge" },
  { id: 3, message: "You've moved up in the leaderboard!", type: "leaderboard" },
];

const NotificationCenter = () => {
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  const handleNotificationClick = () => {
    setUnreadCount(0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} onClick={handleNotificationClick}>
            <span className="text-sm">{notification.message}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter;