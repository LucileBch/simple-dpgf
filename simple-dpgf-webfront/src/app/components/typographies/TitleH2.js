import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from "@mui/material";
import { theme } from "../../styles/theme";
export default function TitleH2({ children }) {
    return (_jsx(Typography, { variant: "h2", sx: {
            paddingY: 2,
            color: theme.palette.secondary.main,
        }, children: children }));
}
