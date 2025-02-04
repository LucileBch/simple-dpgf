import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import OutlinedButton from "../buttons/OutlinedButton";
import { useContext } from "react";
import { DeleteOrgaDialogContext } from "../../core/contexts/delete-orga-dialog-context";

interface IProps {
  dialogTitle: string;
  dialogContent?: string;
  organizationId?: string;
}

export default function DeleteOrgaDialog({
  dialogTitle,
  dialogContent,
}: Readonly<IProps>): JSX.Element {
  const { isDeleteOrgaDialogOpen, handleCancelAndClose, handleSubmitAndClose } =
    useContext(DeleteOrgaDialogContext);

  return (
    <Dialog
      open={isDeleteOrgaDialogOpen}
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
