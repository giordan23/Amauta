import { api } from './api';
import { Career } from '@/types/exam';

export const careerService = {
  getCareers: async (): Promise<Career[]> => {
    const response = await api.get<{
      success: boolean;
      data: { careers: Career[]; pagination: any };
    }>('/careers');

    // Backend returns { success, data: { careers, pagination } }
    return response.data.data?.careers || [];
  },
};
