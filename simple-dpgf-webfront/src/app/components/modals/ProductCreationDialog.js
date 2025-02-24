import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, } from "@mui/material";
import OutlinedButton from "../buttons/OutlinedButton";
import SubmitButton from "../buttons/SubmitButton";
import { useParams } from "react-router-dom";
import { useCallback, useContext } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import { AlertContext } from "../../core/contexts/alert-context";
import { TextInput } from "../inputs/TextInput";
import { NumberInput } from "../inputs/NumberInput";
import { useForm } from "../../core/hooks/use-form";
import { UnitEnum, unitEnumtoLabel } from "../../core/enums/UnitEnum";
import { DpgfContext } from "../../core/contexts/dpgf-context";
export default function ProductCreationDialog({ dialogTitle, selectedLot, setSelectedLot, }) {
    const { dpgfId } = useParams();
    const { isCreateDialogProductOpen, setIsCreateDialogProductOpen, handleCancelAndClose, } = useContext(DialogContext);
    const { handleSuccessAlert, handleErrorAlert } = useContext(AlertContext);
    const { createProduct, setProductList, setDpgf } = useContext(DpgfContext);
    const handleCancel = useCallback(() => {
        setIsCreateDialogProductOpen(false);
        setSelectedLot(undefined);
    }, [setIsCreateDialogProductOpen, setSelectedLot]);
    const initialFormValues = {
        name: "",
        unit: UnitEnum.NONE,
        unitPrice: 0,
        quantity: 0,
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
        if (!selectedLot) {
            handleErrorAlert("Lot non reconnu");
            return;
        }
        const newProduct = await createProduct(dpgfId, selectedLot.id, formData);
        setIsCreateDialogProductOpen(false);
        setProductList((prev) => {
            const currentList = prev ?? [];
            const isProductAlreadyInList = currentList.some((product) => product.id === newProduct.id);
            if (isProductAlreadyInList) {
                return currentList;
            }
            return [...currentList, newProduct];
        });
        setDpgf((prev) => prev
            ? { ...prev, dpgfTotal: prev.dpgfTotal + newProduct.totalPrice }
            : prev);
        handleSuccessAlert("Nouveau poste ajouté");
        setSelectedLot(undefined);
    }, [
        createProduct,
        dpgfId,
        handleErrorAlert,
        handleSuccessAlert,
        selectedLot,
        setDpgf,
        setIsCreateDialogProductOpen,
        setProductList,
        setSelectedLot,
    ]);
    const { formData, errors, isSubmitting, handleChange, handleSelectChange, handleSubmit, } = useForm({ initialFormValues, validate, onSubmit });
    return (_jsxs(Dialog, { open: isCreateDialogProductOpen, onClose: handleCancel, sx: {
            "& .MuiDialog-paper": {
                minWidth: 500,
            },
        }, "aria-hidden": !isCreateDialogProductOpen, children: [_jsx(DialogTitle, { children: dialogTitle }), _jsx(DialogContent, { children: _jsxs("form", { children: [_jsxs(Box, { sx: {
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                gap: 2,
                                p: 1,
                            }, children: [_jsx(TextInput, { id: "name", name: "name", type: "text", label: "Nom du poste", value: formData.name, onChange: handleChange, error: !!errors.name, helperText: errors.name }), _jsx(NumberInput, { fullWidth: true, id: "quantity", name: "quantity", value: formData.quantity, onChange: handleChange, label: "Quantit\u00E9", error: !!errors.quantity, helperText: errors.quantity }), _jsx(NumberInput, { fullWidth: true, id: "unitPrice", name: "unitPrice", label: "Prix Unitaire", value: formData.unitPrice, onChange: handleChange, error: !!errors.unitPrice, helperText: errors.unitPrice }), _jsxs(FormControl, { children: [_jsx(InputLabel, { id: "unit", children: "Unit\u00E9" }), _jsxs(Select, { labelId: "unit", id: "unit", value: formData.unit, name: "unit", onChange: handleSelectChange, fullWidth: true, children: [_jsx(MenuItem, { value: UnitEnum.NONE, children: _jsx("em", { children: unitEnumtoLabel(UnitEnum.NONE) }) }), Object.values(UnitEnum).map((unit) => (_jsx(MenuItem, { value: unit, children: unitEnumtoLabel(unit) }, unit)))] }), errors.unit && (_jsx(FormHelperText, { error: true, children: errors.unit }))] })] }), _jsxs(DialogActions, { children: [_jsx(Box, { sx: { paddingTop: "8px" }, children: _jsx(OutlinedButton, { label: "Annuler", onClick: handleCancelAndClose, disabled: isSubmitting }) }), _jsx(SubmitButton, { label: "Confirmer", disabled: isSubmitting, onClick: handleSubmit })] })] }) })] }));
}
