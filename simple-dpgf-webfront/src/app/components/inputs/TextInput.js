import { jsx as _jsx } from "react/jsx-runtime";
import { TextField } from "@mui/material";
export function TextInput({ id, name, type, label, required, disabled = false, onChange, onKeyDown, value, autoComplete = "off", error, helperText, }) {
    return (_jsx(TextField, { id: id, name: name, type: type, label: label, required: required, disabled: disabled, onChange: onChange, onKeyDown: onKeyDown, value: value, autoComplete: autoComplete, error: error, helperText: helperText, variant: "outlined", sx: { width: "500px" } }));
}
