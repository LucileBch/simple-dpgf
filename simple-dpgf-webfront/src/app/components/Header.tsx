import { Box, Container, Grid2, Typography } from "@mui/material";
import { pagesUrl } from "../utils/appConstants";
import ContainedButton from "./buttons/ContainedButton";

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
      <Box>
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
