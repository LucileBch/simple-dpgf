import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import OutlinedButton from "../buttons/OutlinedButton";
import { useContext } from "react";
import { ConfirmDialogContext } from "../../core/contexts/confirm-delete-orga-dialog-context";

interface IProps {
  dialogTitle: string;
  dialogContent?: string;
  organizationId?: string;
}

export default function ConfirmDialog({
  dialogTitle,
  dialogContent,
}: Readonly<IProps>): JSX.Element {
  const { isConfirmDialogOpen, handleCancelAndClose, handleSubmitAndClose } =
    useContext(ConfirmDialogContext);

  return (
    <Dialog
      open={isConfirmDialogOpen}
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
