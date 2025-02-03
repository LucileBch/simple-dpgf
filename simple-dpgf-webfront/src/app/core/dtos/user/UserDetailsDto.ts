//import { InvitationStatusEnum } from "../../enums/InvitationStatusEnum";

import { RoleEnum } from "../../enums/RoleEnum";

export interface UserDetailsDto {
  _id: string;
  email: string;
  role: RoleEnum;
}
