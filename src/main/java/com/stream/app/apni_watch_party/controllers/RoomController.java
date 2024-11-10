package com.stream.app.apni_watch_party.controllers;

import com.stream.app.apni_watch_party.entities.Room;
import com.stream.app.apni_watch_party.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

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
    
    @PostMapping("/make/{userId}")
    public ResponseEntity<Room> makeRoom(@PathVariable Long userId, @RequestBody Room room) {
        Room roomCreated = roomService.createRoom(userId, room);
        if (roomCreated != null) {
            return ResponseEntity.ok(roomCreated);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
