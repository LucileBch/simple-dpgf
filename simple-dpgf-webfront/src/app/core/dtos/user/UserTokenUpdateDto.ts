import { RoleEnum } from "../../enums/RoleEnum";

export interface UserTokenUpdateDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleEnum;
  accessToken?: string;
  refreshToken?: string;
}
