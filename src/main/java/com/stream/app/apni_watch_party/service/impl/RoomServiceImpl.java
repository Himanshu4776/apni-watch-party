package com.stream.app.apni_watch_party.service.impl;

import com.stream.app.apni_watch_party.entities.Room;
import com.stream.app.apni_watch_party.entities.User;
import com.stream.app.apni_watch_party.repositories.RoomRepository;
import com.stream.app.apni_watch_party.repositories.UserRepository;
import com.stream.app.apni_watch_party.service.RoomService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;
    @Value("${app.base-url}")
    private String baseUrl;

    public String generateJoinLink(String groupId) {
        return baseUrl+ "/room/join/" + groupId;
    }

    public Room addUserToGroup(String roomId, Long userId) {
        Room group = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        group.getUsers().add(user);
        return roomRepository.save(group);
    }
    
    public Room createRoom(Long userId, Room roomToMake) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            String title = roomToMake.getTitle().toString();
            roomToMake.setTitle(title);
            roomToMake.getUsers().add(user.get());

            return roomRepository.save(roomToMake);
        }
        return null;
    }

    @Override
    public Room getRoomById(String roomId) {
        Optional<Room> room = roomRepository.findById(roomId);
        return room.orElse(null);
    }
}
