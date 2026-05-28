import React from 'react';
import { 
  Layers, 
  AlertTriangle, 
  Clock, 
  Activity, 
  WifiOff, 
  Cpu, 
  ShieldAlert,
  FileBarChart
} from 'lucide-react';
import './dashboard.scss';

export const DashboardPage = () => {
  return (
    <div className="aura-dashboard">
      
      {/* Encabezado */}
      <div className="aura-dashboard__header">
        <h1 className="aura-dashboard__title">Dashboard de Operaciones</h1>
        <button className="aura-dashboard__button">
          Generar Reporte
        </button>
      </div>

      {/* Grid de KPIs */}
      <div className="aura-dashboard__grid">
        
        <div className="aura-dashboard__card aura-dashboard__card--info">
          <div className="aura-dashboard__card-icon"><Layers size={20} /></div>
          <div className="aura-dashboard__card-info">
            <span className="aura-dashboard__card-title">Total Activos</span>
            <span className="aura-dashboard__card-value">1,248</span>
          </div>
        </div>

        <div className="aura-dashboard__card aura-dashboard__card--danger">
          <div className="aura-dashboard__card-icon"><AlertTriangle size={20} /></div>
          <div className="aura-dashboard__card-info">
            <span className="aura-dashboard__card-title">Equipos en Riesgo</span>
            <span className="aura-dashboard__card-value">14</span>
          </div>
        </div>

        <div className="aura-dashboard__card aura-dashboard__card--warning">
          <div className="aura-dashboard__card-icon"><Clock size={20} /></div>
          <div className="aura-dashboard__card-info">
            <span className="aura-dashboard__card-title">Garantias por Expirar</span>
            <span className="aura-dashboard__card-value">28</span>
          </div>
        </div>

        <div className="aura-dashboard__card aura-dashboard__card--success">
          <div className="aura-dashboard__card-icon"><Activity size={20} /></div>
          <div className="aura-dashboard__card-info">
            <span className="aura-dashboard__card-title">Uptime General</span>
            <span className="aura-dashboard__card-value">99.8%</span>
          </div>
        </div>

      </div>

      {/* Seccion Principal (Grafica + Alertas) */}
      <div className="aura-dashboard__main-section">
        
        {/* Contenedor del Grafico */}
        <div className="aura-dashboard__panel">
          <h2 className="aura-dashboard__panel-title">Distribucion de Carga e Inversion por Sitio</h2>
          
          <div className="aura-dashboard__chart-mock">
            <div className="aura-dashboard__chart-bar-wrapper">
              <div className="aura-dashboard__chart-bar" style={{ height: '70%' }}></div>
              <span className="aura-dashboard__chart-label">Sede Central</span>
            </div>
            <div className="aura-dashboard__chart-bar-wrapper">
              <div className="aura-dashboard__chart-bar aura-dashboard__chart-bar--secondary" style={{ height: '45%' }}></div>
              <span className="aura-dashboard__chart-label">Planta Proceso</span>
            </div>
            <div className="aura-dashboard__chart-bar-wrapper">
              <div className="aura-dashboard__chart-bar" style={{ height: '85%' }}></div>
              <span className="aura-dashboard__chart-label">Almacen</span>
            </div>
            <div className="aura-dashboard__chart-bar-wrapper">
              <div className="aura-dashboard__chart-bar aura-dashboard__chart-bar--secondary" style={{ height: '30%' }}></div>
              <span className="aura-dashboard__chart-label">Sucursal Sur</span>
            </div>
          </div>
        </div>

        {/* Panel de Alertas */}
        <div className="aura-dashboard__panel">
          <h2 className="aura-dashboard__panel-title">Alertas Recientes del Sistema</h2>
          
          <div className="aura-dashboard__alert-list">
            
            <div className="aura-dashboard__alert-item aura-dashboard__alert-item--danger">
              <div className="aura-dashboard__alert-icon"><WifiOff size={16} /></div>
              <div className="aura-dashboard__alert-content">
                <span className="aura-dashboard__alert-text">Ping perdido en Camara perimetral Lobby</span>
                <span className="aura-dashboard__alert-time">Hace 3 minutos</span>
              </div>
            </div>

            <div className="aura-dashboard__alert-item aura-dashboard__alert-item--warning">
              <div className="aura-dashboard__alert-icon"><Cpu size={16} /></div>
              <div className="aura-dashboard__alert-content">
                <span className="aura-dashboard__alert-text">Uso de memoria RAM superior al 92% en Servidor Node-01</span>
                <span className="aura-dashboard__alert-time">Hace 12 minutos</span>
              </div>
            </div>

            <div className="aura-dashboard__alert-item aura-dashboard__alert-item--info">
              <div className="aura-dashboard__alert-icon"><ShieldAlert size={16} /></div>
              <div className="aura-dashboard__alert-content">
                <span className="aura-dashboard__alert-text">Actualizacion de certificado SSL requerida en Gateway</span>
                <span className="aura-dashboard__alert-time">Hace 1 hora</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};