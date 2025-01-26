package com.simpledpgfapi.user.service;

import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();

        return userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));
    }
//
//    public UserDto getUserInfos() {
//        UserDto userDto = new UserDto();
//        userDto.setEmail();
//    }
//
//    public UserDto getUserInfos() {
//        if (cognitoService.isUltimateUser()) {
//            UserDto userDto = new UserDto();
//            userDto.setCognitoUserId(cognitoService.getCognitoUserId());
//            userDto.setRole(OrganizationRoleEnum.ULTIMATE_USER);
//            userDto.setGivenName("Time to Beem");
//            userDto.setFamilyName("");
//            return userDto;
//        } else {
//            String cognitoUserId = cognitoService.getCognitoUserId();
//            User user = userRepository.findById(cognitoUserId).orElseThrow(() -> new HttpException(
//                    HttpStatus.NOT_FOUND,
//                    UserErrorCodes.USER_NOT_FOUND
//            ));
//            return userMapper.modelToDto(user);
//        }
//    }
}
