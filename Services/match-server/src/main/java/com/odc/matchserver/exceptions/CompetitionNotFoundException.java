package com.odc.matchserver.exceptions;
public class CompetitionNotFoundException extends RuntimeException {
    public CompetitionNotFoundException(String message) {
        super(message);
    }
}