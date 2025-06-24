import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CircleNotifications, Search, Menu as MenuIcon } from '@mui/icons-material';

interface HeaderProps {
  isSidebarOpen: boolean;
  currentTab: string;
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, currentTab, onSidebarToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getHeaderTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return 'Dashboard';
      case 'reports':
        return 'Reports & Analytics';
      case 'reconciled':
        return 'Reconciled Claims';
      case 'unreconciled':
        return 'Unreconciled Claims';
      case 'claims':
        return 'Claims';
      case 'workQueue':
        return 'Work Queue';
      default:
        return 'Healthcare Insurance Management';
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        width: {
          xs: '100%',
          sm: `calc(100% - ${isSidebarOpen ? 240 : 60}px)`,
        },
        ml: {
          xs: 0,
          sm: `${isSidebarOpen ? 240 : 60}px`,
        },
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3, py: 1 }}>
        {/* Left Section: Icon or Title */}
        <Box display="flex" alignItems="center" gap={2}>
          {isMobile && (
            <IconButton onClick={onSidebarToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="text.primary" fontWeight={600} noWrap>
            {getHeaderTitle(currentTab)}
          </Typography>
        </Box>

        {/* Right Section: Search, Bell, Avatar */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={{ position: 'relative' }}>
            <Search
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                color: '#9ca3af',
              }}
            />
            <InputBase
              placeholder="Search claims, hospitals..."
              sx={{
                pl: 4,
                pr: 2,
                py: 1,
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                width: { xs: '100px', sm: '150px', md: '220px' },
              }}
            />
          </Box>

          <IconButton>
            <Badge variant="dot" color="error">
              <CircleNotifications />
            </Badge>
          </IconButton>

          <Avatar
            sx={{
              width: 32,
              height: 32,
              background: 'linear-gradient(to right, #3b82f6, #10b981)',
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
