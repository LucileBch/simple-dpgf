import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { Box, Container, Grid2, Link, Typography } from "@mui/material";
import { theme } from "../styles/theme";
export default function Footer() {
    return (_jsxs(Container, { maxWidth: "xl", sx: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            backgroundColor: theme.palette.background.paper,
            border: "solid",
            borderColor: theme.palette.primary.main,
            borderRadius: "5px",
            boxShadow: "0px -10px 12px rgba(0, 0, 0, 0.3)",
        }, children: [_jsxs(Box, { children: [_jsx(Link, { href: "#", underline: "hover", target: "_blank", children: _jsx(XIcon, { sx: {
                                fontSize: "30px",
                                color: theme.palette.primary.main,
                                cursor: "pointer",
                            } }) }), _jsx(Link, { href: "#", underline: "hover", target: "_blank", children: _jsx(LinkedInIcon, { sx: {
                                fontSize: "30px",
                                color: theme.palette.primary.main,
                                cursor: "pointer",
                            } }) })] }), _jsxs(Grid2, { container: true, spacing: 2, children: [_jsx(Grid2, { size: 6, children: _jsx(Link, { href: "#", underline: "hover", target: "_blank", children: _jsx(Typography, { variant: "body1", children: "Contact" }) }) }), _jsx(Grid2, { size: 6, children: _jsx(Link, { href: "#", underline: "hover", target: "_blank", children: _jsx(Typography, { variant: "body1", children: "Support" }) }) })] })] }));
}
