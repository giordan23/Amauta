# AMAUTA - Contexto del Proyecto

**Última actualización:** 2026-05-10
**Raíz:** `/mnt/d/dev/papa/amauta/project-claude-structure/project/`

---

## Stack Tecnológico

### Backend
- **Runtime:** Node.js + Express (ESM + CJS en dist/)
- **Build:** tsup (TypeScript, genera dist/index.js + .mjs + .d.ts)
- **ORM:** Prisma 5.6 (PostgreSQL via Supabase)
- **Validación:** Zod
- **Auth:** Supabase Auth (JWT propios para la app)
- **Logging:** Winston
- **Puerto:** 3000 (local)
- **Scripts:** `npm run dev` (tsx), `npm run build` (tsup + prisma generate), `npm start` (producción)

### Mobile
- **Framework:** Expo 54 (React Native 0.81.5)
- **Router:** Expo Router 6 (file-based, app directory)
- **HTTP:** Axios + TanStack Query 5
- **Forms:** React Hook Form + Zod
- **State:** Zustand
- **Storage:** AsyncStorage (tema), SecureStore (tokens)
- **UI:** React Native Paper 5
- **Auth:** JWT con refresh token en SecureStore

---

## Estructura de Archivos

```
project/
├── backend/
│   ├── src/
│   │   ├── index.ts           # Entry point (Express, puerto 3000)
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   │   ├── auth.ts        # POST /api/v1/auth/register, login, logout, refresh, forgot-password
│   │   │   ├── users.ts       # GET/PUT /api/v1/users/me
│   │   │   ├── universities.ts # CRUD universidades
│   │   │   ├── subjects.ts    # CRUD materias
│   │   │   ├── careers.ts     # CRUD carreras
│   │   │   └── exam.ts        # config, take, history, results
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── (migrations/)
│   ├── dist/                   # Build output
│   ├── .env
│   └── package.json
│
├── mobile/
│   ├── src/
│   │   ├── app/                # Expo Router
│   │   │   ├── index.tsx      # Splash/redirect
│   │   │   ├── _layout.tsx
│   │   │   ├── auth/
│   │   │   │   ├── _layout.tsx
│   │   │   │   ├── login.tsx
│   │   │   │   └── register.tsx
│   │   │   └── (authenticated)/  # Rutas protegidas
│   │   │       ├── _layout.tsx
│   │   │       ├── home.tsx
│   │   │       ├── onboarding.tsx
│   │   │       ├── profile.tsx
│   │   │       └── exam/
│   │   │           ├── _layout.tsx
│   │   │           ├── config.tsx    # Configurar examen (materias, dificultad, años)
│   │   │           ├── take.tsx     # Tomar examen
│   │   │           ├── history.tsx   # Historial de intentos
│   │   │           └── results.tsx   # Resultados por intento
│   │   ├── config/index.ts     # API_URL
│   │   ├── services/           # api.ts (axios), authService, examService, etc.
│   │   ├── store/             # authStore (Zustand)
│   │   ├── theme/             # ThemeContext, colors, spacing
│   │   └── types/             # auth.ts, exam.ts, user.ts
│   └── package.json
│
├── systematic-debugging/
├── amauta-backend-deploy.zip   # Listo para subir a cPanel
└── STATUS.md                  # Archivo legacy (actualizado manualmente)
```

---

## Modelos de Base de Datos (Prisma)

### Enums
- `DifficultyLevel`: EASY, MEDIUM, HARD
- `ExamAttemptStatus`: IN_PROGRESS, COMPLETED, ABANDONED

### Modelos
- **User** — id (UUID de Supabase), email, firstName, lastName, targetUniversity, targetCareer, hasCompletedOnboarding
- **University** — name, shortName (UNMSM, UNI, UNSAAC), city, region
- **Subject** — name (Matemáticas, Comunicación, etc.)
- **Career** — name (Medicina, Ingeniería de Sistemas, etc.)
- **CareerSubject** — relación N:N career-materia
- **Question** — text, difficulty, examYear, examPeriod, universityId, subjectId, careerId
- **Question_Option** — text, isCorrect, orderIndex (A=0..E=4), questionId
- **ExamAttempt** — status, score, totalQuestions, correctAnswers, universityId, subjectIds[], careerIds[], difficulty, examYears[], userId
- **StudentAnswer** — isCorrect, examAttemptId, questionId, selectedOptionId

### Prisma Binary Targets
```prisma
binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
```
El build de producción usa `linux-musl-openssl-3.0.x` (cPanel/Alpine).

---

## API Routes (Backend)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/auth/register` | Registrar usuario |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/logout` | Logout |
| POST | `/api/v1/auth/refresh` | Refrescar access_token |
| POST | `/api/v1/auth/forgot-password` | Reset password |
| GET | `/api/v1/auth/me` | Usuario actual (protegido) |
| GET/PUT | `/api/v1/users/me` | Perfil |
| GET | `/api/v1/universities` | Listar universidades |
| GET | `/api/v1/subjects` | Listar materias |
| GET | `/api/v1/careers` | Listar carreras |
| POST | `/api/v1/exam/config` | Guardar config examen |
| GET | `/api/v1/exam/questions` | Obtener preguntas del examen |
| POST | `/api/v1/exam/answer` | Guardar respuesta |
| GET | `/api/v1/exam/history` | Historial de intentos |
| GET | `/api/v1/exam/:attemptId/results` | Resultados de un intento |

---

## Auth Flow

- **access_token:** expira 1h, almacenado en SecureStore
- **refresh_token:** expira 30 días, almacenado en SecureStore
- **En 401:** interceptor de axios intenta refresh automáticamente
- **Si refresh falla:** limpia tokens y redirige a login
- **Supabase:** se usa para auth (email/password), el backend genera sus propios JWT

---

## Tema (Light/Dark)

- `src/theme/colors.ts` — paletas light/dark
- `src/theme/ThemeContext.tsx` — ThemeProvider, useTheme(), useAppTheme()
- Persistencia en AsyncStorage
- React Native Paper configurado dinámicamente según tema

---

## Configuración de Red

### Desarrollo (WSL)
- Backend: `http://172.29.208.55:3000/api/v1`
- Puerto forward: Windows (192.168.0.196:3000) → WSL (172.29.208.55:3000)
- Configurado con: `netsh interface portproxy add v4tov4 listenport=3000 listenaddress=192.168.0.196 connectport=3000 connectaddress=172.29.208.55`
- Mobile API_URL: `http://192.168.0.196:3000/api/v1`

### cPanel (Producción)
- Backenddeploy.zip contiene: package.json, package-lock.json, dist/, node_modules/@prisma/client, node_modules/.prisma/client
- cPanel ejecuta `npm install` automáticamente
- Puerto: variable (asignado por cPanel)

---

## Deploy Backend a cPanel

1. Subir `amauta-backend-deploy.zip` al file manager
2. Extraer en carpeta destino
3. Ir a **Setup Node.js App** en cPanel
4. Crear app apuntando a la carpeta extraída
5. Application Startup File: `npm start` (o `server.js` si se renombra dist/index.js)
6. Configurar variables de entorno desde la UI de cPanel

**Nota:** El ZIP incluye `node_modules/@prisma/client` y `node_modules/.prisma/client` (engines binarios Linux). No incluye `node_modules` completo — cPanel instala las dependencias desde package.json.

---

## Estado MVP

### Completado ✓
- Backend Express + Prisma + Supabase
- Auth con JWT + refresh token
- CRUD universidades, materias, carreras, users
- Ruta exam/config, exam/questions, exam/answer, exam/history, exam/:id/results
- Mobile Expo Router con auth flow (login, register)
- Rutas protegidas (authenticated group)
- Theme context (light/dark)
- Configuración de examen (materias, dificultad, años)
- Registro de respuestas del examen

### Pendiente / Faltante
- **Seed de preguntas** — la base de datos no tiene preguntas
- **Lógica de scoring** — calcular score final al completar examen
- **Resultados detallados** — mostrar respuestas correctas/incorrectas
- **Onboarding flow** — UI de selección de universidad/carrera
- **Examen take.tsx** — UI para responder preguntas (en desarrollo)
- **Deploy verificar** — aún no se probó en cPanel real

---

## Comandos Útiles

```bash
# Backend
cd /mnt/d/dev/papa/amauta/project-claude-structure/project/backend
npm run dev          # Desarrollo (tsx watch)
npm run build        # Build (tsup + prisma generate)
npm start            # Producción

# Mobile
cd /mnt/d/dev/papa/amauta/project-claude-structure/project/mobile
npx expo start       # Metro bundler

# Health check
curl http://localhost:3000/health

# Prisma
npx prisma studio     # UI del schema
npx prisma migrate deploy  # Apply migrations

# Ver IP WSL
hostname -I | awk '{print $1}'
```

---

## Archivos de Referencia

- `systematic-debugging/references/prisma-array-filter-gotcha.md` — bug conocido: filtros AND con `{ in: [...] }` en relaciones 1:many no matchean. Fix: lógica OR.
- `amauta-backend-deploy.zip` — listo para deploy