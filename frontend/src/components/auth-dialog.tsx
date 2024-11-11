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
import { User, UserPlus } from 'lucide-react';

interface AuthDialogProps {
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  handleAuth: (e: React.FormEvent) => void;
  authDataRef: React.MutableRefObject<{
    email: string;
    password: string;
    name: string;
  }>;
}

export function AuthDialog({
  showAuthModal,
  setShowAuthModal,
  authMode,
  setAuthMode,
  handleAuth,
  authDataRef,
}: AuthDialogProps) {
  return (
    <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {authMode === 'login' ? (
              <>
                <User className="h-5 w-5" />
                Login to Apni Watch Party
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5" />
                Register for Apni Watch Party
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAuth} className="space-y-4">
          {authMode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                onChange={(e) => (authDataRef.current.name = e.target.value)}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => (authDataRef.current.email = e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => (authDataRef.current.password = e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            {authMode === 'login' ? 'Login' : 'Register'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          {authMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <Button variant="link" onClick={() => setAuthMode('register')}>
                Register
              </Button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Button variant="link" onClick={() => setAuthMode('login')}>
                Login
              </Button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
