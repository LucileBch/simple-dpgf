import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import OutlinedButton from "../buttons/OutlinedButton";
import SubmitButton from "../buttons/SubmitButton";
import { AlertContext } from "../../core/contexts/alert-context";
import { useParams } from "react-router-dom";
import LotSelectInput from "../inputs/LotSelectInput";
import { DpgfContext } from "../../core/contexts/dpgf-context";
export default function LotCreationDialog({ dialogTitle, }) {
    const { dpgfId } = useParams();
    const { isCreateDialogOpen, setIsCreateDialogOpen, isSubmitting, setIsSubmitting, } = useContext(DialogContext);
    const { handleSuccessAlert, handleErrorAlert } = useContext(AlertContext);
    const { createLotForDpgf } = useContext(DpgfContext);
    const [selectedLot, setSelectedLot] = useState(null);
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
    return (_jsxs(Dialog, { open: isCreateDialogOpen, onClose: handleCancelAndClose, sx: {
            "& .MuiDialog-paper": {
                minWidth: 500,
            },
        }, children: [_jsx(DialogTitle, { children: dialogTitle }), _jsxs(DialogContent, { children: [_jsx(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-around",
                            gap: 2,
                            p: 1,
                        }, children: _jsx(LotSelectInput, { selectedLot: selectedLot, setSelectedLot: setSelectedLot }) }), _jsxs(DialogActions, { children: [_jsx(Box, { sx: { paddingTop: "8px" }, children: _jsx(OutlinedButton, { label: "Annuler", onClick: handleCancelAndClose, disabled: isSubmitting }) }), _jsx(SubmitButton, { label: "Confirmer", disabled: isSubmitting, onClick: handleSubmit })] })] })] }));
}
