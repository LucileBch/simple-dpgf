import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Typography } from "@mui/material";
import { theme } from "../styles/theme";
import React from "react";

interface IProps {
  content: string;
}

export default function NoOutcome({
  content,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <Box
      sx={{
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
      }}
    >
      <Typography variant="h6">{content}</Typography>
      <SettingsIcon />
    </Box>
  );
}
