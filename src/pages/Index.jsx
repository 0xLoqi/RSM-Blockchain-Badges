import React, { useState } from 'react';
import { Award, Trophy, Target, Bell, Wallet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BadgeGrid from '../components/BadgeGrid';
import Leaderboard from '../components/Leaderboard';
import Challenges from '../components/Challenges';
import NotificationCenter from '../components/NotificationCenter';

const walletOptions = [
  { name: "Coinbase Wallet", icon: "💰" },
  { name: "MetaMask", icon: "🦊" },
  { name: "Rainbow", icon: "🌈" },
];

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const handleConnectWallet = async (walletName) => {
    // Simulating wallet connection
    try {
      // This is a placeholder for actual wallet connection logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSelectedWallet(walletName);
      setIsWalletConnected(true);
      // You would typically interact with the wallet API here
      console.log(`Connected to ${walletName}`);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <header className="bg-[#0393d4] text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://i.imgur.com/zC3L9sL.png" alt="RSM Logo" className="h-24 mr-4" />
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-4 bg-[#3f9c35] hover:bg-[#3f9c35]/80 text-white"
                >
                  <Wallet className="mr-2" />
                  {isWalletConnected ? "Connected" : "Connect Wallet"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Connect Your Wallet</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {walletOptions.map((wallet) => (
                    <Button
                      key={wallet.name}
                      onClick={() => handleConnectWallet(wallet.name)}
                      className="flex items-center justify-start"
                    >
                      <img src={wallet.icon} alt={wallet.name} className="w-8 h-8 mr-4" />
                      {wallet.name}
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto mt-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Your Earned Badges</h2>
            <BadgeGrid />
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
          <div className="flex items-center">
            <p className="mr-2">Powered by</p>
            <img src="https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png" alt="Base Logo" className="h-8" />
          </div>
          <img src="https://i.imgur.com/zC3L9sL.png" alt="RSM Logo" className="h-20" />
        </div>
      </footer>
    </div>
  );
};

export default Index;
