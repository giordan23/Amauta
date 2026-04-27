# Executor Output — T4: authService

### src/services/authService.ts
```typescript
import * as SecureStore from 'expo-secure-store';
import { api } from './api';
import {
  LoginFormData,
  RegisterFormData,
  AuthResponse,
  ApiResponse,
} from '@/types/auth';

const TOKEN_KEY = 'access_token';

export const authService = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      data
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    const authData = response.data.data!;
    await SecureStore.setItemAsync(TOKEN_KEY, authData.access_token);

    return authData;
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    // No enviar confirmPassword al backend
    const { confirmPassword, ...registerData } = data;

    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      registerData
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    const authData = response.data.data!;
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
```

### src/services/__tests__/authService.test.ts
```typescript
import * as SecureStore from 'expo-secure-store';
import { authService } from '../authService';
import { api } from '../api';

jest.mock('../api');
jest.mock('expo-secure-store');

const mockApi = api as jest.Mocked<typeof api>;
const mockSecureStore = SecureStore as jest.Mocked<typeof SecureStore>;

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('guarda el token y retorna AuthResponse en login exitoso', async () => {
      const mockResponse = {
        data: {
          data: {
            access_token: 'test-token',
            user: { id: '1', email: 'test@test.com' },
          },
          error: null,
        },
      };
      mockApi.post.mockResolvedValue(mockResponse);

      const result = await authService.login({
        email: 'test@test.com',
        password: '12345678',
      });

      expect(mockApi.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@test.com',
        password: '12345678',
      });
      expect(mockSecureStore.setItemAsync).toHaveBeenCalledWith(
        'access_token',
        'test-token'
      );
      expect(result.user.email).toBe('test@test.com');
    });

    it('lanza error cuando las credenciales son invalidas', async () => {
      const mockResponse = {
        data: {
          data: null,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Email o contraseña incorrectos',
          },
        },
      };
      mockApi.post.mockResolvedValue(mockResponse);

      await expect(
        authService.login({
          email: 'bad@test.com',
          password: 'wrongpass',
        })
      ).rejects.toThrow('Email o contraseña incorrectos');

      expect(mockSecureStore.setItemAsync).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('no envia confirmPassword al backend', async () => {
      const mockResponse = {
        data: {
          data: {
            access_token: 'new-token',
            user: { id: '2', email: 'new@test.com' },
          },
          error: null,
        },
      };
      mockApi.post.mockResolvedValue(mockResponse);

      await authService.register({
        email: 'new@test.com',
        password: '12345678',
        confirmPassword: '12345678',
      });

      expect(mockApi.post).toHaveBeenCalledWith('/auth/register', {
        email: 'new@test.com',
        password: '12345678',
      });
    });
  });

  describe('logout', () => {
    it('elimina el token de SecureStore', async () => {
      await authService.logout();

      expect(mockSecureStore.deleteItemAsync).toHaveBeenCalledWith(
        'access_token'
      );
    });
  });

  describe('getToken', () => {
    it('retorna el token si existe', async () => {
      mockSecureStore.getItemAsync.mockResolvedValue('stored-token');

      const token = await authService.getToken();

      expect(token).toBe('stored-token');
    });

    it('retorna null si no hay token', async () => {
      mockSecureStore.getItemAsync.mockResolvedValue(null);

      const token = await authService.getToken();

      expect(token).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('retorna true si hay token', async () => {
      mockSecureStore.getItemAsync.mockResolvedValue('some-token');

      const result = await authService.isAuthenticated();

      expect(result).toBe(true);
    });

    it('retorna false si no hay token', async () => {
      mockSecureStore.getItemAsync.mockResolvedValue(null);

      const result = await authService.isAuthenticated();

      expect(result).toBe(false);
    });
  });
});
```

---

## Resumen

```json
{
  "tarea_id": "T4",
  "archivos_creados": [
    "src/services/authService.ts",
    "src/services/__tests__/authService.test.ts"
  ],
  "decisiones_tomadas": [
    "Omitir confirmPassword en request a register (solo validacion frontend)",
    "Lanzar Error con message de ApiError para manejo simple",
    "TOKEN_KEY duplicado de api.ts (considerar extraer a constantes)",
    "Tests cubren happy path y error cases"
  ],
  "pendiente_para_reviewer": [
    "Considerar extraer TOKEN_KEY a archivo de constantes compartido"
  ]
}
```
