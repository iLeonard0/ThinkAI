package com.thinkai.backend.controllers;

import com.thinkai.backend.domain.chat.ChatSession;
import com.thinkai.backend.repositories.ChatSessionRepository;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.messages.AssistantMessage;

import com.thinkai.backend.domain.chat.ChatMessage;
import com.thinkai.backend.dto.ThinkRequestDTO;
import com.thinkai.backend.dto.ThinkResponseDTO;
import com.thinkai.backend.repositories.ChatMessageRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class AssistantController {

    private final ChatClient chatClient;
    private final ChatMessageRepository messageRepository;
    private final ChatSessionRepository sessionRepository;

    private static final String PROMPT = """
            Você é o **Think AI**, um Arquiteto de Software Sênior e Mentor Técnico atuando como tutor Socrático.
            
            SUA MISSÃO:
            Não é ser uma enciclopédia. Seu objetivo é fazer o usuário PENSAR. 
            Se você der a resposta completa, você falhou.
            
            ---
            
            ### 🛡️ PROTOCOLO DE INTERAÇÃO (RIGOROSO)
            1.  **Regra Anti-Palestra:** Se o usuário fizer uma pergunta ampla (ex: "O que é DevOps?", "Como funciona o Java?"), **NÃO** responda com um texto longo ou uma definição de dicionário.
            2.  **Sondagem Inicial:** Em vez de explicar, devolva uma pergunta para medir o conhecimento atual do usuário ou use uma analogia curta para provocar o raciocínio.
            3.  **A Regra de Ouro:** Sob nenhuma circunstância forneça a solução final, código funcional completo ou a teoria inteira na primeira interação.
            4.  **Nivelamento:** Avalie o nível do usuário na primeira troca.
            
            ### 🧠 O CICLO DE FEEDBACK
            1.  **Analise:** O que o usuário quer saber?
            2.  **Questione:** Devolva uma pergunta que o force a conectar pontos.
            3.  **Valide:** Elogie o raciocínio correto, mas corrija rotas erradas com novas perguntas.
            
            ### 🎨 FORMATAÇÃO VISUAL (MARKDOWN OBRIGATÓRIO)
            Organize sua resposta visualmente seguindo ESTRITAMENTE esta hierarquia:
            
            - **Tópicos Principais:** Use `# 1. Nome do Tópico`, `# 2. Nome do Tópico`.
            - **Subtópicos:** Use `## Nome do Subtítulo`.
            - **Conceitos Chave:** Use **negrito**.
            - **Dicas Importantes:** Use Blockquotes (`> 💡 Dica: ...`) para pistas sutis.
            - **Estruturas:** Use blocos de código para pseudocódigo ou assinaturas.
            
            ### ⚡ TOM DE VOZ
            Curto, direto e instigante. Evite textos longos. Faça uma pergunta por vez.
            
            ---
            
            #### EXEMPLO DE FLUXO CORRETO ("O que é DevOps?"):
            
            Usuário: "O que é DevOps?"
            
            Think AI:
            # 1. Contexto Inicial
            DevOps é um termo que muita gente confunde apenas com ferramentas.
            
            > 💡 Dica: O nome vem da junção de "Development" (Desenvolvimento) e "Operations" (Operações).
            
            # 2. Reflexão
            Historicamente, esses dois times trabalhavam separados. Na sua visão, qual é o maior problema que acontece quando quem **cria** o código não fala com quem **cuida** do servidor?
            """;

    public AssistantController(ChatClient.Builder builder,
                               ChatMessageRepository messageRepository,
                               ChatSessionRepository sessionRepository) {
        this.messageRepository = messageRepository;
        this.sessionRepository = sessionRepository;
        this.chatClient = builder.build();
    }

    @PostMapping("/ask")
    public ThinkResponseDTO askExpert(@RequestBody ThinkRequestDTO request) {
        if (!sessionRepository.existsById(request.chatId())) {
            String tituloAutomatico = request.message().length() > 30 ? request.message().substring(0, 30) + "..." : request.message();
            ChatSession novaSessao = new ChatSession(request.chatId(), request.userId(), tituloAutomatico);
            sessionRepository.save(novaSessao);
        }

        messageRepository.save(new ChatMessage(request.chatId(), request.message(), "user"));
        List<ChatMessage> history = messageRepository.findByChatIdOrderByCreatedAtAsc(request.chatId());

        List<Message> promptMessages = new ArrayList<>();

        promptMessages.add(new SystemMessage(PROMPT));

        for (ChatMessage msg : history) {
            if ("user".equals(msg.getSender())) {
                promptMessages.add(new UserMessage(msg.getContent()));
            } else {
                promptMessages.add(new AssistantMessage(msg.getContent()));
            }
        }

        try {
            String aiResponseText = chatClient.prompt()
                    .messages(promptMessages)
                    .call()
                    .content();

            messageRepository.save(new ChatMessage(request.chatId(), aiResponseText, "assistant"));

            return new ThinkResponseDTO(aiResponseText);

        } catch (Exception e) {
            e.printStackTrace();
            return new ThinkResponseDTO("Ocorreu um erro na IA. Tente novamente.");
        }
    }

    @GetMapping("/my-chats")
    public List<ChatSession> getUserChats(@RequestParam String userId) {
        return sessionRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @GetMapping("/chat-history/{chatId}")
    public List<ChatMessage> getChatHistory(@PathVariable String chatId) {
        return messageRepository.findByChatIdOrderByCreatedAtAsc(chatId);
    }
}