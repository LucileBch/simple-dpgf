export var RoleEnum;
(function (RoleEnum) {
    RoleEnum["ADMIN"] = "ADMIN";
    RoleEnum["ORGANIZATION_MANAGER"] = "ORGANIZATION_MANAGER";
    RoleEnum["PROJECT_OWNER"] = "PROJECT_OWNER";
})(RoleEnum || (RoleEnum = {}));
export const roleEnumTypeLabel = {
    [RoleEnum.ADMIN]: "Administrateur",
    [RoleEnum.ORGANIZATION_MANAGER]: "Manager de l'organisation",
    [RoleEnum.PROJECT_OWNER]: "Responsable projet",
};
