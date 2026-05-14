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
    const response = await api.get<{
      data: UniversitiesResponse;
      error: null;
    }>(`/universities?page=${page}&limit=${limit}`);

    // Backend returns { data: { universities, pagination }, error: null }
    if (response.data.data?.universities?.length > 0) {
      return response.data.data;
    }
    return { universities: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0, hasNext: false, hasPrev: false } };
  },

  getUniversityById: async (id: string): Promise<University> => {
    const response = await api.get<{
      success: boolean;
      data: { university: University };
    }>(`/universities/${id}`);

    return response.data.data.university;
  },
};
