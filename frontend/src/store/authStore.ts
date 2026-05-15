import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

export const useAuthStore = create<AuthState & AuthActions>()(persist(
  (set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    setUser: (user) => {
      set({ user, isAuthenticated: !!user, isLoading: false });
    },
    setLoading: (isLoading) => set({ isLoading }),
    logout: () => {
      storage.clearTokens();
      set({ user: null, isAuthenticated: false, isLoading: false });
    },
  }),
  {
    name: 'auth-store',
    storage: {
      getItem: (name) => {
        const item = localStorage.getItem(name);
        return item ? JSON.parse(item) : null;
      },
      setItem: (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
      },
      removeItem: (name) => {
        localStorage.removeItem(name);
      },
    },
    onRehydrateStorage: () => (state, error) => {
      if (error) {
        console.error('Error rehydrating auth store:', error);
      } else if (state && state.user && !state.isLoading) {
        // Verify session is still valid when rehydrating
        restoreSession().then((session) => {
          if (!session) {
            // Session expired, clear stored state
            state.logout();
          }
        }).catch(() => {
          // Network error or other issue, clear stored state
          state.logout();
        });
      }
    },
  }
));

// Initialize auth when app starts (for new users without persisted state)
if (typeof window !== 'undefined') {
  const state = useAuthStore.getState();
  if (!state.user && !state.isAuthenticated) {
    // Try to restore session from tokens if no persisted user
    restoreSession().then((session) => {
      if (session) {
        state.setUser(session.user);
      }
    }).catch(() => {
      // Silent fail, user will need to login
    });
  }
}

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
  if (!refreshToken) {
    storage.clearTokens();
    return false;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      storage.clearTokens();
      return false;
    }

    const body = await res.json();
    if (body?.data?.session?.access_token) {
      const { access_token, refresh_token } = body.data.session;
      storage.setAccessToken(access_token);
      if (refresh_token) storage.setRefreshToken(refresh_token);
      return true;
    }
    
    storage.clearTokens();
    return false;
  } catch {
    storage.clearTokens();
    return false;
  }
}
