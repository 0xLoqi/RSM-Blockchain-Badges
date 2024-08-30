import React from 'react';
import { Award, Trophy, Target, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BadgeGrid from '../components/BadgeGrid';
import Leaderboard from '../components/Leaderboard';
import Challenges from '../components/Challenges';
import NotificationCenter from '../components/NotificationCenter';
import Spline from '@splinetool/react-spline';
import AllBadges from '../components/AllBadges';
import RecentBadgesFeed from '../components/RecentBadgesFeed';
import DetailedLeaderboard from '../components/DetailedLeaderboard';
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { ethereum } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: "....",
});

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "telegram",
        "farcaster",
        "email",
        "facebook",
        "passkey",
        "phone",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <header className="bg-[#0393d4] text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://i.imgur.com/zC3L9sL.png" alt="RSM Logo" className="h-24 mr-4 rounded-full shadow-md" />
            <h1 className="text-2xl font-bold">RSM Blockchain Community</h1>
          </div>
          <nav className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-white mr-4">
                  <Award className="mr-2" /> All Badges
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>All Available Badges</DialogTitle>
                </DialogHeader>
                <AllBadges />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-white mr-4">
                  <Trophy className="mr-2" /> Leaderboard
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Detailed Leaderboard</DialogTitle>
                </DialogHeader>
                <DetailedLeaderboard />
              </DialogContent>
            </Dialog>
            <Button variant="ghost" className="text-white mr-4">
              <Target className="mr-2" /> Challenges
            </Button>
            <NotificationCenter />
            <ConnectButton
              client={client}
              wallets={wallets}
              theme={darkTheme({
                colors: {
                  modalBg: "#e1dbdb",
                  borderColor: "#3f9c35",
                  primaryText: "#009ada",
                  accentText: "#009ada",
                },
              })}
              connectModal={{ size: "compact" }}
              accountAbstraction={{
                chain: ethereum,
                sponsorGas: true,
              }}
              auth={{
                async doLogin(params) {
                  // call your backend to verify the signed payload passed in params
                },
                async doLogout() {
                  // call your backend to logout the user if needed
                },
                async getLoginPayload(params) {
                  // call your backend and return the payload
                },
                async isLoggedIn() {
                  // call your backend to check if the user is logged in
                },
              }}
            />
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <RecentBadgesFeed />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Your Earned Badges</h2>
            <BadgeGrid />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2">
            <Challenges />
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6">Explore in 3D</h2>
          <Spline scene="https://prod.spline.design/7wckFeGi4nynx6uX/scene.splinecode" />
        </div>
      </main>

      <footer className="bg-gray-200 text-gray-600 py-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <p>© 2024 RSM Blockchain Community. All rights reserved.</p>
          <div className="flex items-center">
            <img src="https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png" alt="Base Logo" className="h-8 mr-2" />
            <p>Powered by Base</p>
          </div>
          <img src="https://i.imgur.com/Ib78a77.png" alt="RSM Logo" className="h-20" />
        </div>
      </footer>
    </div>
  );
};

export default Index;
