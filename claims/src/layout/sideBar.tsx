import React, { useEffect, useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  Collapse,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  Toolbar,
  Divider
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Description,
  LocalActivity,
  InsertDriveFile,
  Check,
  LockClock,
  Group,
  ChevronLeft,
  HealthAndSafety,
  ChevronRight,
  LibraryBooks,
  ReceiptLong,
  FolderSpecial
} from '@mui/icons-material';
import { useLocation, Link } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mobileOpen: boolean;
  handleMobileToggle: () => void;
}

const drawerWidth = 240;
const closedDrawerWidth = 80;
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LocalActivity, color: '#3b82f6' },
  // { id: 'reports', label: 'Reports & Analytics', icon: InsertDriveFile, color: '#22c55e' },
  {
    id: 'claims',
    label: 'Claims',
    icon: Description,
    color: '#0ea5e9',
    children: [
             { id: 'allclaims', label: 'All Claims', icon: ReceiptLong, color: '#a855f7' },
      { id: 'reconciled', label: 'Reconciled Claims', icon: Check, color: '#6366f1' },
      { id: 'unreconciled', label: 'Unreconciled Claims', icon: LockClock, color: '#ef4444' },

    ],
  },
 
  //   { id: 'workQueue', label: 'Work Queue', icon: Group, color: '#a855f7' },
];

const DrawerContent = ({
  isOpen,
  activeTab,
  setActiveTab,
  handleMobileToggle,
  drawerWidth
}: {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleMobileToggle: () => void;
  drawerWidth: number
}) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Expand parent menu if current route matches any child
    const updated: Record<string, boolean> = {};
    menuItems.forEach((item) => {
      if (item.children?.some((child) => location.pathname === `/${child.id}`)) {
        updated[item.id] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...updated }));
  }, [location.pathname]);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <List sx={{ px: 1 }}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isParent = !!item.children;
        const isParentOpen = openMenus[item.id];
        const isChildActive = item.children?.some((c) => `/${c.id}` === location.pathname);
        const selected = location.pathname === `/${item.id}` || isChildActive;

        if (isParent) {
          return (
            <React.Fragment key={item.id}>
              <ListItemButton
                onClick={() => toggleMenu(item.id)}
                selected={isChildActive}
                sx={{
                  justifyContent: isOpen ? 'initial' : 'center',
                  px: 2,
                  py: 1.2,
                  my: 0.5,
                  borderRadius: 2,
                  background: isChildActive
                    ? 'linear-gradient(to right, #6366f1, #3b82f6)'
                    : 'transparent',
                  color: isChildActive ? '#fff' : '#111827',
                  fontWeight: isChildActive ? 600 : 500,
                  '&:hover': {
                    background: isChildActive
                    ? 'linear-gradient(to right, #6366f1, #3b82f6)'
                    : 'transparent',
                  },
                }}
              >
                <Tooltip title={!isOpen ? item.label : ''} placement="right">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 2 : 'auto',
                      justifyContent: 'center',
                      color: isChildActive ? '#fff' : item.color,
                      '& svg': {
                        fontSize: isOpen ? 26 : 22, // Adjust size when drawer is closed
                      },
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                </Tooltip>

                {isOpen && (
                  <>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        whiteSpace: 'nowrap',
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(item.id);
                      }}
                      sx={{ color: isChildActive ? '#fff' : '#6b7280' }}
                    >
                      {isParentOpen ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </>
                )}

                {!isOpen && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(item.id);
                    }}
                    sx={{ color: isChildActive ? '#fff' : '#6b7280', ml: 0 }}
                  >
                    {isParentOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                  </IconButton>
                )}
              </ListItemButton>

              <Collapse in={isParentOpen} timeout="auto" unmountOnExit>
                {item.children.map((child) => {
                  const ChildIcon = child.icon;
                  const selectedChild = location.pathname === `/${child.id}`;
                  return (
                    <ListItemButton
                      key={child.id}
                      component={Link}
                      to={`/${child.id}`}
                      onClick={() => {
                        setActiveTab(child.id);
                        if (window.innerWidth < 600) handleMobileToggle();
                      }}
                      selected={selectedChild}
                      sx={{
                        // pl: isOpen ? 6 : 2,
                        // py: 1,
                        pl: isOpen ? 6 : 1,
                        pr: isOpen ? 2 : 1,
                        py: 1,
                        justifyContent: isOpen ? 'flex-start' : 'center',
                        borderRadius: 2,
                        color: selectedChild ? '#6366f1' : '#111827',
                        '&:hover': {
                          background: isOpen ? '#f3f4f6' : 'transparent',
                        },
                      }}

                    >
                      <Tooltip title={!isOpen ? child.label : ''} placement="right">
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: isOpen ? 2 : 0,
                            justifyContent: 'center',
                            // justifyContent: isOpen ? 'center' : 'flex-end',

                            color: selectedChild ? '#6366f1' : child.color,
                            '& svg': {
                              fontSize: isOpen ? 22 : 20,
                            },
                          }}
                        >
                          <ChildIcon />
                        </ListItemIcon>
                      </Tooltip>
                      {isOpen && (
                        <ListItemText
                          primary={child.label}
                          primaryTypographyProps={{
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            whiteSpace: 'nowrap',
                          }}
                        />
                      )}
                    </ListItemButton>
                  );
                })}
              </Collapse>
            </React.Fragment>
          );
        }

        // Top-level item (no children)
        return (
          <ListItemButton
            key={item.id}
            component={Link}
            to={`/${item.id}`}
            onClick={() => {
              setActiveTab(item.id);
              if (window.innerWidth < 600) handleMobileToggle();
            }}
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
                background:  selected
                ? 'linear-gradient(to right, #6366f1, #3b82f6)'
                : 'transparent',
              },
            }}
          >
            <Tooltip title={!isOpen ? item.label : ''} placement="right">
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen ? 2 : 'auto',
                  justifyContent: 'center',
                  color: selected ? '#fff' : item.color,
                }}
              >
                <Icon />
              </ListItemIcon>
            </Tooltip>
            {isOpen && (
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: '0.95rem',
                }}
              />
            )}
          </ListItemButton>
        );
      })}
    </List>
  );
};


const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  mobileOpen,
  handleMobileToggle,
}) => {
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
          // sx={{
          //   '& .MuiDrawer-paper': {
          //     width: drawerWidth,
          //     boxSizing: 'border-box',
          //   },
          // }}
          sx={{
            width: isOpen ? drawerWidth : closedDrawerWidth,
            '& .MuiDrawer-paper': {
              width: isOpen ? drawerWidth : closedDrawerWidth,
            }
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
            <Typography variant="h6">HealthCare</Typography>
            <IconButton onClick={handleMobileToggle}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <DrawerContent
            isOpen={true}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleMobileToggle={handleMobileToggle}
            drawerWidth={isOpen ? drawerWidth : closedDrawerWidth}
          />
        </Drawer>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          open={isOpen}
          sx={{
            width: isOpen ? drawerWidth : closedDrawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: isOpen ? drawerWidth : closedDrawerWidth,
              transition: 'width 0.3s',
              overflowX: 'hidden',
              boxSizing: 'border-box',
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
              <>
              <img src={'/healthcare.svg'} alt='healthCare' width={30} height={30}/>
              <Typography variant="h6" noWrap>
                HealthCare
              </Typography>
              </>
            )}
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <ChevronLeft />
              ) : (
                <>
                   <img src={'/healthcare.svg'} alt='healthCare' width={30} height={30}/>
                  <ChevronRight />
                </>
              )}
            </IconButton>
          </Toolbar>
          <Divider />
          <DrawerContent
            isOpen={isOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleMobileToggle={handleMobileToggle}
            drawerWidth={isOpen ? drawerWidth : closedDrawerWidth}
          />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
