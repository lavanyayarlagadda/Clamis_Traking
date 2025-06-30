import React, { useState } from "react";
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
  Menu,
  MenuItem,
} from "@mui/material";
import {
  CircleNotifications,
  Search,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isSidebarOpen: boolean;
  currentTab: string;
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isSidebarOpen,
  currentTab,
  onSidebarToggle,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    handleClose();
    navigate("/login");
  };

  const handleNotificationsClick = () => {
    navigate("/notifications");
  };

  const getHeaderTitle = (tab: string) => {
    switch (tab) {
      case "dashboard":
        return "Dashboard";
      case "reports":
        return "Reports & Analytics";
      case "reconciled":
        return "Reconciled Claims";
      case "unreconciled":
        return "Unreconciled Claims";
      case "allclaims":
        return "All Claims";
      case "workQueue":
        return "Work Queue";
      case "notifications":
        return "Notifications";
      case "profile":
        return "Profile";
      case "users":
        return "Users";
      case "createUser":
        return "Create User";
      case "updateUser":
        return "Update User";
      default:
        return "Healthcare Insurance Management";
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        width: {
          xs: "100%",
          sm: `calc(100% - ${isSidebarOpen ? 240 : 60}px)`,
        },
        ml: {
          xs: 0,
          sm: `${isSidebarOpen ? 240 : 60}px`,
        },
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3, py: 1 }}>
        <Box display="flex" alignItems="center" gap={2}>
          {isMobile && (
            <IconButton onClick={onSidebarToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            color="text.primary"
            noWrap
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem" },
              fontWeight: { xs: 400, sm: 600 },
              pl: { xs: 0, sm: 2, md: isSidebarOpen ? 0 : 2 },
            }}
          >
            {getHeaderTitle(currentTab)}
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{
            flexShrink: 0,
            minWidth: 0,
            overflow: "hidden",
          }}
        >


          <IconButton sx={{ p: 0.75 }} onClick={handleNotificationsClick}>
            <Badge variant="dot" color="error">
              <CircleNotifications sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>

          <IconButton onClick={handleAvatarClick}>
            <Avatar
              sx={{
                width: 28,
                height: 28,
                background: "linear-gradient(to right, #3b82f6, #10b981)",
              }}
            />
          </IconButton>
        </Box>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
