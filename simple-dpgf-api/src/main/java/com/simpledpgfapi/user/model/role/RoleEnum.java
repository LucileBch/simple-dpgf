package com.simpledpgfapi.user.model.role;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public enum RoleEnum {
    ADMIN,
    ORGANIZATION_MANAGER,
    PROJECT_OWNER,
    DISABLED;

    public List<SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        authorities.forEach(authority -> log.info("Authority: " + authority.getAuthority()));
        return authorities;
    }
}
