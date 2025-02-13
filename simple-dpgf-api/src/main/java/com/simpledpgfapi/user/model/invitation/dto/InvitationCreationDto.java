package com.simpledpgfapi.user.model.invitation.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InvitationCreationDto {
    @NotNull(message = "firstName is required")
    private String firstName;
    @NotNull(message = "lastName is required")
    private String lastName;
    @NotNull(message = "emailReceiver is required")
    private String emailReceiver;
}
