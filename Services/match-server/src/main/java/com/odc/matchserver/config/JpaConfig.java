package com.odc.matchserver.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
// Le nom "auditorProvider" doit correspondre au @Component("auditorProvider")
// que vous avez mis sur votre classe AuditorAwareImpl
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaConfig {


}