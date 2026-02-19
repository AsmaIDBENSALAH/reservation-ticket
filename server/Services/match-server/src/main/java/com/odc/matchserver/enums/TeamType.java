package com.odc.matchserver.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum TeamType {
    CLUB,
    NATIONAL;

    @JsonCreator
    public static TeamType from(String value) {
        if (value == null) return null;
        return TeamType.valueOf(value.trim().toUpperCase());
    }
}
