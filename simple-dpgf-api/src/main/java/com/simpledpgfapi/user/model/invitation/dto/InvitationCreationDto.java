package com.simpledpgfapi.user.model.invitation.dto;

import lombok.Data;

@Data
public class InvitationCreationDto {
    private String firstName;
    private String lastName;
    private String emailReceiver;
}
