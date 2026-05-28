import React from 'react';
import { UserPlus, Briefcase, Building2, Laptop, AlertCircle } from 'lucide-react';
import { useStaff } from '../hooks/useStaff';
import '../styles/staff.scss';
export const StaffPage = () => {
  const { data: staffList, isLoading, isError, error } = useStaff();

  // Obtener iniciales para el avatar falso
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="aura-staff__status-box">
        <p>Sincronizando con el servidor central de Aura...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="aura-staff__status-box" style={{ borderColor: 'var(--danger)' }}>
        <AlertCircle size={24} style={{ color: 'var(--danger)', marginBottom: '0.5rem' }} />
        <p style={{ color: 'var(--danger)', fontWeight: 600 }}>Error al conectar con la base de datos</p>
        <p style={{ fontSize: '12px' }}>{(error as any)?.message || 'Comprueba que tu backend esté encendido.'}</p>
      </div>
    );
  }

  return (
    <div className="aura-staff">
      {/* Encabezado */}
      <div className="aura-staff__header">
        <h1 className="aura-staff__title">Directorio de Personal y Cargos</h1>
        <button className="aura-staff__button">
          <UserPlus size={16} />
          Nuevo Perfil / Puesto
        </button>
      </div>

      {/* Contenedor de la Tabla */}
      <div className="aura-staff__table-container">
        {staffList && staffList.length > 0 ? (
          <table className="aura-staff__table">
            <thead>
              <tr>
                <th className="aura-staff__th">Colaborador / Puesto</th>
                <th className="aura-staff__th">Departamento</th>
                <th className="aura-staff__th">Sede / Propiedad</th>
                <th className="aura-staff__th">Activos Asignados</th>
                <th className="aura-staff__th" style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((person) => (
                <tr key={person.id} className="aura-staff__tr">
                  {/* Nombre y Puesto */}
                  <td className="aura-staff__td">
                    <div className="aura-staff__profile">
                      <div className="aura-staff__initials">{getInitials(person.nombre)}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{person.nombre}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                          <Briefcase size={12} /> {person.puesto}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Departamento */}
                  <td className="aura-staff__td">
                    {person.departamento?.nombre || <span style={{ color: 'var(--text-muted)' }}>No asignado</span>}
                  </td>
                  
                  {/* Site / Multi-tenant */}
                  <td className="aura-staff__td">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Building2 size={14} style={{ color: 'var(--text-muted)' }} />
                      {person.site?.nombre || 'Sede General'}
                    </div>
                  </td>
                  
                  {/* Contador de Equipos */}
                  <td className="aura-staff__td">
                    <span className="aura-staff__badge">
                      <Laptop size={12} style={{ marginRight: '4px' }} />
                      {person._count?.devices || 0} Equipos
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="aura-staff__td" style={{ textAlign: 'right' }}>
                    <button style={{ fontSize: '12px', color: 'var(--brand-primary)', fontWeight: 600 }} className="hover:underline">
                      Ver Historial / Resguardo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No hay perfiles de staff registrados en este Tenant. Comienza creando uno nuevo.
          </div>
        )}
      </div>
    </div>
  );
};