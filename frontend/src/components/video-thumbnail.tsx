import { useEffect, useRef } from 'react';

interface VideoThumbnailProps {
  videoUrl: string;
  onThumbnailGenerated?: (thumbnail: string) => void;
}

export function VideoThumbnail({ videoUrl, onThumbnailGenerated }: VideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      video.addEventListener('loadeddata', () => {
        video.currentTime = 1; // Seek to 1 second
      });

      video.addEventListener('seeked', () => {
        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL('image/jpeg');
          onThumbnailGenerated?.(thumbnailUrl);
        }
      });
    }
  }, [videoUrl]);

  return (
    <>
      <video 
        ref={videoRef} 
        src={videoUrl} 
        style={{ display: 'none' }}
        crossOrigin="anonymous"
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  );
}
