package com.odc.matchserver.services;

import com.odc.matchserver.dto.competition.CompetitionRequestDTO;
import com.odc.matchserver.dto.competition.CompetitionResponseDTO;
import com.odc.matchserver.entities.Competition;
import com.odc.matchserver.entities.Country;
import com.odc.matchserver.enums.CompetitionScope;
import com.odc.matchserver.enums.Continent;
import com.odc.matchserver.exceptions.CompetitionNotFoundException;
import com.odc.matchserver.exceptions.CountryNotFoundException;
import com.odc.matchserver.mapper.CompetitionMapper;
import com.odc.matchserver.repositories.CompetitionRepository;
import com.odc.matchserver.repositories.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompetitionServiceImpl implements CompetitionService {

    private final CompetitionRepository competitionRepository;
    private final CountryRepository countryRepository;

    @Override
    public Page<CompetitionResponseDTO> getAllCompetitions(Pageable pageable) {
        return competitionRepository.findByActiveTrue(pageable)
                .map(CompetitionMapper::toResponseDTO);
    }

    @Override
    public CompetitionResponseDTO getCompetitionById(UUID id) {
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new CompetitionNotFoundException("Competition with id " + id + " not found"));
        return CompetitionMapper.toResponseDTO(competition);
    }

    @Override
    public CompetitionResponseDTO createCompetition(CompetitionRequestDTO dto) {
        if (dto.getScope() == null)
            throw new IllegalArgumentException("Competition scope must be provided");

        Country country = null;

        switch (dto.getScope()) {
            case NATIONAL:
                if (dto.getCountryId() == null)
                    throw new IllegalArgumentException("countryId must be provided for NATIONAL competitions");
                country = countryRepository.findById(dto.getCountryId())
                        .orElseThrow(() -> new CountryNotFoundException(
                                "Country with id " + dto.getCountryId() + " not found"));
                break;
            case CONTINENTAL:
                if (dto.getContinent() == null)
                    throw new IllegalArgumentException("Continent must be provided for CONTINENTAL competitions");
                break;
            case INTERNATIONAL:
                break;
            default:
                throw new IllegalArgumentException("Unknown scope: " + dto.getScope());
        }

        Competition competition = CompetitionMapper.toEntity(dto, country);
        return CompetitionMapper.toResponseDTO(competitionRepository.save(competition));
    }

    @Override
    public CompetitionResponseDTO updateCompetition(UUID id, CompetitionRequestDTO dto) {
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new CompetitionNotFoundException("Competition with id " + id + " not found"));

        switch (dto.getScope()) {
            case NATIONAL:
                if (dto.getCountryId() == null)
                    throw new IllegalArgumentException("countryId must be provided for NATIONAL competitions");
                Country country = countryRepository.findById(dto.getCountryId())
                        .orElseThrow(() -> new CountryNotFoundException(
                                "Country with id " + dto.getCountryId() + " not found"));
                competition.setCountry(country);
                competition.setContinent(null);
                break;
            case CONTINENTAL:
                if (dto.getContinent() == null)
                    throw new IllegalArgumentException("Continent must be provided for CONTINENTAL competitions");
                competition.setContinent(dto.getContinent());
                competition.setCountry(null);
                break;
            case INTERNATIONAL:
                competition.setCountry(null);
                competition.setContinent(null);
                break;
        }

        competition.setName(dto.getName());
        competition.setAbbreviation(dto.getAbbreviation());
        competition.setLogoUrl(dto.getLogoUrl());
        competition.setDescription(dto.getDescription());
        competition.setTeamType(dto.getTeamType());
        competition.setScope(dto.getScope());

        return CompetitionMapper.toResponseDTO(competitionRepository.save(competition));
    }

    @Override
    public void deleteCompetition(UUID id) {
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new CompetitionNotFoundException("Competition with id " + id + " not found"));
        competition.setActive(false);
        competitionRepository.save(competition);
    }

    @Override
    public Page<CompetitionResponseDTO> getContinentalCompetitions(Continent continent, Pageable pageable) {
        return competitionRepository
                .findByActiveTrueAndScopeAndContinent(CompetitionScope.CONTINENTAL, continent, pageable)
                .map(CompetitionMapper::toResponseDTO);
    }

    @Override
    public Page<CompetitionResponseDTO> getNationalCompetitions(UUID countryId, Pageable pageable) {
        return competitionRepository
                .findByActiveTrueAndScopeAndCountryId(CompetitionScope.NATIONAL, countryId, pageable)
                .map(CompetitionMapper::toResponseDTO);
    }

    @Override
    public Page<CompetitionResponseDTO> getInternationalCompetitions(Pageable pageable) {
        return competitionRepository
                .findByActiveTrueAndScope(CompetitionScope.INTERNATIONAL, pageable)
                .map(CompetitionMapper::toResponseDTO);
    }
}