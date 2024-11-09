package com.stream.app.apni_watch_party.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "wp_videos")
@Builder
@Entity
public class Video {
    @Id
    private String videoId;
    private String title;
    private String contentType;
    private String description;
    private String path;
    @ManyToOne
    private Room room;
}
