package com.simpledpgfapi.user.exceptions;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum InvitationErrorCodes implements ErrorCodes {
    INVITATION_NOT_FOUND,
    INVITATION_CONSUMED,
    INVITATION_CANCELLED;

    @Override
    public String getCode() {
        return name();
    }
}
