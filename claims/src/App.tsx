import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './layout/header';
import Sidebar from './layout/sideBar';

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        setActiveTab={setActiveTab}
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
        <h1>{activeTab.toUpperCase()} Content</h1>
      </Box>
    </Box>
  );
};

export default AppLayout;
