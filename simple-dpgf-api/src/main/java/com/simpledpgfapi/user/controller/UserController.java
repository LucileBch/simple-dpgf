package com.simpledpgfapi.user.controller;

import com.simpledpgfapi.user.model.user.dto.UserProfileUpdateDto;
import com.simpledpgfapi.user.model.user.dto.UserTokenUpdateDto;
import com.simpledpgfapi.user.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PutMapping("/{userId}")
    @ResponseStatus(value = HttpStatus.OK)
    public UserTokenUpdateDto updateUserProfile(@PathVariable ObjectId userId,
                                                @Valid @RequestBody UserProfileUpdateDto userProfileUpdateDto) {
        return userService.updateUserInfoById(userId, userProfileUpdateDto);
    }

}
