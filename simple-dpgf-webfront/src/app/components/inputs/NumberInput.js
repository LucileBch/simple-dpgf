import { jsx as _jsx } from "react/jsx-runtime";
import { TextField } from "@mui/material";
const handleKeyDown = (e) => {
    if (!["ArrowUp", "ArrowDown", "Tab", "Backspace"].includes(e.key)) {
        e.preventDefault();
    }
};
export function NumberInput({ id, name, label, required, disabled = false, onChange, value, autoComplete = "off", fullWidth = false, error, helperText, }) {
    return (_jsx(TextField, { id: id, name: name, type: "number", label: label, required: required, disabled: disabled, onChange: onChange, onKeyDown: handleKeyDown, value: value, autoComplete: autoComplete, variant: "outlined", error: error, helperText: helperText, inputProps: { min: "0" }, sx: { width: fullWidth ? "100%" : "400px" } }));
}
