package com.simpledpgfapi.user.exceptions;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum AccountValidationErrorCodes implements ErrorCodes {
    CODE_EXPIRED,
    INVALID_CODE, SENDING_PROBLEM;

    @Override
    public String getCode() {
        return name();
    }
}
