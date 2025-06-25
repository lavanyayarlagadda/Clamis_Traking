import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import ChatWidget from './components/chatBot';


const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
        <ChatWidget/>
      </ThemeProvider>
    </BrowserRouter>

);
