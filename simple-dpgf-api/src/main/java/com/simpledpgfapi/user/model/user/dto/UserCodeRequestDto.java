package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.global.exceptions.CodeErrorConstant;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserCodeRequestDto {
    @NotNull(message = CodeErrorConstant.EMAIL_REQUIRED)
    @Email(message = CodeErrorConstant.INVALID_EMAIL_FORMAT)
    private String email;
}
