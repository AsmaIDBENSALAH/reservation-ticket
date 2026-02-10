package com.odc.matchserver.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class KeycloakRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Map<String, Object> realmAccess = (Map<String, Object>) jwt.getClaims().get("realm_access");

        if (realmAccess == null || realmAccess.isEmpty()) {
            System.out.println("DEBUG: Aucun rôle trouvé dans le token !");
            return List.of();
        }

        List<String> roles = (List<String>) realmAccess.get("roles");
        System.out.println("DEBUG: Rôles extraits de Keycloak : " + roles);

        return roles.stream()
                .map(roleName -> "ROLE_" + roleName)
                .peek(role -> System.out.println("DEBUG: Autorité ajoutée à Spring : " + role))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
