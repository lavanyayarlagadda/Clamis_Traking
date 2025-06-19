import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import {
  Activity,
  FileText,
  Users,
  Clock,
  Check,
  HeartPulse,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mobileOpen: boolean;
  handleMobileToggle: () => void;
}

const drawerWidth = 240;

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity, color: '#3b82f6' },        // Blue
  { id: 'reports', label: 'Reports & Analytics', icon: FileText, color: '#22c55e' }, // Green
  { id: 'reconciled', label: 'Reconciled Claims', icon: Check, color: '#6366f1' },  // Indigo
  { id: 'unreconciled', label: 'Unreconciled Claims', icon: Clock, color: '#ef4444' }, // Red
  { id: 'workQueue', label: 'Work Queue', icon: Users, color: '#a855f7' },          // Purple
];



const DrawerContent = ({
  isOpen,
  activeTab,
  setActiveTab,
}: Pick<SidebarProps, 'isOpen' | 'activeTab' | 'setActiveTab'>) => {
  const location = useLocation();

  return (
    <List sx={{ px: 1 }}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const selected = location.pathname === `/${item.id}`;
        const baseColor = item.color;

        return (
          <ListItemButton
            key={item.id}
            component={Link}
            to={`/${item.id}`}
            onClick={() => setActiveTab(item.id)}
            selected={selected}
            sx={{
              justifyContent: isOpen ? 'initial' : 'center',
              px: 2.5,
              py: 1.2,
              my: 0.5,
              borderRadius: 2,
              background: selected
                ? 'linear-gradient(to right, #6366f1, #3b82f6)' 
                : 'transparent',
              color: selected ? '#fff' : '#111827',
              fontWeight: selected ? 600 : 500,
              '&:hover': {
                background: selected
                  ? 'linear-gradient(to right, #6366f1, #3b82f6)'
                  : '#f3f4f6',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isOpen ? 2 : 'auto',
                justifyContent: 'center',
                color: selected ? '#fff' : baseColor,
              }}
            >
              <Icon size={20} />
            </ListItemIcon>
            {isOpen && (
             <ListItemText
  primary={item.label}
  primaryTypographyProps={{
    fontWeight: selected ? 500 : 500,
    fontSize: '0.95rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }}
/>

            )}
          </ListItemButton>
        );
      })}
    </List>
  );
};



const Sidebar = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  mobileOpen,
  handleMobileToggle,
}: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
        >
          <DrawerContent
            isOpen={true}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </Drawer>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          open={isOpen}
          sx={{
            width: isOpen ? drawerWidth : 60,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: isOpen ? drawerWidth : 60,
              transition: 'width 0.3s',
              overflowX: 'hidden',
            },
          }}
        >


<Toolbar
  sx={{
    justifyContent: isOpen ? 'space-between' : 'center',
    display: 'flex',
    alignItems: 'center',
    px: 1,
    gap: 1,
  }}
>
  {isOpen && (
    <Typography variant="h6" noWrap>
      HealthCare
    </Typography>
  ) }

  <IconButton onClick={() => setIsOpen(!isOpen)}>
    {isOpen ? <ChevronLeft /> :<>
    <HeartPulse size={20} color="#3b82f6" />
   <ChevronRight /></>}
  </IconButton>

</Toolbar>

          <Divider />
          <DrawerContent
            isOpen={isOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
