export var InvitationStatusEnum;
(function (InvitationStatusEnum) {
    InvitationStatusEnum["PENDING"] = "PENDING";
    InvitationStatusEnum["CONSUMED"] = "CONSUMED";
    InvitationStatusEnum["CANCELLED"] = "CANCELLED";
})(InvitationStatusEnum || (InvitationStatusEnum = {}));
export const invitationStatusEnumLabels = {
    [InvitationStatusEnum.PENDING]: "En attente",
    [InvitationStatusEnum.CONSUMED]: "Acceptée",
    [InvitationStatusEnum.CANCELLED]: "Annulée",
};
export function invitationStatusToLabel(invitationStatus) {
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
