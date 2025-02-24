import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, Tooltip, } from "@mui/material";
import { TextInput } from "../inputs/TextInput";
import { NumberInput } from "../inputs/NumberInput";
import { UnitEnum, unitEnumtoLabel } from "../../core/enums/UnitEnum";
import OutlinedButton from "../buttons/OutlinedButton";
import SubmitButton from "../buttons/SubmitButton";
import { useForm } from "../../core/hooks/use-form";
import { useCallback, useContext, useState } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import { AlertContext } from "../../core/contexts/alert-context";
import { DpgfContext } from "../../core/contexts/dpgf-context";
import { useParams } from "react-router-dom";
import { theme } from "../../styles/theme";
export default function ProductUpdateDialog({ dialogTitle, product, }) {
    const { dpgfId } = useParams();
    const { isUpdateDialogOpen, setIsUpdateDialogOpen, handleCancelAndClose } = useContext(DialogContext);
    const { handleSuccessAlert, handleErrorAlert } = useContext(AlertContext);
    const { selectedProduct, setSelectedProduct, setProductList, setDpgf, updateProductInfos, deleteProductFromDpgf, } = useContext(DpgfContext);
    const [isDeleteSubmitting, setIsDeleteSubmitting] = useState(false);
    // update
    const initialFormValues = {
        name: product.name,
        unit: product.unit,
        unitPrice: product.unitPrice,
        quantity: product.quantity,
    };
    const validate = (formData) => {
        const errors = {};
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
    const onSubmit = useCallback(async (formData) => {
        if (!dpgfId) {
            handleErrorAlert("Dpgf non reconnu");
            return;
        }
        if (!selectedProduct) {
            handleErrorAlert("Poste non reconnu");
            return;
        }
        const updatedProduct = await updateProductInfos(dpgfId, selectedProduct.id, formData);
        setIsUpdateDialogOpen(false);
        setProductList((prev) => prev
            ? prev.map((product) => product.id === updatedProduct.id ? updatedProduct : product)
            : []);
        setDpgf((prev) => prev
            ? {
                ...prev,
                dpgfTotal: prev.dpgfTotal -
                    selectedProduct.totalPrice +
                    updatedProduct.totalPrice,
            }
            : prev);
        handleSuccessAlert(`Le poste ${updatedProduct.name} a bien été modifié`);
        setSelectedProduct(undefined);
    }, [
        dpgfId,
        handleErrorAlert,
        handleSuccessAlert,
        selectedProduct,
        setDpgf,
        setIsUpdateDialogOpen,
        setProductList,
        setSelectedProduct,
        updateProductInfos,
    ]);
    const { formData, errors, isSubmitting, handleChange, handleSelectChange, handleSubmit, } = useForm({ initialFormValues, validate, onSubmit });
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
        setProductList((prev) => prev?.filter((product) => product.id !== selectedProduct.id) ?? []);
        setDpgf((prev) => prev
            ? { ...prev, dpgfTotal: prev.dpgfTotal - selectedProduct.totalPrice }
            : prev);
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
    return (_jsxs(Dialog, { open: isUpdateDialogOpen, onClose: handleCancelAndClose, sx: {
            "& .MuiDialog-paper": {
                minWidth: 500,
            },
        }, "aria-hidden": !isUpdateDialogOpen, children: [_jsx(DialogTitle, { sx: { textAlign: "center" }, children: dialogTitle }), _jsx(DialogContent, { children: _jsxs("form", { children: [_jsxs(Box, { sx: {
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                gap: 2,
                                p: 1,
                            }, children: [_jsx(TextInput, { id: "name", name: "name", type: "text", label: "Nom du poste", value: formData.name, onChange: handleChange, error: !!errors.name, helperText: errors.name }), _jsx(NumberInput, { fullWidth: true, id: "quantity", name: "quantity", value: formData.quantity, onChange: handleChange, label: "Quantit\u00E9", error: !!errors.quantity, helperText: errors.quantity }), _jsx(NumberInput, { fullWidth: true, id: "unitPrice", name: "unitPrice", label: "Prix Unitaire", value: formData.unitPrice, onChange: handleChange, error: !!errors.unitPrice, helperText: errors.unitPrice }), _jsxs(FormControl, { children: [_jsx(InputLabel, { id: "unit", children: "Unit\u00E9" }), _jsxs(Select, { labelId: "unit", id: "unit", value: formData.unit, name: "unit", onChange: handleSelectChange, fullWidth: true, children: [_jsx(MenuItem, { value: UnitEnum.NONE, children: _jsx("em", { children: unitEnumtoLabel(UnitEnum.NONE) }) }), Object.values(UnitEnum).map((unit) => (_jsx(MenuItem, { value: unit, children: unitEnumtoLabel(unit) }, unit)))] }), errors.unit && (_jsx(FormHelperText, { error: true, children: errors.unit }))] })] }), _jsxs(DialogActions, { children: [_jsx(Box, { sx: {
                                        paddingTop: "8px",
                                    }, children: _jsx(OutlinedButton, { label: "Annuler", onClick: () => {
                                            handleCancelAndClose();
                                            setSelectedProduct(undefined);
                                        }, disabled: isSubmitting || isDeleteSubmitting }) }), _jsx(SubmitButton, { label: "Confirmer", disabled: isSubmitting || isDeleteSubmitting, onClick: handleSubmit }), _jsx(Tooltip, { title: "Supprimer le poste", placement: "top", children: _jsx(DeleteOutlineIcon, { onClick: handleDeleteProduct, sx: {
                                            color: theme.palette.error.main,
                                            cursor: "pointer",
                                            fontSize: "40px",
                                            transition: "transform 0.2s ease-in-out",
                                            "&:hover": {
                                                transform: "scale(1.1)",
                                            },
                                        } }) })] })] }) })] }));
}
