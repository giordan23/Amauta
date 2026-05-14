const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const storage = {
  getItemAsync: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
  setItemAsync: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  },
  deleteItemAsync: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  getAccessToken: () => storage.getItemAsync(ACCESS_TOKEN_KEY),
  setAccessToken: (token: string) => storage.setItemAsync(ACCESS_TOKEN_KEY, token),
  getRefreshToken: () => storage.getItemAsync(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string) => storage.setItemAsync(REFRESH_TOKEN_KEY, token),
  clearTokens: () => {
    storage.deleteItemAsync(ACCESS_TOKEN_KEY);
    storage.deleteItemAsync(REFRESH_TOKEN_KEY);
  },
};
