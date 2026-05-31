---
name: amauta-debugging
description: Debugging Amauta — errores comunes: P1001 (Supabase DB blocked), CORS, auth failures, IP mismatch, Prisma connection
triggers:
  - debugging
  - error 500
  - error 401
  - P1001
  - connection error
  - cors error
  - auth error
  - database error
  - cannot connect
  - network error
  - timeout
  - troubleshooting
  - failed to start
  - backend no arranca
  - prisma error
category: amauta
---

# Amauta Debugging Guide

## Error P1001 — Supabase Database Connection Refused

**Síntoma**: `Can't reach database server at db.XXXX.supabase.co:5432`

**Causa**: Supabase Cloud bloquea conexiones directas externas a PostgreSQL. Solo permite conexiones desde su propia infraestructura.

**¿Está pasando?**: Sí, actualmente el backend no puede arrancar localmente.

**Soluciones posibles**:

1. **Usar Supabase CLI local** (requiere Docker):
   ```bash
   supabase init
   supabase start
   # DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/postgres
   ```

2. **Esperar deploy via Supabase GitHub** (bloqueado — repo es del teammate):
   - El teammate tiene que conectar el repo a Supabase GitHub Deploy
   - Así los migrations corren en la infraestructura de Supabase

3. **Fork y configurar tu propio proyecto Supabase**:
   - Crear proyecto propio en supabase.com
   - Actualizar .env con las nuevas credenciales
   - Trabajar con Supabase CLI local para desarrollo

## Error 401 — Authentication Failed

**Síntoma**: `{"error": {"code": "INVALID_TOKEN", "message": "Invalid or expired token"}}`

**Causas posibles**:

1. **Token expirado**: Los JWT de Supabase expiran. El cliente necesita hacer refresh.

2. **Token mal formateado**: Debe ser `Bearer <token>` en el header:
   ```bash
   # Correcto
   curl -H 'Authorization: Bearer eyJ...' http://localhost:3000/api/v1/exam/history
   
   # Incorrecto (falta Bearer)
   curl -H 'Authorization: eyJ...' http://localhost:3000/api/v1/exam/history
   ```

3. **Token inválido**: El token fue revocado o es de otro proyecto Supabase.

4. **Middleware no encuentra el usuario**:
   ```
   [HISTORY] ERROR: No userId on request - auth middleware may have failed
   ```
   → El middleware `authenticateToken` falló antes de llegar al controller.

**Diagnóstico**:
```bash
# Verificar que el token es válido con Supabase
curl 'https://nvfbppvseevfiagqmtgb.supabase.co/auth/v1/user' \
  -H 'Authorization: Bearer TU_TOKEN'
```

## Error CORS — Cross-Origin Request Blocked

**Síntoma**: `Access to fetch at 'http://localhost:3000' from origin 'http://localhost:8081' has been blocked by CORS policy`

**Causa**: El backend no tiene configurado el origen del frontend.

**Verificar en `backend/src/index.ts`**:
```ts
app.use(cors({
  origin: [
    'http://localhost:8081',      // Frontend local
    'http://localhost:19000',     // Expo mobile
    process.env.FRONTEND_URL,    // Producción
  ],
  credentials: true,
}));
```

**Si el error persiste**: Verificar que el backend está escuchando en el puerto correcto (3000) y que el frontend llama a `http://localhost:3000` (no a otra URL).

## IP Mismatch — On campus vs Home

**Síntoma**: El examen funciona desde casa pero no desde la universidad (o viceversa).

**Causa**: La IP pública cambia según la red. Si hay restricciones por IP en Supabase (RLS o firewall), una IP no autorizada bloquea todo.

**Diagnóstico**:
```bash
# Ver tu IP pública
curl ifconfig.me

# Verificar IPs de Supabase (en dashboard: Settings > Database > Connection Pooling)
# Supabase usa IPs estáticas para sus servicios proxieados, pero PostgreSQL directo varía
```

**Solución**: Usar el pooler de conexiones de Supabase (puerto 6543) que tiene IP estática, o esperar a que el teammate configure Supabase GitHub Deploy.

## Error 404 en endpoint existente

**Síntoma**: `Route GET /api/v1/exam/history not found`

**Causas**:
1. El router no está registrado en `index.ts`:
   ```ts
   // ¿Está esta línea?
   import examRouter from '@/routes/exam';
   app.use('/api/v1/exam', examRouter);
   ```

2. El endpoint cambió de ruta (diferente versión de código).

3. Prefijo incorrecto ( `/api/v1` vs `/api`).

**Diagnóstico rápido**:
```bash
# Ver todas las rutas registradas (mirar la salida de npm run dev)
# Al iniciar el backend, lista todas las rutas:

GET   /api/v1/universities
GET   /api/v1/universities/:id
POST  /api/v1/auth/register
POST  /api/v1/auth/login
GET   /api/v1/exam/history
POST  /api/v1/exam/start
...
```

## Prisma Client Error — $connect failed

**Síntoma**: `PrismaClientInitializationError` o backend sale con código 1 al arrancar.

**Causa**: La `DATABASE_URL` en `.env` no es accesible.

**Verificar**:
```bash
# ¿El .env tiene las variables correctas?
cat backend/.env

# ¿Prisma puede leer el schema?
cd backend && npx prisma validate

# ¿La URL de base de datos es accesible?
psql "postgresql://postgres:password@db.host:5432/postgres" -c "SELECT 1"
```

## Error de validación — 400 Bad Request

**Síntoma**: `{"error": "Validation failed", "details": [{"field": "email", "message": "Invalid email"}]}`

**Causa**: El body de la request no coincide con el esquema Zod.

**Verificar el schema en `backend/src/types/api.ts`**:
```ts
// ¿El campo está definido?
// ¿El tipo es correcto (string vs number vs array)?
// ¿Tiene el formato correcto (email, uuid, etc.)?
```

**Ejemplo de request correcta**:
```json
{
  "email": "test@example.com",
  "password": "securepassword123",
  "firstName": "Juan"
}
```

## Exams no devuelve preguntas

**Síntoma**: `examAttempt.totalQuestions: 0` o preguntas vacías.

**Causas posibles**:
1. **No hay preguntas para esa universidad + carrera/materia combinación**:
   ```sql
   -- Verificar en SQL Editor
   SELECT COUNT(*) FROM questions
   WHERE "universityId" = 'id-de-universidad'
     AND "isActive" = true;
   ```

2. **CareerSubject no existe**:
   Sin `CareerSubject`, si no se envían `subjectIds` en el start, el sistema no puede derivar las materias.

3. **Falta seed data**: Solo hay 4 preguntas seed actualmente.

## Middleware ensureUserExists no crea usuario

**Síntoma**: El usuario existe en Supabase Auth pero no en la tabla `users`.

**Causa**: El middleware `ensureUserExists` puede fallar silenciosamente si el `id` de Supabase no es UUID.

**Verificar**: El campo `id` en `auth.users` y en la tabla `users` debe ser UUID.

## Logs de debugging

```bash
# Ver logs del backend
tail -f backend/logs/combined.log
tail -f backend/logs/error.log

# Con más detalle (NODE_ENV=development ya muestra más info)
cd backend && npm run dev

# Logs de Prisma (ver todas las queries)
# En backend/src/utils/database.ts:
log: ['query', 'error', 'warn']
```

## Checklist de problemas comunes

- [ ] ¿El backend está corriendo? (`npm run dev` en backend/)
- [ ] ¿El frontend llama al puerto correcto? (3000, no 8081)
- [ ] ¿El token tiene el formato `Bearer <token>`?
- [ ] ¿El .env tiene las variables de Supabase correctas?
- [ ] ¿Las tablas existen en la base de datos? (verificar via SQL Editor o REST API)
- [ ] ¿Hay preguntas seed para la universidad seleccionada?
- [ ] ¿El CareerSubject tiene registros para la carrera seleccionada?
