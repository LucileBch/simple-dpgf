import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import OutlinedButton from "../buttons/OutlinedButton";
import SubmitButton from "../buttons/SubmitButton";
import { useParams } from "react-router-dom";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
} from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import { AlertContext } from "../../core/contexts/alert-context";
import { TextInput } from "../inputs/TextInput";
import { NumberInput } from "../inputs/NumberInput";
import { FormValues, useForm } from "../../core/hooks/use-form";
import { ProductCreationOrUpdateDto } from "../../core/dtos/product/ProductCreationDto";
import { UnitEnum, unitEnumtoLabel } from "../../core/enums/UnitEnum";
import { DpgfContext } from "../../core/contexts/dpgf-context";
import { LotDto } from "../../core/dtos/lot/LotDto";

interface IProps {
  dialogTitle: string;
  selectedLot: LotDto;
  setSelectedLot: Dispatch<SetStateAction<LotDto | undefined>>;
}

export default function ProductCreationDialog({
  dialogTitle,
  selectedLot,
  setSelectedLot,
}: Readonly<IProps>): React.JSX.Element {
  const { dpgfId } = useParams();

  const {
    isCreateDialogProductOpen,
    setIsCreateDialogProductOpen,
    handleCancelAndClose,
  } = useContext(DialogContext);
  const { handleSuccessAlert, handleErrorAlert } = useContext(AlertContext);
  const { createProduct, setProductList, setDpgf } = useContext(DpgfContext);

  const handleCancel = useCallback(() => {
    setIsCreateDialogProductOpen(false);
    setSelectedLot(undefined);
  }, [setIsCreateDialogProductOpen, setSelectedLot]);

  const initialFormValues: FormValues<ProductCreationOrUpdateDto> = {
    name: "",
    unit: UnitEnum.NO_UNIT,
    unitPrice: 0,
    quantity: 0,
  };

  const validate = (formData: FormValues<ProductCreationOrUpdateDto>) => {
    const errors: Record<string, string> = {};
    if (!formData.name) {
      errors.name = "Le nom est requis";
    }
    if (!formData.quantity) {
      errors.quantity = "La quantité est requise";
    }
    if (!formData.unitPrice) {
      errors.unitPrice = "Le prix unitaire est requis";
    }
    if (formData.unit === UnitEnum.NO_UNIT) {
      errors.unit = "L'unité est requise";
    }

    return errors;
  };

  const onSubmit = useCallback(
    async (formData: FormValues<ProductCreationOrUpdateDto>) => {
      if (!dpgfId) {
        handleErrorAlert("Dpgf non reconnu");
        return;
      }

      if (!selectedLot) {
        handleErrorAlert("Lot non reconnu");
        return;
      }

      const newProduct = await createProduct(dpgfId, selectedLot.id, formData);

      setIsCreateDialogProductOpen(false);
      setProductList((prev) => {
        const currentList = prev ?? [];

        const isProductAlreadyInList = currentList.some(
          (product) => product.id === newProduct.id
        );
        if (isProductAlreadyInList) {
          return currentList;
        }
        return [...currentList, newProduct];
      });

      setDpgf((prev) =>
        prev
          ? { ...prev, dpgfTotal: prev.dpgfTotal + newProduct.totalPrice }
          : prev
      );
      handleSuccessAlert("Nouveau poste ajouté");
      setSelectedLot(undefined);
    },
    [
      createProduct,
      dpgfId,
      handleErrorAlert,
      handleSuccessAlert,
      selectedLot,
      setDpgf,
      setIsCreateDialogProductOpen,
      setProductList,
      setSelectedLot,
    ]
  );

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit,
  } = useForm({ initialFormValues, validate, onSubmit });

  return (
    <Dialog
      open={isCreateDialogProductOpen}
      onClose={handleCancel}
      sx={{
        "& .MuiDialog-paper": {
          minWidth: 500,
        },
      }}
      aria-hidden={!isCreateDialogProductOpen}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              gap: 2,
              p: 1,
            }}
          >
            <TextInput
              id="name"
              name="name"
              type="text"
              label="Nom du poste"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <NumberInput
              fullWidth
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              label="Quantité"
              error={!!errors.quantity}
              helperText={errors.quantity}
              restrictInput={false}
            />

            <NumberInput
              fullWidth
              id="unitPrice"
              name="unitPrice"
              label="Prix Unitaire"
              value={formData.unitPrice}
              onChange={handleChange}
              error={!!errors.unitPrice}
              helperText={errors.unitPrice}
              restrictInput={false}
            />

            <FormControl>
              <InputLabel id="unit">Unité</InputLabel>
              <Select
                labelId="unit"
                id="unit"
                value={formData.unit}
                name="unit"
                onChange={handleSelectChange}
                fullWidth
              >
                {Object.values(UnitEnum).map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unitEnumtoLabel(unit)}
                  </MenuItem>
                ))}
              </Select>
              {errors.unit && (
                <FormHelperText error>{errors.unit}</FormHelperText>
              )}
            </FormControl>
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
