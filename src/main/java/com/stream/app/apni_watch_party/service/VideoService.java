package com.stream.app.apni_watch_party.service;

import com.stream.app.apni_watch_party.entities.Video;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoService {
    Video save(Video video, MultipartFile file);

    Video getByTitle(String title);

    Video get(String VideoId);

    List<Video> getAll();

    List<Video> getAllVideosInRoom(String roomId);
}
