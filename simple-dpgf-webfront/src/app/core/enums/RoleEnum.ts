export enum RoleEnum {
  ADMIN = "ADMIN",
  ORGANIZATION_MANAGER = "ORGANIZATION_MANAGER",
  PROJECT_OWNER = "PROJECT_OWNER",
}

// TODO : voir si util ?
export const roleEnumTypeLabel = {
  [RoleEnum.ADMIN]: "Administrateur",
  [RoleEnum.ORGANIZATION_MANAGER]: "Manager de l'organisation",
  [RoleEnum.PROJECT_OWNER]: "Responsable projet",
};
