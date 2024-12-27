package com.simpledpgfapi.user.model.refreshtoken.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RefreshTokenDto {
    @NotNull
    private String refreshToken;
}
