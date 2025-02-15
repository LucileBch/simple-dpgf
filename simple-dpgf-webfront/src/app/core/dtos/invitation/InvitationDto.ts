import { InvitationStatusEnum } from "../../enums/InvitationStatusEnum";

export interface InvitationDto {
  id: string;
  firstName: string;
  lastName: string;
  emailReceiver: string;
  invitationStatus: InvitationStatusEnum;
}
