package com.odc.matchserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // .cors(Customizer.withDefaults()) 
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html")
                        .permitAll()

                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/cities/**").hasRole("ADMIN")
                        .requestMatchers("/api/fan/**").hasAnyRole("FAN", "ADMIN")

                        .anyRequest().authenticated())
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())));

        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(new KeycloakRoleConverter());
        return converter;
    }

    // @Bean
    // public CorsConfigurationSource corsConfigurationSource() {
    //     CorsConfiguration configuration = new CorsConfiguration();

    //     // React origin
    //     configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));

    //     configuration.setAllowedMethods(Arrays.asList(
    //             "GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"));

    //     configuration.setAllowedHeaders(Arrays.asList(
    //             "Authorization",
    //             "Content-Type",
    //             "X-Requested-With",
    //             "Accept",
    //             "Origin",
    //             "Cache-Control",
    //             "Pragma",
    //             "Expires",
    //             "Access-Control-Request-Method",
    //             "Access-Control-Request-Headers",
    //             "X-Forwarded-For",
    //             "X-Real-IP"));

    //     configuration.setExposedHeaders(Arrays.asList(
    //             "Authorization",
    //             "Content-Type",
    //             "Cache-Control"));

    //     configuration.setAllowCredentials(true);
    //     configuration.setMaxAge(7200L);

    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     source.registerCorsConfiguration("/**", configuration);
    //     return source;
    // }

}
