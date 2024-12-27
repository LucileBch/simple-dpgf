package com.simpledpgfapi.user.model.refreshtoken.dto;

import lombok.Data;

@Data
public class RefreshTokenResponseDto {
    private String accessToken;
    private String refreshToken;

}
