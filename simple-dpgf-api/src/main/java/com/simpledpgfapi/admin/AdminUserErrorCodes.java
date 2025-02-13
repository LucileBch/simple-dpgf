package com.simpledpgfapi.admin;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum AdminUserErrorCodes implements ErrorCodes {
    ADMIN_USER_ALREADY_EXISTS,
    ADMIN_USER_NOT_FOUND;

    @Override
    public String getCode() {
        return name();
    }
}
