package com.thinkai.backend.services;

import com.thinkai.backend.domain.user.User;
import com.thinkai.backend.domain.user.UserFactory;
import com.thinkai.backend.dto.LoginRequestDTO;
import com.thinkai.backend.dto.RegisterRequestDTO;
import com.thinkai.backend.dto.ResponseDTO;
import com.thinkai.backend.infra.security.TokenService;
import com.thinkai.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final UserFactory userFactory;

    public ResponseDTO login(LoginRequestDTO body) {
        User user = this.userRepository.findUserByEmail(body.email()).orElseThrow(() -> new RuntimeException("Usuário ou senha inválidos."));

        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return new ResponseDTO(user.getName(), token);
        }

        throw new RuntimeException("Usuário ou senha inválidos.");
    }

    public ResponseDTO register(RegisterRequestDTO body) {
        Optional<User> user = this.userRepository.findUserByEmail(body.email());

        if (user.isPresent()) {
            throw new RuntimeException("Este e-mail já está em uso.");
        }

        User newUser = userFactory.createFromDTO(body);

        this.userRepository.save(newUser);

        String token = this.tokenService.generateToken(newUser);
        return new ResponseDTO(newUser.getName(), token);
    }
}