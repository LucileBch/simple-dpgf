import { TextField } from "@mui/material";

interface ITextInputProps {
  fieldName: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  type?: string;
}

export function TextInput({
  fieldName,
  label,
  required = true,
  disabled = false,
  defaultValue,
  type,
}: ITextInputProps): JSX.Element {
  return (
    <TextField
      id={fieldName}
      variant="outlined"
      label={label}
      required={required}
      disabled={disabled}
      defaultValue={defaultValue}
      type={type}
      sx={{ width: "500px" }}
    />
  );
}
