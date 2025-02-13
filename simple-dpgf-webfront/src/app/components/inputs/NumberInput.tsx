import { TextField } from "@mui/material";

interface INumberInputProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  autoComplete?: string;
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
}: INumberInputProps): JSX.Element {
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
      sx={{ width: "400px" }}
    />
  );
}
