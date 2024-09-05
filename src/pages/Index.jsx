import React, { useState } from 'react';
import { Award, Trophy, Target, Sun, Moon, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BadgeGrid from '../components/BadgeGrid';
import Leaderboard from '../components/Leaderboard';
import Challenges from '../components/Challenges';
//import NotificationCenter from '../components/NotificationCenter';
import AllBadges from '../components/AllBadges';
import RecentBadgesFeed from '../components/RecentBadgesFeed';
import DetailedLeaderboard from '../components/DetailedLeaderboard';
import { useTheme } from "next-themes";
import ThemeToggle from '../components/ThemeToggle';
import { ConnectWallet } from "@thirdweb-dev/react";
import ChallengesModal from '../components/ChallengesModal';
import AboutModal from '../components/AboutModal';
import BadgeToggle from '../components/BadgeToggle';
import ConnectWalletPrompt from '../components/ConnectWalletPrompt';
import { useAddress, useConnectionStatus } from "@thirdweb-dev/react";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const [isChallengesModalOpen, setIsChallengesModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [badgeFilter, setBadgeFilter] = useState('earned');

  const address = useAddress();
  const connectionStatus = useConnectionStatus();

  const isConnected = connectionStatus === "connected" && address;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col`}>
      <header className="bg-[#0393d4] text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://i.imgur.com/zC3L9sL.png" alt="RSM Logo" className="h-24 mr-4 rounded-lg shadow-md" />
            <h1 className="text-2xl font-bold">RSM Blockchain Badges</h1>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-white">
                    <Award className="mr-2" /> All Badges
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[80vh] p-6 scrollbar-custom">
                  <DialogHeader>
                    <DialogTitle>All Available Badges</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 h-full overflow-y-auto pr-2 smooth-scroll">
                    <AllBadges />
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" className="text-white">
                <Trophy className="mr-2" /> Leaderboard
              </Button>
              <Button variant="ghost" className="text-white" onClick={() => setIsChallengesModalOpen(true)}>
                <Target className="mr-2" /> Challenges
              </Button>
            </nav>
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setIsAboutModalOpen(true)}
            >
              <HelpCircle className="mr-2" /> About
            </Button>
            {isConnected && (
              <ConnectWallet
                theme={theme === 'dark' ? "dark" : "light"}
                btnTitle="Disconnect"
                className={`!bg-white dark:!bg-gray-800 !text-[#0393d4] dark:!text-white hover:!bg-gray-100 dark:hover:!bg-gray-700 !font-bold !py-2 !px-4 !rounded-full !text-sm !transition-all !duration-300 !ease-in-out !transform hover:!scale-105`}
              />
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-8 flex-grow">
        <RecentBadgesFeed />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2">
            {isConnected ? (
              <>
                <BadgeToggle filter={badgeFilter} setFilter={setBadgeFilter} />
                <BadgeGrid filterType={badgeFilter} />
              </>
            ) : (
              <ConnectWalletPrompt />
            )}
          </div>
          <div>
            <Leaderboard />
            <Challenges />
          </div>
        </div>
      </main>

      <ChallengesModal
        isOpen={isChallengesModalOpen}
        onClose={() => setIsChallengesModalOpen(false)}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Floating theme toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full p-2 bg-white dark:bg-gray-800 shadow-lg"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      <footer className={`${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600'} py-4 mt-8`}>
        <div className="container mx-auto flex justify-between items-center">
          <p>© 2024 RSM Blockchain Community. All rights reserved.</p>
          <div className="flex items-center">
            <img src="https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png" alt="Base Logo" className="h-8 mr-2" />
            <p>Powered by Base</p>
          </div>
          <div className="flex items-center">
            <img src="https://i.imgur.com/Ib78a77.png" alt="RSM Logo" className="h-20 mr-4" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
