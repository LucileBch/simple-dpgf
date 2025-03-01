package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.global.exceptions.CodeErrorConstant;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserProfileUpdateDto {
    @NotNull(message = CodeErrorConstant.FIELD_REQUIRED)
    private String firstName;
    @NotNull(message = CodeErrorConstant.FIELD_REQUIRED)
    private String lastName;
    @NotNull(message = CodeErrorConstant.EMAIL_REQUIRED)
    @Email(message = CodeErrorConstant.INVALID_EMAIL_FORMAT)
    private String email;
    @NotNull(message = CodeErrorConstant.PASSWORD_REQUIRED)
    private String oldPassword;
    private String newPassword;
}
