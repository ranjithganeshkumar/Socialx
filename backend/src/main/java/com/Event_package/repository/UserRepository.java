package com.Event_package.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Event_package.entity.*;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}
