package com.thinkai.backend.domain.chat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "chat_session")
public class ChatSession {
    @Id
    private String id;

    @Column(nullable = false)
    private String userId;

    private String title;

    private LocalDateTime createdAt;

    public ChatSession() { }

    public ChatSession(String id, String userId, String title) {
        this.id = id;
        this.userId = userId;
        this.title = title;
    }
}

