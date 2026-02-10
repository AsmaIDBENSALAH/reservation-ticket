package com.odc.matchserver.exceptions;
public class TeamNotFoundException extends RuntimeException {
    public TeamNotFoundException(String message) { super(message); }
}