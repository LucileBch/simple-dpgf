import { Box } from "@mui/material";
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
}: Readonly<ISubmitButtonProps>): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        pt: 1,
      }}
    >
      <Button variant="contained" type={type} disabled={disabled} {...rest}>
        {label}
      </Button>
    </Box>
  );
}
