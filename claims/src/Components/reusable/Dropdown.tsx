import {
  Autocomplete,
  TextField,
  CircularProgress,
  Popper,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

export interface DropdownOption {
  label: string;
  value: string | number;
}

interface DropdownComponentProps<T = boolean> {
  label?: string;
  options: DropdownOption[];
  value: T extends true ? DropdownOption[] : DropdownOption | null;
  onChange: (value: T extends true ? DropdownOption[] : DropdownOption | null) => void;
  loading?: boolean;
  multiple?: T;
  disabled?: boolean;
  required?:boolean;
  error?: boolean;
  helperText?: string;
}

const StyledPopper = styled(Popper)({
   zIndex: 1301,
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow:
    "0px 5px 5px -3px rgba(0, 0, 0, 0.2), " +
    "0px 8px 10px 1px rgba(0, 0, 0, 0.14), " +
    "0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
  backgroundColor: "#fff",
  color: "rgba(0, 0, 0, 0.87)",
  overflowY: "auto",
  overflowX: "hidden",
  position: "absolute",
  borderRadius: 4,
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
  outline: 0,
  width:'100%'
}));

export const DropdownComponent = <T extends boolean = false>({
  label,
  options,
  value,
  onChange,
   error = false,
  helperText = "",
  loading = false,
  multiple = false as T,
  disabled = false,
  required= false
}: DropdownComponentProps<T>) => {
  return (
<>
    <Box display="flex" alignItems="center" gap={0.5}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, marginBottom: "4px" }}
          color="#656565"
        >
          {label}
        </Typography>
        {required && (
          <Typography component="span" color="error">
            *
          </Typography>
        )}
      </Box>
    <Autocomplete
      disablePortal={false}
      multiple={multiple}
      options={options}
      value={value as any}
      onChange={(_, newValue) => onChange(newValue as any)}
      loading={loading}
      popupIcon={<ExpandMoreIcon />}
      clearIcon={<CloseIcon />}
      PopperComponent={StyledPopper}
      PaperComponent={StyledPaper}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
           placeholder={`Enter a ${label}`}
          size="small"
          disabled={disabled}
          fullWidth
          required
          error={error}
            helperText={helperText}
          InputProps={{
            ...params.InputProps,
                       autoComplete: "new-password",
              style: {
                appearance: "none",
                MozAppearance: "textfield",
                WebkitAppearance: "none",
              },
            endAdornment: (
              <>
                {loading ? <CircularProgress size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
 sx={{
"&.MuiAutocomplete-root .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
      padding: "4px 12px", 
      borderRadius: 2,
    },
    "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
      padding: "4px 12px",
      borderRadius: 2,
       color: "black",
                  "&::-ms-reveal": {
                    display: "none",
                  },
                  "&::-ms-clear": {
                    display: "none",
                  },
    },

  }}
        />
      )}
    />
    </>
  );
};
