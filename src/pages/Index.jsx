import React, { useState } from 'react';
import { Award, Trophy, Target, Bell, Wallet, Moon, Sun } from 'lucide-react';
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
import { useTheme } from "@/components/theme-provider";
import ThemeToggle from '../components/ThemeToggle';


const walletOptions = [
  { name: "Coinbase Wallet", icon: "💰" },
  { name: "MetaMask", icon: "🦊" },
  { name: "Rainbow", icon: "🌈" },
];

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const handleConnectWallet = async (walletName) => {
    try {
      let provider;

      if (walletName === "Coinbase Wallet") {
        const CoinbaseWalletSDK = await import('@coinbase/wallet-sdk').then(m => m.default);
        const coinbaseWallet = new CoinbaseWalletSDK({
          appName: 'RSM Blockchain Community',
          appLogoUrl: 'https://i.imgur.com/zC3L9sL.png',
          darkMode: false
        });
        provider = coinbaseWallet.makeWeb3Provider('https://sepolia.base.org', 84532);
      } else if (typeof window.ethereum !== 'undefined') {
        provider = new Web3Provider(window.ethereum);
      } else {
        throw new Error("No Ethereum wallet found");
      }

      await provider.send('eth_requestAccounts', []);

      try {
        await provider.send('wallet_switchEthereumChain', [{ chainId: '0x14A34' }]);
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await provider.send('wallet_addEthereumChain', [{
              chainId: '0x14A34',
              chainName: 'Base Sepolia Testnet',
              nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
              rpcUrls: ['https://sepolia.base.org'],
              blockExplorerUrls: ['https://sepolia-explorer.base.org']
            }]);
          } catch (addError) {
            throw new Error("Failed to add Base Sepolia network");
          }
        } else {
          throw switchError;
        }
      }

      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setSelectedWallet(walletName);
      setIsWalletConnected(true);
      setWalletAddress(address);
      console.log(`Connected to ${walletName} with address ${address} on Base Sepolia Testnet`);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <header className="bg-[#0393d4] text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://i.imgur.com/zC3L9sL.png" alt="RSM Logo" className="h-24 mr-4 rounded-lg shadow-md" />
            <h1 className="text-2xl font-bold">RSM Blockchain Community</h1>
          </div>
          <nav className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-white mr-4">
                  <Award className="mr-2" /> All Badges
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto p-6">
                <DialogHeader>
                  <DialogTitle>All Available Badges</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Search badges..."
                    className="w-full p-2 mb-4 border rounded"
                    onChange={(e) => {
                      // Implement search functionality here
                      console.log('Searching:', e.target.value);
                    }}
                  />
                  <AllBadges />
                </div>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-4 bg-[#3f9c35] hover:bg-[#3f9c35]/80 text-white"
                >
                  <Wallet className="mr-2" />
                  {isWalletConnected ? shortenAddress(walletAddress) : "Connect Wallet"}
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
                      <span className="text-2xl mr-4">{wallet.icon}</span>
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
        <RecentBadgesFeed />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Your Badges</h2>
            <BadgeGrid />
          </div>
          <div>
            <Leaderboard />
            <Challenges />
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Create New Challenge</h3>
              {isWalletConnected && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  // Implement challenge creation logic here
                  console.log('Creating new challenge');
                }}>
                  <input
                    type="text"
                    placeholder="Challenge Name"
                    className="w-full p-2 mb-2 border rounded"
                    required
                  />
                  <textarea
                    placeholder="Challenge Description"
                    className="w-full p-2 mb-2 border rounded"
                    required
                  ></textarea>
                  <input
                    type="text"
                    placeholder="Badge Name for Completion"
                    className="w-full p-2 mb-2 border rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Create Challenge
                  </button>
                </form>
              )}
              {!isWalletConnected && (
                <p>Connect your wallet to create new challenges.</p>
              )}
            </div>
          </div>
        </div>
        {/* <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6">Explore in 3D</h2>
          <Spline scene="https://prod.spline.design/7wckFeGi4nynx6uX/scene.splinecode" />
        </div> */}
      </main>

      <footer className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <p>© 2024 RSM Blockchain Community. All rights reserved.</p>
          <div className="flex items-center">
            <img src="https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png" alt="Base Logo" className="h-8 mr-2" />
            <p>Powered by Base</p>
          </div>
          <div className="flex items-center">
            <img src="https://i.imgur.com/Ib78a77.png" alt="RSM Logo" className="h-20 mr-4" />
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
