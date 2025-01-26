//import { InvitationStatusEnum } from "../../enums/InvitationStatusEnum";

import { RoleEnum } from "../../enums/RoleEnum";

export interface UserDetailsDto {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  role: RoleEnum;
  //invitationStatus: InvitationStatusEnum;
}
