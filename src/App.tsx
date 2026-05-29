import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { MainLayout } from './core/components/MainLayout';
import { DashboardPage } from './modules/dashboard/pages/DashboardPage';
import { StaffPage } from './modules/staff/pages/StaffPage';
import { LoginPage } from './modules/auth/pages/LoginPage';
import { useAuthStore } from './modules/auth/store/authStore';
import { DevicesPage } from './modules/inventory/pages/DevicesPage';


function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública: Si ya está autenticado, lo manda al Dashboard directamente */}
        <Route 
          path="/login" 
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} 
        />

        {/* Rutas Protegidas: Si NO está autenticado, lo bota al Login */}
        <Route 
          path="/" 
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="/inventory" element={<DevicesPage />} />
          <Route path="staff" element={<StaffPage />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;