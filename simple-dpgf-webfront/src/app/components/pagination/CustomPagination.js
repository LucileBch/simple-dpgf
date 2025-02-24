import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Pagination } from "@mui/material";
export default function CustomPagination({ count, page, onChange, }) {
    return (_jsx(Box, { sx: { display: "flex", justifyContent: "center", marginBottom: 2 }, children: _jsx(Pagination, { count: count, page: page, onChange: onChange }) }));
}
