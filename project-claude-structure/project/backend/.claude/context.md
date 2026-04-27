# Contexto: Backend (Express)

## Stack
- Runtime: Node.js
- Framework: Express 5
- Lenguaje: TypeScript strict
- Auth: Supabase Auth via @supabase/supabase-js (service role, server-side)
- Validación: zod
- Testing: Jest + Supertest
- Logger: pino

## Variables de entorno requeridas
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=   # NUNCA exponer al cliente
PORT=3000
NODE_ENV=development
```

## Estructura de carpetas
```
src/
  routes/        ← definición de rutas Express
  controllers/   ← valida body con zod, llama al service
  middleware/    ← authGuard, validación, errores globales
  services/      ← lógica de negocio + llamadas a Supabase
  types/         ← tipos TypeScript (compartibles con mobile)
```

## Convenciones
- Endpoints bajo `/api/v1/`
- Response shape estándar siempre:
  ```json
  { "data": {}, "error": null }
  { "data": null, "error": { "code": "ERROR_CODE", "message": "..." } }
  ```
- Errores con clase `AppError` custom (code + statusCode + message)
- Middleware global de errores captura todo
- Validación de body con zod en cada controller
- JWT verificado con middleware `authGuard` en rutas protegidas

## Reglas críticas
- NUNCA exponer SUPABASE_SERVICE_ROLE_KEY al cliente
- NUNCA hardcodear URLs ni secrets
- SIEMPRE validar el JWT en endpoints protegidos
- NUNCA exponer stack traces en producción

## Contratos de integración
Ver `.claude/contracts/` para los contratos con el frontend

## Comandos
```bash
npm run dev      # nodemon + ts-node
npm test         # jest
npm run build    # tsc
```
