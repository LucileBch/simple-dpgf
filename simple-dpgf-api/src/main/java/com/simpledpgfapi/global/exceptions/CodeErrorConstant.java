package com.simpledpgfapi.global.exceptions;

public class CodeErrorConstant {
    public static final String EMAIL_FIELD_TOO_LONG = "EMAIL_FIELD_TOO_LONG";
    public static final String LAST_NAME_FIELD_TOO_LONG = "LAST_NAME_FIELD_TOO_LONG";
    public static final String NAME_FIELD_TOO_LONG = "NAME_FIELD_TOO_LONG";
    public static final String INVALID_EMAIL_FORMAT = "INVALID_EMAIL_FORMAT";
    public static final String EMAIL_REQUIRED = "EMAIL_REQUIRED";
    public static final String PASSWORD_REQUIRED = "PASSWORD_REQUIRED";
    public static final String ACTIVATION_CODE_REQUIRED = "ACTIVATION_CODE_REQUIRED";
    public static final String FIELD_REQUIRED = "FIELD_CANNOT_BE_EMPTY";
    public static final String PASSWORD_ONE_NUMBER = "PASSWORD_ONE_NUMBER";
    public static final String PASSWORD_ONE_SPECIAL_CHAR = "PASSWORD_ONE_SPECIAL_CHAR";
    public static final String PASSWORD_BETWEEN_8_AND_20 = "PASSWORD_BETWEEN_8_AND_20";
    public static final String PASSWORD_ONE_UPPERCASE = "PASSWORD_ONE_UPPERCASE";
    public static final String PASSWORD_ONE_LOWERCASE = "PASSWORD_ONE_LOWERCASE";
    public static final String MUST_BE_POSITIV_NUMBER = "MUST_BE_POSITIV_NUMBER";

    private CodeErrorConstant() {
    }
}
