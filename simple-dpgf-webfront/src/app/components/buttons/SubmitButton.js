import { jsx as _jsx } from "react/jsx-runtime";
import { Box, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
export default function SubmitButton({ type = "submit", label, disabled = false, ...rest }) {
    return (_jsx(Box, { sx: {
            display: "flex",
            justifyContent: "end",
            pt: 1,
        }, children: _jsx(Button, { variant: "contained", type: type, disabled: disabled, ...rest, children: _jsx(Box, { sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }, children: disabled ? (_jsx(CircularProgress, { size: 24, sx: { marginRight: 1 } })) : (label) }) }) }));
}
