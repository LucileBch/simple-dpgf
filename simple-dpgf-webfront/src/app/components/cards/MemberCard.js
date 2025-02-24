import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, CardContent, Typography } from "@mui/material";
import OutlinedButton from "../buttons/OutlinedButton";
import { InvitationStatusEnum, invitationStatusToLabel, } from "../../core/enums/InvitationStatusEnum";
import { theme } from "../../styles/theme";
import { useCallback, useContext, useState } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import InvitationDialog from "../modals/InvitationDialog";
export default function MemberCard({ invitedMember, }) {
    const { isDeleteDialogOpen, setIsDeleteDialogOpen } = useContext(DialogContext);
    const [dialogOption, setDialogOption] = useState(null);
    const handleOpenInvitationDialog = useCallback((option) => {
        setIsDeleteDialogOpen(true);
        setDialogOption(option);
    }, [setIsDeleteDialogOpen]);
    return (_jsx(Card, { children: _jsxs(CardContent, { sx: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                maxHeight: "60px",
            }, children: [_jsxs(Box, { sx: {
                        display: "flex",
                        justifyContent: "space-evenly",
                        width: "50%",
                    }, children: [_jsx(Typography, { children: invitedMember.firstName }), _jsx(Typography, { children: invitedMember.lastName }), _jsx(Typography, { children: invitedMember.emailReceiver }), _jsx(Typography, { sx: {
                                color: invitedMember.invitationStatus === InvitationStatusEnum.CONSUMED
                                    ? theme.palette.success.main
                                    : theme.palette.error.main,
                            }, children: invitationStatusToLabel(invitedMember.invitationStatus) })] }), _jsxs(Box, { sx: {
                        display: "flex",
                        justifyContent: "space-evenly",
                        width: "30%",
                    }, children: [invitedMember.invitationStatus === InvitationStatusEnum.CONSUMED ? (_jsx(OutlinedButton, { label: "Supprimer le membre", onClick: () => handleOpenInvitationDialog("deleteMember") })) : (_jsx(OutlinedButton, { label: "Supprimer l'invitation", onClick: () => handleOpenInvitationDialog("deleteInvitation") })), isDeleteDialogOpen && dialogOption && (_jsx(InvitationDialog, { dialogTitle: dialogOption === "deleteMember"
                                ? "Etes-vous sur de vouloir supprimer ce collaborateur ?"
                                : "Etes-vous sur de vouloir annuler cette invitation ?", dialogOption: dialogOption, invitationId: invitedMember.id }))] })] }) }));
}
