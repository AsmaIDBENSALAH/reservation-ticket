package com.odc.matchserver.services;

import com.odc.matchserver.dto.match.MatchDetailsDTO;
import com.odc.matchserver.dto.match.MatchRequestDTO;
import com.odc.matchserver.dto.match.MatchResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.UUID;

public interface MatchService {

    Page<MatchResponseDTO> getAllMatches(Pageable pageable);

    MatchResponseDTO getMatchById(UUID id);

    MatchResponseDTO createMatch(MatchRequestDTO dto);

    MatchResponseDTO updateMatch(UUID id, MatchRequestDTO dto);

    void deleteMatch(UUID id);

    void decreaseAvailability(UUID matchId, UUID zoneId, int quantity);

    void increaseAvailability(UUID matchId, UUID zoneId, int quantity);

    MatchDetailsDTO getMatchDetails(UUID matchId);

    // ----------------- FILTER METHODS -----------------
    Page<MatchResponseDTO> getMatchesByCompetition(UUID competitionId, Pageable pageable);

    Page<MatchResponseDTO> getMatchesByStadium(UUID stadiumId, Pageable pageable);

    Page<MatchResponseDTO> getMatchesByDateRange(LocalDateTime from, LocalDateTime to, Pageable pageable);

    Page<MatchResponseDTO> getMostPopularMatches(Pageable pageable);

}
