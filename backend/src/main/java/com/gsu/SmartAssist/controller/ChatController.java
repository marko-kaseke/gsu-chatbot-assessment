package com.gsu.SmartAssist.controller;

import com.gsu.SmartAssist.dto.ChatDto;
import com.gsu.SmartAssist.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:80", allowedHeaders = "*")  // Allow CORS for all /api/** endpoints
public class ChatController {
    private ChatService chatService;

	//Build Add Chat REST API
    //@PostMapping
    @PostMapping("/chat")
    public ResponseEntity<?> createChat(
            @RequestBody ChatDto chatDto
			) {

        try {
            ChatDto savedChat = chatService.createChat(chatDto);
            return new ResponseEntity<>(savedChat, HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace(); // Optional: log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload and save chat: " + e.getMessage());
        }
    }

    //Build Get All Chats REST API
    //@GetMapping
    @GetMapping("/admin/chat-logs")
    public ResponseEntity<List<ChatDto>> getAllChats(){
        List<ChatDto> chats = chatService.getAllChats();
        return ResponseEntity.ok(chats);
    }


}
