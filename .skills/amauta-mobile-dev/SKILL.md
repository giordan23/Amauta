---
name: amauta-mobile-dev
description: Mobile Amauta (Expo) — estructura app/, servicios, storage, auth con Supabase, routing con Expo Router
triggers:
  - mobile
  - expo
  - react native
  - mobile development
  - app/
  - expo router
  - mobile services
  - mobile auth
  - store
  - zustand
  - AsyncStorage
category: amauta
---

# Amauta Mobile Development

## Estructura del proyecto mobile

```
mobile/
├── app/                    # Expo Router — cada archivo es una ruta
│   ├── _layout.tsx         # Layout raíz con providers
│   ├── index.tsx           # Pantalla inicial
│   ├── (auth)/             # Grupo de rutas de autenticación
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/             # Grupo de tabs de navegación
│   │   ├── _layout.tsx
│   │   ├── home.tsx
│   │   ├── exam.tsx
│   │   └── profile.tsx
│   └── exam/
│       ├── [id].tsx        # Tomar examen específico
│       └── results/[id].tsx
├── src/
│   ├── services/           # API client y servicios de negocio
│   │   ├── api.ts          # Cliente HTTP (axios/fetch)
│   │   ├── authService.ts # Login, register, logout, refresh
│   │   ├── examService.ts  # Iniciar, responder, completar examen
│   │   ├── careerService.ts
│   │   ├── subjectService.ts
│   │   ├── universityService.ts
│   │   ├── userService.ts
│   │   └── storage.ts      # AsyncStorage wrapper
│   ├── store/              # Zustand stores (estado global)
│   │   ├── authStore.ts
│   │   └── examStore.ts
│   ├── components/         # Componentes reutilizables
│   └── utils/              # Helpers
├── babel.config.js
├── app.json
└── package.json
```

## Routing con Expo Router

### Layout raíz (`app/_layout.tsx`)

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/register" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
```

### Grupo de tabs (`app/(tabs)/_layout.tsx`)

```tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="exam" options={{ title: 'Examen' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
```

### Navegación programática

```tsx
import { router } from 'expo-router';

router.push('/exam/123');        // Ir a pantalla
router.replace('/home');         // Reemplazar pantalla actual
router.back();                   // Volver
router.push('/exam/results/456'); // Resultados después de completar
```

## Servicios API

### API Client (`mobile/src/services/api.ts`)

```ts
import { storage } from './storage';

const API_BASE = 'http://TU_IP_LOCAL:3000/api/v1';

async function request(endpoint: string, options: RequestInit = {}) {
  const token = await storage.getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || 'Request failed');
  }
  
  return data;
}

export const api = {
  get: (endpoint: string) => request(endpoint),
  post: (endpoint: string, body: any) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint: string, body: any) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint: string) => request(endpoint, { method: 'DELETE' }),
};
```

### Auth Service (`mobile/src/services/authService.ts`)

```ts
import { api } from './api';
import { storage } from './storage';

export const authService = {
  async login(email: string, password: string) {
    const data = await api.post('/auth/login', { email, password });
    if (data.session?.access_token) {
      await storage.setToken(data.session.access_token);
      await storage.setUser(data.user);
    }
    return data;
  },

  async register(email: string, password: string, firstName?: string) {
    const data = await api.post('/auth/register', { email, password, firstName });
    if (data.session?.access_token) {
      await storage.setToken(data.session.access_token);
      await storage.setUser(data.user);
    }
    return data;
  },

  async logout() {
    await storage.clearAuth();
  },

  async getCurrentUser() {
    return storage.getUser();
  },

  async isAuthenticated() {
    const token = await storage.getToken();
    return !!token;
  },
};
```

### Exam Service (`mobile/src/services/examService.ts`)

```ts
import { api } from './api';

export interface StartExamRequest {
  universityId: string;
  subjectIds?: string[];
  careerIds?: string[];
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  questionCount?: number;
}

export const examService = {
  async startExam(request: StartExamRequest) {
    return api.post('/exam/start', request);
  },

  async getHistory() {
    return api.get('/exam/history');
  },

  async getExamAttempt(examAttemptId: string) {
    return api.get(`/exam/${examAttemptId}`);
  },

  async answerQuestion(examAttemptId: string, questionId: string, selectedOptionId: string) {
    return api.post(`/exam/${examAttemptId}/answer`, { questionId, selectedOptionId });
  },

  async completeExam(examAttemptId: string) {
    return api.post(`/exam/${examAttemptId}/complete`);
  },

  async abandonExam(examAttemptId: string) {
    return api.post(`/exam/${examAttemptId}/abandon`);
  },
};
```

## Storage (`mobile/src/services/storage.ts`)

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  TOKEN: '@amauta_token',
  USER: '@amauta_user',
};

export const storage = {
  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem(KEYS.TOKEN);
  },

  async setToken(token: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.TOKEN, token);
  },

  async getUser(): Promise<any> {
    const user = await AsyncStorage.getItem(KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  async setUser(user: any): Promise<void> {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  async clearAuth(): Promise<void> {
    await AsyncStorage.multiRemove([KEYS.TOKEN, KEYS.USER]);
  },
};
```

## Stores de Zustand (estado global)

### Auth Store (`mobile/src/store/authStore.ts`)

```ts
import { create } from 'zustand';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: any | null) => void;
  setAuthenticated: (value: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  logout: async () => {
    await storage.clearAuth();
    set({ user: null, isAuthenticated: false });
  },
}));
```

### Exam Store (`mobile/src/store/examStore.ts`)

```ts
import { create } from 'zustand';

interface ExamState {
  currentExam: any | null;
  questions: any[];
  answers: Record<string, string>; // questionId -> selectedOptionId
  timeRemaining: number;
  
  startExam: (exam: any, questions: any[]) => void;
  setAnswer: (questionId: string, optionId: string) => void;
  completeExam: () => void;
  resetExam: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  currentExam: null,
  questions: [],
  answers: {},
  timeRemaining: 0,
  
  startExam: (exam, questions) => set({ currentExam: exam, questions, answers: {} }),
  setAnswer: (questionId, optionId) => 
    set((state) => ({ answers: { ...state.answers, [questionId]: optionId } })),
  completeExam: () => set({ currentExam: null, questions: [], answers: {} }),
  resetExam: () => set({ currentExam: null, questions: [], answers: {}, timeRemaining: 0 }),
}));
```

## Auth con Supabase (mobile)

El mobile usa Supabase Auth directamente (no el backend). Flujo:

1. **Register/Login** → `supabase.auth.signUp()` / `supabase.auth.signInWithPassword()`
2. **Obtener token** → `session.access_token`
3. **Enviar token al backend** → en header `Authorization: Bearer <token>`
4. **Backend verifica** con `supabasePublic.auth.getUser(token)`

```ts
// En mobile — usando @supabase/supabase-js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://nvfbppvseevfiagqmtgb.supabase.co',
  'ANON_KEY'
);

// Login
const { data: { session }, error } = await supabase.auth.signInWithPassword({
  email, password
});

// El token de sesión se guarda automáticamente por Supabase
// Y se recupera con:
const { data: { session } } = await supabase.auth.getSession();
```

## Configuración de red (IP importante)

El móvil se conecta al backend via **HTTP** (no localhost). La IP debe ser la IP de tu PC en la red local.

```ts
// mobile/src/services/api.ts
// NO usar 'localhost' — el celular no es tu PC
const API_BASE = 'http://192.168.100.126:3000/api/v1';  // IP de tu PC
```

Para encontrar tu IP:
```bash
# Linux
ip addr show | grep 'inet 192'
# o
hostname -I
```

## Puerto del backend

El backend corre en puerto **3000**. Asegúrate que:
- El firewall permite conexiones entrantes en 3000
- El backend está binds a `0.0.0.0` (no solo `127.0.0.1`)

## Variables de entorno

El mobile Expo usa `app.json` para configuración (no .env en desarrollo):
```json
{
  "expo": {
    "extra": {
      "SUPABASE_URL": "https://nvfbppvseevfiagqmtgb.supabase.co",
      "SUPABASE_ANON_KEY": "eyJ..."
    }
  }
}
```

## Correr el mobile

```bash
cd mobile
npx expo start
# Escanea QR con app Expo en tu celular
# O presiona 'a' para Android emulator, 'i' para iOS simulator
```

## Errores comunes en mobile

| Error | Causa | Solución |
|-------|-------|----------|
| Network request failed | IP incorrecta o backend no corre | Verificar IP de PC y que backend está en 3000 |
| Unable to resolve host | Emulator no tiene acceso a red local | Usar Expo Go en celular real |
| Token expired | Sesión expirada en Supabase | Refresh token o re-login |
| Storage read error | AsyncStorage no inicializado | Verificar @react-native-async-storage/async-storage instalado |
