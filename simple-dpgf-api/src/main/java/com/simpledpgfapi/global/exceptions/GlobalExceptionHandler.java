package com.simpledpgfapi.global.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // HttpException customized handler exception
    @ExceptionHandler(HttpException.class)
    public ResponseEntity<String> handleHttpException(HttpException ex) {
        String errorMessage = ex.getReason();
        HttpStatus status = HttpStatus.valueOf(ex.getStatusCode().value());
        return new ResponseEntity<>(errorMessage, status);
    }

    // 401 or 403 handle exception
    @ExceptionHandler(AuthenticationCredentialsNotFoundException.class)
    @ResponseBody
    public ResponseEntity<String> handleAuthenticationException(AuthenticationCredentialsNotFoundException ex) {
        String errorResponse ="UNAUTHORIZED";
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseBody
    public ResponseEntity<String> handleAccessDeniedException(AccessDeniedException ex) {
        String errorResponse = "FORBIDDEN";
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

    // incorrect password handle exception
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentialsException(BadCredentialsException ex) {
        return new ResponseEntity<>("EMAIL_OR_PASSWORD_INCORRECT", HttpStatus.UNAUTHORIZED);
    }

    // @Valid pattern handler exception
    // returns only the first error because in front I display only on snack alert
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        FieldError firstError = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .orElse(null);

        if (firstError != null) {
            return new ResponseEntity<>(firstError.getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("SOME_ERROR", HttpStatus.BAD_REQUEST);
    }
}