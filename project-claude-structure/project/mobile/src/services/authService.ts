import * as SecureStore from 'expo-secure-store';
import { api } from './api';
import { LoginFormData, RegisterFormData, AuthResponse } from '@/types/auth';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const authService = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post<{ data: AuthResponse; error: null } | ({ data: null; error: { code: string; message: string } })>(
      '/auth/login',
      { email: data.email, password: data.password }
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    if (!response.data.data) {
      throw new Error('Login failed');
    }

    const { access_token, user, refresh_token } = response.data.data;
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access_token);
    if (refresh_token) {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh_token);
    }
    return { access_token, user, refresh_token };
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await api.post<{ data: { user: any; session: any; needsEmailConfirmation: boolean }; error: null } | ({ data: null; error: { code: string; message: string } })>(
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

    const refresh_token = session?.refresh_token;
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access_token);
    if (refresh_token) {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh_token);
    }
    return { access_token, user: backendUser };
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Ignore logout errors
    }
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  },

  getToken: async (): Promise<string | null> => {
    return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },

  getRefreshToken: async (): Promise<string | null> => {
    return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },

  isAuthenticated: async (): Promise<boolean> => {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    return !!token;
  },

  // Restore session on app start - validate token with backend
  restoreSession: async (): Promise<{ access_token: string; user: any } | null> => {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (!token) return null;

    try {
      // Try to get current user to validate token
      const response = await api.get<{ data: { user: any }; error: null } | ({ data: null; error: { code: string; message: string } })>(
        '/auth/me',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.error) {
        // Token invalid or expired - try to refresh
        const refreshed = await authService.refreshToken();
        if (refreshed) {
          return refreshed;
        }
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        return null;
      }

      return { access_token: token, user: response.data.data?.user || null };
    } catch (error) {
      // Network error or token invalid
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      return null;
    }
  },

  // Refresh access token using refresh token
  refreshToken: async (): Promise<{ access_token: string; user: any } | null> => {
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    if (!refreshToken) return null;

    try {
      const response = await api.post<{ data: { session: any; user?: any }; error: null } | ({ data: null; error: { code: string; message: string } })>(
        '/auth/refresh',
        { refreshToken }
      );

      if (response.data.error || !response.data.data) {
        return null;
      }

      const { session } = response.data.data;
      const newAccessToken = session?.access_token;
      const newRefreshToken = session?.refresh_token;

      if (!newAccessToken) return null;

      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken);
      if (newRefreshToken) {
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefreshToken);
      }

      // Get user data with new token
      const userResponse = await api.get<{ data: { user: any }; error: null } | ({ data: null; error: { code: string; message: string } })>(
        '/auth/me',
        { headers: { Authorization: `Bearer ${newAccessToken}` } }
      );

      return {
        access_token: newAccessToken,
        user: userResponse.data.data?.user || null
      };
    } catch (error) {
      return null;
    }
  },
};