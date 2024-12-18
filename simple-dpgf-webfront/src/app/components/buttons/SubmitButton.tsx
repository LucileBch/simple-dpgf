import Button, { ButtonProps } from "@mui/material/Button";

interface ISubmitButtonProps extends ButtonProps {
  label: string;
  disabled?: boolean;
}

export default function SubmitButton({
  type = "submit",
  label,
  disabled = false,
  ...rest
}: ISubmitButtonProps): JSX.Element {
  return (
    <Button variant="contained" type={type} disabled={disabled} {...rest}>
      {label}
    </Button>
  );
}
