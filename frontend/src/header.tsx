import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Video, User, Settings, LogOut, Menu, UserPlus } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'register') => void;
  handleLogout: () => void;
}

export default function Header({
  isLoggedIn,
  setShowAuthModal,
  setAuthMode,
  handleLogout,
}: HeaderProps) {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">
              Apni Watch Party
            </span>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-4">
                <Button variant="ghost">Browse</Button>
                <Button variant="ghost">Trending</Button>
                <Button variant="ghost">My Library</Button>
              </nav>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Browse</DropdownMenuItem>
                    <DropdownMenuItem>Trending</DropdownMenuItem>
                    <DropdownMenuItem>My Library</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setAuthMode('register');
                  setShowAuthModal(true);
                }}
                variant="outline"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
