package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.global.exceptions.CodeErrorConstant;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserInvitedDto {
    @NotNull
    @Size(max = 250, message = CodeErrorConstant.NAME_FIELD_TOO_LONG)
    private String firstName;
    @NotNull
    @Size(max = 250, message = CodeErrorConstant.LAST_NAME_FIELD_TOO_LONG)
    private String lastName;
    @NotNull
    @Size(max = 250, message = CodeErrorConstant.EMAIL_FIELD_TOO_LONG)
    private String email;
    @NotNull
    @Size(max = 250, message = CodeErrorConstant.PASSWORD_FIELD_TOO_LONG)
    private String password;
}
