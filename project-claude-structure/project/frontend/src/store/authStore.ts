import { create } from 'zustand';
import { storage } from '@/services/storage';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => {
    storage.clearTokens();
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
}));

export async function restoreSession(): Promise<{ access_token: string; user: User } | null> {
  const token = storage.getAccessToken();
  if (!token) return null;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const refreshed = await tryRefreshToken();
      if (!refreshed) return null;
      return restoreSession();
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
}

async function tryRefreshToken(): Promise<boolean> {
  const refreshToken = storage.getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return false;

    const body = await res.json();
    if (body?.data?.session?.access_token) {
      const { access_token, refresh_token } = body.data.session;
      storage.setAccessToken(access_token);
      if (refresh_token) storage.setRefreshToken(refresh_token);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
