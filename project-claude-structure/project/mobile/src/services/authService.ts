import * as SecureStore from 'expo-secure-store';
import { api } from './api';
import { LoginFormData, RegisterFormData, AuthResponse } from '@/types/auth';

const TOKEN_KEY = 'access_token';

export const authService = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post<{ data: AuthResponse; error: null } | { data: null; error: { code: string; message: string } } }>(
      '/auth/login',
      { email: data.email, password: data.password }
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    if (!response.data.data) {
      throw new Error('Login failed');
    }

    const { access_token, user } = response.data.data;
    await SecureStore.setItemAsync(TOKEN_KEY, access_token);
    return { access_token, user };
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await api.post<{ data: AuthResponse; error: null } | { data: null; error: { code: string; message: string } } }>(
      '/auth/register',
      {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    if (!response.data.data) {
      throw new Error('Registration failed');
    }

    const { access_token, user } = response.data.data;
    await SecureStore.setItemAsync(TOKEN_KEY, access_token);
    return { access_token, user };
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Ignore logout errors
    }
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  getToken: async (): Promise<string | null> => {
    return SecureStore.getItemAsync(TOKEN_KEY);
  },

  isAuthenticated: async (): Promise<boolean> => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return !!token;
  },
};