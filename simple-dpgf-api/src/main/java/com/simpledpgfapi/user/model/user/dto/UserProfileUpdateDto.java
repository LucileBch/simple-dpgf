package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.global.exceptions.CodeErrorConstant;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
    @Size(min = 8, max = 20, message = CodeErrorConstant.PASSWORD_BETWEEN_8_AND_20)
    @Pattern(regexp = ".*[A-Z].*", message = CodeErrorConstant.PASSWORD_ONE_UPPERCASE)
    @Pattern(regexp = ".*[a-z].*", message = CodeErrorConstant.PASSWORD_ONE_LOWERCASE)
    @Pattern(regexp = ".*[0-9].*", message = CodeErrorConstant.PASSWORD_ONE_NUMBER)
    @Pattern(regexp = ".*[@$!%*?&].*", message = CodeErrorConstant.PASSWORD_ONE_SPECIAL_CHAR)
    private String newPassword;
}
