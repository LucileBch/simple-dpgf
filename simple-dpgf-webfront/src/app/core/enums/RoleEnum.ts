export enum RoleEnum {
  ADMIN = "MOA",
  ORGANIZATION_MANAGER = "ENTREPRISE",
  PROJECT_OWNER = "PROJECT_OWNER",
}

// TODO : voir si util ?
export const roleEnumTypeLabel = {
  [RoleEnum.ADMIN]: "Administrateur",
  [RoleEnum.ORGANIZATION_MANAGER]: "Manager de l'organisation",
  [RoleEnum.PROJECT_OWNER]: "Responsable projet",
};
