package com.simpledpgfapi.configuration.database;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
@EnableMongoAuditing
public class MongoConfiguration {

    // AuditorAware pour obtenir l'utilisateur connecté et compléter les fields createdBy and modifiedBy
    @Bean
    public AuditorAware<String> auditorProvider() {
        return () -> Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .map(authentication -> authentication.getName()); // Récupère le nom de l'utilisateur connecté
    }

    // TODO: ajouter les index pour les requetes en DB
}
