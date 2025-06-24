// components/Dropdown.tsx

import React from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

interface DropdownProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth size="small" margin="none">
      {/* Top label */}
      <Typography
        variant="subtitle2"
        fontWeight={500}
        gutterBottom
        sx={{ color: 'text.primary' }}
      >
        {label}
      </Typography>

      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        fullWidth
        size="small"
        sx={{
          backgroundColor: '#fff',
          borderRadius: 1,
        }}
      >
        <MenuItem value="" disabled>
          Select {label}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
