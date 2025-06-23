import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./header";
import Sidebar from "./sideBar";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeTab = location.pathname.split("/")[1] || "dashboard";
  console.log("activeTab", activeTab);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        width: "100%",
        backgroundImage: "linear-gradient(to bottom right, #eff6ff, #e0e7ff)",
      }}
    >
      <CssBaseline />

      {/* HEADER */}
      <Header
        isSidebarOpen={isOpen}
        currentTab={activeTab}
        onSidebarToggle={() => setMobileOpen(true)}
      />

      {/* SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={() => {}}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mobileOpen={mobileOpen}
        handleMobileToggle={() => setMobileOpen(false)}
      />

      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          mt: 9,
          ml: {
            xs: "15px",
            sm: `20px`,
          },
          pr: 2,
          transition: "margin-left 0.3s ease",
          overflow: "hidden",
          mb: 2,
        })}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
