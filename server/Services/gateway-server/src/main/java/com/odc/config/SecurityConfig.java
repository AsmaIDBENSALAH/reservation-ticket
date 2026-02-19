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
                // 1. Disable CSRF (Essential for APIs/React)
                .csrf(ServerHttpSecurity.CsrfSpec::disable)

                // 2. Enable CORS in Security (so it respects your YAML config)
                .cors(Customizer.withDefaults())

                .authorizeExchange(exchanges -> exchanges
                        // 3. ALLOW OPTIONS REQUESTS (Fixes the Redirect/CORS error)
                        .pathMatchers(HttpMethod.OPTIONS).permitAll()

                        // 4. Authenticate everything else
                        .anyExchange().authenticated()
                )
                .oauth2Login(Customizer.withDefaults())
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(Customizer.withDefaults())
                );

        return http.build();
    }
}