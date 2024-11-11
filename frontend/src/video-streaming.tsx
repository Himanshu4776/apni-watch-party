import React, { useState, useRef, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import AuthDialog from './auth-dialog';
import LandingPage from './landing-page';
import MainApp from './main-app';
import axios from 'axios';

interface Video {
  id: string;
  title: string;
  url: string;
}

interface ApiResponse {
  videoId: string;
  title: string;
  room: {
    id: string;
  };
}

export default function VideoStreamingApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const authDataRef = useRef({ email: '', password: '', name: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [videos, setVideos] = useState<Video[]>([
    // { 
    //   id: '9f5bda45-0ef5-4b68-82ef-44d22865c647', 
    //   title: 'Sample Video 1', 
    //   url: 'http://localhost:8080/video/stream/9f5bda45-0ef5-4b68-82ef-44d22865c647/011967c3-c775-441a-9664-803c2e6c0574' 
    // },
    // { 
    //   id: '2', 
    //   title: 'Sample Video 2', 
    //   url: '/api/placeholder/640/360' 
    // },
  ]);

  useEffect(() => {
    axios.get<ApiResponse[]>('http://localhost:8080/video/stream/9f5bda45-0ef5-4b68-82ef-44d22865c647')
    // axios.get<ApiResponse[]>('http://10.0.2.2:8080/video/stream/9f5bda45-0ef5-4b68-82ef-44d22865c647')
      .then(response => {
        console.log("response", response.data);
        
        const videosData: Video[] = response.data.map(d => ({
          id: d.videoId,  // Now correctly using videoId instead of id
          title: d.title,
          url: `http://localhost:8080/video/stream/${d.room.id}/${d.videoId}`
        }));
        console.log("videosData", videosData);
        
        setVideos(videosData);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authDataRef.current.email && authDataRef.current.password) {
      setIsLoggedIn(true);
      setShowAuthModal(false);
      setUploadStatus('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    authDataRef.current = { email: '', password: '', name: '' };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile && videoTitle) {
      // setVideos([
      //   ...videos,
      //   {
      //     id: videos.length + 1,
      //     title: videoTitle,
      //     url: '/api/placeholder/640/360',
      //   },
      // ]);
      setUploadStatus('Video uploaded successfully!');
      setVideoTitle('');
      setSelectedFile(null);
    }
  };

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
          <MainApp
            videos={videos}
            videoTitle={videoTitle}
            setVideoTitle={setVideoTitle}
            handleFileSelect={handleFileSelect}
            handleUpload={handleUpload}
            uploadStatus={uploadStatus}
          />
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
