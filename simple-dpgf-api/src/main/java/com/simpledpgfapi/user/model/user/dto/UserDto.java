package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.user.model.organization.dto.OrganizationDto;
import com.simpledpgfapi.user.model.role.RoleEnum;
import lombok.Data;

@Data
public class UserDto {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private OrganizationDto organization;
    private RoleEnum role;
}
