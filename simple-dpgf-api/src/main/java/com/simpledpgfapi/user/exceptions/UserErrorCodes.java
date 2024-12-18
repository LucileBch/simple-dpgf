package com.simpledpgfapi.user.exceptions;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum UserErrorCodes implements ErrorCodes {
    USER_NOT_FOUND,
    USER_ALREADY_EXISTS,
    USER_ACCOUNT_NOT_ACTIVATED,
    USER_NOT_AUTHENTICATED;

    @Override
    public String getCode() {
        return name();
    }
}
