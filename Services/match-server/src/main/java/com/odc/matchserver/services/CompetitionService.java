package com.odc.matchserver.services;

import com.odc.matchserver.dto.competition.CompetitionRequestDTO;
import com.odc.matchserver.dto.competition.CompetitionResponseDTO;
import com.odc.matchserver.enums.Continent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface CompetitionService {


    // ----------------- Pagination -----------------
    Page<CompetitionResponseDTO> getAllCompetitions(Pageable pageable);

    CompetitionResponseDTO getCompetitionById(UUID id);



    CompetitionResponseDTO createCompetition(
            CompetitionRequestDTO dto
    );

    CompetitionResponseDTO updateCompetition(
            UUID id,
            CompetitionRequestDTO dto,
            UUID countryId,
            Continent continent // Enum
    );

    void deleteCompetition(UUID id);

    // ----------------- 1 CONTINENTAL -----------------
    Page<CompetitionResponseDTO> getContinentalCompetitions(Continent continent, Pageable pageable);

    // ----------------- 2 NATIONAL -----------------
    Page<CompetitionResponseDTO> getNationalCompetitions(UUID countryId, Pageable pageable);

    // ----------------- 3 REGIONAL -----------------
    Page<CompetitionResponseDTO> getRegionalCompetitions(List<UUID> countryIds, Pageable pageable);

    // ----------------- 4 INTERNATIONAL -----------------
    Page<CompetitionResponseDTO> getInternationalCompetitions(Pageable pageable);
}

