import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../../styles/theme";

interface IProps {
  children: ReactNode;
}

export default function TitleH2({ children }: Readonly<IProps>): JSX.Element {
  return (
    <Typography
      variant="h2"
      sx={{
        paddingY: 2,
        color: theme.palette.secondary.main,
      }}
    >
      {children}
    </Typography>
  );
}
