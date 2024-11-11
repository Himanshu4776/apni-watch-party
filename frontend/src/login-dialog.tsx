import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { User } from 'lucide-react';

interface LoginDialogProps {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  handleLogin: (e: React.FormEvent) => void;
  loginDataRef: React.MutableRefObject<{ email: string; password: string }>;
}

export default function LoginDialog({
  showLoginModal,
  setShowLoginModal,
  handleLogin,
  loginDataRef,
}: LoginDialogProps) {
  return (
    <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Login to Apni Watch Party
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => (loginDataRef.current.email = e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => (loginDataRef.current.password = e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
