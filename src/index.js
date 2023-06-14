import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {Provider} from 'react-redux'
import {store} from './app/store'
import {theme} from'./theme/theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <Provider store={store}>
      <ScopedCssBaseline>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
    </ScopedCssBaseline>

    </Provider>
  </React.StrictMode>
);

