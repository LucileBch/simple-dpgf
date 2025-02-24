import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Typography } from "@mui/material";
import { theme } from "../../styles/theme";
import NoProjectImage from "../../../assets/images/no-project-image.webp";
export default function NoOutcome({ title }) {
    return (_jsxs(_Fragment, { children: [_jsx(Box, { sx: {
                    width: "100%",
                    height: 300,
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start",
                    paddingTop: 2,
                    paddingLeft: 2,
                    backgroundImage: `url(${NoProjectImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        background: "radial-gradient(circle, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.3) 100%)",
                        filter: "blur(15px)",
                    },
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                } }), _jsxs(Box, { sx: {
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    color: theme.palette.error.main,
                    gap: 2,
                    "&:hover svg": {
                        animation: "spin 1s linear infinite",
                    },
                    "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                    },
                }, children: [_jsx(Typography, { variant: "h6", children: title }), _jsx(SettingsIcon, {})] })] }));
}
