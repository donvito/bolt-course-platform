import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ShoppingProvider } from './contexts/ShoppingContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ShoppingProvider>
          <App />
        </ShoppingProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);