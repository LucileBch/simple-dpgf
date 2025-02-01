import { OrganizationCreationDto } from "../organization/OrganizationCreationDto";

export interface UserCreationDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organization: OrganizationCreationDto;
}
