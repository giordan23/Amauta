---
name: amauta-frontend-dev
description: Frontend development for Amauta Next.js app — triggers on frontend, pages, components, router, styles, CSS modules, Next.js, routing, page structure, tsconfig, vite config, environment variables, API calls, service layer.
---

# Frontend Development — Amauta

Next.js app with TypeScript, CSS modules, and React Router v6. Located in `frontend/` directory. Runs on port 8081 during development.

## Project Structure

```
frontend/
├── src/
│   ├── pages/          # Route pages (file-based routing via react-router)
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── ExamConfigPage.tsx
│   │   ├── ExamTakePage.tsx
│   │   ├── ExamResultsPage.tsx
│   │   └── ExamHistoryPage.tsx
│   ├── components/     # Reusable UI components
│   │   ├── layout/     # AppLayout, navigation
│   │   ├── ui/          # Buttons, cards, inputs
│   │   └── profile/     # Profile-specific components
│   ├── services/       # API layer (HTTP calls to backend)
│   │   ├── api.ts       # Base HTTP client (ky)
│   │   ├── authService.ts
│   │   ├── examService.ts
│   │   └── userService.ts
│   ├── store/          # State management (Zustand)
│   │   └── authStore.ts
│   ├── hooks/          # Custom React hooks
│   ├── styles/         # Global CSS + CSS modules
│   │   ├── index.css
│   │   └── components/
│   │       └── exam-*.css  (CSS modules per component)
│   ├── types/          # TypeScript types
│   ├── config/         # Environment config
│   └── router.tsx      # React Router v6 definition
├── app.json            # Expo/mobile config (not used by web)
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Router Configuration

Router is defined in `src/router.tsx` using React Router v6 with a layout pattern:

```typescript
import { createBrowserRouter, createRoutesFromElements, Route, Navigate, Outlet } from 'react-router';
import { AppLayout } from '@/components/layout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="/auth/login" replace />} />

      <Route path="auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route path="app" element={
        <ProtectedRoute>
          <AppLayout><Outlet /></AppLayout>
        </ProtectedRoute>
      }>
        <Route path="home" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="exam/config" element={<ExamConfigPage />} />
        <Route path="exam/take" element={<ExamTakePage />} />
        <Route path="exam/results" element={<ExamResultsPage />} />
        <Route path="exam/history" element={<ExamHistoryPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);
```

**Key convention:** Route paths in the app use `/app/` prefix. Direct navigation to `/app/exam/take` requires authentication (ProtectedRoute wraps it).

## CSS Modules Pattern

Each component has its own CSS module file (`.module.css`). Naming convention:

```
ExamTakePage.tsx        → ExamTakePage.module.css
ExamConfigPage.tsx     → ExamConfigPage.module.css
ExamResultsPage.tsx    → ExamResultsPage.module.css
```

CSS modules are imported directly in the component:
```typescript
import '@/styles/components/exam-take.module.css';
// or co-located:
import styles from './ExamTakePage.module.css';
```

## Global CSS Variables

Defined in `src/styles/index.css`:
```css
:root {
  --color-primary: #00FF41;      /* Neon green (KDE plasma theme) */
  --color-background: #0d1117;    /* Dark background */
  --color-surface: #161b22;
  --color-text: #e6edf3;
  --color-outline: #30363d;
  --color-error: #f85149;
  --color-success: #3fb950;
  --space-4: 1rem;
}
```

## Environment Variables

**Required in `frontend/.env.local`:**
```
NEXT_PUBLIC_SUPABASE_URL=https://nvfbppvseevfiagqmtgb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_dv-...
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

**Convention:** All Supabase keys exposed to frontend use `NEXT_PUBLIC_` prefix. These are safe — they are publishable/anon keys, not service role keys.

**Important:** `.env.local` is gitignored. Never commit real values. Use `.env.example` template for sharing:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## API Service Layer

Base HTTP client in `src/services/api.ts` uses `ky` library:

```typescript
import ky from 'ky';
import { API_URL } from '@/config';

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Authorization': `Bearer ${getAccessToken()}`
  }
});
```

Services (`examService.ts`, `authService.ts`, etc.) use `api` to make calls:

```typescript
// examService.ts
export const examService = {
  startExam: async (universityId: string, questionCount = 100) => {
    const response = await api.post('exam/start', {
      json: { universityId, questionCount }
    }).json<{ success: true; data: ExamStartResponse }>();
    return response.data;
  },
  
  answerQuestion: async (examAttemptId: string, questionId: string, selectedOptionId: string) => {
    return api.post(`exam/${examAttemptId}/answer`, {
      json: { questionId, selectedOptionId }
    }).json();
  },
  
  completeExam: async (examAttemptId: string) => {
    return api.post(`exam/${examAttemptId}/complete`).json();
  },
  
  getHistory: async () => {
    return api.get('exam/history').json();
  },
};
```

## Auth State (Zustand)

```typescript
// src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: async (email, password) => { /* ... */ },
  logout: async () => { /* ... */ },
}));
```

## Page Patterns

### ExamConfigPage (exam selection)
```typescript
// src/pages/ExamConfigPage.tsx
export function ExamConfigPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleStartExam = async () => {
    const result = await examService.startExam(universityId, 100);
    sessionStorage.setItem('currentExamId', result.examAttempt.id);
    sessionStorage.setItem('examConfig', JSON.stringify({ timeDuration, showTimer }));
    navigate('/app/exam/take');
  };
}
```

### ExamTakePage (exam simulation)
```typescript
// src/pages/ExamTakePage.tsx
export function ExamTakePage() {
  const navigate = useNavigate();
  const [examData, setExamData] = useState<ExamStartResponse | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
  useEffect(() => {
    const examId = sessionStorage.getItem('currentExamId');
    loadExam(examId);
  }, []);
  
  const handleSubmit = async () => {
    // Send all answers, then complete exam
    for (const question of examData!.questions) {
      if (answers[question.id]) {
        await examService.answerQuestion(examId!, question.id, answers[question.id]);
      }
    }
    const result = await examService.completeExam(examId!);
    sessionStorage.setItem('examResult', JSON.stringify(result));
    navigate('/app/exam/results');
  };
}
```

## Common Pitfalls

**1. Hardcoded API_URL**
```typescript
// BAD — don't do this
const API_URL = 'http://192.168.0.196:3000/api/v1';
```
Use `process.env.NEXT_PUBLIC_API_URL` or the config file instead.

**2. Missing .env.local**
If you get 401 errors or "undefined" for Supabase vars, check that `.env.local` exists in `frontend/` with the required `NEXT_PUBLIC_` variables.

**3. CORS errors**
Backend (Express) allows these origins in `src/index.ts`:
```typescript
const CORS_ORIGINS = [
  'http://localhost:19006',    // Expo Go mobile
  'http://192.168.100.126:8081', // PC web
  'http://192.168.100.153:19000', // Mobile web
];
```
If testing from a new IP, add it to the list and restart backend.

**4. Token not sent**
`api.ts` automatically sends `Authorization: Bearer <token>` header. If a request fails with 401, check `getAccessToken()` is not returning null.

**5. CSS module naming**
```typescript
// BAD
import './ExamTakePage.css';

// GOOD
import styles from './ExamTakePage.module.css';
// or
import '@/styles/components/exam-take.module.css';
```

## Starting the Frontend

```bash
cd frontend
npm run dev   # Runs on http://localhost:8081
```

Backend must be running on port 3000 for API calls to work.

## File Locations

- Router: `frontend/src/router.tsx`
- Pages: `frontend/src/pages/*.tsx`
- Services: `frontend/src/services/*.ts`
- Auth store: `frontend/src/store/authStore.ts`
- CSS: `frontend/src/styles/index.css` and `frontend/src/styles/components/*.css`
- Config: `frontend/src/config/index.ts`