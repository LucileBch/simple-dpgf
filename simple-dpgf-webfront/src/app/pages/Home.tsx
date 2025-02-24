import ComputerIcon from "@mui/icons-material/Computer";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Box, Grid2, Typography } from "@mui/material";
import PageContainer from "../components/containers/PageContainer";
import MainImage from "../../assets/images/landing-page-image.png";
import { theme } from "../styles/theme";
import InformativeCard from "../components/cards/InformativeCard";
import React from "react";

export default function Home(): React.JSX.Element {
  return (
    <PageContainer>
      <Box
        sx={{
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
            background:
              "radial-gradient(circle, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.3) 100%)",
            filter: "blur(15px)",
          },
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          variant="h3"
          color="white"
          sx={{
            position: "relative",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            p: 2,
            borderRadius: 2,
          }}
        >
          Bienvenue sur la plateforme Simple DPGF
        </Typography>
      </Box>

      <Grid2 container spacing={2} sx={{ mt: 3, mb: 2 }}>
        <InformativeCard
          title="Création de DPGF simplifiée et digitalisée"
          content="Générez et gérez vos Décompositions du Prix Global et
                Forfaitaire simplement et rapidement."
          icon={
            <ComputerIcon
              sx={{ fontSize: "40px", color: theme.palette.primary.main }}
            />
          }
        />
        <InformativeCard
          title="Analyse et gestion des projets"
          content="Après la création de vos lots et postes de dépenses, laissez le calcul se faire seul, visualisez et suivez l’évolution de vos projets en toute
          simplicité... Export pdf à la clef."
          icon={
            <BarChartIcon
              sx={{ fontSize: "40px", color: theme.palette.primary.main }}
            />
          }
        />
        <InformativeCard
          title="Collaboration avec les entreprises"
          content="Invitez des entreprises à compléter un DPGF et comparez les
                offres."
          icon={
            <PersonAddAltIcon
              sx={{ fontSize: "40px", color: theme.palette.primary.main }}
            />
          }
          showChip
        />
      </Grid2>
    </PageContainer>
  );
}
