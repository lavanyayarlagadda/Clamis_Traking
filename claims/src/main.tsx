import React from 'react';
import ReactDOM from 'react-dom/client';
import AppLayout from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppLayout />
    </ThemeProvider>
  </React.StrictMode>
);
