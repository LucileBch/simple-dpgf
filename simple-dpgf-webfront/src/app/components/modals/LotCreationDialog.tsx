import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import OutlinedButton from "../buttons/OutlinedButton";
import SubmitButton from "../buttons/SubmitButton";
import { AlertContext } from "../../core/contexts/alert-context";
import { useParams } from "react-router-dom";
import LotSelectInput from "../inputs/LotSelectInput";
import { LotEnum } from "../../core/enums/LotEnum";
import { DpgfContext } from "../../core/contexts/dpgf-context";

interface IProps {
  dialogTitle: string;
}

export default function LotCreationDialog({
  dialogTitle,
}: Readonly<IProps>): JSX.Element {
  const { dpgfId } = useParams();

  const {
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isSubmitting,
    setIsSubmitting,
  } = useContext(DialogContext);
  const { handleSuccessAlert, handleErrorAlert } = useContext(AlertContext);
  const { createLotForDpgf } = useContext(DpgfContext);

  const [selectedLot, setSelectedLot] = useState<LotEnum | null>(null);

  const handleCancelAndClose = useCallback(() => {
    setIsCreateDialogOpen(false);
    setSelectedLot(null);
  }, [setIsCreateDialogOpen]);

  const handleSubmit = useCallback(async () => {
    if (!dpgfId) {
      handleErrorAlert("Dpgf non reconnu");
      return;
    }

    if (!selectedLot) {
      handleErrorAlert("Veuillez sélectionner un lot.");
      return;
    }

    setIsSubmitting(true);
    await createLotForDpgf(dpgfId, selectedLot);

    handleSuccessAlert("Nouveau lot créé");
    setIsCreateDialogOpen(false);
    setIsSubmitting(false);
    setSelectedLot(null);
  }, [
    createLotForDpgf,
    dpgfId,
    handleErrorAlert,
    handleSuccessAlert,
    selectedLot,
    setIsCreateDialogOpen,
    setIsSubmitting,
  ]);

  return (
    <Dialog
      open={isCreateDialogOpen}
      onClose={handleCancelAndClose}
      sx={{
        "& .MuiDialog-paper": {
          minWidth: 500,
        },
      }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: 2,
            p: 1,
          }}
        >
          <LotSelectInput
            selectedLot={selectedLot}
            setSelectedLot={setSelectedLot}
          />
        </Box>

        <DialogActions>
          <Box sx={{ paddingTop: "8px" }}>
            <OutlinedButton
              label="Annuler"
              onClick={handleCancelAndClose}
              disabled={isSubmitting}
            />
          </Box>
          <SubmitButton
            label="Confirmer"
            disabled={isSubmitting}
            onClick={handleSubmit}
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
