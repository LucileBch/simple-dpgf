package com.simpledpgfapi.configuration.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    // allowed path without authentication
    private static final String[] AUTH_WHITELIST = {
            "/v3/api-docs",   // OpenAPI docs
            "/v3/api-docs/**",   // OpenAPI docs
            "/swagger-ui/**",     // Swagger UI
            "/swagger-ui.html",
            "/swagger-resources/**",
            //"/actuator/health", ???
            "/auth/signup",
            "/auth/activate-account",
            "/auth/code-request",
            "/auth/signin",
            "/auth/refresh-token",
            "/auth/update-password-request",
            "/auth/generate-new-password",
            "/invitation/accept"
    };

    // construction d'un bean
    // qui est une chaine de sécurité
    // je désactive les cross origin request
    // j'autorique les requetes qui sont sur inscription
    // pour le reste il faudra être authentifié
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        // disable csrf because jwt
         httpSecurity.csrf(AbstractHttpConfigurer::disable);

         // allow cors request --> revoir cors
         httpSecurity.cors(cors -> cors.configurationSource(request-> getCorsConfiguration()));

        // statelasse session policy
        httpSecurity.sessionManagement(httpSecuritySessionManagementConfigurer ->
                httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

         // config authorisation sur requete http
         httpSecurity.authorizeHttpRequests(
                 authorize -> authorize
                        .requestMatchers(AUTH_WHITELIST).permitAll()
                        .requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
                        .anyRequest().authenticated()
         );

        httpSecurity.exceptionHandling(exceptionHandling ->
                exceptionHandling
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
                            response.getWriter().write("Unauthorized: " + authException.getMessage());
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN); // 403 Forbidden
                            response.getWriter().write("Access Denied: " + accessDeniedException.getMessage());
                        })
        );

         // application du filtre jwt filter
        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

    @Bean
    public CorsConfiguration getCorsConfiguration() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        // headers
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type", "Cookies"));
        // origins (qui à le droit d'appeller quels host
        corsConfiguration.setAllowedOriginPatterns(
                List.of("http://localhost:5173", "http://localhost:3000", "http://localhost:8080")
        );
        // methodes authoriées
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        // si app securisée avec authorisation header
        corsConfiguration.setAllowCredentials(true);
        // duree validité
        corsConfiguration.setMaxAge(4800L);
        // header expose en reponse
        corsConfiguration.setExposedHeaders(List.of("Authorization", "Set-Cookie"));

        return corsConfiguration;
    }

    // pour crypter le MDP
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // gère l'authentication de notre projet
    // on doit dire où il va chercher les infos de l'utilisateur pour pouvoir vérifeir les login + mdp correspondent
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
