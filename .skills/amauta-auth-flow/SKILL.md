---
name: amauta-auth-flow
description: Authentication flow for Amauta — triggers on auth, login, register, logout, token, JWT, refresh token, Supabase auth, authenticateToken, middleware, user registration, session management.
---

# Auth Flow — Amauta

Authentication uses Supabase Auth (email/password) with a Prisma User profile layer.

## Architecture

```
Frontend → Express API → Supabase Auth (email/password)
                        → Prisma User (profile data)
```

Two clients:
- `supabasePublic` — for auth operations (signUp, signInWithPassword, signOut, refreshSession)
- `prisma` — for user profile data (findUnique, create, update)

## Auth Endpoints

All endpoints live under `/api/v1/auth/`:

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /register | No | Create user in Supabase + Prisma |
| POST | /login | No | Authenticate + return tokens |
| POST | /logout | No | Sign out from Supabase |
| POST | /refresh | No | Refresh access token |
| POST | /forgot-password | No | Send reset email |
| GET | /me | Yes | Get current user profile |

## Register Flow

**POST /api/v1/auth/register**

```typescript
// 1. Create user in Supabase Auth
const { data: authData, error: authError } = await supabasePublic.auth.signUp({
  email,
  password,
  options: { data: { first_name: firstName, last_name: lastName } }
});

// 2. Create user profile in Prisma
const user = await prisma.user.create({
  data: {
    id: authData.user.id,  // Same UUID from Supabase Auth
    email: authData.user.email!,
    firstName,
    lastName,
    hasCompletedOnboarding: false
  }
});
```

**Request body:**
```json
{ "email": "user@example.com", "password": "secret123", "firstName": "Juan", "lastName": "Perez" }
```

**Response:**
```json
{
  "data": {
    "user": { "id": "uuid", "email": "...", "firstName": "...", "hasCompletedOnboarding": false },
    "session": { "access_token": "jwt", "refresh_token": "..." },
    "needsEmailConfirmation": true
  }
}
```

## Login Flow

**POST /api/v1/auth/login**

```typescript
const { data: authData, error: authError } = await supabasePublic.auth.signInWithPassword({
  email,
  password
});

// Get or create user profile
let user = await prisma.user.findUnique({ where: { id: authData.user.id } });
if (!user) {
  user = await prisma.user.create({ data: { id: authData.user.id, email: authData.user.email! } });
}
```

**Request body:**
```json
{ "email": "user@example.com", "password": "secret123" }
```

**Response:**
```json
{
  "data": {
    "access_token": "jwt...",
    "refresh_token": "...",
    "user": { "id": "uuid", "email": "...", "firstName": "...", "hasCompletedOnboarding": false }
  }
}
```

## Token Refresh

**POST /api/v1/auth/refresh**

```typescript
const { data, error } = await supabasePublic.auth.refreshSession({
  refresh_token: refreshToken
});
```

Frontend stores tokens and sends them via Authorization header:
```
Authorization: Bearer <access_token>
```

## Protected Routes (Backend Middleware)

`authenticateToken` middleware extracts and validates the JWT:

```typescript
// backend/src/middleware/auth.ts
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // JWT decoded by Supabase client — req.user populated
  const { data: { user }, error } = await supabasePublic.auth.getUser(token);
  
  if (error || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  req.user = { id: user.id };
  next();
};
```

Usage in routes:
```typescript
router.get('/me', authenticateToken, authController.getMe);
```

## Frontend Auth Integration

**Environment variables** (`.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=https://nvfbppvseevfiagqmtgb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_dv-...
```

**Frontend service** (`frontend/src/services/api.ts` uses ky):
```typescript
const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  headers: { 'Authorization': `Bearer ${getAccessToken()}` }
});
```

**Auth store** (`frontend/src/store/authStore.ts` — Zustand):
```typescript
const { isAuthenticated, user, login, logout } = useAuthStore();
```

## Common Errors

| Code | Message | Cause |
|------|---------|-------|
| `REGISTRATION_FAILED` | Supabase error message | Email already exists or invalid password |
| `LOGIN_FAILED` | Invalid credentials | Wrong email/password |
| `AUTH_FAILED` | Authentication failed | Session expired or corrupted |
| `REFRESH_FAILED` | Token refresh failed | Refresh token expired or revoked |
| `NOT_AUTHENTICATED` | User not authenticated | No Authorization header |
| `USER_NOT_FOUND` | User not found | User deleted from DB but token still valid |

## User Model (Prisma)

```prisma
model User {
  id        String   @id @db.Uuid
  email     String   @unique
  firstName  String?
  lastName   String?
  country    String?
  
  targetUniversityId String?
  targetUniversity   University? @relation(...)
  
  targetCareerId String?
  targetCareer   Career? @relation(...)
  
  hasCompletedOnboarding Boolean @default(false)
  
  examAttempts ExamAttempt[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("users")
}
```

## Key Conventions

1. **Supabase Auth UUID == Prisma User UUID** — same ID, synced on login/register
2. **Service role key stays in backend .env** — never exposed to frontend
3. **Anonym key (publishable) goes in frontend .env.local** — safe for client
4. **Session stored in frontend** — memory/Zustand for auth state, sessionStorage for exam resume
5. **On login, if user doesn't exist in Prisma** — auto-create (edge case for users created directly in Supabase dashboard)

## File Locations

- Auth controller: `backend/src/controllers/authController.ts`
- Auth routes: `backend/src/routes/auth.ts`
- Auth middleware: `backend/src/middleware/auth.ts`
- Frontend auth service: `frontend/src/services/authService.ts` (implied by `useAuthStore`)
- Auth store: `frontend/src/store/authStore.ts`
- Prisma schema: `backend/prisma/schema.prisma` (User model)
- Supabase utils: `backend/src/utils/supabase.ts`