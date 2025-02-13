package com.simpledpgfapi.user.model.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserProfileUpdateDto {
    @NotNull(message = "Le champ ne peut pas être vide")
    private String firstName;
    @NotNull(message = "Le champ ne peut pas être vide")
    private String lastName;
    @NotNull(message = "Le champ ne peut pas être vide")
    private String email;
    @NotNull(message = "Le champ ne peut pas être vide")
    private String oldPassword;
    @NotNull(message = "Le champ ne peut pas être vide")
    private String newPassword;
}
