import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box, Typography } from "@mui/material";
import BackgroundImage from "../components/cards/BackgroundImage";
import { theme } from "../styles/theme";
import PageContainerSpace from "../components/containers/PageContainerSpace";
import React from "react";

export default function Error(): React.JSX.Element {
  return (
    <PageContainerSpace>
      <BackgroundImage />
      <Box sx={{ textAlign: "center", p: 4 }}>
        <QuestionMarkIcon
          sx={{ fontSize: "50px", color: theme.palette.primary.main, mb: 5 }}
        />
        <Typography variant="h1" sx={{ color: theme.palette.error.main }}>
          404 : Page Not Found
        </Typography>
      </Box>
    </PageContainerSpace>
  );
}
