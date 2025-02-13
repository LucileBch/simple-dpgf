import { RoleEnum } from "../../enums/RoleEnum";

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleEnum;
}
