import { api } from './api';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  country: string | null;
  hasCompletedOnboarding: boolean;
  targetUniversity: { id: string; name: string } | null;
  targetCareer: { id: string; name: string } | null;
  updatedAt: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  country?: string;
}

export const userService = {
  getMe: async (): Promise<UserProfile> => {
    const response = await api.get('users/me').json<{ data: { user: UserProfile }; error: null } | { data: null; error: { code: string; message: string } }>();
    
    if (response.error) {
      throw new Error(response.error.message);
    }
    if (!response.data?.user) {
      throw new Error('Failed to get profile');
    }
    
    return response.data.user;
  },

  updateProfile: async (data: UpdateProfileData): Promise<UserProfile> => {
    const response = await api.put('users/profile', { json: data }).json<{ data: { user: UserProfile }; error: null } | { data: null; error: { code: string; message: string } }>();
    
    if (response.error) {
      throw new Error(response.error.message);
    }
    if (!response.data?.user) {
      throw new Error('Failed to update profile');
    }
    
    return response.data.user;
  },

  getStatistics: async (): Promise<{ totalExams: number; completedExams: number; averageScore: number }> => {
    const response = await api.get('users/statistics').json<{ success: true; data: { totalExams: number; completedExams: number; averageScore: number } }>();
    
    if (!response.success) {
      throw new Error('Failed to get statistics');
    }
    
    return response.data;
  },

  getExamHistory: async (page = 1, limit = 10) => {
    const response = await api.get(`users/exam-history?page=${page}&limit=${limit}`).json<{ success: true; data: { examAttempts: any[]; pagination: any } }>();
    return response;
  },
};