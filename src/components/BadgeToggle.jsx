import React from 'react';
import { Button } from "@/components/ui/button";

const BadgeToggle = ({ filter, setFilter }) => {
    return (
        <div className="flex justify-start mb-6">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-1 inline-flex shadow-md">
                <Button
                    variant={filter === 'earned' ? 'default' : 'ghost'}
                    onClick={() => setFilter('earned')}
                    className={`px-4 py-2 text-sm font-bold ${filter === 'earned'
                            ? 'bg-[#0393d4] dark:bg-[#026b9e] text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-300 hover:text-[#0393d4] dark:hover:text-[#026b9e]'
                        }`}
                >
                    Earned
                </Button>
                <Button
                    variant={filter === 'collected' ? 'default' : 'ghost'}
                    onClick={() => setFilter('collected')}
                    className={`px-4 py-2 text-sm ${filter === 'collected'
                            ? 'bg-[#3f9c35] dark:bg-[#2d7026] text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-300 hover:text-[#3f9c35] dark:hover:text-[#2d7026]'
                        }`}
                >
                    Collected
                </Button>
            </div>
        </div>
    );
};

export default BadgeToggle;
