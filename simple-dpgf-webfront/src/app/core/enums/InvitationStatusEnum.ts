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
