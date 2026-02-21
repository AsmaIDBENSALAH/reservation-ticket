package com.odc.matchserver.controller;

import com.odc.matchserver.dto.match.MatchDetailsDTO;
import com.odc.matchserver.dto.match.MatchRequestDTO;
import com.odc.matchserver.dto.match.MatchResponseDTO;
import com.odc.matchserver.services.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class MatchController {

    private final MatchService matchService;

    // ----------------- GET ALL MATCHES (PAGINATED) -----------------
    @GetMapping
    public Page<MatchResponseDTO> getAllMatches(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dateTime") String sortBy
    ) {
        return matchService.getAllMatches(
                PageRequest.of(page, size, Sort.by(sortBy))
        );
    }

    // ----------------- GET MATCH BY ID -----------------
    @GetMapping("/{id}")
    public MatchResponseDTO getMatchById(@PathVariable UUID id) {
        return matchService.getMatchById(id);
    }

    // ----------------- CREATE MATCH -----------------
    @PostMapping
    public MatchResponseDTO createMatch(@RequestBody MatchRequestDTO dto) {

        System.out.println("ggg");
        System.out.println(dto);

        return matchService.createMatch(dto);
    }

    // ----------------- UPDATE MATCH -----------------
    @PutMapping("/{id}")
    public MatchResponseDTO updateMatch(
            @PathVariable UUID id,
            @RequestBody MatchRequestDTO dto
    ) {
        System.out.println(">>> UPDATE MATCH CALLED for id = " + id);
        return matchService.updateMatch(id, dto);
    }

    // ----------------- DELETE MATCH -----------------
    @DeleteMapping("/{id}")
    public void deleteMatch(@PathVariable UUID id) {
        matchService.deleteMatch(id);
    }

    // ----------------- MATCH DETAILS -----------------
    @GetMapping("/{id}/details")
    public MatchDetailsDTO getMatchDetails(@PathVariable UUID id) {
        return matchService.getMatchDetails(id);
    }

    // ----------------- DECREASE AVAILABLE SEATS -----------------
    @PostMapping("/{matchId}/zones/{zoneId}/decrease")
    public void decreaseAvailability(
            @PathVariable UUID matchId,
            @PathVariable UUID zoneId,
            @RequestParam int quantity
    ) {
        matchService.decreaseAvailability(matchId, zoneId, quantity);
    }

    // ----------------- INCREASE AVAILABLE SEATS -----------------
    @PostMapping("/{matchId}/zones/{zoneId}/increase")
    public void increaseAvailability(
            @PathVariable UUID matchId,
            @PathVariable UUID zoneId,
            @RequestParam int quantity
    ) {
        matchService.increaseAvailability(matchId, zoneId, quantity);
    }

    // ----------------- FILTER BY COMPETITION -----------------
    @GetMapping("/competition/{competitionId}")
    public Page<MatchResponseDTO> getMatchesByCompetition(
            @PathVariable UUID competitionId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dateTime") String sortBy
    ) {
        return matchService.getMatchesByCompetition(
                competitionId,
                PageRequest.of(page, size, Sort.by(sortBy))
        );
    }

    // ----------------- FILTER BY STADIUM -----------------
    @GetMapping("/stadium/{stadiumId}")
    public Page<MatchResponseDTO> getMatchesByStadium(
            @PathVariable UUID stadiumId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dateTime") String sortBy
    ) {
        return matchService.getMatchesByStadium(
                stadiumId,
                PageRequest.of(page, size, Sort.by(sortBy))
        );
    }

    // ----------------- FILTER BY DATE RANGE -----------------
    @GetMapping("/dates")
    public Page<MatchResponseDTO> getMatchesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dateTime") String sortBy
    ) {
        return matchService.getMatchesByDateRange(
                from,
                to,
                PageRequest.of(page, size, Sort.by(sortBy))
        );
    }
}