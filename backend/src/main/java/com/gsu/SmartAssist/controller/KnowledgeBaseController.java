package com.gsu.SmartAssist.controller;

import com.gsu.SmartAssist.dto.KnowledgeBaseDto;
import com.gsu.SmartAssist.service.KnowledgeBaseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8082", allowedHeaders = "*")  // Allow CORS for all /api/** endpoints
public class KnowledgeBaseController {
    private KnowledgeBaseService knowledgeBaseService;

    //Build Add KnowledgeBase REST API
    //@PostMapping()
    @PostMapping("/admin/faqs")
    public ResponseEntity<?> createKnowledgeBase( @RequestBody KnowledgeBaseDto knowledgeBaseDto )
	{

        try {
            KnowledgeBaseDto savedKnowledgeBase = knowledgeBaseService.createKnowledgeBase(knowledgeBaseDto);
            return new ResponseEntity<>(savedKnowledgeBase, HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace(); // Optional: log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload and save knowledgeBase: " + e.getMessage());
        }
    }


    //Build Get All knowledgeBases REST API
    //@GetMapping
    @GetMapping("/faqs")
    public ResponseEntity<List<KnowledgeBaseDto>> getAllKnowledgeBases(){
        List<KnowledgeBaseDto> knowledgeBases = knowledgeBaseService.getAllKnowledgeBases();
        return ResponseEntity.ok(knowledgeBases);
    }

    //Build Update KnowledgeBase REST API
    //@PutMapping("{id}")
    @PutMapping("/admin/faqs/{id}")
    public ResponseEntity<KnowledgeBaseDto> updateKnowledgeBase (@PathVariable("id") Long knowledgeBaseId,
                                                                   @RequestBody KnowledgeBaseDto updatedKnowledgeBase){
        KnowledgeBaseDto knowledgeBaseDto = knowledgeBaseService.updateKnowledgeBase(knowledgeBaseId, updatedKnowledgeBase);
        return ResponseEntity.ok(knowledgeBaseDto);
    }

    //Build Delete KnowledgeBase REST API
    //@DeleteMapping("{id}")
    @DeleteMapping("/admin/faqs/{id}")
    public ResponseEntity<String> deleteKnowledgeBase(@PathVariable("id") Long knowledgeBaseId){
        knowledgeBaseService.deleteKnowledgeBase(knowledgeBaseId);
        return ResponseEntity.ok("KnowledgeBase deleted successfully");
    }

}
