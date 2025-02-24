import { Box, Typography } from "@mui/material";
import { theme } from "../../styles/theme";
import React from "react";

export default function PasswordRules(): React.JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontStyle: "italic",
      }}
    >
      <Typography>
        * Le mot de passe doit contenir entre{" "}
        <span style={{ color: theme.palette.error.main }}>
          8 et 20 caractères.
        </span>
      </Typography>
      <Typography>
        * Le mot de passe doit contenir au moins{" "}
        <span style={{ color: theme.palette.error.main }}>une majuscule.</span>
      </Typography>
      <Typography>
        * Le mot de passe doit contenir au moins{" "}
        <span style={{ color: theme.palette.error.main }}>une minuscule.</span>
      </Typography>
      <Typography>
        * Le mot de passe doit contenir au moins{" "}
        <span style={{ color: theme.palette.error.main }}>un chiffre.</span>
      </Typography>
      <Typography>
        * Le mot de passe doit contenir au moins{" "}
        <span style={{ color: theme.palette.error.main }}>
          un caractère spécial.
        </span>
      </Typography>
    </Box>
  );
}
