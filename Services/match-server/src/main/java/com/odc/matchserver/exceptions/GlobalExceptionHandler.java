package com.odc.matchserver.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<Object> buildResponse(Exception ex, HttpStatus status) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", ex.getMessage());
        return new ResponseEntity<>(body, status);
    }

    // Gestion des exceptions "NOT FOUND"
    @ExceptionHandler({
            CityNotFoundException.class,
            CountryNotFoundException.class,
            CompetitionNotFoundException.class,
            MatchNotFoundException.class,
            TeamNotFoundException.class,
            ZoneNotFoundException.class,
            StadiumZoneNotFoundException.class,
            StadiumNotFoundException.class
    })
    public ResponseEntity<Object> handleNotFoundExceptions(Exception ex) {
        return buildResponse(ex, HttpStatus.NOT_FOUND);
    }

    // Gestion des exceptions "CONFLICT"
    @ExceptionHandler({
            StadiumOccupiedException.class
    })
    public ResponseEntity<Object> handleConflictExceptions(Exception ex) {
        return buildResponse(ex, HttpStatus.CONFLICT);
    }

    // Gestion des exceptions "BAD REQUEST"
    @ExceptionHandler({
            IllegalArgumentException.class
    })
    public ResponseEntity<Object> handleBadRequestExceptions(Exception ex) {
        return buildResponse(ex, HttpStatus.BAD_REQUEST);
    }

    // Gestion des autres exceptions générales
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleOtherExceptions(Exception ex) {
        return buildResponse(ex, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}