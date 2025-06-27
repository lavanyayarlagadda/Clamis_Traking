import { Button, CircularProgress, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface ButtonComponentProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  color?: "primary" | "secondary" | "error" | "success" | "inherit";
  fullWidth?: boolean;
  loaderColor?: 'primary' | 'secondary' | 'error' | 'success' | 'inherit' | 'info' | 'warning';
  sx?: SxProps<Theme>; // ✅ added
}

export const ButtonComponent = ({
  label,
  onClick,
  disabled,
  loading,
  variant = "contained",
  size = "medium",
  startIcon,
  endIcon,
  color = "primary",
  fullWidth = false,
  loaderColor = 'primary',
  sx = {},
}: ButtonComponentProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      color={color}
      fullWidth={fullWidth}
      sx={{
        textTransform: 'none',
        ...sx,
      }}
    >
      {loading ? <CircularProgress size={20} color={loaderColor} /> : label}
    </Button>
  );
};
