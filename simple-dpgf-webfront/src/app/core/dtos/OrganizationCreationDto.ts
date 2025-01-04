import { OrganizationTypeEnum } from "../enums/OrganizationTypeEnum";

export interface OrganizationCreationDto {
  organizationType: OrganizationTypeEnum;
  name: string;
}
