package com.simpledpgfapi.user.exceptions;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum OrganizationErrorCodes implements ErrorCodes {
    ORGANIZATION_NOT_FOUND;

    @Override
    public String getCode() {
        return name();
    }
}
