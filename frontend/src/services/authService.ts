import { api } from './api';
import { storage } from './storage';
import { API_URL } from '@/config';
import type { LoginFormData, RegisterFormData, AuthResponse } from '@/types/auth';

export const authService = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post('auth/login', { json: { email: data.email, password: data.password } }).json<{ data: AuthResponse; error: null } | { data: null; error: { code: string; message: string } }>();

    if (response.error) {
      throw new Error(response.error.message);
    }
    if (!response.data) {
      throw new Error('Login failed');
    }

    const { access_token, refresh_token } = response.data;
    storage.setAccessToken(access_token);
    if (refresh_token) storage.setRefreshToken(refresh_token);
    return response.data;
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await api.post('auth/register', {
      json: {
        email: data.email,
        password: data.password,
        firstName: data.firstName || undefined,
        lastName: data.lastName || undefined,
      },
    }).json<{ data: { user: unknown; session: { access_token: string; refresh_token?: string } }; error: null } | { data: null; error: { code: string; message: string } }>();

    if (response.error) {
      throw new Error(response.error.message);
    }
    if (!response.data) {
      throw new Error('Registration failed');
    }

    const { session, user: backendUser } = response.data;
    const access_token = session?.access_token;
    if (!access_token) throw new Error('Registration failed: no access token');

    storage.setAccessToken(access_token);
    if (session?.refresh_token) storage.setRefreshToken(session.refresh_token);
    return { access_token, user: backendUser as AuthResponse['user'] };
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('auth/logout').json();
    } catch {
      // ignore
    }
    storage.clearTokens();
  },

  restoreSession: async (): Promise<{ access_token: string; user: unknown } | null> => {
    const token = storage.getAccessToken();
    if (!token) return null;

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const refreshed = await authService.refreshToken();
        return refreshed;
      }

      const body = await res.json();
      if (body?.data?.user) {
        return { access_token: token, user: body.data.user };
      }
      return null;
    } catch {
      storage.clearTokens();
      return null;
    }
  },

  refreshToken: async (): Promise<{ access_token: string; user: unknown } | null> => {
    const refreshToken = storage.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) return null;

      const body = await res.json();
      if (!body?.data?.session?.access_token) return null;

      const { access_token, refresh_token } = body.data.session;
      storage.setAccessToken(access_token);
      if (refresh_token) storage.setRefreshToken(refresh_token);

      const userRes = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const userBody = await userRes.json();
      return { access_token, user: userBody?.data?.user || null };
    } catch {
      return null;
    }
  },
};
