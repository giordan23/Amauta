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
    const response = await api.post<{ data: { user: any; session: any; needsEmailConfirmation: boolean }; error: null } | { data: null; error: { code: string; message: string } } }>(
      '/auth/register',
      {
        email: data.email,
        password: data.password,
        firstName: data.firstName || undefined,
        lastName: data.lastName || undefined
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    if (!response.data.data) {
      throw new Error('Registration failed');
    }

    // Register response has access_token inside session
    const { session, user: backendUser } = response.data.data;
    const access_token = session?.access_token;

    if (!access_token) {
      throw new Error('Registration failed: no access token');
    }

    await SecureStore.setItemAsync(TOKEN_KEY, access_token);
    return { access_token, user: backendUser };
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

  // Restore session on app start - validate token with backend
  restoreSession: async (): Promise<{ access_token: string; user: any } | null> => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (!token) return null;

    try {
      // Try to get current user to validate token
      const response = await api.get<{ data: { user: any }; error: null } | { data: null; error: { code: string; message: string } } }>(
        '/auth/me',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.error) {
        // Token invalid or expired
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        return null;
      }

      return { access_token: token, user: response.data.data?.user || null };
    } catch (error) {
      // Network error or token invalid
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      return null;
    }
  },
};