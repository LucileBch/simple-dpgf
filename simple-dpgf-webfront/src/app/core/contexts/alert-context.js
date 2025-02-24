import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useMemo, useState, } from "react";
import AlertSnack from "../../components/alert/AlertSnack";
import { getErrorMessage } from "../utils/error-handler";
export const AlertContext = React.createContext({});
export function AlertContextProvider({ children, }) {
    const [alertMessage, setAlertMessage] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("error");
    const handleCloseAlert = useCallback(() => {
        setOpenAlert(false);
        setAlertMessage(null);
    }, []);
    const handleErrorAlert = useCallback((error) => {
        if (error instanceof Error) {
            setAlertMessage(getErrorMessage(error.message));
            setSeverity("error");
            setOpenAlert(true);
        }
        else if (typeof error === "string") {
            setAlertMessage(error);
            setSeverity("error");
            setOpenAlert(true);
        }
    }, [setAlertMessage, setSeverity, setOpenAlert]);
    const handleSuccessAlert = useCallback((message) => {
        setAlertMessage(message);
        setSeverity("success");
        setOpenAlert(true);
    }, []);
    const alertStore = useMemo(() => ({
        alertMessage,
        setAlertMessage,
        setSeverity,
        setOpenAlert,
        handleErrorAlert,
        handleSuccessAlert,
    }), [
        alertMessage,
        setAlertMessage,
        setSeverity,
        setOpenAlert,
        handleErrorAlert,
        handleSuccessAlert,
    ]);
    return (_jsxs(AlertContext.Provider, { value: alertStore, children: [children, _jsx(AlertSnack, { open: openAlert, onClose: handleCloseAlert, severity: severity, message: alertMessage })] }));
}
