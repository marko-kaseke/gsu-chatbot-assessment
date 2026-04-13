package com.gsu.SmartAssist.service;

import com.gsu.SmartAssist.dto.KnowledgeBaseDto;
import com.gsu.SmartAssist.entity.KnowledgeBase;
import com.gsu.SmartAssist.exception.ResourceNotFoundException;
import com.gsu.SmartAssist.mapper.KnowledgeBaseMapper;
import com.gsu.SmartAssist.repository.KnowledgeBaseRepository;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
//@AllArgsConstructor
public class KnowledgeBaseServiceImpl implements KnowledgeBaseService {

    private final KnowledgeBaseRepository knowledgeBaseRepository;

    public KnowledgeBaseServiceImpl(
            KnowledgeBaseRepository knowledgeBaseRepository
    ) { 
        this.knowledgeBaseRepository = knowledgeBaseRepository;
    }

    @Override
    public KnowledgeBaseDto createKnowledgeBase(KnowledgeBaseDto dto) throws IOException {

        // Map and save
        KnowledgeBase knowledgeBase = KnowledgeBaseMapper.mapToKnowledgeBase(dto);
        KnowledgeBase saved = knowledgeBaseRepository.save(knowledgeBase);

        return KnowledgeBaseMapper.mapToKnowledgeBaseDto(saved);
    }

    @Override
    public List<KnowledgeBaseDto> getAllKnowledgeBases() {
        List<KnowledgeBase> knowledgeBases = knowledgeBaseRepository.findAll();
        return knowledgeBases.stream()
                .map(knowledgeBase ->
                        KnowledgeBaseMapper.mapToKnowledgeBaseDto(knowledgeBase))
                .collect(Collectors.toList());
    }


    @Override
    public KnowledgeBaseDto updateKnowledgeBase(Long knowledgeBaseId, KnowledgeBaseDto updatedKnowledgeBase) {
        KnowledgeBase knowledgeBase = knowledgeBaseRepository.findById(knowledgeBaseId).orElseThrow(
                () -> new ResourceNotFoundException("KnowledgeBase doesn't exist with id: " + knowledgeBaseId)
        );

        knowledgeBase.setCategory(updatedKnowledgeBase.getCategory());
        knowledgeBase.setQuestion(updatedKnowledgeBase.getQuestion());
        knowledgeBase.setAnswer(updatedKnowledgeBase.getAnswer());

        // Convert List<String> to JSON string before setting
        try {
            if (updatedKnowledgeBase.getKeywords() != null) {
                String keywordsJson = new com.fasterxml.jackson.databind.ObjectMapper()
                        .writeValueAsString(updatedKnowledgeBase.getKeywords());
                knowledgeBase.setKeywords(keywordsJson);
            } else {
                knowledgeBase.setKeywords("[]"); // empty list if null
            }
        } catch (Exception e) {
            knowledgeBase.setKeywords("[]"); // fallback
        }

        KnowledgeBase updatedEntity = knowledgeBaseRepository.save(knowledgeBase);

        return KnowledgeBaseMapper.mapToKnowledgeBaseDto(updatedEntity);
    }

    @Override
    public void deleteKnowledgeBase(Long knowledgeBaseId) {
        KnowledgeBase knowledgeBase = knowledgeBaseRepository.findById(knowledgeBaseId).orElseThrow(
                () -> new ResourceNotFoundException("KnowledgeBase doesn't exist with id: " + knowledgeBaseId)
        );
        knowledgeBaseRepository.deleteById(knowledgeBaseId);
    }
}
