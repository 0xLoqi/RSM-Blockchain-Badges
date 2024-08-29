import React, { useState } from 'react';
import { Award, Trophy, Target, Bell, Wallet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import BadgeGrid from '../components/BadgeGrid';
import Leaderboard from '../components/Leaderboard';
import ProgressTracker from '../components/ProgressTracker';
import Challenges from '../components/Challenges';
import NotificationCenter from '../components/NotificationCenter';

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsWalletConnected(true);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install Coinbase Wallet to connect!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <header className="bg-[#0393d4] text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://i.imgur.com/Ib78a77.png" alt="RSM Logo" className="h-12 mr-4" />
            <h1 className="text-2xl font-bold">RSM Blockchain Community</h1>
          </div>
          <nav className="flex items-center">
            <Button variant="ghost" className="text-white mr-4">
              <Award className="mr-2" /> My Badges
            </Button>
            <Button variant="ghost" className="text-white mr-4">
              <Trophy className="mr-2" /> Leaderboard
            </Button>
            <Button variant="ghost" className="text-white mr-4">
              <Target className="mr-2" /> Challenges
            </Button>
            <NotificationCenter />
            <Button
              variant="outline"
              className="ml-4 bg-[#3f9c35] hover:bg-[#3f9c35]/80 text-white"
              onClick={handleConnectWallet}
            >
              <Wallet className="mr-2" />
              {isWalletConnected ? "Connected" : "Connect Wallet"}
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto mt-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Your Earned Badges</h2>
            <BadgeGrid />
            <ProgressTracker />
          </div>
          <div>
            <Leaderboard />
            <Challenges />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-200 text-gray-600 py-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <p>© 2024 RSM Blockchain Community. All rights reserved.</p>
          <img src="https://i.imgur.com/Ib78a77.png" alt="RSM Logo" className="h-10" />
        </div>
      </footer>
    </div>
  );
};

export default Index;
