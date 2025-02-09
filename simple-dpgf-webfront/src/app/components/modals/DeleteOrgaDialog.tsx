import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import OutlinedButton from "../buttons/OutlinedButton";
import { useCallback, useContext } from "react";
import { OrganizationContext } from "../../core/contexts/organization-context";
import { DialogContext } from "../../core/contexts/dialog-context";
import { useOrganization } from "../../core/hooks/use-organization";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../core/appConstants";

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

  const { setOrganizationList } = useContext(OrganizationContext);
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
      }, 2000);
    } catch (error) {
      console.log("error delete dialog", error);
      setAlertMessage("Une erreur est survenue");
      setOpenAlert(true);
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
      <DialogActions>
        <OutlinedButton label="Annuler" onClick={handleCancelAndClose} />
        <OutlinedButton label="Confirmer" onClick={handleSubmitAndClose} />
      </DialogActions>
    </Dialog>
  );
}
