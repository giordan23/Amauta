# AMAUTA - Análisis de Escalabilidad y Mantenibilidad

## Hallazgos

### HIGH

1. **Double Navigation Header** — `(authenticated)/_layout.tsx` y `exam/_layout.tsx` ambos renderizan Stack con `headerShown` por defecto (`true`). Pantallas de exam muestran doble barra superior. Fix: agregar `headerShown: false` en ambos layouts.

2. **Tipo `any` en Express handlers** — `backend/src/routes/exam.ts` usa `req: any, res: any` en lugar de tipos proper de Express. Riesgo de errores en runtime.

3. **Sin rate limiting** — El backend no tiene `express-rate-limit`. Los endpoints `/exam/start` y `/exam/:id/answer` son vulnerables a flooding.

### MEDIUM

4. **Sin transacciones en start exam** — El endpoint `POST /exam/start` hace create + fetch en operaciones separadas. Si falla entre ambas, el examAttempt queda huérfano.

5. **Preguntas re-ordenadas en cada fetch** — `GET /exam/:examAttemptId` vuelve a hacer shuffle con `Math.random()` cada vez. El usuario puede ver orden diferente si recarga.

6. **Validador Zod con `any` bypass** — `examConfigSchema` en `mobile/src/types/exam.ts` tiene `careerIds` que permite array vacío pero el código fuerza `min(1)`. El schema no se usa activamente en mutations.

7. **useEffect con dependencias circulares** — El `useEffect` en `config.tsx` para pre-seleccionar universidad referencia `selectedUniversityId` en sus dependencias, lo cual es redundante y puede causar re-renders innecesarios.

### LOW

8. **History endpoint sin paginación** — `take: 20` hardcodeado en `getExamHistory`.

9. **Redundant route comments** — `backend/src/index.ts` líneas 113-114 tienen routes comentadas que crean confusión.

10. **Math.random() para shuffle** — Aceptable para MVP pero no reproducible. Si se necesita reproducibilidad (re-take del mismo exam), fallará.

---

## Qué funciona bien

- **Estructura de carpetas clara** — mobile y backend separados, rutas bien organizadas
- **Zustand para auth** — simple y efectivo para el caso de uso
- **React Query para servidor** —分离 de estado servidor/cliente, cache automático
- **Middleware encadenado en backend** — helmet, cors, body parser, logger en orden correcto
- **Graceful shutdown** — el backend maneja SIGTERM/SIGINT correctamente
- **CustomError class** — patrón consistente para errores en backend
- **API versioning** — `/api/v1` preparado para futuras versiones

---

## Mejoras Prioritarias (Top 5)

1. **[FIX] Doble header** — Agregar `headerShown: false` en `(authenticated)/_layout.tsx` y `exam/_layout.tsx`
2. **[SECURITY] Rate limiting** — Instalar y configurar `express-rate-limit` en el backend
3. **[TYPE] Tipos proper en Express** — Reemplazar `req: any, res: any` con `Request, Response` de Express
4. **[RELIABILITY] Transacción en start exam** — Envolver create + fetch en `prisma.$transaction`
5. **[UX] Mantener orden de preguntas** — Guardar `questionOrder` en ExamAttempt y usarlo en GET en vez de re-ordenar

---

## Notas

- El código del análisis de subagents no terminó de ejecutarse completamente — se guarda este borrador basado en revisión directa.
- Actualizado: 2026-05-08
