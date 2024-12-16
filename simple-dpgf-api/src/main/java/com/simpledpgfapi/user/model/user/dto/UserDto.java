package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.user.model.organization.dto.OrganizationDto;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserDto {
    @NotNull
    private String id;
    private String firstName;
    private String lastName;
    @NotNull
    private String email;
    @NotNull
    private OrganizationDto organization;
}
