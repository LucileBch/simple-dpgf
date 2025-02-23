package com.simpledpgfapi.global.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
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

    // @Valid pattern handler exception
    // returns only the first error because in front i display only on snack alert
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        FieldError firstError = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()  // Récupérer la première erreur
                .orElse(null);

        if (firstError != null) {
            return new ResponseEntity<>(firstError.getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("SOME_ERROR", HttpStatus.BAD_REQUEST);
    }

}