package com.gsu.SmartAssist.mapper;
import com.gsu.SmartAssist.dto.KnowledgeBaseDto;
import com.gsu.SmartAssist.entity.KnowledgeBase;
import java.util.List;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
public class KnowledgeBaseMapper {

    private static final ObjectMapper mapper = new ObjectMapper();

    // Entity -> DTO
    public static KnowledgeBaseDto mapToKnowledgeBaseDto(KnowledgeBase knowledgeBase) {
        KnowledgeBaseDto dto = new KnowledgeBaseDto();
        dto.setId(knowledgeBase.getId());
        dto.setCategory(knowledgeBase.getCategory());
        dto.setQuestion(knowledgeBase.getQuestion());
        dto.setAnswer(knowledgeBase.getAnswer());

        try {
            if (knowledgeBase.getKeywords() != null)
                dto.setKeywords(mapper.readValue(knowledgeBase.getKeywords(), new TypeReference<List<String>>() {}));
            else
                dto.setKeywords(new ArrayList<>());
        } catch (Exception e) {
            dto.setKeywords(new ArrayList<>()); // fallback
        }

        return dto;
    }

    // DTO -> Entity
    public static KnowledgeBase mapToKnowledgeBase(KnowledgeBaseDto dto) {
        KnowledgeBase entity = new KnowledgeBase();
        entity.setId(dto.getId());
        entity.setCategory(dto.getCategory());
        entity.setQuestion(dto.getQuestion());
        entity.setAnswer(dto.getAnswer());

        try {
            if (dto.getKeywords() != null)
                entity.setKeywords(mapper.writeValueAsString(dto.getKeywords()));
            else
                entity.setKeywords("[]");
        } catch (Exception e) {
            entity.setKeywords("[]"); // fallback
        }

        return entity;
    }
}
