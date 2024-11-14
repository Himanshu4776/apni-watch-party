package com.stream.app.apni_watch_party.controllers;

import com.stream.app.apni_watch_party.exception.ResourceNotFoundException;
import com.stream.app.apni_watch_party.utils.Constants;
import com.stream.app.apni_watch_party.entities.Room;
import com.stream.app.apni_watch_party.entities.Video;
import com.stream.app.apni_watch_party.payload.CustomMessage;
import com.stream.app.apni_watch_party.service.RoomService;
import com.stream.app.apni_watch_party.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/video")
@CrossOrigin(origins = "http://127.0.0.1:5173/")
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
        List<Video> videos = videoService.getAllVideosInRoom(roomId);
        if (videos != null) {
            return ResponseEntity.ok(videos);
        }
        throw  new ResourceNotFoundException("No video found in this room");
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

    @GetMapping("/stream/range/{roomId}/{videoId}")
    public ResponseEntity<Resource> streamVideoInRange(@PathVariable String videoId,
                                                       @PathVariable String roomId,
                                                       @RequestHeader(value = "range", required = false) String range) {
        Room room = roomService.getRoomById(roomId);
        Video matchedVideo = room.getVideos().stream()
            .filter(video -> video.getVideoId().equals(videoId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Video not found in room"));

        Path path = Paths.get(matchedVideo.getPath());
        FileSystemResource resource = new FileSystemResource((path));
        String contentType = matchedVideo.getContentType();
        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        long fileLength = path.toFile().length();
        // if there's no range passes then process whole file.
        if (range == null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        }
        Long rangeStart;
        Long rangeEnd;

        String[] ranges = range.replace("bytes=", "").split("-");
        rangeStart = Long.parseLong(ranges[0]);
        rangeEnd = rangeStart + Constants.CHUNK_SIZE - 1;
        InputStream inputStream;

        if (rangeEnd >= fileLength) {
            rangeEnd = fileLength-1;
        }

        try {
            inputStream = Files.newInputStream(path);
            inputStream.skip(rangeStart);
            long contentLength = rangeEnd - rangeStart + 1;

            // now we will not send the whole content length instead we are sending chunks of data (1MB).
            byte[] data = new byte[(int) contentLength];
            int read = inputStream.read(data, 0, data.length);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Range", "bytes " + rangeStart + "-" + rangeEnd + "/" + fileLength);
            headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
            headers.add("Pragma", "no-cache");
            headers.add("Expires", "0");
            headers.add("X-Content-Type-Options", "nosniff");
            headers.setContentLength(contentLength);

            return ResponseEntity
                    .status(HttpStatus.PARTIAL_CONTENT)
                    .headers(headers)
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(new ByteArrayResource(data));
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}












