//import { InvitationStatusEnum } from "../../enums/InvitationStatusEnum";

import { RoleEnum } from "../../enums/RoleEnum";

export interface UserDetailsDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleEnum;
}
