import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // 1. Importamos
import App from './App.tsx';
import './app/styles/global.scss';

// 2. Creamos la instancia del cliente de caché
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Evita recargar datos cada vez que cambias de pestaña
      retry: 1,                    // Si falla, reintenta una sola vez
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 3. Envolvemos la App */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);