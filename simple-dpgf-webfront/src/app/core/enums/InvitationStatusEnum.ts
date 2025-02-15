export enum InvitationStatusEnum {
  PENDING = "PENDING",
  CONSUMED = "CONSUMED",
  CANCELLED = "CANCELLED",
}

export const invitationStatusEnumLabels = {
  [InvitationStatusEnum.PENDING]: "En attente",
  [InvitationStatusEnum.CONSUMED]: "Acceptée",
  [InvitationStatusEnum.CANCELLED]: "Annulée",
};

export function invitationStatusToLabel(
  invitationStatus: InvitationStatusEnum
) {
  switch (invitationStatus) {
    case InvitationStatusEnum.PENDING:
      return "En attente";
    case InvitationStatusEnum.CONSUMED:
      return "Acceptée";
    case InvitationStatusEnum.CANCELLED:
      return "Annulée";
    default:
      return "Non spécifié";
  }
}
