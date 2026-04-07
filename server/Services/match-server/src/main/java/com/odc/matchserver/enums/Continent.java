package com.odc.matchserver.enums;

public enum Continent {
    AFRICA("Afrique"),
    EUROPE("Europe"),
    ASIA("Asie"),
    AMERICAS("Amérique"),
    OCEANIA("Océanie"),
    ARAB_WORLD("Arab World");

    private final String displayName;

    Continent(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
