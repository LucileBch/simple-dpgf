import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Dialog, DialogActions, DialogContentText, DialogTitle, } from "@mui/material";
import OutlinedButton from "../buttons/OutlinedButton";
import { DialogContext } from "../../core/contexts/dialog-context";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../core/appConstants";
import { TextInput } from "../inputs/TextInput";
import { useForm } from "../../core/hooks/use-form";
import SubmitButton from "../buttons/SubmitButton";
import { DpgfContext } from "../../core/contexts/dpgf-context";
import { AlertContext } from "../../core/contexts/alert-context";
import { resolveUrl } from "../../core/services/http-service";
export default function DpgfCreationDialog({ dialogTitle, }) {
    const navigate = useNavigate();
    const { createNewDpgf, setDpgf, setDpgfByUserList } = useContext(DpgfContext);
    const { isCreateDialogOpen, setIsCreateDialogOpen, handleCancelAndClose } = useContext(DialogContext);
    const { handleSuccessAlert } = useContext(AlertContext);
    const initialFormValues = {
        name: "",
    };
    const validate = (formData) => {
        const errors = {};
        if (!formData.name) {
            errors.name = "Le nom est requis";
        }
        return errors;
    };
    const onSubmit = useCallback(async (formData) => {
        const newDpgf = await createNewDpgf(formData);
        setIsCreateDialogOpen(false);
        setDpgf(newDpgf);
        setDpgfByUserList((prev) => (prev ? [...prev, newDpgf] : [newDpgf]));
        handleSuccessAlert("Nouveau DPGF créé");
        setTimeout(() => {
            navigate(resolveUrl(pagesUrl.MOA_PROJECT, [newDpgf.id]));
        }, 2000);
    }, [
        createNewDpgf,
        handleSuccessAlert,
        navigate,
        setDpgf,
        setDpgfByUserList,
        setIsCreateDialogOpen,
    ]);
    const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm({ initialFormValues, validate, onSubmit });
    return (_jsxs(Dialog, { open: isCreateDialogOpen, onClose: handleCancelAndClose, children: [_jsx(DialogTitle, { children: dialogTitle }), _jsx(DialogContentText, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(Box, { sx: {
                                display: "flex",
                                justifyContent: "space-around",
                                gap: 2,
                                p: 1,
                            }, children: _jsx(TextInput, { id: "name", name: "name", type: "text", label: "Nom", value: formData.name, onChange: handleChange, error: !!errors.name, helperText: errors.name }) }), _jsxs(DialogActions, { children: [_jsx(Box, { sx: { paddingTop: "8px" }, children: _jsx(OutlinedButton, { label: "Annuler", onClick: handleCancelAndClose, disabled: isSubmitting }) }), _jsx(SubmitButton, { label: "Confirmer", disabled: isSubmitting })] })] }) })] }));
}
