import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AboutModal = ({ isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>About RSM Blockchain Badges</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="overview" className="mt-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="guides">User Guides</TabsTrigger>
                        <TabsTrigger value="faq">FAQ</TabsTrigger>
                    </TabsList>
                    <div className="h-[500px] overflow-y-auto mt-4">
                        <TabsContent value="overview">
                            <h3 className="text-lg font-semibold mb-2">What is RSM Blockchain Badges?</h3>
                            <p className="mb-4">
                                "RSM Blockchain Badges" is an educational platform designed to demonstrate a blockchain-powered credentialing system. Our purpose is to recognize and incentivize valuable behaviors through a dynamic badge system, leveraging blockchain's strengths in security, transparency, and flexibility.
                            </p>
                            <h3 className="text-lg font-semibold mb-2">How It Works</h3>
                            <p className="mb-4">
                                The system is designed to emulate the receipt of physical badges that can be earned, collected, and traded. Members can earn badges by participating in various activities, completing challenges, and contributing to the community. These digital badges serve as secure, transparent, and tradable assets on Coinbase's Base blockchain.
                            </p>
                            <h3 className="text-lg font-semibold mb-2">Objective</h3>
                            <p className="mb-4">
                                Our objective is to implement a blockchain-powered credentialing system that recognizes and rewards members for their contributions, participation, and achievements. The system allows for the trading and burning of badges as digital assets, adding an innovative layer to the community's engagement tools.
                            </p>
                            <div className="mt-8 border-t pt-4">
                                <h3 className="text-lg font-semibold mb-2">About the Designer</h3>
                                <div className="flex items-center">
                                    <img src="https://i.imgur.com/Lbx2zEg.png" alt="Elijah Wilbanks" className="w-24 h-24 rounded-full mr-4" />
                                    <div>
                                        <p className="font-semibold">Elijah Wilbanks</p>
                                        <p>Designer of RSM Blockchain Badges</p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="guides">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="earn-badges">
                                    <AccordionTrigger>How to Earn Badges</AccordionTrigger>
                                    <AccordionContent>
                                        <ol className="list-decimal list-inside">
                                            <li>Participate in activities (e.g., Brunch and Learn sessions, Office Hours)</li>
                                            <li>Meet badge criteria (detailed in badge descriptions)</li>
                                            <li>Proof of Work must be submitted to the Elijah Wilbanks or Zach Minich for verification and issuance of the badge</li>
                                        </ol>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="trade-redeem">
                                    <AccordionTrigger>How to Trade and Redeem Badges</AccordionTrigger>
                                    <AccordionContent>
                                        <h4 className="font-semibold">Trading Badges:</h4>
                                        <ol className="list-decimal list-inside mb-2">
                                            <li>Navigate to the "Badge Marketplace"</li>
                                            <li>Select a badge to trade or browse available badges</li>
                                            <li>Agree on a trade with another user</li>
                                        </ol>
                                        <h4 className="font-semibold">Redeeming Badges:</h4>
                                        <ol className="list-decimal list-inside">
                                            <li>Go to the "Redeem Badges" section</li>
                                            <li>Select a badge to redeem and choose a reward</li>
                                            <li>Confirm redemption (badge will be burned)</li>
                                        </ol>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </TabsContent>
                        <TabsContent value="faq">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="what-is">
                                    <AccordionTrigger>What is the Blockchain-Powered Credentialing System?</AccordionTrigger>
                                    <AccordionContent>
                                        It's a new initiative within the RSM Blockchain Community that recognizes and rewards members for their contributions, participation, and achievements. Badges are issued on the blockchain, making them secure, transparent, and tradable digital assets.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="earn-badges">
                                    <AccordionTrigger>How Do I Earn Badges?</AccordionTrigger>
                                    <AccordionContent>
                                        Badges are earned by participating in activities within the community, such as attending events, contributing content, or completing projects. Each badge has specific criteria that must be met. Once these criteria are fulfilled, the badge is automatically issued to your profile.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="redeem-badges">
                                    <AccordionTrigger>How Do I Redeem My Badges for Rewards?</AccordionTrigger>
                                    <AccordionContent>
                                        Navigate to the "Redeem Badges" section, select the badge you wish to redeem, choose your reward, and confirm the redemption. The badge will be burned, and proof of transaction will be sent to Elijah or Zach to issue the reward.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="lost-key">
                                    <AccordionTrigger>What Happens If I Lose My Private Key?</AccordionTrigger>
                                    <AccordionContent>
                                        Losing your private key may result in the loss of access to your badges. In certain cases, badges can be reissued after verification. Please contact Elijah Wilbanks if you believe you've lost access to your account.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="challenges">
                                    <AccordionTrigger>How Can I Participate in Challenges?</AccordionTrigger>
                                    <AccordionContent>
                                        Challenges are periodically announced on the platform and through community channels. Participation typically involves completing a series of tasks or achieving certain milestones. Successfully completing a challenge will earn you a special badge, often with additional rewards.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default AboutModal;