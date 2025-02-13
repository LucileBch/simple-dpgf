import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function TitleH2({ children }: Readonly<IProps>): JSX.Element {
  return (
    <Typography
      variant="h2"
      sx={{
        paddingY: 2,
      }}
    >
      {children}
    </Typography>
  );
}
