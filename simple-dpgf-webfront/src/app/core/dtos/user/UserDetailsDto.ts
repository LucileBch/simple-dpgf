//import { InvitationStatusEnum } from "../../enums/InvitationStatusEnum";

import { RoleEnum } from "../../enums/RoleEnum";

export interface UserDetailsDto {
  id: string;
  email: string;
  role: RoleEnum;
}
