package com.simpledpgfapi.user.exceptions;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum OrganizationErrorCodes implements ErrorCodes {
    ORGANIZATION_NOT_FOUND,
    NOT_IN_THIS_ORGANIZATION,
    ORGANIZATION_ALREADY_DELETED,
    NO_MORE_USER_LICENSE,
    NO_MORE_PROJECT_LICENSE,
    USER_NOT_IN_ORGANIZATION;

    @Override
    public String getCode() {
        return name();
    }
}
