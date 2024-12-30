package com.simpledpgfapi.configuration.security;

import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

        if (request.getServletPath().contains("/user/signup") ||
                request.getServletPath().contains("/user/activate-account") ||
                request.getServletPath().contains("/user/code-request") ||
                request.getServletPath().contains("/user/signin") ||
                request.getServletPath().contains("/user/refresh-token") ||
                request.getServletPath().contains("/user/update-password-request") ||
                request.getServletPath().contains("/user/generate-new-password") ) {
            filterChain.doFilter(request, response);
            return;
        }

        String token;
        String email;
        boolean isTokenExpired;

        try {

            // on récupère le header
            final String headerAuthorization = request.getHeader("Authorization");

            if (headerAuthorization == null || !headerAuthorization.startsWith("Bearer ")) {
                throw new HttpException(HttpStatus.UNAUTHORIZED, UserErrorCodes.USER_NOT_AUTHENTICATED);
            } else {
                token = headerAuthorization.substring(7);
                isTokenExpired = jwtAuthenticationService.isTokenExpired(token);
                email = jwtAuthenticationService.extractEmail(token);

                if(isTokenExpired) {
                    throw new HttpException(HttpStatus.UNAUTHORIZED, UserErrorCodes.USER_NOT_AUTHENTICATED);
                }

                if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailServiceImpl.loadUserByUsername(email);
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    System.out.println("Authorities: " + userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
                // la chaine des filtres peut continuer à filtrer notre requete
                filterChain.doFilter(request, response);
            }
        } catch (JwtException e){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
        }
    }
}
