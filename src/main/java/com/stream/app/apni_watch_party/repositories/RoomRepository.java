package com.stream.app.apni_watch_party.repositories;

import com.stream.app.apni_watch_party.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
}
