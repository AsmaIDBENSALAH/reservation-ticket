package com.odc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // <--- IMPORANT
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .cors(Customizer.withDefaults())
                .authorizeExchange(exchanges -> exchanges

                        // ✅ OPTIONS toujours permis (CORS preflight)
                        .pathMatchers(HttpMethod.OPTIONS).permitAll()

                        // ✅ ENDPOINTS PUBLICS - fans sans authentification
                        .pathMatchers(HttpMethod.GET, "/api/matches/**").permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/competitions/**").permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/stadiums/**").permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/teams/**").permitAll()

                        // 🔒 Tout le reste nécessite authentification
                        .anyExchange().authenticated()
                )
                .oauth2Login(Customizer.withDefaults())
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(Customizer.withDefaults())
                );

        return http.build();
    }
}