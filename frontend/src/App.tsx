import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import {Header} from "./components/header";
import {Footer} from "./components/footer";
import {AuthDialog} from "./components/auth-dialog";
import {LandingPage} from "./components/landing-page";
import axios from "axios";
import VideoStreamingApp from "./components/video-streaming";
import { Room } from "./rooms/room";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const authDataRef = useRef({ email: "", password: "", name: "" });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authDataRef.current.email && authDataRef.current.password) {
      localStorage.setItem("email", JSON.stringify(authDataRef.current.email));
      // setIsLoggedIn(true);
      console.log("login", localStorage.getItem("email"));
      
      setShowAuthModal(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    console.log("logout", localStorage.getItem("email"));
    
    // setIsLoggedIn(false);
    authDataRef.current = { email: "", password: "", name: "" };
  };

  useEffect(() => {
    if(localStorage.getItem("email") != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [handleLogout, handleAuth])

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header
        isLoggedIn={isLoggedIn}
        setShowAuthModal={setShowAuthModal}
        setAuthMode={setAuthMode}
        handleLogout={handleLogout}
      />
      <main className="flex-1">
        {isLoggedIn ? (
          // <VideoStreamingApp />
          <Room />
        ) : (
          <LandingPage
            setShowAuthModal={setShowAuthModal}
            setAuthMode={setAuthMode}
          />
        )}
      </main>
      <Footer />
      <AuthDialog
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        authMode={authMode}
        setAuthMode={setAuthMode}
        handleAuth={handleAuth}
        authDataRef={authDataRef}
      />
    </div>
  );
}

export default App;
