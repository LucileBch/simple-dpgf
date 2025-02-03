import { Button } from "@mui/material";

interface IProps {
  label: string;
  onClick?(): void;
}

export default function OutlinedButton({
  label,
  onClick,
}: Readonly<IProps>): JSX.Element {
  return (
    <Button variant="outlined" onClick={onClick}>
      {label}
    </Button>
  );
}
