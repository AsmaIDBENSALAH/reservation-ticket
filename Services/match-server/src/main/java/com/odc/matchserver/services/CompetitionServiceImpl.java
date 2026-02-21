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

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompetitionServiceImpl implements CompetitionService {

    private final CompetitionRepository competitionRepository;
    private final CountryRepository countryRepository;

    // ----------------- Pagination -----------------
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
        if (dto.getScope() == null) {
            throw new IllegalArgumentException("Competition scope must be provided");
        }

        Country country = null;
        List<Country> countries = null;

        switch (dto.getScope()) {
            case NATIONAL:
                if (dto.getCountryId() == null) {
                    throw new IllegalArgumentException("countryId must be provided for NATIONAL competitions");
                }
                country = countryRepository.findById(dto.getCountryId())
                        .orElseThrow(() -> new CountryNotFoundException(
                                "Country with id " + dto.getCountryId() + " not found"));
                break;
            case CONTINENTAL:
                if (dto.getContinent() == null) {
                    throw new IllegalArgumentException("Continent must be provided for CONTINENTAL competitions");
                }
                break;
            case REGIONAL:
                if (dto.getCountryIds() == null || dto.getCountryIds().isEmpty()) {
                    throw new IllegalArgumentException("countryIds must be provided for REGIONAL competitions");
                }
                countries = countryRepository.findAllById(dto.getCountryIds());
                break;
            case INTERNATIONAL:
                // No extra fields needed
                break;
            default:
                throw new IllegalArgumentException("Unknown scope: " + dto.getScope());
        }

        Competition competition = CompetitionMapper.toEntity(dto, country, dto.getContinent(), countries);
        Competition saved = competitionRepository.save(competition);

        return CompetitionMapper.toResponseDTO(saved);
    }

    @Override
    public CompetitionResponseDTO updateCompetition(
            UUID id,
            CompetitionRequestDTO dto,
            UUID countryId,
            Continent continent // Enum
    ) {
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new CompetitionNotFoundException("Competition with id " + id + " not found"));

        Country country = null;
        List<Country> countries = null;

        switch (dto.getScope()) {
            case NATIONAL:
                country = countryRepository.findById(countryId)
                        .orElseThrow(() -> new CountryNotFoundException("Country with id " + countryId + " not found"));
                competition.setCountry(country);
                competition.setContinent(null);
                competition.setCountries(null);
                break;
            case CONTINENTAL:
                if (continent == null) {
                    throw new IllegalArgumentException("Continent must be provided for CONTINENTAL competitions");
                }
                competition.setContinent(continent);
                competition.setCountry(null);
                competition.setCountries(null);
                break;
            case REGIONAL:
                countries = countryRepository.findAllById(dto.getCountryIds());
                competition.setCountries(countries);
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

        Competition updated = competitionRepository.save(competition);

        return CompetitionMapper.toResponseDTO(updated);
    }

    @Override
    public void deleteCompetition(UUID id) {
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new CompetitionNotFoundException("Competition with id " + id + " not found"));

        competition.setActive(false); // soft delete
        competitionRepository.save(competition);
    }

    // ----------------- 1 CONTINENTAL -----------------
    @Override
    public Page<CompetitionResponseDTO> getContinentalCompetitions(Continent continent, Pageable pageable) {
        if (continent == null)
            throw new IllegalArgumentException("Continent must be provided");
        return competitionRepository
                .findByActiveTrueAndScopeAndContinent(CompetitionScope.CONTINENTAL, continent, pageable)
                .map(CompetitionMapper::toResponseDTO);
    }

    // ----------------- 2 NATIONAL -----------------
    @Override
    public Page<CompetitionResponseDTO> getNationalCompetitions(UUID countryId, Pageable pageable) {
        if (countryId == null)
            throw new IllegalArgumentException("CountryId must be provided");
        return competitionRepository
                .findByActiveTrueAndScopeAndCountryId(CompetitionScope.NATIONAL, countryId, pageable)
                .map(CompetitionMapper::toResponseDTO);
    }

    // ----------------- 3 REGIONAL -----------------
    @Override
    public Page<CompetitionResponseDTO> getRegionalCompetitions(List<UUID> countryIds, Pageable pageable) {
        if (countryIds == null || countryIds.isEmpty())
            throw new IllegalArgumentException("At least one countryId must be provided");
        return competitionRepository
                .findByActiveTrueAndScopeAndCountriesIdIn(CompetitionScope.REGIONAL, countryIds, pageable)
                .map(CompetitionMapper::toResponseDTO);
    }

    // ----------------- 4 INTERNATIONAL -----------------
    @Override
    public Page<CompetitionResponseDTO> getInternationalCompetitions(Pageable pageable) {
        return competitionRepository
                .findByActiveTrueAndScope(CompetitionScope.INTERNATIONAL, pageable)
                .map(CompetitionMapper::toResponseDTO);
    }
}