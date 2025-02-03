package com.simpledpgfapi.user.controller;

import com.simpledpgfapi.user.model.user.dto.*;
import com.simpledpgfapi.user.model.validation.dto.AccountValidationCodeDto;
import com.simpledpgfapi.user.service.AuthenticationService;
import com.simpledpgfapi.user.service.RefreshTokenService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "User created"), @ApiResponse(responseCode = "400", description = "[USER_ALREADY_EXISTS]")})
    public UserDto createOrganizationManager(@RequestBody UserCreationDto userCreationDto) {
        log.info("userCreationDto created");
        return authenticationService.createUser(userCreationDto);
    }

    // ACTIVATE ACCOUNT
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @PostMapping("/activate-account")
    @ApiResponses(value = {@ApiResponse(responseCode = "202", description = "Activation code accepted"),
            @ApiResponse(responseCode = "400", description = "[INVALID_CODE], [CODE_EXPIRED]"),
            @ApiResponse(responseCode = "404", description = "[USER_NOT_FOUND]")})
    public void activateAccount(@RequestBody AccountValidationCodeDto accountValidationCodeDto) {
        authenticationService.activateUserAccount(accountValidationCodeDto);
        log.info("User account activated");
    }

    // REQUEST NEW VALIDATION CODE
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @PostMapping("/code-request")

    public void getNewAccountValidation(@RequestBody UserCodeRequestDto userCodeRequestDto) {
        authenticationService.generateNewAccountValidationCode(userCodeRequestDto);
    }

    // SIGNIN
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @PostMapping("/signin")
    @ApiResponses(value = {@ApiResponse(responseCode = "202", description = "User authenticated"),
        @ApiResponse(responseCode = "400", description = "[USER_ACCOUNT_NOT_ACTIVATED], [USER_NOT_AUTHENTICATED]")})
    public ResponseEntity<Map<String, Object>> authenticateUser(@Valid @RequestBody UserAuthenticationDto userAuthenticationDto) {
        return authenticationService.authenticateUser(userAuthenticationDto);
    }

    // REFRESH TOKEN
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @PostMapping("/refresh-token")
    @ApiResponses(value = {@ApiResponse(responseCode = "202", description = "New access token generated"),
            @ApiResponse(responseCode = "400", description = "[REFRESH_TOKEN_NOT_FOUND], [USER_NOT_FOUND]"),
            @ApiResponse(responseCode = "401", description = "REFRESH_TOKEN_EXPIRED")})
    public Map<String, String> refreshToken(HttpServletRequest httpServletRequest){
        return refreshTokenService.generateNewAccessToken(httpServletRequest);
    }

    // SIGNOUT
    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping("/signout")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "User successfully signed out"),
            @ApiResponse(responseCode = "400", description = "[REFRESH_TOKEN_NOT_FOUND], [REFRESH_TOKEN_NOT_IN_COOKIE]"),
            @ApiResponse(responseCode = "401", description = "[USER_NOT_AUTHENTICATED]")})
    public void signOut(HttpServletRequest httpServletRequest){
        authenticationService.signOutUserAndRevokeRefreshToken(httpServletRequest);
    }

    // UPDATE PASSWORD
    @ResponseStatus(value = HttpStatus.OK)
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Code sent"),
            @ApiResponse(responseCode = "400", description = "[USER_NOT_FOUND]")})
    @PostMapping("/update-password-request")
    public void updatePasswordRequest(@RequestBody UserCodeRequestDto userCodeRequestDto) {
        authenticationService.sendCodeForPasswordUpdate(userCodeRequestDto);
    }

    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @ApiResponses(value = {@ApiResponse(responseCode = "202", description = "New password registered"),
            @ApiResponse(responseCode = "400", description = "[USER_NOT_FOUND], [INVALID_CODE], [CODE_EXPIRED]")})
    @PostMapping("/generate-new-password")
    public void updateUserPassword(@RequestBody UserUpdatePasswordDto userUpdatePasswordDto) {
        authenticationService.updateUserPassword(userUpdatePasswordDto);
    }
}
