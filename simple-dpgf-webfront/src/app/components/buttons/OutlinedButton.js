import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@mui/material";
export default function OutlinedButton({ label, disabled, onClick, }) {
    return (_jsx(Button, { variant: "outlined", onClick: onClick, disabled: disabled, children: label }));
}
