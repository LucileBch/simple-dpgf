package com.simpledpgfapi.configuration.security;

import com.simpledpgfapi.user.model.role.Role;
import com.simpledpgfapi.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository
                .findByEmail(email).map(user-> User.builder().username(user.getEmail())
                        .password(user.getPassword())
                        .authorities(mapRolesToAuthorities(user.getRoles()))
                        .build()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    // Méthode pour convertir les rôles en authorities
    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Set<Role> roles) {
        if (roles == null || roles.isEmpty()) {
            return Collections.emptyList();  // Si aucun rôle n'est défini, renvoie une liste vide
        }

        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRoleName().name()))  // Assure-toi que Role a une méthode getName()
                .collect(Collectors.toList());
    }
}
