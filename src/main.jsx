import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/tinos/400.css";
import "@fontsource/tinos/700.css";
import "@fontsource/arimo/400.css";
import "@fontsource/arimo/700.css";
import "@fontsource/carlito/400.css";
import "@fontsource/carlito/700.css";
import "@fontsource/caladea/400.css";
import "@fontsource/caladea/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./styles/theme.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
