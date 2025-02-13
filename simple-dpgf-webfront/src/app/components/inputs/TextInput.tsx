import { TextField } from "@mui/material";

interface ITextInputProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string | number;
  autoComplete?: string;
  error?: boolean;
  helperText?: string;
}

export function TextInput({
  id,
  name,
  type,
  label,
  required,
  disabled = false,
  onChange,
  onKeyDown,
  value,
  autoComplete = "off",
  error,
  helperText,
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
      onKeyDown={onKeyDown}
      value={value}
      autoComplete={autoComplete}
      error={error}
      helperText={helperText}
      variant="outlined"
      sx={{ width: "500px" }}
    />
  );
}
