package com.stream.app.apni_watch_party.service;

import com.stream.app.apni_watch_party.entities.Room;

public interface RoomService {
    Room addUserToGroup(String groupId, Long userId);

    String generateJoinLink(String groupId);

    Room createRoom(String username, Room roomToMake);

    Room getRoomById(String roomId);
}
