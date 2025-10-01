package com.thinkai.backend.infra.security;

import com.thinkai.backend.domain.user.User;
import com.thinkai.backend.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found."));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }
}
