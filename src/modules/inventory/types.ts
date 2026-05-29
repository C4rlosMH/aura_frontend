export interface DeviceType {
  id: number;
  nombre: string;
  category: string;
  sub_category?: string;
}

export interface DeviceStatus {
  id: number;
  nombre: string;
  color: string;
}

export interface Device {
  id: number;
  etiqueta?: string;
  nombre_equipo?: string;
  numero_serie?: string;
  marca?: string;
  modelo?: string;
  ip_equipo?: string;
  mac_address?: string;
  
  type?: DeviceType;
  status?: DeviceStatus;
  
  created_at: string;
  updatedAt: string;
}

export interface DeviceFilters {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedDeviceResponse {
  data: Device[];
  totalCount: number;
}