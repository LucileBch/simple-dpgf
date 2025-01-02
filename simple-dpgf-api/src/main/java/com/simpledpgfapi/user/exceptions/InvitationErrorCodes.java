package com.simpledpgfapi.user.exceptions;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum InvitationErrorCodes implements ErrorCodes {
    INVITATION_NOT_FOUND,
    INVITATION_CONSUMED,
    INVITATION_CANCELLED,
    INVITATION_ALREADY_ACCEPTED;

    @Override
    public String getCode() {
        return name();
    }
}
