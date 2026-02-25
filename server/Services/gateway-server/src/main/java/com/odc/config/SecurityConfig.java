package com.odc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // <--- IMPORANT
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@EnableWebFluxSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .cors(Customizer.withDefaults())
                .authorizeExchange(exchanges -> exchanges

                        // ✅ OPTIONS
                        .pathMatchers(HttpMethod.OPTIONS).permitAll()

                        // ✅ GET publics
                        .pathMatchers(HttpMethod.GET, "/api/matches/**").permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/competitions/**").permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/stadiums/**").permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/teams/**").permitAll()

                        // 🔒 reste protégé
                        .anyExchange().authenticated()
                )

                // ❌ SUPPRIMER oauth2Login
                // .oauth2Login(Customizer.withDefaults())

                // ✅ API JWT seulement
                .oauth2ResourceServer(oauth2 -> oauth2.jwt())

                .build();
    }
}