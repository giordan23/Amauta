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

export interface UniversitiesResponse {
  universities: University[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const universityService = {
  getUniversities: async (page: number = 1, limit: number = 20): Promise<UniversitiesResponse> => {
    const response = await api.get<{ data: UniversitiesResponse; error: null } | { data: null; error: { code: string; message: string } } }>(
      `/universities?page=${page}&limit=${limit}`
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    if (!response.data.data) {
      throw new Error('Error al obtener universidades');
    }

    return response.data.data.universities.length > 0 
      ? response.data.data 
      : { universities: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0, hasNext: false, hasPrev: false } };
  },

  getUniversityById: async (id: string): Promise<University> => {
    const response = await api.get<{ data: { university: University }; error: null } | { data: null; error: { code: string; message: string } } }>(
      `/universities/${id}`
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    if (!response.data.data) {
      throw new Error('Universidad no encontrada');
    }

    return response.data.data.university;
  },
};
