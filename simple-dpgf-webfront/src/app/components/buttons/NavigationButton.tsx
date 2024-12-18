import Button from "@mui/material/Button";

interface IProps {
  label: string;
  path: string;
  disabled?: boolean;
}

export default function NavigationButton({
  label,
  path,
  disabled = false,
}: IProps): JSX.Element {
  return (
    <Button variant="contained" href={path} disabled={disabled}>
      {label}
    </Button>
  );
}
