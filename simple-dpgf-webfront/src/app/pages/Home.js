import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ComputerIcon from "@mui/icons-material/Computer";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Box, Grid2, Typography } from "@mui/material";
import PageContainer from "../components/containers/PageContainer";
import MainImage from "../../assets/images/landing-page-image.png";
import { theme } from "../styles/theme";
import InformativeCard from "../components/cards/InformativeCard";
export default function Home() {
    return (_jsxs(PageContainer, { children: [_jsx(Box, { sx: {
                    width: "100%",
                    height: 500,
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
                    }, children: "Bienvenue sur la plateforme Simple DPGF" }) }), _jsxs(Grid2, { container: true, spacing: 2, sx: { mt: 3, mb: 2 }, children: [_jsx(InformativeCard, { title: "Cr\u00E9ation de DPGF simplifi\u00E9e et digitalis\u00E9e", content: "G\u00E9n\u00E9rez et g\u00E9rez vos D\u00E9compositions du Prix Global et\n                Forfaitaire simplement et rapidement.", icon: _jsx(ComputerIcon, { sx: { fontSize: "40px", color: theme.palette.primary.main } }) }), _jsx(InformativeCard, { title: "Analyse et gestion des projets", content: "Apr\u00E8s la cr\u00E9ation de vos lots et postes de d\u00E9penses, laissez le calcul se faire seul, visualisez et suivez l\u2019\u00E9volution de vos projets en toute\n          simplicit\u00E9... Export pdf \u00E0 la clef.", icon: _jsx(BarChartIcon, { sx: { fontSize: "40px", color: theme.palette.primary.main } }) }), _jsx(InformativeCard, { title: "Collaboration avec les entreprises", content: "Invitez des entreprises \u00E0 compl\u00E9ter un DPGF et comparez les\n                offres.", icon: _jsx(PersonAddAltIcon, { sx: { fontSize: "40px", color: theme.palette.primary.main } }), showChip: true })] })] }));
}
