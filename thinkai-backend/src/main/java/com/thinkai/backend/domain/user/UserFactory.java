package com.thinkai.backend.domain.user;

import com.thinkai.backend.dto.RegisterRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserFactory {
    // Padrão Factory Method (Criacional) - Encapsula a lógica de criação de usuários
    private final PasswordEncoder passwordEncoder;

    public User createFromDTO(RegisterRequestDTO dto) {

        String encodedPassword = passwordEncoder.encode(dto.password());

        // Padrão Builder (Criacional)
        return User.builder()
                .name(dto.name())
                .email(dto.email())
                .password(encodedPassword)
                .build();
    }
}