import { Container } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function PageContainerSpace({
  children,
}: Readonly<IProps>): JSX.Element {
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
