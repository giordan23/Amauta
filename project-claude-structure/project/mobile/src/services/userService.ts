import { api } from './api';
import { UserProfile } from '@/types/user';

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  country?: string;
  targetUniversityId?: string;
}

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<
      { data: { user: UserProfile }; error: null } | { data: null; error: { code: string; message: string } }
    >('/users/me');

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    if (!response.data.data) {
      throw new Error('Error al obtener el perfil');
    }
    return response.data.data.user;
  },

  updateProfile: async (data: UpdateProfileData): Promise<UserProfile> => {
    const response = await api.put<
      { data: { user: UserProfile }; error: null } | { data: null; error: { code: string; message: string } }
    >('/users/profile', data);

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    if (!response.data.data) {
      throw new Error('Error al actualizar el perfil');
    }
    return response.data.data.user;
  },

  completeOnboarding: async (data: {
    country: string;
    targetUniversityId: string;
    firstName?: string;
    lastName?: string;
  }): Promise<{ user: UserProfile }> => {
    const response = await api.post<
      { data: { user: UserProfile }; error: null } | { data: null; error: { code: string; message: string } }
    >('/users/complete-onboarding', data);

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    if (!response.data.data) {
      throw new Error('Error al completar el onboarding');
    }
    return response.data.data;
  },
};
