import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, Pause, Rewind, FastForward, Maximize, Minimize } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seekVideo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Play className="h-4 w-4 mr-2" />
          Play
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div ref={containerRef} className="relative">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold p-4">{title}</h2>
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full"
                onClick={togglePlay}
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex justify-center items-center space-x-2">
                  <Button onClick={() => seekVideo(-10)} variant="ghost" size="sm" className="text-white">
                    <Rewind className="h-4 w-4" />
                  </Button>
                  <Button onClick={togglePlay} variant="ghost" size="sm" className="text-white">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button onClick={() => seekVideo(10)} variant="ghost" size="sm" className="text-white">
                    <FastForward className="h-4 w-4" />
                  </Button>
                  <Button onClick={toggleFullScreen} variant="ghost" size="sm" className="text-white">
                    {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}