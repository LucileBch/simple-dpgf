import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useMemo, useState, } from "react";
import AlertSnack from "../../components/alert/AlertSnack";
export const DialogContext = React.createContext({});
export function DialogContextProvider({ children, }) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isCreateDialogProductOpen, setIsCreateDialogProductOpen] = useState(false);
    const [isDeleteDialogProductOpen, setIsDeleteDialogProductOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const handleCloseAlert = useCallback(() => {
        setOpenAlert(false);
    }, []);
    const handleCancelAndClose = useCallback(() => {
        setIsCreateDialogOpen(false);
        setIsUpdateDialogOpen(false);
        setIsDeleteDialogOpen(false);
        setIsCreateDialogProductOpen(false);
        setIsDeleteDialogProductOpen(false);
    }, []);
    const dialogStore = useMemo(() => ({
        isCreateDialogOpen,
        isUpdateDialogOpen,
        isDeleteDialogOpen,
        isSubmitting,
        isCreateDialogProductOpen,
        isDeleteDialogProductOpen,
        setIsDeleteDialogProductOpen,
        setIsCreateDialogProductOpen,
        setIsSubmitting,
        setIsDeleteDialogOpen,
        setIsUpdateDialogOpen,
        setIsCreateDialogOpen,
        setAlertMessage,
        setOpenAlert,
        handleCancelAndClose,
    }), [
        isCreateDialogOpen,
        isUpdateDialogOpen,
        isDeleteDialogOpen,
        isSubmitting,
        isCreateDialogProductOpen,
        isDeleteDialogProductOpen,
        setIsDeleteDialogProductOpen,
        setIsCreateDialogProductOpen,
        setIsSubmitting,
        setIsDeleteDialogOpen,
        setIsUpdateDialogOpen,
        setIsCreateDialogOpen,
        setAlertMessage,
        setOpenAlert,
        handleCancelAndClose,
    ]);
    return (_jsxs(DialogContext.Provider, { value: dialogStore, children: [children, _jsx(AlertSnack, { open: openAlert, onClose: handleCloseAlert, severity: alertMessage?.startsWith("Erreur") ? "error" : "success", message: alertMessage })] }));
}
