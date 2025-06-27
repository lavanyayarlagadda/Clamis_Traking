
import { TextField, InputAdornment } from "@mui/material";

interface TextFieldComponentProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  type?: string;
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const TextFieldComponent = ({
  label,
  value,
  onChange,
  error,
  helperText,
  type = "text",
  required,
  fullWidth = true,
  disabled = false,
  startAdornment,
  endAdornment,
}: TextFieldComponentProps) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      helperText={helperText}
      type={type}
      required={required}
      fullWidth={fullWidth}
      disabled={disabled}
      InputProps={{
        startAdornment: startAdornment && (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
        endAdornment: endAdornment && (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
    />
  );
};
