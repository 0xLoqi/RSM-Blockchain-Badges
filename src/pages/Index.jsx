import React from 'react';
import { Tent, Award, Compass } from 'lucide-react';
import { Button } from "@/components/ui/button";
import BadgeGrid from '../components/BadgeGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-retro-teal text-retro-yellow font-retro flex flex-col">
      <header className="bg-retro-blue text-retro-yellow py-4 border-b-4 border-retro-yellow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center">
            <Tent className="mr-2" /> Base Camp Badges
          </h1>
          <nav>
            <Button variant="outline" className="text-retro-yellow hover:bg-retro-purple mr-2">
              <Award className="mr-2" /> My Badges
            </Button>
            <Button variant="outline" className="text-retro-yellow hover:bg-retro-purple">
              <Compass className="mr-2" /> Explore
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto mt-8 flex-grow">
        <h2 className="text-4xl font-bold mb-8 text-center animate-pulse">Your Earned Badges</h2>
        <BadgeGrid />
      </main>
      
      <footer className="bg-retro-blue text-retro-yellow py-4 border-t-4 border-retro-yellow mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <p>© 2024 Base Camp Badges. All rights reserved.</p>
          <img src="/rsm-logo.png" alt="RSM Logo" className="h-8" />
        </div>
      </footer>
    </div>
  );
};

export default Index;
