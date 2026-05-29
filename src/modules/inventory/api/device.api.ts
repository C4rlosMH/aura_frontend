import api from '../../../core/api/axios';
import type { DeviceFilters, PaginatedDeviceResponse } from '../types';

export const getDevices = async (filters?: DeviceFilters): Promise<PaginatedDeviceResponse> => {
  const params = new URLSearchParams();
  
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());
  if (filters?.search) params.append('search', filters.search);

  // Hacemos match con tu device.routes.ts que expone "/get"
  const response = await api.get(`/inventory/devices/get?${params.toString()}`);
  return response.data;
};