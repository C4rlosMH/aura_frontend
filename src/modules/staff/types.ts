export interface Staff {
  id: number;
  nombre: string;
  puesto: string;
  departamento?: {
    id: number;
    nombre: string;
  };
  site?: {
    id: number;
    nombre: string;
  };
  _count?: {
    devices: number; // Contador dinámico de equipos asignados
  };
  createdAt: string;
}