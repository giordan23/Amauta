import { api } from './api';
import { User } from '@/types/auth';
import { University } from './universityService';

export interface OnboardingData {
  country: string;
  targetUniversityId: string;
  firstName?: string;
  lastName?: string;
}

export interface UserProfile extends User {
  country?: string;
  hasCompletedOnboarding: boolean;
  targetUniversity?: University;
}

export const userService = {
  completeOnboarding: async (data: OnboardingData): Promise<{ user: UserProfile }> => {
    const response = await api.post<{ data: { user: UserProfile }; error: null } | { data: null; error: { code: string; message: string } } }>(
      '/users/complete-onboarding',
      data
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    if (!response.data.data) {
      throw new Error('Error al completar onboarding');
    }

    return response.data.data;
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<{ user: UserProfile }> => {
    const response = await api.put<{ data: { user: UserProfile }; error: null } | { data: null; error: { code: string; message: string } } }>(
      '/users/profile',
      data
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    if (!response.data.data) {
      throw new Error('Error al actualizar perfil');
    }

    return response.data.data;
  },

  getProfile: async (): Promise<{ user: UserProfile }> => {
    const response = await api.get<{ data: { user: UserProfile }; error: null } | { data: null; error: { code: string; message: string } } }>(
      '/users/profile'
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    if (!response.data.data) {
      throw new Error('Error al obtener perfil');
    }

    return response.data.data;
  },
};
