package com.simpledpgfapi.user.controller;

import com.simpledpgfapi.user.model.user.dto.*;
import com.simpledpgfapi.user.model.validation.dto.AccountValidationCodeDto;
import com.simpledpgfapi.user.service.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "user")
public class UserController {
    @Autowired
    private UserService userService;

    // SIGNUP
    @PostMapping("/signup")
    @ResponseStatus(value = HttpStatus.CREATED)
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "User created"), @ApiResponse(responseCode = "400", description = "[USER_ALREADY_EXISTS]")})
    public UserDto createUserMoa(@RequestBody UserCreationDto userCreationDto) {
        log.info("userCreationDto created");
        return userService.createUser(userCreationDto);
    }

    // ACTIVATE ACCOUNT
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @PostMapping(path= "/activate-account")
    @ApiResponses(value = {@ApiResponse(responseCode = "202", description = "Activation code accepted"),
            @ApiResponse(responseCode = "400", description = "[INVALID_CODE], [CODE_EXPIRED]"),
            @ApiResponse(responseCode = "404", description = "[USER_NOT_FOUND]")})
    public void activateAccount(@RequestBody AccountValidationCodeDto accountValidationCodeDto) {
        userService.activateUserAccount(accountValidationCodeDto);
        log.info("User account activated");
    }

    // REQUEST NEW VALIDATION CODE
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @PostMapping(path= "/code-request")

    public void getNewAccountValidation(@RequestBody UserCodeRequestDto userCodeRequestDto) {
        userService.generateNewAccountValidationCode(userCodeRequestDto);
    }

    // SIGNIN
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @PostMapping(path= "/signin")
    @ApiResponses(value = {@ApiResponse(responseCode = "202", description = "User authenticated"),
        @ApiResponse(responseCode = "400", description = "[USER_ACCOUNT_NOT_ACTIVATED], [USER_NOT_AUTHENTICATED]")})
    public String authenticateUser(@Valid @RequestBody UserAuthenticationDto userAuthenticationDto) {
        return userService.authenticateUser(userAuthenticationDto);
    }

    // SIGNOUT


    // UPDATE PASSWORD
    @ResponseStatus(value = HttpStatus.OK)
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Code sent"),
            @ApiResponse(responseCode = "400", description = "[USER_NOT_FOUND]")})
    @PostMapping(path = "/update-password-request")
    public void updatePasswordRequest(@RequestBody UserCodeRequestDto userCodeRequestDto) {
        userService.sendCodeForPasswordUpdate(userCodeRequestDto);
    }

    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @ApiResponses(value = {@ApiResponse(responseCode = "202", description = "New password registered"),
            @ApiResponse(responseCode = "400", description = "[USER_NOT_FOUND], [INVALID_CODE], [CODE_EXPIRED]")})
    @PostMapping(path = "/generate-new-password")
    public void updateUserPassword(@RequestBody UserUpdatePasswordDto userUpdatePasswordDto) {
        userService.updateUserPassword(userUpdatePasswordDto);
    }


}
