import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Typography } from "@mui/material";
import { theme } from "../styles/theme";
export default function NoOutcome({ content }) {
    return (_jsxs(Box, { sx: {
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            color: theme.palette.error.main,
            gap: 2,
            "&:hover svg": {
                animation: "spin 1s linear infinite",
            },
            "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
            },
        }, children: [_jsx(Typography, { variant: "h6", children: content }), _jsx(SettingsIcon, {})] }));
}
