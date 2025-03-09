package com.simpledpgfapi.configuration.security;

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
            "/auth/signup",
            "/auth/activate-account",
            "/auth/code-request",
            "/auth/signin",
            "/auth/refresh-token",
            "/auth/update-password-request",
            "/auth/generate-new-password",
            "/invitation/accept",
            "/deployed",
    };

    // filter chain security
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        // disable csrf because jwt
         httpSecurity.csrf(AbstractHttpConfigurer::disable);
         // allow cors request
         httpSecurity.cors(cors -> cors.configurationSource(request-> getCorsConfiguration()));
        // statelasse session policy
        httpSecurity.sessionManagement(httpSecuritySessionManagementConfigurer ->
                httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );
         // config authorisation on http request
         httpSecurity.authorizeHttpRequests(
                 authorize -> authorize
                        .requestMatchers(AUTH_WHITELIST).permitAll()
                        .requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
                        .anyRequest().authenticated()
         );
         // apply jwt filter
        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

    @Bean
    public CorsConfiguration getCorsConfiguration() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        // headers
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        // origins allowed
        corsConfiguration.setAllowedOrigins(
                List.of("http://localhost:5173", "https://simple-dpgf.netlify.app/")
        );
        // authorized methods
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        // identification in headers
        corsConfiguration.setAllowCredentials(true);
        // preflight validity
        corsConfiguration.setMaxAge(4800L);
        // header exposed in response
        corsConfiguration.setExposedHeaders(List.of("Authorization", "Set-Cookie"));

        return corsConfiguration;
    }

    // crypt pwd
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // when authentication asked, will check if email & pwd are valid
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
