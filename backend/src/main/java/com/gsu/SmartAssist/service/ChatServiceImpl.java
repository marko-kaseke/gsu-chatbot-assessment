package com.gsu.SmartAssist.service;
import com.gsu.SmartAssist.dto.ChatDto;
import com.gsu.SmartAssist.entity.Chat;
import com.gsu.SmartAssist.mapper.ChatMapper;
import com.gsu.SmartAssist.repository.ChatRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ai.ollama.OllamaChatModel;
import java.util.List;
import java.util.stream.Collectors;
import com.gsu.SmartAssist.dto.KnowledgeBaseDto;


@Service
//@AllArgsConstructor
public class ChatServiceImpl implements ChatService{
    private final ChatRepository chatRepository;
    private final OllamaChatModel chatModel; // Spring AI Ollama client
    private final KnowledgeBaseService knowledgeBaseService;
	
	public ChatServiceImpl(
            ChatRepository chatRepository,
            OllamaChatModel chatModel,
            KnowledgeBaseService knowledgeBaseService
    ) {
        this.chatRepository = chatRepository;
        this.chatModel = chatModel;
        this.knowledgeBaseService = knowledgeBaseService;
    }
	
	
	@Override
	@Transactional
	public ChatDto createChat(ChatDto dto) {
		//Fetch all knowledge base entries
		List<KnowledgeBaseDto> knowledgeBases = knowledgeBaseService.getAllKnowledgeBases();

		//Build AI prompt
		StringBuilder prompt = new StringBuilder();
		prompt.append("User Question: ").append(dto.getMessage()).append("\n\n");

		if (!knowledgeBases.isEmpty()) {
			prompt.append("Knowledge Base:\n");
			int index = 1;
			for (KnowledgeBaseDto kb : knowledgeBases) {
				prompt.append(index++)
					.append(". Q: ").append(kb.getQuestion()).append("\n")
					.append("   A: ").append(kb.getAnswer()).append("\n");
			}
			//prompt.append("\nPlease provide a concise and helpful answer using the knowledge base.");
			prompt.append("\nInstructions:\n")
				.append("- If the message is a greeting or general conversation (e.g. 'hi', 'hello'), respond naturally.\n")
				.append("- If the question relates to the knowledge base, use the knowledge base to answer.\n")
				.append("- If the question is related to the knowledge base BUT the answer is not found, respond with:\n")
				.append("Sorry, I couldn't find this information. Please email us on info@gsu.ac.zw.\n")
				.append("- Keep responses concise and relevant.\n");
		}

		//Call AI model with combined prompt
		String answer = chatModel.call(prompt.toString());
		
		if (answer == null || answer.trim().isEmpty()) {
			answer = "Sorry, I couldn't find this information. Please email us on info@gsu.ac.zw.";
		}

		//Map DTO → Entity
		Chat chat = ChatMapper.mapToChat(dto);
		chat.setResponse(answer);

		//Save to DB
		chatRepository.save(chat);

		//Map Entity → DTO and return
		return ChatMapper.mapToChatDto(chat);
	}

    @Override
    public List<ChatDto> getAllChats() {
        List<Chat> chats = chatRepository.findAll();
        return chats.stream().map( (chat) -> ChatMapper.mapToChatDto(chat) )
                .collect(Collectors.toList());
    }
}
