import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddress } from "@thirdweb-dev/react";

const CreateChallengeModal = ({ isOpen, onClose }) => {
  const [challengeName, setChallengeName] = useState('');
  const [challengeDescription, setChallengeDescription] = useState('');
  const [badgeName, setBadgeName] = useState('');
  const address = useAddress();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement challenge creation logic here
    console.log('Creating new challenge:', { challengeName, challengeDescription, badgeName });
    onClose();
  };

  const hasPrivileges = true; // Replace with actual privilege check logic

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Challenge</DialogTitle>
        </DialogHeader>
        {address ? (
          hasPrivileges ? (
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Challenge Name"
                value={challengeName}
                onChange={(e) => setChallengeName(e.target.value)}
                className="mb-4"
                required
              />
              <Textarea
                placeholder="Challenge Description"
                value={challengeDescription}
                onChange={(e) => setChallengeDescription(e.target.value)}
                className="mb-4"
                required
              />
              <Input
                type="text"
                placeholder="Badge Name for Completion"
                value={badgeName}
                onChange={(e) => setBadgeName(e.target.value)}
                className="mb-4"
                required
              />
              <Button type="submit" className="w-full">Create Challenge</Button>
            </form>
          ) : (
            <p>You do not have the necessary privileges to create challenges.</p>
          )
        ) : (
          <p>Please connect your wallet to create challenges.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateChallengeModal;