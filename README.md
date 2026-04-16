GSU SmartAssist – Intelligent University Chatbot

A.	Overview
GSU SmartAssist is an intelligent university chatbot system developed for Gwanda State University (GSU). It assists students, staff, and prospective applicants with institutional information 
including admissions, programmes, fees, academic calendar, library services, ICT support, and general enquiries.

The system combines:
- A Spring Boot REST API backend
- A secure Keycloak identity management system
- A MySQL knowledge base
- A PostgreSQL database for Keycloak
- A local AI model (Ollama + Llama3) for contextual responses
- A modern Angular frontend chat interface
- Docker-based deployment for portability and scalability

=============================================================================

B.	System Architecture
🔹 High-Level Architecture
[ Angular Frontend ]
        |
        v
[ Spring Boot API Gateway ]
        |
        |----> Knowledge Base (MySQL)
        |
        |----> Chat Logs (MySQL)
        |
        |----> Keycloak Authentication Server (PostgreSQL)
        |
        |----> Ollama (Llama3 AI Model Server)
		
=============================================================================		
		
		
C.	Technology Stack
Backend
- Java 21
- Spring Boot (REST API)
- Spring Security (Keycloak integration)
- Hibernate / JPA
- Maven

Databases
- MySQL (Application data: FAQs, chats, users)
- PostgreSQL (Keycloak identity management)

Authentication
- Keycloak (OAuth2 / OpenID Connect)
- JWT-based token validation

AI Integration
- Ollama local runtime
- LLaMA 3 model for contextual chatbot responses

Frontend
- Angular
- Angular Material UI
- RxJS for reactive API handling

DevOps / Deployment
- Docker & Docker Compose
- Nginx (optional reverse proxy)		

=============================================================================

D.	Features
1. Student Features
- Chat with university AI assistant
- Ask questions about admissions, fees, courses
- View FAQs instantly
- Real-time AI responses (LLaMA 3)

2. Admin Features
- Secure login via Keycloak
- Manage FAQ knowledge base (CRUD)
- View chat logs
- Monitor system usage

=============================================================================

E.	Security Implementation
- Keycloak authentication (OAuth2 / OpenID Connect)
- JWT token validation on all secured endpoints
- Role-based access control (Admin / User)
- Input validation & sanitization
- Rate limiting on /api/chat
- Secure storage of secrets via environment variables

=============================================================================

F.	Database Design
MySQL Tables
- Users (optional app users): id, name, email, password, role
- KnowledgeBase: id, category, question, answer, keywords
- Chats: id, message, response, timestamp

=============================================================================

G.	API Endpoints
1. Authentication (via Keycloak)
Handled externally via Keycloak server.

2. Chat API
POST /api/chat

3. FAQ APIs
GET /api/faqs
Retrieve all FAQs
POST /api/admin/faqs
Create FAQ
PUT /api/admin/faqs/{id}
Update FAQ
DELETE /api/admin/faqs/{id}
Delete FAQ
4. Chat Logs
GET /api/admin/chat-logs
Returns all chat history (admin only)

=============================================================================

H.	AI Integration (Ollama + LLaMA 3)
The chatbot uses a hybrid approach:
1. First checks Knowledge Base (MySQL)
2. If no match is found:
3. Sends query to Ollama LLaMA 3 model
4. Returns contextual response to user

=============================================================================

I.	Frontend (Angular)
Features
- Real-time chat interface
- Message bubbles (user vs bot)
- FAQ page
- Admin dashboard
- Login via Keycloak
- Responsive UI (mobile + desktop)


=============================================================================


⚙️ Setup & Deployment Instructions
🧩 Prerequisites
Before deployment, ensure the server has:
- Docker installed
- Docker Compose installed
- Internet access for pulling images

📦 Step 1: Prepare Deployment Files
Copy the following files to one folder in the server:
- docker-compose.yml
- init.sql
- realm-export.json

📦 Step 2: Deploy application
In CMD, navigate to the folder with the files, start docker and run these commands:
- docker compose pull
- docker compose up -d
- docker exec -it ollama-container ollama pull llama3

📦 Step 3: Keycloak setup
- Open: http://localhost:8080
- Login:
	username: kaseke
	password: 1
- Create users + assign roles (admin, user)

📦 Step 4: Access system
- Frontend: http://localhost:80
- Backend: http://localhost:8081
- Keycloak: http://localhost:8080
- Ollama: http://localhost:11434
