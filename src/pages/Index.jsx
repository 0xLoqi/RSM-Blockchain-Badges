import React from 'react';
import { Tent, Award, Compass } from 'lucide-react';
import { Button } from "@/components/ui/button";
import BadgeGrid from '../components/BadgeGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-green-100 text-blue-800 font-sans">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center">
            <Tent className="mr-2" /> Base Camp Badges
          </h1>
          <nav>
            <Button variant="ghost" className="text-white hover:text-green-300">
              <Award className="mr-2" /> My Badges
            </Button>
            <Button variant="ghost" className="text-white hover:text-green-300">
              <Compass className="mr-2" /> Explore
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Earned Badges</h2>
        <BadgeGrid />
      </main>
      
      <footer className="bg-blue-600 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2024 Base Camp Badges. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
