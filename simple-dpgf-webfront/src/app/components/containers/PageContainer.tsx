import { Container } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function PageContainer({
  children,
}: Readonly<IProps>): JSX.Element {
  return (
    <Container
      maxWidth="lg"
      sx={{
        p: 1,
        minHeight: "calc(100vh - 150px)",
        //background: "yellow",
      }}
    >
      {children}
    </Container>
  );
}
