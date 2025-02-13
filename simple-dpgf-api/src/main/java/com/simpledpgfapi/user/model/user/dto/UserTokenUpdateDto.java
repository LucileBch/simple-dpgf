package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.user.model.role.RoleEnum;
import lombok.Data;

@Data
public class UserTokenUpdateDto {
    String id;
    String firstName;
    String lastName;
    String email;
    RoleEnum role;
    String accessToken;
    String refreshToken;
}
