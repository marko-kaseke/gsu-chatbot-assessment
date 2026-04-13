package com.gsu.SmartAssist.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class KnowledgeBaseDto {
    private Long id;
    private String category;
    private String question;
    private String answer;
    private List<String> keywords;
}



