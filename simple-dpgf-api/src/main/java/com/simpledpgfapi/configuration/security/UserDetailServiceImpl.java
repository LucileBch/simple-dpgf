package com.simpledpgfapi.configuration.security;

import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user =  userRepository
                .findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(UserErrorCodes.USER_NOT_FOUND.toString()));

        User userDetails = new User();
            userDetails.setEmail(user.getEmail());
            userDetails.setPassword(user.getPassword());
            userDetails.setRole(user.getRole());

            return userDetails;
    }
}
