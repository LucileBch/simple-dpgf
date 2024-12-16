package com.simpledpgfapi.global.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class HttpException extends ResponseStatusException {
    public HttpException(HttpStatus statusCode, ErrorCodes errorCode) {
        super(statusCode, errorCode.name());
    }
}
