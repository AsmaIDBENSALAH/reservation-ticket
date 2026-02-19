package com.odc.matchserver.enums;
import com.fasterxml.jackson.annotation.JsonCreator;

public enum Continent {
    AFRICA,
    EUROPE,
    ASIA,
    AMERICAS,
    OCEANIA,
    ANTARCTICA;

    @JsonCreator
    public static Continent from(String value) {
        if (value == null) return null;
        return Continent.valueOf(value.trim().toUpperCase());
    }
}
