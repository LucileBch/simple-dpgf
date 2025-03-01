package com.simpledpgfapi;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.mockito.Mockito.when;

public class UTBase {
    @BeforeEach
    public void setup() {
        // mock user authentication
        Authentication authentication = Mockito.mock(Authentication.class);
        when(authentication.getName()).thenReturn("user1@email.com");

        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        // Inject mocked context
        SecurityContextHolder.setContext(securityContext);
    }

    @AfterEach
    public void tearDown() {
        SecurityContextHolder.clearContext();
    }
}
