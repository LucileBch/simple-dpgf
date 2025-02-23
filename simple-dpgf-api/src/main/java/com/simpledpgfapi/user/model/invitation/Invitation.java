package com.simpledpgfapi.user.model.invitation;

import com.simpledpgfapi.global.model.BaseEntity;
import com.simpledpgfapi.user.model.role.RoleEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Invitation extends BaseEntity {
    public static final String INVIT_TOKEN = "invitationToken";
    public static final String ORGANIZATION_ID = "organizationId";
    public static final String EMAIL_RECEIVER = "emailReceiver";

    @Id
    private ObjectId id;
    private String emailSender;
    private String firstName;
    private String lastName;
    private String emailReceiver;
    private String invitationToken;
    private RoleEnum role;
    private ObjectId organizationId;
    private InvitationStatusEnum invitationStatus = InvitationStatusEnum.PENDING;
}
