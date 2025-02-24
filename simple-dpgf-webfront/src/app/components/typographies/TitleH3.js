import { jsx as _jsx } from "react/jsx-runtime";
import { Typography, useTheme } from "@mui/material";
export default function TitleH3({ children }) {
    const theme = useTheme();
    return (_jsx(Typography, { variant: "h3", sx: {
            paddingY: 1,
            pb: 2,
            color: theme.palette.primary.main,
        }, children: children }));
}
