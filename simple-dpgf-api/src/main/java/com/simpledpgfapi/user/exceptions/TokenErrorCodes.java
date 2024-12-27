package com.simpledpgfapi.user.exceptions;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum TokenErrorCodes implements ErrorCodes {
    REFRESH_TOKEN_EXPIRED, REFRESH_TOKEN_NOT_FOUND;

    @Override
    public String getCode() {
        return name();
    }
}
