package com.odc.matchserver.config;

import com.odc.matchserver.enums.TeamType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class TeamTypeConverter implements Converter<String, TeamType> {
    @Override
    public TeamType convert(String source) {
        return TeamType.valueOf(source.trim().toUpperCase());
    }
}