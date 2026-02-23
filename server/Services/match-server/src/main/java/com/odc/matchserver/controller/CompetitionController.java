package com.odc.matchserver.controller;

import com.odc.matchserver.dto.competition.CompetitionRequestDTO;
import com.odc.matchserver.dto.competition.CompetitionResponseDTO;
import com.odc.matchserver.services.CompetitionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping
    public Page<CompetitionResponseDTO> getAllCompetitions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return competitionService.getAllCompetitions(PageRequest.of(page, size, Sort.by(sortBy)));
    }

    @GetMapping("/{id}")
    public CompetitionResponseDTO getCompetitionById(@PathVariable UUID id) {
        return competitionService.getCompetitionById(id);
    }

    @PostMapping
    public CompetitionResponseDTO createCompetition(@RequestBody CompetitionRequestDTO dto) {
        return competitionService.createCompetition(dto);
    }

    @PutMapping("/{id}")
    public CompetitionResponseDTO updateCompetition(
            @PathVariable UUID id,
            @RequestBody CompetitionRequestDTO dto) {
        return competitionService.updateCompetition(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteCompetition(@PathVariable UUID id) {
        competitionService.deleteCompetition(id);
    }

    @GetMapping("/continental")
    public Page<CompetitionResponseDTO> getContinentalCompetitions(
            @RequestParam Continent continent,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return competitionService.getContinentalCompetitions(continent, PageRequest.of(page, size, Sort.by(sortBy)));
    }

    @GetMapping("/national")
    public Page<CompetitionResponseDTO> getNationalCompetitions(
            @RequestParam UUID countryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return competitionService.getNationalCompetitions(countryId, PageRequest.of(page, size, Sort.by(sortBy)));
    }

    @GetMapping("/international")
    public Page<CompetitionResponseDTO> getInternationalCompetitions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return competitionService.getInternationalCompetitions(PageRequest.of(page, size, Sort.by(sortBy)));
    }
}