import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
  Tooltip,
} from "@mui/material";
import { ProductDto } from "../../core/dtos/product/ProductDto";
import { TextInput } from "../inputs/TextInput";
import { NumberInput } from "../inputs/NumberInput";
import { UnitEnum, unitEnumtoLabel } from "../../core/enums/UnitEnum";
import OutlinedButton from "../buttons/OutlinedButton";
import SubmitButton from "../buttons/SubmitButton";
import { FormValues, useForm } from "../../core/hooks/use-form";
import { ProductCreationOrUpdateDto } from "../../core/dtos/product/ProductCreationDto";
import { useCallback, useContext, useState } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import { AlertContext } from "../../core/contexts/alert-context";
import { DpgfContext } from "../../core/contexts/dpgf-context";
import { useParams } from "react-router-dom";
import { theme } from "../../styles/theme";

interface IProps {
  dialogTitle: string;
  product: ProductDto;
}

export default function ProductUpdateDialog({
  dialogTitle,
  product,
}: Readonly<IProps>): JSX.Element {
  const { dpgfId } = useParams();

  const { isUpdateDialogOpen, setIsUpdateDialogOpen, handleCancelAndClose } =
    useContext(DialogContext);
  const { handleSuccessAlert, handleErrorAlert } = useContext(AlertContext);
  const {
    selectedProduct,
    setSelectedProduct,
    setProductList,
    setDpgf,
    updateProductInfos,
    deleteProductFromDpgf,
  } = useContext(DpgfContext);

  const [isDeleteSubmitting, setIsDeleteSubmitting] = useState<boolean>(false);

  // update
  const initialFormValues: FormValues<ProductCreationOrUpdateDto> = {
    name: product.name,
    unit: product.unit,
    unitPrice: product.unitPrice,
    quantity: product.quantity,
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
    if (formData.unit === UnitEnum.NONE) {
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
      if (!selectedProduct) {
        handleErrorAlert("Poste non reconnu");
        return;
      }

      const updatedProduct = await updateProductInfos(
        dpgfId,
        selectedProduct.id,
        formData
      );

      setIsUpdateDialogOpen(false);
      setProductList((prev) =>
        prev
          ? prev.map((product) =>
              product.id === updatedProduct.id ? updatedProduct : product
            )
          : []
      );
      setDpgf((prev) =>
        prev
          ? {
              ...prev,
              dpgfTotal:
                prev.dpgfTotal -
                selectedProduct.totalPrice +
                updatedProduct.totalPrice,
            }
          : prev
      );

      handleSuccessAlert(`Le poste ${updatedProduct.name} a bien été modifié`);
      setSelectedProduct(undefined);
    },
    [
      dpgfId,
      handleErrorAlert,
      handleSuccessAlert,
      selectedProduct,
      setDpgf,
      setIsUpdateDialogOpen,
      setProductList,
      setSelectedProduct,
      updateProductInfos,
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

  // delete
  const handleDeleteProduct = useCallback(async () => {
    if (!dpgfId) {
      handleErrorAlert("Dpgf non reconnu");
      return;
    }
    if (!selectedProduct) {
      handleErrorAlert("Poste non reconnu");
      return;
    }

    setIsDeleteSubmitting(true);
    await deleteProductFromDpgf(dpgfId, selectedProduct.id);

    setProductList(
      (prev) =>
        prev?.filter((product) => product.id !== selectedProduct.id) ?? []
    );
    setDpgf((prev) =>
      prev
        ? { ...prev, dpgfTotal: prev.dpgfTotal - selectedProduct.totalPrice }
        : prev
    );

    handleSuccessAlert("Le poste a été supprimé");
    setSelectedProduct(undefined);
    setIsUpdateDialogOpen(false);
    setIsDeleteSubmitting(false);
  }, [
    deleteProductFromDpgf,
    dpgfId,
    handleErrorAlert,
    handleSuccessAlert,
    selectedProduct,
    setDpgf,
    setIsUpdateDialogOpen,
    setProductList,
    setSelectedProduct,
  ]);

  return (
    <Dialog
      open={isUpdateDialogOpen}
      onClose={handleCancelAndClose}
      sx={{
        "& .MuiDialog-paper": {
          minWidth: 500,
        },
      }}
      aria-hidden={!isUpdateDialogOpen}
    >
      <DialogTitle sx={{ textAlign: "center" }}>{dialogTitle}</DialogTitle>
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
                <MenuItem value={UnitEnum.NONE}>
                  <em>{unitEnumtoLabel(UnitEnum.NONE)}</em>
                </MenuItem>
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
            <Box
              sx={{
                paddingTop: "8px",
              }}
            >
              <OutlinedButton
                label="Annuler"
                onClick={() => {
                  handleCancelAndClose();
                  setSelectedProduct(undefined);
                }}
                disabled={isSubmitting || isDeleteSubmitting}
              />
            </Box>
            <SubmitButton
              label="Confirmer"
              disabled={isSubmitting || isDeleteSubmitting}
              onClick={handleSubmit}
            />
            <Tooltip title="Supprimer le poste" placement="top">
              <DeleteOutlineIcon
                onClick={handleDeleteProduct}
                sx={{
                  color: theme.palette.error.main,
                  cursor: "pointer",
                  fontSize: "40px",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Tooltip>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
