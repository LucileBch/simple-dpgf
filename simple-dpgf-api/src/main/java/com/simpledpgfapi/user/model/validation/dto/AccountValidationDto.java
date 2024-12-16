package com.simpledpgfapi.user.model.validation.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AccountValidationDto {
    @NotEmpty(message = "Activation code is required")
    private String activationCode;
}
