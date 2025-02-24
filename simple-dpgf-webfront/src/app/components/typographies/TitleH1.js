import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from "@mui/material";
import { theme } from "../../styles/theme";
export default function TitleH1({ children }) {
    return (_jsx(Typography, { variant: "h1", sx: {
            paddingY: 2,
            color: theme.palette.primary.main,
        }, children: children }));
}
