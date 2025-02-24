import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogActions, DialogContentText, DialogTitle, } from "@mui/material";
import { useCallback, useContext } from "react";
import { AdminOrganizationContext } from "../../core/contexts/admin-organization-context";
import { DialogContext } from "../../core/contexts/dialog-context";
import { useOrganization } from "../../core/hooks/use-organization";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../core/appConstants";
import { theme } from "../../styles/theme";
export default function DeleteOrgaDialog({ dialogTitle, dialogContent, organizationId, }) {
    const navigate = useNavigate();
    const { setOrganizationList } = useContext(AdminOrganizationContext);
    const { isDeleteDialogOpen, isSubmitting, setIsSubmitting, setOpenAlert, setAlertMessage, handleCancelAndClose, } = useContext(DialogContext);
    const { deleteOrganizationById } = useOrganization();
    const handleSubmitAndClose = useCallback(async () => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        setAlertMessage(null);
        setOpenAlert(false);
        try {
            await deleteOrganizationById(organizationId);
            setAlertMessage("Organisation supprimée");
            setOpenAlert(true);
            setOrganizationList((prev) => prev.filter((organization) => organizationId != organization.id));
            setTimeout(() => {
                navigate(pagesUrl.ADMIN_ORGANIZATIONS_PAGE);
                setIsSubmitting(false);
            }, 2000);
        }
        finally {
            setIsSubmitting(false);
        }
    }, [
        deleteOrganizationById,
        isSubmitting,
        navigate,
        organizationId,
        setAlertMessage,
        setIsSubmitting,
        setOpenAlert,
        setOrganizationList,
    ]);
    return (_jsxs(Dialog, { open: isDeleteDialogOpen, onClose: handleCancelAndClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description", children: [_jsx(DialogTitle, { id: "alert-dialog-title", children: dialogTitle }), _jsx(DialogContentText, { id: "alert-dialog-description", children: dialogContent }), _jsxs(DialogActions, { sx: { display: "flex", justifyContent: "center", marginBottom: "10px" }, children: [_jsx(CheckIcon, { onClick: handleSubmitAndClose, sx: {
                            fontSize: "30px",
                            color: theme.palette.primary.main,
                            cursor: "pointer",
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.1)",
                            },
                        } }), _jsx(CloseIcon, { onClick: handleCancelAndClose, sx: {
                            fontSize: "30px",
                            color: theme.palette.error.main,
                            cursor: "pointer",
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.1)",
                            },
                        } })] })] }));
}
