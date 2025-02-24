import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, CardContent, Chip, Grid2, Typography } from "@mui/material";
import TitleH2 from "../typographies/TitleH2";
import { theme } from "../../styles/theme";
export default function InformativeCard({ title, content, icon, showChip = false, }) {
    return (_jsx(Grid2, { size: 4, children: _jsx(Card, { sx: {
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
                padding: "20px",
                position: "relative",
            }, children: _jsxs(CardContent, { children: [showChip && (_jsx(Chip, { label: "\u00C0 venir", sx: {
                            fontSize: "14px",
                            color: theme.palette.error.main,
                            backgroundColor: theme.palette.error.contrastText,
                            position: "absolute",
                            top: 10,
                            right: 10,
                        } })), _jsxs(Box, { sx: {
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }, children: [icon, _jsx(TitleH2, { children: title })] }), _jsx(Typography, { variant: "body2", sx: { textAlign: "justify" }, children: content })] }) }) }));
}
