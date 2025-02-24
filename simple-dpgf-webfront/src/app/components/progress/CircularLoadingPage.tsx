import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function CircularLoadingPage(): React.JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
