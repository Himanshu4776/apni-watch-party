package com.stream.app.apni_watch_party.service;

import com.stream.app.apni_watch_party.entities.User;

import java.util.List;

public interface UserService {
    User createUser(User user);

    User getUserById(Long id);

    User getUserByUsername(String username);

    List<User> getAllUsers();

    User updateUser(Long id, User userDetails);

    void deleteUser(Long id);
}
