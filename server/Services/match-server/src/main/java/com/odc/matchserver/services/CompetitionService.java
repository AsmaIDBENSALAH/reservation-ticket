package com.odc.matchserver.services;

import com.odc.matchserver.dto.competition.CompetitionRequestDTO;
import com.odc.matchserver.dto.competition.CompetitionResponseDTO;
import com.odc.matchserver.enums.Continent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface CompetitionService {

        Page<CompetitionResponseDTO> getAllCompetitions(Pageable pageable);

        CompetitionResponseDTO getCompetitionById(UUID id);

        CompetitionResponseDTO createCompetition(CompetitionRequestDTO dto);

        CompetitionResponseDTO updateCompetition(UUID id, CompetitionRequestDTO dto);

        void deleteCompetition(UUID id);

        Page<CompetitionResponseDTO> getContinentalCompetitions(Continent continent, Pageable pageable);

        Page<CompetitionResponseDTO> getNationalCompetitions(UUID countryId, Pageable pageable);

        Page<CompetitionResponseDTO> getInternationalCompetitions(Pageable pageable);
}
