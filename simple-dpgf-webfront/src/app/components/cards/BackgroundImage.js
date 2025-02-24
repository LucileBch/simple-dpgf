import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
import MainImage from "../../../assets/images/landing-page-image.png";
export default function BackgroundImage() {
    return (_jsx(Box, { sx: {
            width: "100%",
            height: 200,
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            paddingTop: 2,
            paddingLeft: 2,
            backgroundImage: `url(${MainImage})`,
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
        }, children: _jsx(Typography, { variant: "h3", color: "white", sx: {
                position: "relative",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                p: 2,
                borderRadius: 2,
            }, children: "Bienvenue sur la plateforme Simple DPGF" }) }));
}
