package com.simpledpgfapi.user.exceptions;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum UserErrorCodes implements ErrorCodes {
    USER_NOT_FOUND,
    USER_ALREADY_EXISTS,
    USER_ACCOUNT_ALREADY_ACTIVATED,
    USER_ACCOUNT_NOT_ACTIVATED,
    USER_NOT_AUTHENTICATED,
    USER_NOT_AUTHORIZED,
    USER_DELETED,
    USER_WRONG_PASSWORD,
    USER_OLD_PASSWORD_REQUIRED,
    USER_NEW_PASSWORD_EQUALS_OLD,
    PASSWORD_BETWEEN_8_AND_20,
    PASSWORD_ONE_UPPERCASE,
    PASSWORD_ONE_LOWERCASE,
    PASSWORD_ONE_NUMBER,
    PASSWORD_ONE_SPECIAL_CHAR;

    @Override
    public String getCode() {
        return name();
    }
}
