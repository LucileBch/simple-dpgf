import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { Box, Container, Grid2, Link, Typography } from "@mui/material";
import { theme } from "../styles/theme";

export default function Footer(): JSX.Element {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,

        backgroundColor: theme.palette.background.paper,
        border: "solid",
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",
        boxShadow: "0px -10px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Box>
        <Link href="#" underline="hover" target="_blank">
          <XIcon
            sx={{
              fontSize: "30px",
              color: theme.palette.primary.main,
              cursor: "pointer",
            }}
          />
        </Link>
        <Link href="#" underline="hover" target="_blank">
          <LinkedInIcon
            sx={{
              fontSize: "30px",
              color: theme.palette.primary.main,
              cursor: "pointer",
            }}
          />
        </Link>
      </Box>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <Link href="#" underline="hover" target="_blank">
            <Typography variant="body1">Contact</Typography>
          </Link>
        </Grid2>
        <Grid2 size={6}>
          <Link href="#" underline="hover" target="_blank">
            <Typography variant="body1">Support</Typography>
          </Link>
        </Grid2>
      </Grid2>
    </Container>
  );
}
