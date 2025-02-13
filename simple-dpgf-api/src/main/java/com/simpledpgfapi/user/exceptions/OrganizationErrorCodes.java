package com.simpledpgfapi.user.exceptions;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum OrganizationErrorCodes implements ErrorCodes {
    ORGANIZATION_NOT_FOUND,
    NOT_IN_THIS_ORGANIZATION,
    ORGANIZATION_ALREADY_DELETED;

    @Override
    public String getCode() {
        return name();
    }
}
