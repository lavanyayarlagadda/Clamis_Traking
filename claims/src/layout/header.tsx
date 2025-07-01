import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Badge,
  Popper,
  Paper,
  Divider,
  Button,
  Fade,
} from "@mui/material";
import {
  AccountCircle,
  CircleNotifications,
  Logout,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";

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
  const { logout, user } = useAuth();

  const [popperAnchorEl, setPopperAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const isPopperOpen = Boolean(popperAnchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopperAnchorEl(popperAnchorEl ? null : event.currentTarget);
  };

  const handleClosePopper = () => {
    setPopperAnchorEl(null);
  };

  const handleProfile = () => {
    handleClosePopper();
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    handleClosePopper();
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popperAnchorEl && !popperAnchorEl.contains(event.target as Node)) {
        handleClosePopper();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popperAnchorEl]);

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2);
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

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={handleNotificationsClick}>
            <Badge variant="dot" color="error">
              <CircleNotifications sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>

          <IconButton onClick={handleAvatarClick}>
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: "0.875rem",
                background: "linear-gradient(to right, #3b82f6, #10b981)",
              }}
            >
              {getInitials(user?.name || "U")}
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>

      <Popper
        open={isPopperOpen}
        anchorEl={popperAnchorEl}
        placement="bottom-end"
        transition
        disablePortal
        modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper
              elevation={4}
              sx={{
                p: 2,
                width: 300,
                borderRadius: 2,
                backgroundColor: "#fff",
              }}
            >
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 48,
                    height: 48,
                    fontSize: 18,
                  }}
                >
                  {getInitials(user?.name || "U")}
                </Avatar>
                <Box>
                  <Typography fontWeight={600}>
                    {" "}
                    {user?.name || "Unknown User"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {user?.email || "unknown@example.com"}
                  </Typography>
                  {user?.role && (
                    <Typography
                      variant="caption"
                      sx={{ color: "primary.main", fontWeight: 500 }}
                    >
                      {user.role}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" flexDirection="column" gap={1}>
                <Button
                  startIcon={<AccountCircle />}
                  onClick={handleProfile}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    color: "text.primary",
                  }}
                >
                  My Profile
                </Button>

                <Divider />

                <Button
                  startIcon={<Logout />}
                  onClick={handleLogout}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    color: "error.main",
                    "&:hover": {
                      backgroundColor: "#ffeef0",
                    },
                  }}
                >
                  Sign out
                </Button>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </AppBar>
  );
};

export default Header;
