import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useCallback, useContext } from "react";
import { AdminOrganizationContext } from "../../core/contexts/admin-organization-context";
import { DialogContext } from "../../core/contexts/dialog-context";
import { useOrganization } from "../../core/hooks/use-organization";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../core/appConstants";
import { theme } from "../../styles/theme";

interface IProps {
  dialogTitle: string;
  dialogContent?: string;
  organizationId: string;
}

export default function DeleteOrgaDialog({
  dialogTitle,
  dialogContent,
  organizationId,
}: Readonly<IProps>): JSX.Element {
  const navigate = useNavigate();

  const { setOrganizationList } = useContext(AdminOrganizationContext);
  const {
    isDeleteDialogOpen,
    isSubmitting,
    setIsSubmitting,
    setOpenAlert,
    setAlertMessage,
    handleCancelAndClose,
  } = useContext(DialogContext);

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

      setOrganizationList((prev) =>
        prev.filter((organization) => organizationId != organization.id)
      );

      setTimeout(() => {
        navigate(pagesUrl.ADMIN_ORGANIZATIONS_PAGE);
        setIsSubmitting(false);
      }, 2000);
    } finally {
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

  return (
    <Dialog
      open={isDeleteDialogOpen}
      onClose={handleCancelAndClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContentText id="alert-dialog-description">
        {dialogContent}
      </DialogContentText>
      <DialogActions
        sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}
      >
        <CheckIcon
          onClick={handleSubmitAndClose}
          sx={{
            fontSize: "30px",
            color: theme.palette.primary.main,
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
        <CloseIcon
          onClick={handleCancelAndClose}
          sx={{
            fontSize: "30px",
            color: theme.palette.error.main,
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
        {/* <OutlinedButton
          label="Annuler"
          onClick={handleCancelAndClose}
          disabled={isSubmitting}
        />
        <OutlinedButton label="Confirmer" onClick={handleSubmitAndClose} /> */}
      </DialogActions>
    </Dialog>
  );
}
