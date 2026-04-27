# Executor Output — T3: Cliente HTTP base (api.ts)

### src/config/index.ts
```typescript
// TODO: Mover a variables de entorno con expo-constants
export const API_URL = 'http://localhost:3000/api/v1';
```

### src/services/api.ts
```typescript
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@/config';

const TOKEN_KEY = 'access_token';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: agrega token si existe
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor: maneja 401
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Limpiar token inválido/expirado
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);
```

---

## Resumen

```json
{
  "tarea_id": "T3",
  "archivos_creados": [
    "src/config/index.ts",
    "src/services/api.ts"
  ],
  "decisiones_tomadas": [
    "TOKEN_KEY como constante para reutilizar en authService",
    "API_URL hardcodeado por ahora, TODO para expo-constants",
    "No navegar en interceptor 401, solo limpiar token",
    "Content-Type por defecto application/json"
  ],
  "pendiente_para_reviewer": [
    "Verificar que TOKEN_KEY coincide con el que usara authService"
  ]
}
```
