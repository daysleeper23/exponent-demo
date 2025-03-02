import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './components/context/ThemeProvider.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './api/queryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary fallback={<div>Something went wrong...</div>}>
      <ThemeProvider defaultTheme={"light"} storageKey="vite-ui-theme">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ErrorBoundary>
  </QueryClientProvider>
  
);
