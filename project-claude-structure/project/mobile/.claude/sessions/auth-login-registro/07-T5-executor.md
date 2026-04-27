# Executor Output — T5: authStore (Zustand)

### src/store/authStore.ts
```typescript
import { create } from 'zustand';
import { User } from '@/types/auth';

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
  // Estado inicial
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // Acciones
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
```

---

## Resumen

```json
{
  "tarea_id": "T5",
  "archivos_creados": [
    "src/store/authStore.ts"
  ],
  "decisiones_tomadas": [
    "isLoading inicia en true para permitir verificacion de token al inicio",
    "setUser tambien pone isLoading en false (flujo comun despues de verificar)",
    "logout no modifica isLoading (puede ser intencional del usuario)"
  ],
  "pendiente_para_reviewer": []
}
```
