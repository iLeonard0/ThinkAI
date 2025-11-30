# 📘 Projeto: IA Reflexiva — Pergunte, Pense, Resolva

Um aplicativo onde o usuário conversa com uma IA que **não entrega a resposta de imediato**, mas sim conduz o usuário a **raciocinar, refletir e chegar à solução**.  
Desenvolvido com **React + JavaScript**, **Material UI**, **Spring Boot**, e **PostgreSQL (PgAdmin)**.

---

# 📘 Sobre o Projeto

Este aplicativo permite que um usuário converse com uma inteligência artificial voltada para **educação, reflexão e resolução de problemas**.

✔️ A IA **não dá respostas prontas**  
✔️ Ela conduz com **perguntas guiadas**  
✔️ Estimula o usuário a **pensar e chegar à conclusão sozinho**

O sistema possui autenticação, gerenciamento de chats, histórico de conversas e integração completa entre **React**, **Spring Boot** e **PostgreSQL**.

---

# 🚀 Tecnologias Utilizadas

### **Front-end**
- React
- JavaScript (ES6+)
- Material UI (MUI)
- Axios
- React Router DOM

### **Back-end**
- Java 17+
- Spring Boot
  - Spring Web
  - Spring Security (JWT)
  - Spring Data JPA
- API de IA (OpenAI / Groq / Outra)

### **Banco de Dados**
- PostgreSQL
- PgAdmin 4

---

# 📐 Arquitetura Geral

[React + MUI] <──> [API Spring Boot] <──> [PostgreSQL]


Fluxo do sistema:

- O front-end envia mensagens.
- O back-end processa e envia para a IA.
- O banco armazena usuários, chats e mensagens.

---

# 📸 Telas do Sistema

### 🔐 Tela de Registro
- Cadastro de novo usuário com validação.

### 🔑 Tela de Login
- Autenticação via JWT.

### 💬 Tela da IA
- Enviar mensagens para a IA.
- Criar novos chats.
- Listar chats.
- Pesquisar chats existentes.

> **Inserir screenshots aqui (opcionais)**  
> `![Login](./screens/login.png)`  
> `![Chat](./screens/chat.png)`

---

# ⚙️ Funcionalidades

### Usuário
- Registrar usuário
- Logar com JWT
- Acesso autorizado às conversas

### Chat
- Criar novo chat
- Listar chats existentes
- Pesquisar por chats
- Salvar histórico

### IA Reflexiva
- Não entrega respostas diretas
- Guia por meio de perguntas
- Faz o usuário pensar para chegar à conclusão

# Imagens 

## Login Screen
<img width="2502" height="1312" alt="image" src="https://github.com/user-attachments/assets/3557f4f5-3c56-4228-8290-c9260e61ed1a" />

## Register Screen
<img width="2505" height="1312" alt="image" src="https://github.com/user-attachments/assets/369f1a06-e965-4737-bac7-304814b3ccc5" />

## Chat Screen
<img width="2506" height="1309" alt="image" src="https://github.com/user-attachments/assets/3899af03-a6d4-42e3-bfd2-4eabbf6f797c" />





