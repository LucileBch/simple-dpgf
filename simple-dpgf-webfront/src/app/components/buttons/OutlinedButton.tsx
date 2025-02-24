import { Button } from "@mui/material";
import React from "react";

interface IProps {
  label: string;
  disabled?: boolean;
  onClick?(): void;
}

export default function OutlinedButton({
  label,
  disabled,
  onClick,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <Button variant="outlined" onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
}
