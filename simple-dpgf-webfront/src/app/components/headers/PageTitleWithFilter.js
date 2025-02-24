import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, TextField } from "@mui/material";
import TitleH2 from "../typographies/TitleH2";
export default function PageTitleWithFilter({ title, inputLabel, searchValue, onChange, }) {
    return (_jsxs(Box, { sx: { display: "flex", justifyContent: "space-between" }, children: [_jsx(TitleH2, { children: title }), _jsx(TextField, { label: inputLabel, variant: "outlined", sx: { marginBottom: 2 }, value: searchValue, onChange: onChange })] }));
}
