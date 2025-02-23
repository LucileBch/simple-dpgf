package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.global.exceptions.CodeErrorConstant;
import com.simpledpgfapi.user.model.organization.dto.OrganizationCreationDto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserCreationDto {
    @NotNull
    @Size(max = 250, message = CodeErrorConstant.NAME_FIELD_TOO_LONG)
    private String firstName;
    @NotNull
    @Size(max = 250, message = CodeErrorConstant.LAST_NAME_FIELD_TOO_LONG)
    private String lastName;
    @NotNull
    @Size(max = 50, message = CodeErrorConstant.EMAIL_FIELD_TOO_LONG)
    @Email(message = CodeErrorConstant.INVALID_EMAIL_FORMAT)
    private String email;
    @NotNull(message = CodeErrorConstant.PASSWORD_REQUIRED)
    @Size(min = 8, max = 20, message = "Le mot de passe doit contenir entre 8 et 20 caractères")
    @Pattern(regexp = ".*[A-Z].*", message = "Le mot de passe doit contenir au moins une majuscule")
    @Pattern(regexp = ".*[a-z].*", message = "Le mot de passe doit contenir au moins une minuscule")
    @Pattern(regexp = ".*[0-9].*", message = "Le mot de passe doit contenir au moins un chiffre")
    @Pattern(regexp = ".*[@$!%*?&].*", message = "Le mot de passe doit contenir au moins un caractère spécial")
    private String password;
    @NotNull
    private OrganizationCreationDto organization;
}
