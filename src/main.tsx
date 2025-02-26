import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './components/context/ThemeProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme={"light"} storageKey="vite-ui-theme">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
