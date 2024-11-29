import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './i18n';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
 <AppProvider>
  <App />
 </AppProvider>
  </BrowserRouter>,
)
