import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import OutlinedButton from "../buttons/OutlinedButton";
import { useCallback, useContext } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import { OrganizationContext } from "../../core/contexts/organization-context";
import { useNavigate, useParams } from "react-router-dom";
import { pagesUrl } from "../../core/appConstants";
import { resolveUrl } from "../../core/services/http-service";

interface IProps {
  dialogTitle: string;
  dialogContent?: string;
  dialogOption: string;
  invitationId: string;
}

export default function InvitationDialog({
  dialogTitle,
  dialogContent,
  dialogOption,
  invitationId,
}: Readonly<IProps>): JSX.Element {
  const navigate = useNavigate();
  const { organizationId } = useParams();

  const {
    isDeleteDialogOpen,
    isSubmitting,
    setIsSubmitting,
    setOpenAlert,
    setAlertMessage,
    handleCancelAndClose,
  } = useContext(DialogContext);
  const { deleteTeamMember, cancelInvitation } =
    useContext(OrganizationContext);

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
        setAlertMessage("Collaborateur supprimé de l'équipe");
        setOpenAlert(true);
      } else if (dialogOption === "deleteInvitation") {
        await cancelInvitation(invitationId);
        setAlertMessage("Invitation annulée");
        setOpenAlert(true);
      }

      setTimeout(() => {
        navigate(resolveUrl(pagesUrl.MOA_MANAGER_TEAM_PAGE, [organizationId]));
        setIsSubmitting(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    cancelInvitation,
    deleteTeamMember,
    invitationId,
    isSubmitting,
    navigate,
    dialogOption,
    organizationId,
    setAlertMessage,
    setIsSubmitting,
    setOpenAlert,
  ]);

  return (
    <Dialog open={isDeleteDialogOpen} onClose={handleCancelAndClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContentText>{dialogContent}</DialogContentText>
      <DialogActions>
        <OutlinedButton
          label="Annuler"
          onClick={handleCancelAndClose}
          disabled={isSubmitting}
        />
        <OutlinedButton label="Confirmer" onClick={handleSubmitAndClose} />
      </DialogActions>
    </Dialog>
  );
}
