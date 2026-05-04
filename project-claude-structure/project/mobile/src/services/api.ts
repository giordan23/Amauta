import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@/config';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Development mode - show detailed errors
const isDev = __DEV__;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 - try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        if (refreshToken) {
          // Call refresh endpoint
          const refreshResponse = await axios.post(
            `${API_URL}/auth/refresh`,
            { refreshToken },
            { headers: { 'Content-Type': 'application/json' } }
          );

          if (refreshResponse.data?.data?.session) {
            const { access_token, refresh_token } = refreshResponse.data.data.session;
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access_token);
            if (refresh_token) {
              await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh_token);
            }

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed - clear tokens and reject
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      }
    }

    // Build user-friendly error message
    let message = 'Error de conexión';

    if (error.response?.data?.error?.message) {
      message = error.response.data.error.message;
    } else if (error.code === 'ECONNABORTED') {
      message = 'La solicitud tardó demasiado';
    } else if (!error.response) {
      message = isDev
        ? `Network Error: ${error.message}`
        : 'No se pudo conectar al servidor';
    }

    // Enhance error for development
    if (isDev && error.response) {
      console.warn('[API Error]', {
        url: originalRequest?.url,
        status: error.response.status,
        data: error.response.data,
      });
    }

    // Return error with user-friendly message
    const enhancedError = new Error(message);
    enhancedError.statusCode = error.response?.status;
    enhancedError.code = error.response?.data?.error?.code;
    return Promise.reject(enhancedError);
  }
);