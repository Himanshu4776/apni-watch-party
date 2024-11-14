import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Video,
  Upload,
  Users,
  Monitor,
  Play,
  Heart,
  MessageSquare,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'register') => void;
  isLoggedIn: boolean;
}

export function LandingPage({
  setShowAuthModal,
  setAuthMode,
  isLoggedIn
}: LandingPageProps) {
  const features = [
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: 'High Quality Streaming',
      description:
        'Watch videos in crystal clear HD quality with smooth playback',
    },
    {
      icon: <Upload className="h-8 w-8 text-primary" />,
      title: 'Easy Upload',
      description: 'Share your content with the world in just a few clicks',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Community',
      description: 'Connect with creators and viewers who share your interests',
    },
    {
      icon: <Monitor className="h-8 w-8 text-primary" />,
      title: 'Multi-platform',
      description: 'Access your content from any device, anywhere',
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Share Your Story With The World
              </h1>
              <p className="text-lg sm:text-xl opacity-90">
                Upload, stream, and share your videos with our growing community
              </p>
              <div className="space-x-4">
                <Button
                  size="lg"
                  onClick={() => {
                    if (isLoggedIn) {
                      console.log(isLoggedIn);
                      navigate('/dashboard');
                    } else {
                      setAuthMode('register');
                      setShowAuthModal(true);
                    }
                  }}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setAuthMode('login');
                    setShowAuthModal(true);
                  }}
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  Login
                </Button>
              </div>
            </div>
            <div className="flex-1 mt-8 md:mt-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3084967.jpg-npxQO1OZ94BveWlKm3GuwHWhFZ33OA.jpeg"
                // src="https://drive.google.com/file/d/1I-PHimELMDzX2EjBneqW3sTox4PHv1PK/view"
                alt="Platform Preview"
                className="rounded-lg shadow-xl w-full h-auto max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Platform Preview Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Experience Our Platform
          </h2>
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
              <TabsTrigger value="browse">Browse Content</TabsTrigger>
              <TabsTrigger value="upload">Upload Videos</TabsTrigger>
              <TabsTrigger value="interact">
                Interact with Community
              </TabsTrigger>
            </TabsList>
            <TabsContent value="browse" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src="/api/placeholder/1280/720"
                      alt="Video browsing interface"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Discover Amazing Content
                  </h3>
                  <p className="text-gray-600">
                    Browse through a vast library of videos, curated playlists,
                    and trending content. Our intuitive interface makes it easy
                    to find what you're looking for.
                  </p>
                  <div className="mt-4 flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Play className="mr-2 h-4 w-4" /> Watch Now
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heart className="mr-2 h-4 w-4" /> Add to Favorites
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="upload" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src="/api/placeholder/1280/720"
                      alt="Video upload interface"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Share Your Creations
                  </h3>
                  <p className="text-gray-600">
                    Uploading your videos is a breeze with our user-friendly
                    interface. Add titles, descriptions, and tags to help your
                    content reach the right audience.
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" /> Start Uploading
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="interact" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src="/api/placeholder/1280/720"
                      alt="Community interaction interface"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Engage with the Community
                  </h3>
                  <p className="text-gray-600">
                    Connect with other creators and viewers. Leave comments,
                    join discussions, and build your following. Our platform
                    fosters a vibrant community of video enthusiasts.
                  </p>
                  <div className="mt-4 flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" /> Join
                      Discussions
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Users className="mr-2 h-4 w-4" /> Find Creators
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500K+</div>
              <div className="text-gray-400">Videos Uploaded</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50M+</div>
              <div className="text-gray-400">Monthly Views</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
