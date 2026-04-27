# Backend — Node.js + Express

## Librerías principales
- **Framework:** Express 5
- **Validación:** zod (schemas compartibles con el frontend)
- **Auth:** @supabase/supabase-js (server-side, service role)
- **Testing:** Jest + Supertest
- **Logger:** pino

## Variables de entorno requeridas
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=   # solo backend, NUNCA exponer al cliente
PORT=3000
NODE_ENV=development
```

## Estructura de un endpoint típico
```
routes/auth.ts         → define POST /api/v1/auth/login
controllers/auth.ts    → valida body con zod, llama al service
services/auth.ts       → lógica con Supabase, lanza errores tipados
middleware/authGuard.ts → verifica JWT en rutas protegidas
```

## Response shape estándar
```typescript
// Éxito
{ data: T, error: null, meta?: object }

// Error
{ data: null, error: { code: string, message: string } }
```

## Manejo de errores
- Usar clase `AppError` custom con `code` y `statusCode`
- Middleware global de errores captura todo
- NUNCA exponer stack traces en producción

## Comandos útiles
```bash
npm run dev        # nodemon + ts-node
npm test           # jest
npm run build      # tsc
```
