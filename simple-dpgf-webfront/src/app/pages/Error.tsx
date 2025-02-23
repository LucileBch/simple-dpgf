import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box, Typography } from "@mui/material";
import PageContainer from "../components/containers/PageContainer";
import BackgroundImage from "../components/cards/BackgroundImage";
import { theme } from "../styles/theme";

export default function Error(): JSX.Element {
  return (
    <PageContainer>
      <BackgroundImage />
      <Box sx={{ textAlign: "center", p: 4 }}>
        <QuestionMarkIcon
          sx={{ fontSize: "50px", color: theme.palette.primary.main, mb: 5 }}
        />
        <Typography variant="h1" sx={{ color: theme.palette.error.main }}>
          404 : Page Not Found
        </Typography>
      </Box>
    </PageContainer>
  );
}
