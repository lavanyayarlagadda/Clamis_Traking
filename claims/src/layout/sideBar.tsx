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
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'reports', label: 'Reports & Analytics', icon: FileText },
  { id: 'reconciled', label: 'Reconciled', icon: Check },
  { id: 'unreconciled', label: 'Unreconciled', icon: Clock },
  { id: 'work-queue', label: 'Work Queue', icon: Users },
];

const DrawerContent = ({
  isOpen,
  activeTab,
  setActiveTab,
}: Pick<SidebarProps, 'isOpen' | 'activeTab' | 'setActiveTab'>) => (
  <>
    <List>
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <ListItemButton
            key={item.id}
            selected={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
            sx={{
              justifyContent: isOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{ minWidth: 0, mr: isOpen ? 2 : 'auto', justifyContent: 'center' }}
            >
              <Icon size={20} />
            </ListItemIcon>
            {isOpen && <ListItemText primary={item.label} />}
          </ListItemButton>
        );
      })}
    </List>
  </>
);

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
