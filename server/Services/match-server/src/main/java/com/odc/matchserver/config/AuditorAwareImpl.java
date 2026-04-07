package com.odc.matchserver.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


@Component("auditorProvider")
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        // 1. Récupérer l'objet d'authentification actuel
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 2. Vérifier si l'utilisateur est connecté
        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {

            return Optional.of("SYSTEM");
        }

        // 3. Retourner le nom d'utilisateur extrait du Token Keycloak
        // Par défaut, c'est l'ID (UUID) ou le 'preferred_username' selon votre config
        return Optional.ofNullable(authentication.getName());
    }
}