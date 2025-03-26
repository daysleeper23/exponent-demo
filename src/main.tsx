import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './components/context/theme-provider.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './api/reactQuery.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from './components/common/error-boundary.tsx';
import ServerError from './components/common/server-error.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React);
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary fallback={<ServerError />}>
      <ThemeProvider defaultTheme={'dark'} storageKey="vite-ui-theme">
        <BrowserRouter>
          <App />
          <Toaster richColors />
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ErrorBoundary>
  </QueryClientProvider>
);

