import { Button } from "@mui/material";

interface IProps {
  label: string;
  disabled?: boolean;
  onClick?(): void;
}

export default function OutlinedButton({
  label,
  disabled,
  onClick,
}: Readonly<IProps>): JSX.Element {
  return (
    <Button variant="outlined" onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
}
