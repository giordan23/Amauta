import { api } from './api';
import { Subject } from '@/types/exam';

export const subjectService = {
  getSubjects: async (): Promise<Subject[]> => {
    const response = await api.get<{
      success: boolean;
      data: { subjects: Subject[]; pagination: any };
    }>('/subjects');

    // Backend returns { success, data: { subjects, pagination } }
    return response.data.data?.subjects || [];
  },
};
