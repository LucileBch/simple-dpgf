import { jsx as _jsx } from "react/jsx-runtime";
import { Box, CircularProgress } from "@mui/material";
export default function CircularLoadingPage() {
    return (_jsx(Box, { sx: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
        }, children: _jsx(CircularProgress, {}) }));
}
