package com.simpledpgfapi.user.exceptions;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum RefreshTokenErrorCodes implements ErrorCodes {
    REFRESH_TOKEN_EXPIRED, REFRESH_TOKEN_NOT_FOUND, REFRESH_TOKEN_NOT_IN_COOKIE, REFRESH_TOKEN_REVOKED;

    @Override
    public String getCode() {
        return name();
    }
}
