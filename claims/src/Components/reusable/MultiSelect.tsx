// components/reusable/MultiSelect.tsx
import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
  Tooltip,
  Typography
} from '@mui/material';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  width?: number | string;
  includeAllOption?: boolean;
  placeholder?: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelect: React.FC<MultiSelectProps> = ({ 
  options, 
  selected, 
  onChange, 
  width = 180,
  includeAllOption = false,
  placeholder = 'Select companies'
}) => {
  const allSelected = includeAllOption && selected.includes('ALL');
  const allOptions = includeAllOption ? ['ALL', ...options] : options;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const selectedOptions = typeof value === 'string' ? value.split(',') : value;

    if (includeAllOption) {
      if (selectedOptions.includes('ALL')) {
        onChange(['ALL']);
        return;
      }
      if (allSelected) {
        onChange(selectedOptions.filter(opt => opt !== 'ALL'));
        return;
      }
      if (selectedOptions.length === options.length) {
        onChange(['ALL']);
        return;
      }
    }

    onChange(selectedOptions);
  };

  const getSelectedText = () => {
    if (allSelected) return 'All Insurances';
    if (selected.length === 0) return placeholder;
    return selected.join(', ');
  };

  const isOverflowed = () => {
    if (!inputRef.current) return false;
    return inputRef.current.scrollWidth > inputRef.current.clientWidth;
  };

  return (
    <FormControl sx={{ width }} size="small">
      <Select
        multiple
        value={allSelected ? ['ALL'] : selected}
        onChange={handleChange}
        input={<OutlinedInput 
          inputRef={inputRef}
          sx={{
            '& .MuiOutlinedInput-input': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              pr: '24px !important' // Ensure space for dropdown icon
            }
          }}
        />}
        displayEmpty
        renderValue={() => (
          <Tooltip 
            title={getSelectedText()} 
            disableHoverListener={!isOverflowed()}
            placement="bottom-start"
          >
            <Typography 
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%'
              }}
            >
              {getSelectedText()}
            </Typography>
          </Tooltip>
        )}
        MenuProps={MenuProps}
        sx={{
          '& .MuiSelect-select': {
            padding: '8.5px 14px',
            minHeight: 'auto'
          }
        }}
      >
        {allOptions.map((option) => (
          <MenuItem 
            key={option} 
            value={option}
            disabled={option !== 'ALL' && allSelected}
          >
            <Checkbox 
              checked={allSelected || selected.includes(option)} 
              disabled={option !== 'ALL' && allSelected}
              size="small"
            />
            <ListItemText primary={option} sx={{ '& span': { fontSize: '0.875rem' } }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;