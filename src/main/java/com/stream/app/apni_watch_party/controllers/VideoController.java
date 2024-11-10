package com.stream.app.apni_watch_party.controllers;

import com.stream.app.apni_watch_party.entities.Room;
import com.stream.app.apni_watch_party.entities.Video;
import com.stream.app.apni_watch_party.payload.CustomMessage;
import com.stream.app.apni_watch_party.service.RoomService;
import com.stream.app.apni_watch_party.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/video")
public class VideoController {
    @Autowired
    VideoService videoService;
    @Autowired
    RoomService roomService;

    @PostMapping("/upload/{roomId}")
    public ResponseEntity<?> addVideo(@RequestParam("file") MultipartFile file,
                                          @RequestParam("title") String title,
                                          @RequestParam("description") String description,
                                      @PathVariable String roomId) {
        Room roomFound = roomService.getRoomById(roomId);
        if (roomFound != null) {
            Video video = new Video();
            video.setTitle(title);
            video.setDescription(description);
            video.setVideoId(UUID.randomUUID().toString());
            video.setRoom(roomFound);

            Video savedVideo = videoService.save(video, file);
            if (savedVideo != null) {
                return ResponseEntity.status(HttpStatus.OK).body(video);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CustomMessage.builder().message("Video not uploaded ").success(false).build());
            }
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(CustomMessage.builder().message("Room Not found!!!").success(false).build());
    }

    @GetMapping("/stream/{roomId}")
    public ResponseEntity<List<Video>> allVideos(@PathVariable String roomId) {
        List<Video> videos = videoService.getAll();
        return ResponseEntity.ok(videos);
    }

    @GetMapping("/stream/{roomId}/{videoId}")
    public ResponseEntity<Resource> stream(@PathVariable String videoId, @PathVariable String roomId) {
        Video video = videoService.get(videoId);
        String contentType = video.getContentType();
        String filePath = video.getPath();

        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        Resource resource = new FileSystemResource(filePath);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}
