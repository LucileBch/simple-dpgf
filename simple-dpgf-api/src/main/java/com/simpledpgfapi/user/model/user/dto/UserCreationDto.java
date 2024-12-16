package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.global.exceptions.CodeErrorConstant;
import com.simpledpgfapi.user.model.organization.dto.OrganizationCreationDto;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserCreationDto {
    @NotNull
    @Size(max = 250, message = CodeErrorConstant.NAME_FIELD_TOO_LONG)
    private String firstName;
    @NotNull
    @Size(max = 250, message = CodeErrorConstant.LAST_NAME_FIELD_TOO_LONG)
    private String lastName;
    @NotNull
    @Size(max = 250, message = CodeErrorConstant.EMAIL_FIELD_TOO_LONG)
    private String email;
    @NotNull
    @Size(max = 250, message = CodeErrorConstant.PASSWORD_FIELD_TOO_LONG)
    private String password;
    @NotNull
    private OrganizationCreationDto organization;
}
