import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TableCell, TableHead, TableRow } from "@mui/material";
export default function ProductTableHead() {
    return (_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { sx: { padding: "4px 10px" }, children: "Nom" }), " ", _jsx(TableCell, { sx: { padding: "4px 10px" }, children: "Unit\u00E9" }), _jsx(TableCell, { sx: { padding: "4px 10px" }, children: "Quantit\u00E9" }), _jsx(TableCell, { sx: { padding: "4px 10px" }, children: "Prix Unitaire (\u20AC)" }), _jsx(TableCell, { sx: { padding: "4px 10px" }, children: "Total (\u20AC)" })] }) }));
}
