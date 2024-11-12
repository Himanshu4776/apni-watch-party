package com.stream.app.apni_watch_party.controllers;

import com.stream.app.apni_watch_party.entities.Room;
import com.stream.app.apni_watch_party.entities.User;
import com.stream.app.apni_watch_party.service.RoomService;
import com.stream.app.apni_watch_party.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/room")
@CrossOrigin(origins = "http://127.0.0.1:5173/")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private UserService userService;

    @PostMapping("/join/{roomId}/{userId}")
    public ResponseEntity<Room> joinRoom(@PathVariable String roomId, @PathVariable Long userId) {
        Room updatedGroup = roomService.addUserToGroup(roomId, userId);
        return ResponseEntity.ok(updatedGroup);
    }

    @GetMapping("/generate/{roomId}")
    public ResponseEntity<String> generateJoinLink(@PathVariable String roomId) {
        String joinLink = roomService.generateJoinLink(roomId);
        return ResponseEntity.ok(joinLink);
    }
    
    @PostMapping("/make/{username}")
    public ResponseEntity<Room> makeRoom(@PathVariable String username, @RequestBody Room room) {
        Room roomCreated = roomService.createRoom(username, room);
        if (roomCreated != null) {
            return ResponseEntity.ok(roomCreated);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<Room>> getAllRoomsFromUser(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        if (user != null) {
            List<Room> rooms = user.getRooms().stream().toList();
            return ResponseEntity.ok(rooms);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
