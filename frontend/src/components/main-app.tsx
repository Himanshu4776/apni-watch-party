import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Upload } from "lucide-react";
import { VideoPlayer } from "./video-player";
import { VideoThumbnail } from "./video-thumbnail";

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
}

interface ApiResponse {
  videoId: string;
  title: string;
  room: {
    id: string;
  };
}

export default function MainApp() {
  const { roomId } = useParams<{ roomId: string }>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    fetchVideos();
  }, [roomId]);

  const generateThumbnail = async (videoUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = videoUrl;
      
      video.addEventListener('loadeddata', () => {
        video.currentTime = 1; // Seek to 1 second
      });

      video.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL('image/jpeg');
        resolve(thumbnailUrl);
      });
    });
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get<ApiResponse[]>(`http://localhost:8080/video/stream/${roomId}`);
      
      const videosData: Video[] = await Promise.all(
        response.data.map(async (d) => {
          const videoUrl = `http://localhost:8080/video/stream/range/${roomId}/${d.videoId}`;
          const thumbnail = await generateThumbnail(videoUrl);
          return {
            id: d.videoId,
            title: d.title,
            url: videoUrl,
            thumbnail
          };
        })
      );
      
      setVideos(videosData);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !videoTitle) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", videoTitle);
    formData.append("description", videoTitle + "-" + roomId || "");

    try {
      await axios.post(
        `http://localhost:8080/video/upload/${roomId}`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          },
        }
      );

      setUploadStatus("Video uploaded successfully!");
      setVideoTitle("");
      setSelectedFile(null);
      fetchVideos(); // Refresh the video list
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploadStatus("Error uploading video. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <Button asChild variant="outline">
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Video Dashboard to Stream and Upload Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="videos">
            <TabsList>
              <TabsTrigger value="videos">
                <Play className="h-4 w-4 mr-2" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <Card key={video.id}>
                  <CardContent className="p-4">
                    <div className="relative aspect-video mb-2">
                      <img
                        src={video.thumbnail || '/placeholder-image.jpg'}
                        alt={video.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <h3 className="font-medium mb-2">{video.title}</h3>
                    <VideoPlayer videoUrl={video.url} title={video.title} />
                  </CardContent>
                </Card>
              ))}
              </div>
            </TabsContent>

            <TabsContent value="upload">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleUpload} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Video Title</Label>
                      <Input
                        id="title"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                        placeholder="Enter video title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="video">Video File</Label>
                      <Input
                        id="video"
                        type="file"
                        onChange={handleFileSelect}
                        accept="video/*"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isUploading || !videoTitle || !selectedFile}
                    >
                      {isUploading ? "Uploading..." : "Upload Video"}
                    </Button>
                  </form>
                  {isUploading && (
                    <div className="mt-4 space-y-2">
                      <Progress value={uploadProgress} className="w-full" />
                      <p className="text-sm text-gray-500 text-center">
                        Uploading: {uploadProgress}%
                      </p>
                    </div>
                  )}
                  {uploadStatus && (
                    <Alert className="mt-4">
                      <AlertDescription>{uploadStatus}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
