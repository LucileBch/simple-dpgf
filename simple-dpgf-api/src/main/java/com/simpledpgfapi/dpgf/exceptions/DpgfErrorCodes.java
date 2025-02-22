package com.simpledpgfapi.dpgf.exceptions;

import com.simpledpgfapi.global.exceptions.ErrorCodes;

public enum DpgfErrorCodes implements ErrorCodes {
    DPGF_NOT_FOUND,
    DPGF_ALREADY_DELETED,
    DPGF_SHOULD_BE_ARCHIVED,
    DPGF_ARCHIVED,LOT_ALREADY_EXISTS,
    LOT_NOT_FOUND,
    PRODUCT_NOT_FOUND,
    DPGF_TOTAL_NEGATIV;

    @Override
    public String getCode() {
        return name();
    }
}
