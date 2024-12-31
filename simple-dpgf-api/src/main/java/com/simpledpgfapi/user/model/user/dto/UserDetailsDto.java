package com.simpledpgfapi.user.model.user.dto;

import com.simpledpgfapi.user.model.invitation.InvitationStatusEnum;
import lombok.Data;

@Data
public class UserDetailsDto {
    private String firstName;
    private String lastName;
    private String email;
    private InvitationStatusEnum invitationStatus;
}
