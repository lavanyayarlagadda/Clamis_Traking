import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './header';
import Sidebar from './sideBar';
import { Outlet, useLocation } from 'react-router-dom';

const AppLayout = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

    // Extract tab from pathname
  const activeTab = location.pathname.split('/')[1] || 'dashboard';
  console.log("activeTab", activeTab)

  return (
    <Box sx={{ display: 'flex' }}>
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
        // setActiveTab={setActiveTab}
         setActiveTab={() => {}}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mobileOpen={mobileOpen}
        handleMobileToggle={() => setMobileOpen(false)}
      />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          ml: `${isOpen ? 240 : 60}px`,
          p: 3,
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* <h1>{activeTab.toUpperCase()} Content</h1> */}
         <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
