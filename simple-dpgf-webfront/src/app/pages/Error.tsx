import { Box, Container, Typography } from "@mui/material";

export default function Error(): JSX.Element {
  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h1">404 : Page Not Found</Typography>
      </Box>
    </Container>
  );
}
