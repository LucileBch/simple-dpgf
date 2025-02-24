import { Container } from "@mui/material";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function PageContainerSpace({
  children,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <Container
      maxWidth="xl"
      sx={{
        p: 1,
        minHeight: "calc(100vh - 150px)",
      }}
    >
      {children}
    </Container>
  );
}
