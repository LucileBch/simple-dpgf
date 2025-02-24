import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, CardContent, Typography } from "@mui/material";
import TitleH3 from "../typographies/TitleH3";
import ChipStatus from "../info/ChipStatus";
export default function DpgfCard({ dpgf, onClick, }) {
    return (_jsx(Card, { sx: {
            minHeight: 180,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
                transform: "translateZ(10px)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            },
        }, children: _jsxs(CardContent, { onClick: onClick, sx: {
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
            }, children: [_jsxs(Box, { sx: { display: "flex", justifyContent: "space-between" }, children: [_jsx(TitleH3, { children: dpgf.name }), _jsx(ChipStatus, { label: dpgf.dpgfStatus })] }), _jsxs(Box, { children: [_jsxs(Typography, { sx: { fontWeight: "bold" }, children: ["Total actuel : ", dpgf.dpgfTotal.toFixed(2), " \u20AC"] }), _jsxs(Typography, { sx: { fontWeight: "bold" }, children: ["Cr\u00E9\u00E9 par : ", dpgf.createdByUser] }), _jsxs(Typography, { sx: { fontWeight: "bold" }, children: ["Mise \u00E0 jour le :", " ", new Date(dpgf.lastModifiedDate).toLocaleDateString()] })] })] }) }));
}
