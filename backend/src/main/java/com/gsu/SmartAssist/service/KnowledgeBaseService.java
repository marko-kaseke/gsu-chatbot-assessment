package com.gsu.SmartAssist.service;
import com.gsu.SmartAssist.dto.KnowledgeBaseDto;

import java.io.IOException;
import java.util.List;

public interface KnowledgeBaseService {
    KnowledgeBaseDto createKnowledgeBase(KnowledgeBaseDto knowledgeBaseDto) throws IOException;

    List<KnowledgeBaseDto> getAllKnowledgeBases();

    KnowledgeBaseDto updateKnowledgeBase(Long knowledgeBaseId, KnowledgeBaseDto updateKnowledgeBase);

    void deleteKnowledgeBase(Long knowledgeBaseId);
}
