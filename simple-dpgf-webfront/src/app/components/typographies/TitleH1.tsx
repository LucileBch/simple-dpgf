import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../../styles/theme";

interface IProps {
  children: ReactNode;
}

export default function TitleH1({ children }: Readonly<IProps>): JSX.Element {
  return (
    <Typography
      variant="h1"
      sx={{
        paddingY: 2,
        color: theme.palette.primary.main,
      }}
    >
      {children}
    </Typography>
  );
}
