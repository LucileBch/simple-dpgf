package com.simpledpgfapi.configuration.security;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Service
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailServiceImpl userDetailServiceImpl;
    @Autowired
    private JwtAuthenticationService jwtAuthenticationService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (request.getServletPath().contains("/user/signup") || request.getServletPath().contains("/user/activate-account") || request.getServletPath().contains("/user/signin")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token;
        String email;
        Boolean isTokenExpired;

        try {

        // on récupère le header
        final String headerAuthorization = request.getHeader("Authorization");
        // on récupère le token en enlevant la partie "bearer"
        if(headerAuthorization != null && headerAuthorization.startsWith("Bearer ")) {
            token = headerAuthorization.substring(7);
            isTokenExpired = jwtAuthenticationService.isTokenExpired(token);
            email = jwtAuthenticationService.extractEmail(token);

            if(!isTokenExpired && email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailServiceImpl.loadUserByUsername(email);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                System.out.println("Authorities: " + userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
            // la chaine des filtres peut continuer à filtrer notre requete
            filterChain.doFilter(request, response);
        }} catch (JwtException e){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
        }
}}
