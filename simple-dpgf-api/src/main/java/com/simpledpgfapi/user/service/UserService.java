package com.simpledpgfapi.user.service;

import com.simpledpgfapi.configuration.security.JwtAuthenticationService;
import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.mapper.UserMapper;
import com.simpledpgfapi.user.model.refreshtoken.RefreshToken;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.user.dto.UserProfileUpdateDto;
import com.simpledpgfapi.user.model.user.dto.UserTokenUpdateDto;
import com.simpledpgfapi.user.repository.RefreshTokenRepository;
import com.simpledpgfapi.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private JwtAuthenticationService jwtAuthenticationService;
    @Autowired
    private  RefreshTokenService refreshTokenService;

    public User getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();

        return userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));
    }

    @Transactional
    public UserTokenUpdateDto updateUserInfoById(ObjectId userId, UserProfileUpdateDto userProfileUpdateDto) {
        User currentUser = userRepository.findById(userId).orElseThrow(() -> new HttpException(
                HttpStatus.BAD_REQUEST,
                UserErrorCodes.USER_NOT_FOUND));

        if(!userProfileUpdateDto.getFirstName().equals((currentUser.getFirstName()))) {
            currentUser.setFirstName(userProfileUpdateDto.getFirstName());
        }
        if(!userProfileUpdateDto.getLastName().equals((currentUser.getLastName()))) {
            currentUser.setLastName(userProfileUpdateDto.getLastName());
        }

        String newAccessToken = null;
        String newRefreshToken = null;
        if(!userProfileUpdateDto.getEmail().equals((currentUser.getEmail()))) {
            currentUser.setEmail(userProfileUpdateDto.getEmail());

            List <RefreshToken> refreshTokenList = refreshTokenRepository.findByUserId(currentUser.getId());
            refreshTokenList.forEach(refreshToken -> {
                if (refreshToken.isRevoked()) {
                    refreshTokenRepository.delete(refreshToken);
                } else {
                    refreshToken.setRevoked(true);
                }
            });

            newAccessToken = jwtAuthenticationService.generateJwtToken(userProfileUpdateDto.getEmail(), currentUser);
            newRefreshToken = refreshTokenService.createRefreshToken(currentUser.getId());
        }

        if(!bCryptPasswordEncoder.matches(userProfileUpdateDto.getOldPassword(), currentUser.getPassword())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_WRONG_PASSWORD);
        }

        if(!userProfileUpdateDto.getNewPassword().isEmpty()) {
            if (userProfileUpdateDto.getOldPassword() == null || userProfileUpdateDto.getOldPassword().isEmpty()) {
                throw new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_OLD_PASSWORD_REQUIRED);
            }

            if(bCryptPasswordEncoder.matches(userProfileUpdateDto.getNewPassword(), currentUser.getPassword())) {
                throw new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NEW_PASSWORD_EQUALS_OLD);
            }
            validatePassword(userProfileUpdateDto.getNewPassword());

            String cryptedNewPassword = bCryptPasswordEncoder.encode(userProfileUpdateDto.getNewPassword());
            currentUser.setPassword(cryptedNewPassword);
        }

        userRepository.save(currentUser);
        return userMapper.modelAndTokenToDto(currentUser, newAccessToken, newRefreshToken);
    }

    private void validatePassword(String newPassword) {
        if (newPassword != null && !newPassword.isEmpty()) {
            if (newPassword.length() < 8 || newPassword.length() > 20) {
                throw new HttpException(HttpStatus.BAD_REQUEST,  UserErrorCodes.PASSWORD_BETWEEN_8_AND_20);
            }
            if (!newPassword.matches(".*[A-Z].*")) {
                throw new HttpException(HttpStatus.BAD_REQUEST,  UserErrorCodes.PASSWORD_ONE_UPPERCASE);
            }
            if (!newPassword.matches(".*[a-z].*")) {
                throw new HttpException(HttpStatus.BAD_REQUEST,  UserErrorCodes.PASSWORD_ONE_LOWERCASE);
            }
            if (!newPassword.matches(".*[0-9].*")) {
                throw new HttpException(HttpStatus.BAD_REQUEST,  UserErrorCodes.PASSWORD_ONE_NUMBER);
            }
            if (!newPassword.matches(".*[@$!%*?&].*")) {
                throw new HttpException(HttpStatus.BAD_REQUEST,  UserErrorCodes.PASSWORD_ONE_SPECIAL_CHAR);
            }
        }
    }
}
