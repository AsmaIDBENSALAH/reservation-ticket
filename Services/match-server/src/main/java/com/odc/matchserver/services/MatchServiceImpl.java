package com.odc.matchserver.services;

import com.odc.matchserver.dto.match.MatchDetailsDTO;
import com.odc.matchserver.dto.match.MatchRequestDTO;
import com.odc.matchserver.dto.match.MatchResponseDTO;
import com.odc.matchserver.entities.*;
import com.odc.matchserver.enums.MatchStatus;
import com.odc.matchserver.exceptions.*;
import com.odc.matchserver.mapper.MatchMapper;
import com.odc.matchserver.mapper.MatchZonePricingMapper;
import com.odc.matchserver.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {

    private final MatchRepository matchRepository;
    private final StadiumRepository stadiumRepository;
    private final TeamRepository teamRepository;
    private final CompetitionRepository competitionRepository;
    private final StadiumZoneRepository stadiumZoneRepository;
    private final MatchZonePricingRepository matchZoneRepository;
    private final MatchMapper matchMapper;

    @Override
    public Page<MatchResponseDTO> getAllMatches(Pageable pageable) {
        return matchRepository.findAll(pageable)
                .map(matchMapper::toResponseDTO);
    }

    @Override
    public MatchResponseDTO getMatchById(UUID id) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new MatchNotFoundException("Match not found with id: " + id));
        return matchMapper.toResponseDTO(match);
    }

    @Override
    public MatchResponseDTO createMatch(MatchRequestDTO dto) {
        Stadium stadium = stadiumRepository.findById(dto.getStadiumId())
                .orElseThrow(() -> new StadiumNotFoundException("Stadium not found with id: " + dto.getStadiumId()));

        boolean isOccupied = matchRepository.existsByStadiumAndDateTime(stadium, dto.getDateTime());
        if (isOccupied) throw new RuntimeException("Stadium already occupied at this date/time");

        Team homeTeam = teamRepository.findById(dto.getHomeTeamId())
                .orElseThrow(() -> new TeamNotFoundException("Home team not found with id: " + dto.getHomeTeamId()));
        Team awayTeam = teamRepository.findById(dto.getAwayTeamId())
                .orElseThrow(() -> new TeamNotFoundException("Away team not found with id: " + dto.getAwayTeamId()));

        Competition competition = null;
        if (dto.getCompetitionId() != null) {
            competition = competitionRepository.findById(dto.getCompetitionId())
                    .orElseThrow(() -> new CompetitionNotFoundException("Competition not found with id: " + dto.getCompetitionId()));
        }

        Match match = MatchMapper.toEntity(dto, stadium, homeTeam, awayTeam, competition);

        // Zone pricing
        if (dto.getZonePricings() != null) {
            List<MatchZonePricing> zonePricings = dto.getZonePricings().stream()
                    .map(z -> {
                        StadiumZone zone = stadiumZoneRepository.findById(z.getZoneId())
                                .orElseThrow(() -> new ZoneNotFoundException("Zone not found with id: " + z.getZoneId()));
                        return MatchZonePricingMapper.toEntity(z, match, zone);
                    }).collect(Collectors.toList());

            match.setZonePricings(zonePricings);
        }

        return matchMapper.toResponseDTO(matchRepository.save(match));
    }

    @Override
    public MatchResponseDTO updateMatch(UUID id, MatchRequestDTO dto) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new MatchNotFoundException("Match not found with id: " + id));

        if (dto.getDateTime() != null) match.setDateTime(dto.getDateTime());
        if (dto.getStatus() != null) match.setStatus(MatchStatus.valueOf(dto.getStatus()));
        if (dto.getMatchNumber() != null) match.setMatchNumber(dto.getMatchNumber());
        if (dto.getAttendance() != null) match.setAttendance(dto.getAttendance());
        if (dto.getReferee() != null) match.setReferee(dto.getReferee());
        if (dto.getMatchImageUrl() != null) match.setMatchImageUrl(dto.getMatchImageUrl());

        if (dto.getStadiumId() != null) match.setStadium(
                stadiumRepository.findById(dto.getStadiumId())
                        .orElseThrow(() -> new StadiumNotFoundException("Stadium not found with id: " + dto.getStadiumId()))
        );

        if (dto.getHomeTeamId() != null) match.setHomeTeam(
                teamRepository.findById(dto.getHomeTeamId())
                        .orElseThrow(() -> new TeamNotFoundException("Home team not found with id: " + dto.getHomeTeamId()))
        );

        if (dto.getAwayTeamId() != null) match.setAwayTeam(
                teamRepository.findById(dto.getAwayTeamId())
                        .orElseThrow(() -> new TeamNotFoundException("Away team not found with id: " + dto.getAwayTeamId()))
        );

        if (dto.getCompetitionId() != null) match.setCompetition(
                competitionRepository.findById(dto.getCompetitionId())
                        .orElseThrow(() -> new CompetitionNotFoundException("Competition not found with id: " + dto.getCompetitionId()))
        );

        return matchMapper.toResponseDTO(matchRepository.save(match));
    }

    @Override
    public void deleteMatch(UUID id) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new MatchNotFoundException("Match not found with id: " + id));
        matchRepository.delete(match);
    }

    @Override
    public void decreaseAvailability(UUID matchId, UUID zoneId, int quantity) {
        MatchZonePricing zone = matchZoneRepository
                .findByMatch_IdAndZone_Id(matchId, zoneId)
                .orElseThrow(() -> new ZoneNotFoundException("Zone not found for matchId: " + matchId));

        if (zone.getAvailableSeats() < quantity)
            throw new InsufficientSeatsException("Not enough available seats");

        zone.setAvailableSeats(zone.getAvailableSeats() - quantity);
        matchZoneRepository.save(zone);
    }

    @Override
    public void increaseAvailability(UUID matchId, UUID zoneId, int quantity) {
        MatchZonePricing zone = matchZoneRepository
                .findByMatch_IdAndZone_Id(matchId, zoneId)
                .orElseThrow(() -> new ZoneNotFoundException("Zone not found for matchId: " + matchId));

        zone.setAvailableSeats(zone.getAvailableSeats() + quantity);
        matchZoneRepository.save(zone);
    }

    @Override
    public MatchDetailsDTO getMatchDetails(UUID matchId) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new MatchNotFoundException("Match not found with id: " + matchId));
        return matchMapper.toMatchDetailsDTO(match);
    }

    // ----------------- FILTER METHODS -----------------
    @Override
    public Page<MatchResponseDTO> getMatchesByCompetition(UUID competitionId, Pageable pageable) {
        return matchRepository.findByCompetition_Id(competitionId, pageable)
                .map(matchMapper::toResponseDTO);
    }

    @Override
    public Page<MatchResponseDTO> getMatchesByStadium(UUID stadiumId, Pageable pageable) {
        return matchRepository.findByStadium_Id(stadiumId, pageable)
                .map(matchMapper::toResponseDTO);
    }

    @Override
    public Page<MatchResponseDTO> getMatchesByDateRange(LocalDateTime from, LocalDateTime to, Pageable pageable) {
        return matchRepository.findByDateTimeBetween(from, to, pageable)
                .map(matchMapper::toResponseDTO);
    }
}
