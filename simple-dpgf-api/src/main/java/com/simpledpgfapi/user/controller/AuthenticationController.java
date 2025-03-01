package com.simpledpgfapi.user.controller;

import com.simpledpgfapi.user.model.user.dto.*;
import com.simpledpgfapi.user.model.validation.dto.AccountValidationCodeDto;
import com.simpledpgfapi.user.service.AuthenticationService;
import com.simpledpgfapi.user.service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private RefreshTokenService refreshTokenService;

    // SIGNUP
    @PostMapping("/signup")
    @ResponseStatus(value = HttpStatus.CREATED)
    public UserDto createOrganizationManager(@Valid @RequestBody UserCreationDto userCreationDto) {
        log.info("userCreationDto created");
        return authenticationService.createUser(userCreationDto);
    }

    // ACTIVATE ACCOUNT
    @PostMapping("/activate-account")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void activateAccount(@RequestBody AccountValidationCodeDto accountValidationCodeDto) {
        authenticationService.activateUserAccount(accountValidationCodeDto);
        log.info("User account activated");
    }

    // REQUEST NEW VALIDATION CODE
    @PostMapping("/new-code-request")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void getNewAccountValidation(@RequestBody UserCodeRequestDto userCodeRequestDto) {
        authenticationService.generateNewAccountValidationCode(userCodeRequestDto);
    }

    // SIGNIN
    @PostMapping("/signin")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public ResponseEntity<Map<String, Object>> authenticateUser(@Valid @RequestBody UserAuthenticationDto userAuthenticationDto) {
        return authenticationService.authenticateUser(userAuthenticationDto);
    }

    // REFRESH TOKEN
    //TODO: renvoyer un TokenDto
    @PostMapping("/refresh-token")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public Map<String, String> refreshToken(HttpServletRequest httpServletRequest){
        return refreshTokenService.generateNewAccessToken(httpServletRequest);
    }

    // SIGNOUT
    @PostMapping("/signout")
    @ResponseStatus(value = HttpStatus.OK)
    public void signOut(HttpServletRequest httpServletRequest){
        authenticationService.signOutUserAndRevokeRefreshToken(httpServletRequest);
    }

    // UPDATE PASSWORD
    @PostMapping("/forgot-password-request")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void forgotPasswordRequest(@RequestBody UserCodeRequestDto userCodeRequestDto) {
        authenticationService.sendCodeNewPasswordRequest(userCodeRequestDto);
    }

    @PostMapping("/create-new-password")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void updateUserForgottenPassword(@Valid @RequestBody UserPasswordResetDto userPasswordResetDto) {
        authenticationService.updateUserNewPassword(userPasswordResetDto);
    }
}
