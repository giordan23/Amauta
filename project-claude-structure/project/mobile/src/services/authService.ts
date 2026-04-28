import * as SecureStore from 'expo-secure-store';
import { api } from './api';
import { LoginFormData, RegisterFormData, AuthResponse } from '@/types/auth';

const TOKEN_KEY = 'access_token';

export const authService = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    // Mock para demo - reemplazar con API real
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (data.email === 'demo@example.com' && data.password === '12345678') {
      const authData = {
        access_token: 'mock-token-' + Date.now(),
        user: { id: '1', email: data.email }
      };
      await SecureStore.setItemAsync(TOKEN_KEY, authData.access_token);
      return authData;
    }
    throw new Error('Email o contraseña incorrectos');
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    // Mock para demo
    await new Promise(resolve => setTimeout(resolve, 1000));
    const authData = {
      access_token: 'mock-token-' + Date.now(),
      user: { id: '2', email: data.email }
    };
    await SecureStore.setItemAsync(TOKEN_KEY, authData.access_token);
    return authData;
  },

  logout: async (): Promise<void> => {
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