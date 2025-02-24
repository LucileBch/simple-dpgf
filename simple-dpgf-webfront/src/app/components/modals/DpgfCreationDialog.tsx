import {
  Box,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import OutlinedButton from "../buttons/OutlinedButton";
import { DialogContext } from "../../core/contexts/dialog-context";
import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../core/appConstants";
import { TextInput } from "../inputs/TextInput";
import { FormValues, useForm } from "../../core/hooks/use-form";
import SubmitButton from "../buttons/SubmitButton";
import { DpgfContext } from "../../core/contexts/dpgf-context";
import { AlertContext } from "../../core/contexts/alert-context";
import { resolveUrl } from "../../core/services/http-service";
import { DpgfCreationDto } from "../../core/dtos/dpgf/DpgfCreationDto";

interface IProps {
  dialogTitle: string;
}

export default function DpgfCreationDialog({
  dialogTitle,
}: Readonly<IProps>): React.JSX.Element {
  const navigate = useNavigate();

  const { createNewDpgf, setDpgf, setDpgfByUserList } = useContext(DpgfContext);
  const { isCreateDialogOpen, setIsCreateDialogOpen, handleCancelAndClose } =
    useContext(DialogContext);
  const { handleSuccessAlert } = useContext(AlertContext);

  const initialFormValues: FormValues<DpgfCreationDto> = {
    name: "",
  };

  const validate = (formData: FormValues<DpgfCreationDto>) => {
    const errors: Partial<DpgfCreationDto> = {};
    if (!formData.name) {
      errors.name = "Le nom est requis";
    }

    return errors;
  };

  const onSubmit = useCallback(
    async (formData: FormValues<DpgfCreationDto>) => {
      const newDpgf = await createNewDpgf(formData);

      setIsCreateDialogOpen(false);
      setDpgf(newDpgf);
      setDpgfByUserList((prev) => (prev ? [...prev, newDpgf] : [newDpgf]));
      handleSuccessAlert("Nouveau DPGF créé");

      setTimeout(() => {
        navigate(resolveUrl(pagesUrl.MOA_PROJECT, [newDpgf.id]));
      }, 2000);
    },
    [
      createNewDpgf,
      handleSuccessAlert,
      navigate,
      setDpgf,
      setDpgfByUserList,
      setIsCreateDialogOpen,
    ]
  );

  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
    <Dialog open={isCreateDialogOpen} onClose={handleCancelAndClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContentText>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              gap: 2,
              p: 1,
            }}
          >
            <TextInput
              id="name"
              name="name"
              type="text"
              label="Nom"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
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
            <SubmitButton label="Confirmer" disabled={isSubmitting} />
          </DialogActions>
        </form>
      </DialogContentText>
    </Dialog>
  );
}
