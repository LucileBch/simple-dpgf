import { Box, Container, Grid2, Typography } from "@mui/material";
import { pagesUrl } from "../core/appConstants";
import ContainedButton from "./buttons/NavigationButton";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.webp";

{
  /* TODO: temporary header */
}
export default function Header() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 4,
        backgroundColor: "lightgray",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Link to="/">
          {/* TODO: resize image */}
          <img style={{ width: 60 }} src={Logo} alt="Logo de Vinted" />
        </Link>
        <Typography variant="h1">Simple DPGF</Typography>
      </Box>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <ContainedButton label="Inscription" path={pagesUrl.SIGN_UP_PAGE} />
        </Grid2>
        <Grid2 size={6}>
          <ContainedButton label="Connexion" path={pagesUrl.SIGN_IN_PAGE} />
        </Grid2>
      </Grid2>
    </Container>
  );
}
