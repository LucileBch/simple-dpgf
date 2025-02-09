package com.simpledpgfapi.user.model.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserPasswordResetDto {
    @NotNull(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    @NotNull(message = "Password is required")
    private String password;
    @NotNull(message = "Activation code is required")
    private String activationCode;
}
