package com.thinkai.backend.controllers;

import com.thinkai.backend.dto.LoginRequestDTO;
import com.thinkai.backend.dto.RegisterRequestDTO;
import com.thinkai.backend.dto.ResponseDTO;
import com.thinkai.backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequestDTO body) {
        // Padrão facade
        ResponseDTO response = this.authService.login(body);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody RegisterRequestDTO body) {
        // Padrão facade
        ResponseDTO response = this.authService.register(body);
        return ResponseEntity.ok(response);
    }
}