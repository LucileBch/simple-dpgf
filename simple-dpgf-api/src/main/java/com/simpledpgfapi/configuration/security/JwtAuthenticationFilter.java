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

@Slf4j
@Service
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private UserDetailServiceImpl userDetailServiceImpl;
    @Autowired
    private JwtAuthenticationService jwtAuthenticationService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (request.getServletPath().contains("/auth/signup") ||
                request.getServletPath().contains("/auth/activate-account") ||
                request.getServletPath().contains("/auth/code-request") ||
                request.getServletPath().contains("/auth/signin") ||
                request.getServletPath().contains("/auth/refresh-token") ||
                request.getServletPath().contains("/auth/update-password-request") ||
                request.getServletPath().contains("/auth/generate-new-password") ||
                request.getServletPath().contains("/invitation/accept")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwtToken = null;
        String userEmail = null;
        boolean isTokenValid;

        try {
            final String headerAuthorization = request.getHeader("Authorization");

            if (headerAuthorization == null || !headerAuthorization.startsWith("Bearer ")) {
                throw new HttpException(HttpStatus.UNAUTHORIZED, UserErrorCodes.USER_NOT_AUTHENTICATED);
            } else {
                jwtToken = headerAuthorization.substring(7);
                userEmail = jwtAuthenticationService.extractEmail(jwtToken);

                if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailServiceImpl.loadUserByUsername(userEmail);
                    isTokenValid = jwtAuthenticationService.isTokenValid(jwtToken, userDetails);

                    if(!isTokenValid) {
                        throw new HttpException(HttpStatus.UNAUTHORIZED, UserErrorCodes.USER_NOT_AUTHENTICATED);
                    }

                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }

                filterChain.doFilter(request, response);
            }
        } catch (JwtException e){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
        }
    }
}
