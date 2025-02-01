import { Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function TitleH3({ children }: Readonly<IProps>): JSX.Element {
  const theme = useTheme();
  return (
    <Typography
      variant="h3"
      sx={{
        paddingY: 1,
        pb: 2,
        color: theme.palette.primary.main,
      }}
    >
      {children}
    </Typography>
  );
}
