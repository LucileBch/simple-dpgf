package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.global.exceptions.CodeErrorConstant;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserPasswordResetDto {
    @NotNull(message = CodeErrorConstant.EMAIL_REQUIRED)
    @Email(message = CodeErrorConstant.INVALID_EMAIL_FORMAT)
    private String email;
    @NotNull(message = CodeErrorConstant.PASSWORD_REQUIRED)
    @Size(min = 8, max = 20, message = "Le mot de passe doit contenir entre 8 et 20 caractères")
    @Pattern(regexp = ".*[A-Z].*", message = "Le mot de passe doit contenir au moins une majuscule")
    @Pattern(regexp = ".*[a-z].*", message = "Le mot de passe doit contenir au moins une minuscule")
    @Pattern(regexp = ".*[0-9].*", message = "Le mot de passe doit contenir au moins un chiffre")
    @Pattern(regexp = ".*[@$!%*?&].*", message = "Le mot de passe doit contenir au moins un caractère spécial")
    private String password;
    @NotNull(message = CodeErrorConstant.ACTIVATION_CODE_REQUIRED)
    private String activationCode;
}
