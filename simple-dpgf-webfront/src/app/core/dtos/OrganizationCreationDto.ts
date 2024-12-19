import { OrganizationTypeEnum } from "../enum/OrganizationTypeEnum";

export interface OrganizationCreationDto {
  organizationType: OrganizationTypeEnum;
  name: string;
}
