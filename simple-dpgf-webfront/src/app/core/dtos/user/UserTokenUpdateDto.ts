import { RoleEnum } from "../../enums/RoleEnum";

export interface UserTokenUpdateDto {
  id: string;
  email: string;
  role: RoleEnum;
  accessToken?: string;
  refreshToken?: string;
}
