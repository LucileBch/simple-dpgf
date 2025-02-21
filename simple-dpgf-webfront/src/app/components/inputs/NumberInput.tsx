import { TextField } from "@mui/material";

interface IProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  autoComplete?: string;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
}

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (!["ArrowUp", "ArrowDown", "Tab", "Backspace"].includes(e.key)) {
    e.preventDefault();
  }
};

export function NumberInput({
  id,
  name,
  label,
  required,
  disabled = false,
  onChange,
  value,
  autoComplete = "off",
  fullWidth = false,
  error,
  helperText,
}: Readonly<IProps>): JSX.Element {
  return (
    <TextField
      id={id}
      name={name}
      type="number"
      label={label}
      required={required}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      value={value}
      autoComplete={autoComplete}
      variant="outlined"
      error={error}
      helperText={helperText}
      inputProps={{ min: "0" }}
      sx={{ width: fullWidth ? "100%" : "400px" }}
    />
  );
}
