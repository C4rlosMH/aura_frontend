import api from '../../../core/api/axios';
import type { Staff } from '../types'; // <-- ¡Agregamos 'type' aquí!

export const fetchStaffList = async (): Promise<Staff[]> => {
  // GET /api/staff
  const response = await api.get<Staff[]>('/staff');
  return response.data;
};