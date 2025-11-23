package com.thinkai.backend.repositories;

import com.thinkai.backend.domain.chat.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
    List<ChatMessage> findByChatIdOrderByCreatedAtAsc(String chatId);
}