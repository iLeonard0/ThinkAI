package com.thinkai.backend.controllers;

import com.thinkai.backend.domain.user.User;
import com.thinkai.backend.dto.LoginRequestDTO;
import com.thinkai.backend.dto.RegisterRequestDTO;
import com.thinkai.backend.dto.ResponseDTO;
import com.thinkai.backend.infra.security.TokenService;
import com.thinkai.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        User user = this.userRepository.findUserByEmail(body.email()).orElseThrow(() -> new RuntimeException("User not found."));

        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getName(), token));
        }

        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {
        Optional<User> user = this.userRepository.findUserByEmail(body.email());

        if (user.isEmpty()) {
            User newUser = new User();

            newUser.setName(body.name());
            newUser.setEmail(body.email());;
            newUser.setPassword(passwordEncoder.encode(body.password()));
            this.userRepository.save(newUser);

            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token));
        }

        return ResponseEntity.badRequest().build();
    }
}
