import { useQuery } from '@tanstack/react-query';
import { fetchStaffList } from '../api/staff.api';

export const useStaff = () => {
  return useQuery({
    queryKey: ['staff-list'], // Identificador de la caché
    queryFn: fetchStaffList,
  });
};