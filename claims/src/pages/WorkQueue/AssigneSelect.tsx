import React, { useState, useMemo } from 'react';
import {
  Popover,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Tooltip,
  TextField,
  InputAdornment
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';

export interface Assignee {
  id: string;
  name: string;
}

const avatarColors: Record<string, string> = {
  A: '#E57373', B: '#F06292', C: '#BA68C8', D: '#9575CD',
  E: '#7986CB', F: '#64B5F6', G: '#4FC3F7', H: '#4DD0E1',
  I: '#4DB6AC', J: '#81C784', K: '#AED581', L: '#DCE775',
  M: '#FFF176', N: '#FFD54F', O: '#FFB74D', P: '#FF8A65',
  Q: '#A1887F', R: '#90A4AE', S: '#F44336', T: '#E91E63',
  U: '#9C27B0', V: '#3F51B5', W: '#2196F3', X: '#00BCD4',
  Y: '#009688', Z: '#4CAF50'
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const getAvatarColor = (name: string): string => {
  const initial = name?.trim().charAt(0).toUpperCase();
  return avatarColors[initial] || '#BDBDBD';
};

const truncateName = (name: string, maxLength = 15): string => {
  return name.length > maxLength ? name.slice(0, maxLength - 3) + '...' : name;
};

interface AssigneePopoverProps {
  assignees: Assignee[];
  selectedAssigneeId: string | null;
  onSelect: (assignee: Assignee) => void;
}

const AssigneePopover: React.FC<AssigneePopoverProps> = ({
  assignees,
  selectedAssigneeId,
  onSelect
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const selected = assignees.find(a => a.id === selectedAssigneeId);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
  };

  const handleSelect = (assignee: Assignee) => {
    onSelect(assignee);
    handleClose();
  };

  const filteredAssignees = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return term
      ? assignees.filter(a => a.name.toLowerCase().includes(term))
      : assignees;
  }, [searchTerm, assignees]);

  const open = Boolean(anchorEl);
  const id = open ? 'assignee-popover' : undefined;

  return (
    <>
      <Tooltip title={selected?.name || 'Unassigned'}>
        <Box
          onClick={handleOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: 1,
            '&:hover': { backgroundColor: '#f4f5f7' },
            maxWidth: 200
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: 14,
              bgcolor: selected ? getAvatarColor(selected.name) : '#E0E0E0'
            }}
          >
            {selected ? getInitials(selected.name) : <PersonOutlineIcon fontSize="small" />}
          </Avatar>

          <Typography
            variant="body2"
            noWrap
            sx={{
              maxWidth: 130,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {selected?.name ? truncateName(selected.name) : 'Unassigned'}
          </Typography>
        </Box>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: { width: 250, maxHeight: 300 } }}
      >
        <Box sx={{ p: 1 }}>
          <TextField
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search assignees..."
            size="small"
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
          />
        </Box>

        <List dense sx={{ maxHeight: 230, overflowY: 'auto' }}>
          {filteredAssignees.map((assignee) => (
            <Tooltip title={assignee.name} key={assignee.id} arrow>
              <ListItemButton
                selected={assignee.id === selectedAssigneeId}
                onClick={() => handleSelect(assignee)}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    marginRight: 1,
                    fontSize: 12,
                    bgcolor: getAvatarColor(assignee.name)
                  }}
                >
                  {getInitials(assignee.name)}
                </Avatar>
                <ListItemText
                  primary={
                    <Typography
                      noWrap
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 140
                      }}
                    >
                      {truncateName(assignee.name)}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Tooltip>
          ))}

          {filteredAssignees.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
              No users found
            </Typography>
          )}
        </List>
      </Popover>
    </>
  );
};

export default AssigneePopover;
