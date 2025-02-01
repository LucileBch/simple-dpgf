package com.simpledpgfapi.user.controller;

import com.simpledpgfapi.user.model.user.dto.UserDetailsDto;
import com.simpledpgfapi.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserService userService;

    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @GetMapping
    public UserDetailsDto getUserDetails() {
     return userService.getUserInfos();
    }
}
