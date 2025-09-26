package com.Event_package.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.Event_package.service.*;
import com.Event_package.entity.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://ec2-54-234-170-131.compute-1.amazonaws.com:5173")
public class ProfileController {

    private final UserService service;

    public ProfileController(UserService service) { this.service = service; }

    @PostMapping("/{id}/edit")
    public ResponseEntity<?> editProfile(
            @PathVariable Long id,
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String bio,
            @RequestParam(required = false) MultipartFile profilePicture
    ) throws IOException {
        User updated = service.updateProfile(id, fullName, bio, profilePicture);
        return ResponseEntity.ok(updated);
    }
}
