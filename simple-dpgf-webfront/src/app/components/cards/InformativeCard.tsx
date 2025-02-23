import { Box, Card, CardContent, Chip, Grid2, Typography } from "@mui/material";
import TitleH2 from "../typographies/TitleH2";
import { ReactElement } from "react";
import { theme } from "../../styles/theme";

interface IProps {
  title: string;
  content: string;
  icon: ReactElement;
  showChip?: boolean;
}

export default function InformativeCard({
  title,
  content,
  icon,
  showChip = false,
}: Readonly<IProps>): JSX.Element {
  return (
    <Grid2 size={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
          padding: "20px",
          position: "relative",
        }}
      >
        <CardContent>
          {showChip && (
            <Chip
              label="À venir"
              sx={{
                fontSize: "14px",
                color: theme.palette.error.main,
                backgroundColor: theme.palette.error.contrastText,
                position: "absolute",
                top: 10,
                right: 10,
              }}
            />
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {icon}
            <TitleH2>{title}</TitleH2>
          </Box>
          <Typography variant="body2" sx={{ textAlign: "justify" }}>
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
}
