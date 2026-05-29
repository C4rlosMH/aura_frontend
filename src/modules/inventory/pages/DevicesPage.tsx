import React, { useEffect, useState } from 'react';
import { getDevices } from '../api/device.api';
import type { Device } from '../types';
import '../styles/devices.scss';

export const DevicesPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = async () => {
    try {
      setIsLoading(true);
      const response = await getDevices({ limit: 50 });
      // Tu device.controller.ts envía la lista de equipos dentro de la propiedad "data"
      setDevices(response.data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Error al cargar el inventario');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div className="aura-page-container">
      <div className="aura-page-header">
        <h2>Inventario General (Todos los Equipos)</h2>
        <button className="aura-btn-primary">Registrar Equipo</button>
      </div>

      {error && <div className="aura-alert-error">{error}</div>}

      <div className="aura-table-wrapper">
        {isLoading ? (
          <div className="aura-table-empty">
            <p>Sincronizando con Aura Core...</p>
          </div>
        ) : (
          <table className="aura-table">
            <thead>
              <tr>
                <th>Etiqueta / MAC</th>
                <th>Datos del Equipo</th>
                <th>Red (IP)</th>
                <th>Clasificación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {devices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="aura-table-empty">
                    No hay equipos registrados en el Tenant actual.
                  </td>
                </tr>
              ) : (
                devices.map((device) => (
                  <tr key={device.id}>
                    <td>
                      <div className="fw-bold">{device.etiqueta || `DEV-${device.id}`}</div>
                      <div className="text-muted text-small">{device.mac_address || 'Sin MAC'}</div>
                    </td>
                    <td>
                      <div>{device.nombre_equipo || 'Sin Nombre'}</div>
                      <div className="text-muted text-small">
                        {device.marca || 'N/A'} {device.modelo ? `- ${device.modelo}` : ''}
                      </div>
                    </td>
                    <td>
                      <div>{device.ip_equipo || 'DHCP / No Asignada'}</div>
                      <div className="text-muted text-small">
                        {/* VLAN: {device.vlan?.nombre || 'General'} */}
                      </div>
                    </td>
                    <td>
                      <span className="aura-badge outline">
                        {device.type?.nombre || 'General'}
                      </span>
                    </td>
                    <td>
                      <span 
                        className="aura-badge solid" 
                        style={{ backgroundColor: device.status?.color || '#94a3b8' }}
                      >
                        {device.status?.nombre || 'Desconocido'}
                      </span>
                    </td>
                    <td>
                      <button className="aura-btn-icon">Detalles</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};