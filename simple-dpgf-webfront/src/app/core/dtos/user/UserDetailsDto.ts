import { InvitationStatusEnum } from "../../enums/InvitationStatusEnum";

export interface UserDetailsDto {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  invitationStatus: InvitationStatusEnum;
}
