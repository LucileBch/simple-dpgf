import { TextField } from "@mui/material";
import React from "react";

interface IProps {
  id?: string;
  name?: string;
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
  endAdornment?: React.ReactNode;
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
  endAdornment,
}: IProps): React.JSX.Element {
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
      InputProps={{
        endAdornment: endAdornment, // Utiliser endAdornment dans InputProps
      }}
    />
  );
}
