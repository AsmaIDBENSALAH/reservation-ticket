package com.odc.matchserver.exceptions;

public class InsufficientSeatsException extends RuntimeException {
    public InsufficientSeatsException(String message) { super(message); }
}