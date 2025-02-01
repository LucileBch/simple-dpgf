package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.user.model.role.RoleEnum;
import lombok.Data;

@Data
public class UserDetailsDto {
    private String id;
    private String email;
    private RoleEnum role;
}
