package com.simpledpgfapi.dpgf.exceptions;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum DpgfErrorCodes implements ErrorCodes {
    DPGF_NOT_FOUND,
    DPGF_ALREADY_DELETED,
    DPGF_SHOULD_BE_ARCHIVED;

    @Override
    public String getCode() {
        return name();
    }
}
