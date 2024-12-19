import { TextField } from "@mui/material";

interface ITextInputProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

export function TextInput({
  id,
  name,
  type,
  label,
  required,
  disabled = false,
  onChange,
  autoComplete = "off",
}: ITextInputProps): JSX.Element {
  return (
    <TextField
      id={id}
      name={name}
      type={type}
      label={label}
      required={required}
      disabled={disabled}
      onChange={onChange}
      autoComplete={autoComplete}
      variant="outlined"
      sx={{ width: "500px" }}
    />
  );
}
