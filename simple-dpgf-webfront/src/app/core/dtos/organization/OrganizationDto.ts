import { OrganizationTypeEnum } from "../../enums/OrganizationTypeEnum";

export interface OrganizationDto {
  id: string;
  name: string;
  organizationType: OrganizationTypeEnum;
  memberLicenseCounter: number;
  maxMemberLicenseCounter: number;
  projectLicenseCounter: number;
  maxProjectLicenseCounter: number;
}
