package com.gsu.SmartAssist.service;
import com.gsu.SmartAssist.dto.ChatDto;
import java.io.IOException;
import java.util.List;

public interface ChatService {
    ChatDto createChat(ChatDto chatDto) throws IOException;

    List<ChatDto> getAllChats();

}
