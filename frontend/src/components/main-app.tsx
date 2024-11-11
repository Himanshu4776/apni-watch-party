import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Play, Upload } from 'lucide-react';
import { VideoPlayer } from './video-player';

interface Video {
  id: string;
  title: string;
  url: string;
}

interface MainAppProps {
  videos: Video[];
  videoTitle: string;
  setVideoTitle: (title: string) => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: (e: React.FormEvent) => void;
  uploadStatus: string;
}

export default function MainApp({
  videos,
  videoTitle,
  setVideoTitle,
  handleFileSelect,
  handleUpload,
  uploadStatus,
}: MainAppProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const simulateUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    }

    handleUpload(e);
    setIsUploading(false);
  };

  return (
    <div className="p-4">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Video Dashboard</CardTitle>
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
                      <img
                        src={video.url}
                        alt={video.title}
                        className="w-full aspect-video object-cover rounded-md mb-2"
                      />
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
                  <form onSubmit={simulateUpload} className="space-y-4">
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
                    <Button type="submit" disabled={isUploading || !videoTitle}>
                      {isUploading ? 'Uploading...' : 'Upload Video'}
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
