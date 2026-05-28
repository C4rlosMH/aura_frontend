import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';
import './main-layout.scss';

export const MainLayout = () => {
  return (
    <div className="aura-layout">
      {/* Menu Lateral Fijo */}
      <Sidebar />

      {/* Area de Trabajo de la Aplicacion */}
      <div className="aura-layout__main">
        <main className="aura-layout__content">
          {/* Aqui React Router renderizara de forma dinamica cada pagina */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};