import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box, Typography } from "@mui/material";
import BackgroundImage from "../components/cards/BackgroundImage";
import { theme } from "../styles/theme";
import PageContainerSpace from "../components/containers/PageContaineSpace";
export default function Error() {
    return (_jsxs(PageContainerSpace, { children: [_jsx(BackgroundImage, {}), _jsxs(Box, { sx: { textAlign: "center", p: 4 }, children: [_jsx(QuestionMarkIcon, { sx: { fontSize: "50px", color: theme.palette.primary.main, mb: 5 } }), _jsx(Typography, { variant: "h1", sx: { color: theme.palette.error.main }, children: "404 : Page Not Found" })] })] }));
}
