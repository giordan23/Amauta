# AMAUTA - Estado del Proyecto

**Última actualización:** 2026-05-05
**Raíz del proyecto:** `/mnt/d/dev/papa/amauta/project-claude-structure/project/`

---

## Tema (Light/Dark)

El mobile soporta **light** y **dark** mode con persistencia en AsyncStorage.

**Archivos clave:**
- `src/theme/colors.ts` — paletas `lightColors` y `darkColors`
- `src/theme/ThemeContext.tsx` — `ThemeProvider`, `useTheme()`, `useAppTheme()`
- `src/theme/spacing.ts` — valores de spacing
- `src/config/index.ts` — `API_URL`

**Modo del tema:** `light` | `dark` | `system` (por defecto `system`)

**API:**
```ts
import { useTheme } from '@/theme/ThemeContext';
const theme = useTheme(); // AppTheme { colors, spacing, isDark, paperTheme }
```

**Paper Provider:** se configura dinámicamente según el tema activo en `_layout.tsx`.

---

## Estructura

```
project/
├── backend/          # Express + Prisma + Supabase (Node.js)
│   ├── prisma/       # Schema y migraciones
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts          # Entry point, puerto 3000
│   ├── .env                    # Variables de entorno
│   └── package.json
│
└── mobile/           # Expo/React Native
    ├── src/
    │   ├── app/               # Expo Router (file-based routing)
    │   │   ├── (authenticated)/  # Rutas protegidas
    │   │   │   ├── exam/
    │   │   │   │   ├── config.tsx
    │   │   │   │   ├── history.tsx
    │   │   │   │   ├── results.tsx
    │   │   │   │   └── take.tsx
    │   │   │   ├── home.tsx
    │   │   │   ├── onboarding.tsx
    │   │   │   └── profile.tsx
    │   │   ├── auth/
    │   │   │   ├── _layout.tsx
    │   │   │   ├── login.tsx
    │   │   │   └── register.tsx
    │   │   ├── _layout.tsx
    │   │   └── index.tsx
    │   ├── config/
    │   │   └── index.ts       # API_URL
    │   ├── services/           # API calls (auth, exam, university, etc.)
    │   ├── store/              # Zustand stores
    │   ├── theme/
    │   └── types/
    └── package.json
```

---

## Configuración de Red (IMPORTANTE)

### Para probar en físico (celular)
- **Backend URL:** `http://172.29.208.55:3000/api/v1`
- **Mobile API_URL:** `mobile/src/config/index.ts` → `http://172.29.208.55:3000/api/v1`
- **CORS_ORIGIN:** `backend/.env` → incluye `exp://192.168.0.*:19000`

### Para emulator (Android Studio/Genymotion)
- **Backend URL:** `http://10.0.2.2:3000/api/v1` (emulador Android)
- O usar `http://localhost:3000/api/v1` con Metro bundler

### Para iniciar
```bash
# Backend (desde Windows o WSL)
cd /mnt/d/dev/papa/amauta/project-claude-structure/project/backend
npm run dev

# Mobile (desde WSL)
cd /mnt/d/dev/papa/amauta/project-claude-structure/project/mobile
npx expo start
```

---

## Auth Flow

El proyecto usa **Supabase Auth** + tokens JWT propios.

### Tokens
- `access_token`: expira 1 hora, almacenado en `SecureStore`
- `refresh_token`: expira 30 días, almacenado en `SecureStore`
- `authService.ts` maneja login, register, logout, refreshToken, restoreSession
- `api.ts` interceptor: en 401 intenta refresh automáticamente

### Endpoints de Auth
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/auth/register` | Registrar usuario |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/logout` | Logout |
| POST | `/api/v1/auth/refresh` | Refrescar access_token |
| POST | `/api/v1/auth/forgot-password` | Reset password |
| GET | `/api/v1/auth/me` | Usuario actual (protegido) |

---

## Backend Routes

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/api/v1/auth/*` | `routes/auth.ts` | Auth (login, register, etc.) |
| `/api/v1/users/*` | `routes/users.ts` | Perfil de usuario |
| `/api/v1/universities/*` | `routes/universities.ts` | Universidades |
| `/api/v1/subjects/*` | `routes/subjects.ts` | Materias |
| `/api/v1/careers/*` | `routes/careers.ts` | Carreras |
| `/api/v1/exam/*` | `routes/exam.ts` | Exámenes (config, tomar, resultados) |

---

## Modelos de Base de Datos (Prisma)

`backend/prisma/schema.prisma`

**Enums:** `DifficultyLevel` (EASY, MEDIUM, HARD), `ExamAttemptStatus` (IN_PROGRESS, COMPLETED, ABANDONED)

**Modelos principales:**
- `User` — perfil con targetUniversity
- `University` — universidades peruano
- `Subject` — materias (Matemáticas, etc.)
- `Career` — carreras profesionales
- `Question` — preguntas con opciones
- `QuestionOption` — opciones de respuesta
- `ExamAttempt` — intento de examen
- `StudentAnswer` — respuesta por pregunta

---

## Issues Conocidos / Pendientes

1. **Backend CORS fallback hardcodeado** — `src/index.ts` tenía `172.29.208.*` en fallback (arreglado a `192.168.0.*`)
2. **Backend debe reiniciarse** — después de cambiar `.env`, reiniciar el proceso en Windows
3. **No hay seed de preguntas** — la base de datos está vacía de preguntas

---

## Comandos útiles

```bash
# Health check del backend
curl http://172.29.208.55:3000/health

# Health check local
curl http://localhost:3000/health

# Ver procesos en puerto 3000
lsof -i :3000

# Ver IP WSL
hostname -I | awk '{print $1}'
```
