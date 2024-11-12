import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { LandingPage } from "./components/landing-page";
import MainApp from "./components/main-app";
import { AuthDialog } from "./components/auth-dialog";
import { Room } from "./rooms/room";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const authDataRef = useRef({ username: "", password: "", name: "" });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authDataRef.current.username && authDataRef.current.password) {
      localStorage.setItem("username", JSON.stringify(authDataRef.current.username));
      setIsLoggedIn(true);
      setShowAuthModal(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    console.log("logout", localStorage.getItem("username"));
    
    setIsLoggedIn(false);
    authDataRef.current = { username: "", password: "", name: "" };
  };

  useEffect(() => {
    if(localStorage.getItem("username") != null) {
      setIsLoggedIn(true);
    }
  }, [localStorage.getItem("username")])

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header
          isLoggedIn={isLoggedIn}
          setShowAuthModal={setShowAuthModal}
          setAuthMode={setAuthMode}
          handleLogout={handleLogout}
        />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LandingPage
                    setShowAuthModal={setShowAuthModal}
                    setAuthMode={setAuthMode}
                  />
                )
              }
            />
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Room /> : <Navigate to="/" />}
            />
          </Routes>
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
    </Router>
  );
}
