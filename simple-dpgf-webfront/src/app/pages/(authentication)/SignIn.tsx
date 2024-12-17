import { Box, Container, Typography } from "@mui/material";
import { TextInput } from "../../components/inputs/TextInput";

export default function SignIn() {
  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h1">Se connecter</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: 2,
          pt: 1,
        }}
      >
        <TextInput fieldName="Email" label="Email" required />
        <TextInput
          required
          fieldName="Mot de Passe"
          label="Mot de passe"
          type="password"
        />
      </Box>
    </Container>
  );
}
