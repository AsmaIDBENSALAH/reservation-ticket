package com.odc.matchserver.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;

@Component("auditorProvider")
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        ServletRequestAttributes attr =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attr == null) return Optional.of("SYSTEM");

        String username = attr.getRequest().getHeader("X-User-Name");
        if (username == null || username.isEmpty()) {
            username = "SYSTEM";
        }
        return Optional.of(username);
    }
}
