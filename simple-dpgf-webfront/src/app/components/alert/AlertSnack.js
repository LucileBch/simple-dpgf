import { jsx as _jsx } from "react/jsx-runtime";
import { Alert, Snackbar, } from "@mui/material";
export default function AlertSnack({ anchorOrigin = { vertical: "top", horizontal: "right" }, open, autoHideDuration = 3000, onClose, severity, message: errorMessage, }) {
    return (_jsx(Snackbar, { anchorOrigin: anchorOrigin, open: open, autoHideDuration: autoHideDuration, onClose: onClose, children: _jsx(Alert, { onClose: onClose, severity: severity, children: errorMessage }) }));
}
