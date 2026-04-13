package com.gsu.SmartAssist.mapper;
import com.gsu.SmartAssist.dto.ChatDto;
import com.gsu.SmartAssist.entity.Chat;

public class ChatMapper {

    public static ChatDto mapToChatDto(Chat chat) {
        ChatDto dto = new ChatDto();
        dto.setId(chat.getId());
        dto.setMessage(chat.getMessage());
        dto.setResponse(chat.getResponse());
        dto.setTimestamp(chat.getTimestamp());
        dto.setVersion(chat.getVersion());
        return dto;
    }

    public static Chat mapToChat(ChatDto dto) {
        Chat chat = new Chat();
        chat.setId(dto.getId());
        chat.setMessage(dto.getMessage());
        chat.setResponse(dto.getResponse());
		chat.setTimestamp(dto.getTimestamp());
        chat.setVersion(dto.getVersion());

        return chat;
    }

}
