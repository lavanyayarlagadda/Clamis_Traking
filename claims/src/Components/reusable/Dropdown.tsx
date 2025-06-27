import {
  Autocomplete,
  TextField,
  CircularProgress,
  Popper,
  Paper,
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
  loading = false,
  multiple = false as T,
  disabled = false,
}: DropdownComponentProps<T>) => {
  return (
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
          size="small"
          label={label}
          disabled={disabled}
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
