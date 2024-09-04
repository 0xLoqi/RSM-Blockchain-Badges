import React from 'react';
import { Wallet } from 'lucide-react';
import { ConnectWallet } from "@thirdweb-dev/react";

const ConnectWalletPrompt = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0393d4] to-[#3f9c35] dark:from-[#026b9e] dark:to-[#2d7026] rounded-lg shadow-2xl text-white min-h-[400px]">
            <Wallet size={64} className="mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-4 text-center">Connect Your Wallet to View Your Badges</h2>
            <p className="text-xl mb-8 text-center max-w-md">
                Unlock your personalized badge collection and start your blockchain journey!
            </p>
            <ConnectWallet
                theme="dark"
                btnTitle="Connect Wallet"
                className="!bg-white !text-[#0393d4] hover:!bg-gray-100 !font-bold !py-3 !px-6 !rounded-full !text-lg !transition-all !duration-300 !ease-in-out !transform hover:!scale-105 dark:!text-[#026b9e]"
            />
        </div>
    );
};

export default ConnectWalletPrompt;