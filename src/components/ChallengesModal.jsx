import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockChallenges = {
    active: [
        { id: 1, title: "Smart Contract Challenge", endDate: "2024-04-15" },
        { id: 2, title: "DeFi Protocol Design", endDate: "2024-04-30" },
    ],
    past: [
        { id: 3, title: "NFT Marketplace Creation", winner: "0x1234...5678" },
        { id: 4, title: "Blockchain Scalability Solution", winner: "0xabcd...efgh" },
    ]
};

const isPermissionedWallet = true; // Simulating a permissioned wallet

const ChallengesModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("active");

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Challenges</DialogTitle>
                </DialogHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="past">Past</TabsTrigger>
                    </TabsList>
                    <TabsContent value="active">
                        {mockChallenges.active.map(challenge => (
                            <div key={challenge.id} className="mb-4 p-4 border rounded">
                                <h3 className="font-bold">{challenge.title}</h3>
                                <p>Ends on: {challenge.endDate}</p>
                            </div>
                        ))}
                    </TabsContent>
                    <TabsContent value="past">
                        {mockChallenges.past.map(challenge => (
                            <div key={challenge.id} className="mb-4 p-4 border rounded">
                                <h3 className="font-bold">{challenge.title}</h3>
                                <p>Winner: 👑 {challenge.winner}</p>
                            </div>
                        ))}
                    </TabsContent>
                </Tabs>
                {isPermissionedWallet && (
                    <div className="mt-4 space-y-2">
                        <Button className="w-full">Create New Challenge</Button>
                        <Button className="w-full" variant="outline">Manage Challenges</Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ChallengesModal;
