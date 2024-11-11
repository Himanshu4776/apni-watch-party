package com.stream.app.apni_watch_party.service.impl;

import com.stream.app.apni_watch_party.entities.Video;
import com.stream.app.apni_watch_party.repositories.VideoRepository;
import com.stream.app.apni_watch_party.service.VideoService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class VideoServiceImpl implements VideoService {

    @Value("${files.video}")
    String DIR;

    @Autowired
    VideoRepository videoRepository;

    @PostConstruct
    public void init() {
        File file = new File(DIR);
        if (!file.exists()) {
            file.mkdir();
            System.out.println("folder created");
        }
        System.out.println("folder exists");
    }

    @Override
    public Video save(Video video, MultipartFile file) {
        try {
            // original file name extraction
            String filename = file.getOriginalFilename();
            String contentType = file.getContentType();
            InputStream inputStream = file.getInputStream();
            // folder path created in init methods
            // folder path with filename
            assert filename != null;
            String cleanedFileName = StringUtils.cleanPath(filename);
            String cleanedPath = StringUtils.cleanPath(DIR);

            Path path = Paths.get(cleanedPath, cleanedFileName);
            // copy file to the folder
            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
            // video meta data
            video.setContentType(contentType);
            video.setPath(path.toString());
            // metadata save
            return videoRepository.save(video);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error in processing video ");
        }
    }

    @Override
    public Video getByTitle(String title) {
        return null;
    }

    @Override
    public Video get(String videoId) {
        Video video = videoRepository.findById(videoId).orElseThrow(() -> new RuntimeException("Video not found!!"));
        return video;
    }

    @Override
    public List<Video> getAll() {
        return videoRepository.findAll();
    }
}
