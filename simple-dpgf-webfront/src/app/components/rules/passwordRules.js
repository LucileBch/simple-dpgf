import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
import { theme } from "../../styles/theme";
export default function PasswordRules() {
    return (_jsxs(Box, { sx: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontStyle: "italic",
        }, children: [_jsxs(Typography, { children: ["* Le mot de passe doit contenir entre", " ", _jsx("span", { style: { color: theme.palette.error.main }, children: "8 et 20 caract\u00E8res." })] }), _jsxs(Typography, { children: ["* Le mot de passe doit contenir au moins", " ", _jsx("span", { style: { color: theme.palette.error.main }, children: "une majuscule." })] }), _jsxs(Typography, { children: ["* Le mot de passe doit contenir au moins", " ", _jsx("span", { style: { color: theme.palette.error.main }, children: "une minuscule." })] }), _jsxs(Typography, { children: ["* Le mot de passe doit contenir au moins", " ", _jsx("span", { style: { color: theme.palette.error.main }, children: "un chiffre." })] }), _jsxs(Typography, { children: ["* Le mot de passe doit contenir au moins", " ", _jsx("span", { style: { color: theme.palette.error.main }, children: "un caract\u00E8re sp\u00E9cial." })] })] }));
}
