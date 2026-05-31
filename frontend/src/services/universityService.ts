import { api } from './api';

export interface University {
  id: string;
  name: string;
  shortName: string;
  city: string;
  region: string;
  country: string;
  isActive: boolean;
  questionsCount?: number;
  studentsCount?: number;
}

export const universityService = {
  getUniversities: async (): Promise<University[]> => {
    const response = await api.get('universities').json<{ success: true; data: { universities: University[] } }>();
    return response.data.universities;
  },

  getUniversity: async (id: string): Promise<University> => {
    const response = await api.get(`universities/${id}`).json<{ success: true; data: University }>();
    return response.data;
  },
};