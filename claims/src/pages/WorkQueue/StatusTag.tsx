import React, { useState } from 'react';
import {
  Popover,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Tooltip
} from '@mui/material';

export type StatusType = 'todo' | 'in progress' | 'done';

interface StatusPopoverProps {
  selectedStatus: StatusType;
  onSelect: (status: StatusType) => void;
}

const statusColors: Record<StatusType, { bg: string; color: string }> = {
  'todo': { bg: '#E0E0E0', color: '#424242' },
  'in progress': { bg: '#BBDEFB', color: '#1565C0' },
  'done': { bg: '#C8E6C9', color: '#2E7D32' }
};

const statusOptions: StatusType[] = ['todo', 'in progress', 'done'];

const StatusPopover: React.FC<StatusPopoverProps> = ({
  selectedStatus,
  onSelect
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'status-popover' : undefined;

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (status: StatusType) => {
    onSelect(status);
    handleClose();
  };

  const { bg, color } = statusColors[selectedStatus];

  return (
    <>
      <Tooltip title="Click to change status">
        <Box
          onClick={handleOpen}
          sx={{
            display: 'inline-block',
            px: 1.5,
            py: 0.5,
            borderRadius: '20px',
            fontSize: 12,
            fontWeight: 500,
            bgcolor: bg,
            color: color,
            textTransform: 'capitalize',
            cursor: 'pointer',
            '&:hover': { opacity: 0.9 },
            minWidth: 90,
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {selectedStatus}
          </Typography>
        </Box>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: { width: 160 } }}
      >
        <List dense>
          {statusOptions.map((status) => (
            <ListItemButton
              key={status}
              selected={status === selectedStatus}
              onClick={() => handleSelect(status)}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: statusColors[status].color,
                  marginRight: 1
                }}
              />
              <ListItemText
                primary={
                  <Typography sx={{ textTransform: 'capitalize' }}>
                    {status}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default StatusPopover;
