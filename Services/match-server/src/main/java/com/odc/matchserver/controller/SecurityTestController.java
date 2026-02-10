package com.odc.matchserver.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class SecurityTestController {

    @GetMapping("/me")
    public Map<String, Object> getMyDetails(Authentication authentication) {
        return Map.of(
                "username", authentication.getName(),
                "authorities", authentication.getAuthorities(), // ICI tu verras tes rôles
                "principal", authentication.getPrincipal()
        );
    }
}