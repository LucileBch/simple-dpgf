import { jsx as _jsx } from "react/jsx-runtime";
import { Box, CircularProgress, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
export default function NavigationButton({ label, path, disabled = false, loading, onClick, }) {
    const theme = useTheme();
    const location = useLocation();
    const isActive = location.pathname === path;
    const button = (_jsx(Button, { variant: "contained", disabled: disabled, onClick: onClick, sx: {
            backgroundColor: isActive
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            boxShadow: "0px 10px 12px rgba(0, 0, 0, 0.5)",
            transition: "background-color 0.3s ease-in-out",
            "&:hover": {
                backgroundColor: isActive
                    ? theme.palette.secondary.light
                    : theme.palette.primary.light,
                boxShadow: "0px 10px 12px rgba(0, 0, 0, 0.5)",
            },
        }, children: loading ? _jsx(CircularProgress, { size: 24, color: "inherit" }) : label }));
    return (_jsx(Box, { sx: {
            display: "flex",
            justifyContent: "end",
            alignContent: "center",
        }, children: path ? _jsx(Link, { to: path, children: button }) : button }));
}
