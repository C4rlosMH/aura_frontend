import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChevronRight, LayoutDashboard, Package, 
  Monitor, Printer, Cctv, Network, Smartphone, 
  Server, Users, MapPin, Building, DoorOpen, 
  Moon, LogOut, Bell
} from 'lucide-react';
import './sidebar.scss';

export const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    equipos: true,
    ubicacion: false
  });

  const toggleSubMenu = (menu: keyof typeof openMenus) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  return (
    <aside className="aura-sidebar">
      
      <div className="aura-sidebar__logo">
        <div className="aura-sidebar__logo-mark">A</div>
        <div className="aura-sidebar__logo-text">
          <strong>Aura ITSM</strong>
          <span>v2.4.1 Enterprise</span>
        </div>
      </div>

      <div className="aura-sidebar__scroll">
        
        <p className="aura-sidebar__section-label">Principal</p>
        <NavLink to="/" className={({ isActive }) => `aura-sidebar__nav-item ${isActive ? 'active' : ''}`}>
          <div className="aura-sidebar__nav-icon"><LayoutDashboard size={18} /></div>
          <span className="aura-sidebar__nav-label">Dashboard</span>
        </NavLink>

        <p className="aura-sidebar__section-label">Inventario</p>
        
        <div className="aura-sidebar__nav-item" onClick={() => toggleSubMenu('equipos')}>
          <div className="aura-sidebar__nav-icon"><Package size={18} /></div>
          <span className="aura-sidebar__nav-label">Equipos e Infra</span>
          <ChevronRight size={14} className={`aura-sidebar__chevron ${openMenus.equipos ? 'aura-sidebar__chevron--open' : ''}`} />
        </div>
        <div className={`aura-sidebar__sub-nav ${openMenus.equipos ? 'aura-sidebar__sub-nav--open' : ''}`}>
          <NavLink to="/inventory/computing" className="aura-sidebar__sub-item"><Monitor size={14}/> Laptops y PCs</NavLink>
          <NavLink to="/inventory/printers" className="aura-sidebar__sub-item"><Printer size={14}/> Impresoras</NavLink>
          <NavLink to="/inventory/cctv" className="aura-sidebar__sub-item"><Cctv size={14}/> CCTV / Cámaras</NavLink>
          <NavLink to="/inventory/network" className="aura-sidebar__sub-item"><Network size={14}/> Switches y Routers</NavLink>
          <NavLink to="/inventory/mobile" className="aura-sidebar__sub-item"><Smartphone size={14}/> Celulares</NavLink>
          <NavLink to="/inventory/servers" className="aura-sidebar__sub-item"><Server size={14}/> Servidores</NavLink>
        </div>

        <p className="aura-sidebar__section-label">Gestion Operativa</p>

        <NavLink to="/staff" className={({ isActive }) => `aura-sidebar__nav-item ${isActive ? 'active' : ''}`}>
          <div className="aura-sidebar__nav-icon"><Users size={18} /></div>
          <span className="aura-sidebar__nav-label">Directorio y Staff</span>
          <span className="aura-sidebar__badge">3</span>
        </NavLink>

        <div className="aura-sidebar__nav-item" onClick={() => toggleSubMenu('ubicacion')}>
          <div className="aura-sidebar__nav-icon"><MapPin size={18} /></div>
          <span className="aura-sidebar__nav-label">Estructura Fisica</span>
          <ChevronRight size={14} className={`aura-sidebar__chevron ${openMenus.ubicacion ? 'aura-sidebar__chevron--open' : ''}`} />
        </div>
        <div className={`aura-sidebar__sub-nav ${openMenus.ubicacion ? 'aura-sidebar__sub-nav--open' : ''}`}>
          <NavLink to="/organization/sites" className="aura-sidebar__sub-item"><Building size={14}/> Hoteles / Sedes</NavLink>
          <NavLink to="/organization/areas" className="aura-sidebar__sub-item"><DoorOpen size={14}/> Áreas y Planos</NavLink>
        </div>

        <div className="aura-sidebar__divider"></div>

        <p className="aura-sidebar__section-label">Preferencias</p>

        <div className="aura-sidebar__nav-item" onClick={toggleTheme}>
          <div className="aura-sidebar__nav-icon"><Moon size={18} /></div>
          <span className="aura-sidebar__nav-label">Alternar Tema</span>
        </div>

        <div className="aura-sidebar__nav-item" style={{ color: 'var(--danger-subtle)' }}>
          <div className="aura-sidebar__nav-icon" style={{ color: 'var(--danger)' }}><LogOut size={18} /></div>
          <span className="aura-sidebar__nav-label" style={{ color: 'var(--danger)' }}>Cerrar Sesion</span>
        </div>

      </div>

      <div className="aura-sidebar__footer">
        <div className="aura-sidebar__user-row">
          <div className="aura-sidebar__avatar">CM</div>
          <div className="aura-sidebar__user-info">
            <p>Carlos Miranda</p>
            <p>Admin Corporativo</p>
          </div>
          <Bell size={16} style={{ color: 'var(--text-muted)' }} />
        </div>
      </div>
    </aside>
  );
};