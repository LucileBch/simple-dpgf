import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { theme } from "../../styles/theme";

interface IProps {
  children: ReactNode;
}

export default function TitleH2({
  children,
}: Readonly<IProps>): React.JSX.Element {
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
