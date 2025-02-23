package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.global.exceptions.CodeErrorConstant;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserAuthenticationDto {
    @NotNull(message = CodeErrorConstant.EMAIL_REQUIRED)
    private String email;
    @NotNull(message = CodeErrorConstant.PASSWORD_REQUIRED)
    private String password;
}
