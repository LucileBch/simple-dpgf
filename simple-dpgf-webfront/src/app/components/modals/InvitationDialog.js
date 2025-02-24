import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogActions, DialogContentText, DialogTitle, } from "@mui/material";
import OutlinedButton from "../buttons/OutlinedButton";
import { useCallback, useContext } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import { OrganizationContext } from "../../core/contexts/organization-context";
import { useNavigate, useParams } from "react-router-dom";
import { pagesUrl } from "../../core/appConstants";
import { resolveUrl } from "../../core/services/http-service";
export default function InvitationDialog({ dialogTitle, dialogContent, dialogOption, invitationId, }) {
    const navigate = useNavigate();
    const { organizationId } = useParams();
    const { isDeleteDialogOpen, isSubmitting, setIsSubmitting, setOpenAlert, setAlertMessage, handleCancelAndClose, } = useContext(DialogContext);
    const { setOrganization, deleteTeamMember, cancelInvitation } = useContext(OrganizationContext);
    const handleSubmitAndClose = useCallback(async () => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        setAlertMessage(null);
        setOpenAlert(false);
        try {
            if (dialogOption === "deleteMember" && organizationId != undefined) {
                console.log("appel delete memner", organizationId, invitationId);
                await deleteTeamMember(organizationId, invitationId);
                setOrganization((prev) => prev
                    ? { ...prev, memberLicenseCounter: prev.memberLicenseCounter - 1 }
                    : prev);
                setAlertMessage("Collaborateur supprimé de l'équipe");
                setOpenAlert(true);
            }
            else if (dialogOption === "deleteInvitation") {
                await cancelInvitation(invitationId);
                setOrganization((prev) => prev
                    ? { ...prev, memberLicenseCounter: prev.memberLicenseCounter - 1 }
                    : prev);
                setAlertMessage("Invitation annulée");
                setOpenAlert(true);
            }
            setTimeout(() => {
                navigate(resolveUrl(pagesUrl.MOA_MANAGER_TEAM_PAGE, [organizationId]));
                setIsSubmitting(false);
            }, 2000);
        }
        finally {
            setIsSubmitting(false);
        }
    }, [
        isSubmitting,
        setIsSubmitting,
        setAlertMessage,
        setOpenAlert,
        dialogOption,
        organizationId,
        invitationId,
        deleteTeamMember,
        setOrganization,
        cancelInvitation,
        navigate,
    ]);
    return (_jsxs(Dialog, { open: isDeleteDialogOpen, onClose: handleCancelAndClose, children: [_jsx(DialogTitle, { children: dialogTitle }), _jsx(DialogContentText, { children: dialogContent }), _jsxs(DialogActions, { children: [_jsx(OutlinedButton, { label: "Annuler", onClick: handleCancelAndClose, disabled: isSubmitting }), _jsx(OutlinedButton, { label: "Confirmer", onClick: handleSubmitAndClose })] })] }));
}
