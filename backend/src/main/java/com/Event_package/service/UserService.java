package com.Event_package.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.Event_package.entity.*;
import com.Event_package.repository.*;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) { this.repo = repo; }

    public Optional<User> login(String email, String password) {
        return repo.findByEmail(email)
                   .filter(u -> u.getPassword().equals(password));
    }

    public User signup(User user) {
        return repo.save(user);
    }
   

    public User updateProfile(Long id, String fullName, String bio, MultipartFile profilePicture) throws IOException {
        User user = repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        if (fullName != null) user.setFullName(fullName);
        if (bio != null) user.setBio(bio);

        if (profilePicture != null && !profilePicture.isEmpty()) {
            String folder = "uploads/";
            new File(folder).mkdirs();
            String fileName = "profile_" + user.getId() + "_" + profilePicture.getOriginalFilename();
            File dest = new File(folder + fileName);
            profilePicture.transferTo(dest);
            user.setProfilePicture("/" + folder + fileName);
        }

        return repo.save(user);
    }

	public boolean userExists(String email) {
		return repo.findByEmail(email).isPresent();
	}


}
