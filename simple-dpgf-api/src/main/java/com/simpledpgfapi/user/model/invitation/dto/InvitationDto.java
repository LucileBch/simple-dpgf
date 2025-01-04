package com.simpledpgfapi.user.model.invitation.dto;

import com.simpledpgfapi.user.model.invitation.InvitationStatusEnum;
import lombok.Data;

@Data
public class InvitationDto {
    private String id;
    private String firstName;
    private String lastName;
    private String emailReceiver;
    private InvitationStatusEnum invitationStatus = InvitationStatusEnum.PENDING;
}
