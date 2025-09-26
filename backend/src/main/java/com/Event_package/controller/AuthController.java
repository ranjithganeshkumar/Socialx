package com.Event_package.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Event_package.service.*;
import com.Event_package.dto.*;
import com.Event_package.entity.*;
import org.springframework.http.HttpStatus;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://ec2-54-234-170-131.compute-1.amazonaws.com:5173")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) { 
        this.service = service; 
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Optional<User> user = service.login(request.getEmail(), request.getPassword());
            
            if (user.isPresent()) {
                return ResponseEntity.ok(new UserResponse(user.get()));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Login failed: " + e.getMessage()));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            // Validate required fields
            if (request.getFullName() == null || request.getFullName().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Full name is required"));
            }
            if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Username is required"));
            }
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is required"));
            }
            if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Password is required"));
            }

            // Check if user already exists
            if (service.userExists(request.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "User with this email already exists"));
            }

            User user = new User();
            user.setFullName(request.getFullName());
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());
            user.setFollowers(0);
            user.setFollowing(0);

            User saved = service.signup(user);
            return ResponseEntity.ok(new UserResponse(saved));
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Signup failed: " + e.getMessage()));
        }
    }
}