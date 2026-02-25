package com.odc.matchserver.controller;

import com.odc.matchserver.dto.competition.CompetitionRequestDTO;
import com.odc.matchserver.dto.competition.CompetitionResponseDTO;
import com.odc.matchserver.services.CompetitionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import com.odc.matchserver.enums.Continent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/api/competitions")
@RequiredArgsConstructor
public class CompetitionController {

    private final CompetitionService competitionService;

    // ----------------- GET ALL COMPETITIONS (pagination) -----------------
    @GetMapping
    public Page<CompetitionResponseDTO> getAllCompetitions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return competitionService.getAllCompetitions(PageRequest.of(page, size, Sort.by(sortBy)));
    }

    // ----------------- GET COMPETITION BY ID -----------------
    @GetMapping("/{id}")
    public CompetitionResponseDTO getCompetitionById(@PathVariable UUID id) {
        return competitionService.getCompetitionById(id);
    }

    // ----------------- CREATE COMPETITION -----------------
    @PostMapping
    public CompetitionResponseDTO createCompetition(
            @RequestBody CompetitionRequestDTO dto) {
        return competitionService.createCompetition(dto);
    }

    // ----------------- UPDATE COMPETITION -----------------
    @PutMapping("/{id}")
    public CompetitionResponseDTO updateCompetition(
            @PathVariable UUID id,
            @RequestBody CompetitionRequestDTO dto,
            @RequestParam(required = false) UUID countryId,
            @RequestParam(required = false) Continent continent) {
        return competitionService.updateCompetition(id, dto, countryId, continent);
    }

    // ----------------- DELETE COMPETITION -----------------
    @DeleteMapping("/{id}")
    public void deleteCompetition(@PathVariable UUID id) {
        competitionService.deleteCompetition(id);
    }

    // ----------------- 1 CONTINENTAL -----------------
    @GetMapping("/continental")
    public Page<CompetitionResponseDTO> getContinentalCompetitions(
            @RequestParam Continent continent,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return competitionService.getContinentalCompetitions(continent, PageRequest.of(page, size, Sort.by(sortBy)));
    }

    // ----------------- 2 NATIONAL -----------------
    @GetMapping("/national")
    public Page<CompetitionResponseDTO> getNationalCompetitions(
            @RequestParam UUID countryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return competitionService.getNationalCompetitions(countryId, PageRequest.of(page, size, Sort.by(sortBy)));
    }

    // ----------------- 3 REGIONAL -----------------
    @GetMapping("/regional")
    public Page<CompetitionResponseDTO> getRegionalCompetitions(
            @RequestParam List<UUID> countryIds,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return competitionService.getRegionalCompetitions(countryIds, PageRequest.of(page, size, Sort.by(sortBy)));
    }

    // ----------------- 4 INTERNATIONAL -----------------
    @GetMapping("/international")
    public Page<CompetitionResponseDTO> getInternationalCompetitions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return competitionService.getInternationalCompetitions(PageRequest.of(page, size, Sort.by(sortBy)));
    }
}
