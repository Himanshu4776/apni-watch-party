package com.stream.app.apni_watch_party.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "wp_rooms")
@Builder
@Entity
public class Room {
    @Id
    private String id;
    private String title;
    @OneToMany(mappedBy = "room")
    private List<Video> videos = new ArrayList<>();
}