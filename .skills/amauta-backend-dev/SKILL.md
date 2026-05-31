---
name: amauta-backend-dev
description: Backend Amauta — patrón controller→service, crear endpoints, middleware, validación Zod, logging y errores
triggers:
  - backend
  - nuevo endpoint
  - controller
  - service
  - routes
  - api
  - express
  - middleware
  - agregar endpoint
  - crear ruta
  - validation
  - zod
category: amauta
---

# Amauta Backend Development

## Estructura del backend

```
backend/src/
├── routes/          # Definiciones de rutas Express (archivos .ts)
├── controllers/     # Controladores — reciben request, llaman service, devuelven response
├── services/        # Lógica de negocio — consultas a Prisma, transformaciones
├── middleware/      # auth.ts, errorHandler.ts, validation.ts
├── types/           # Tipos y esquemas Zod para validación
├── utils/           # database.ts (Prisma), supabase.ts (cliente), logger.ts
└── index.ts         # Entry point — conecta routes, middleware, y servidor
```

## Patrón: Controller → Service

### Service (`backend/src/services/ExamService.ts`)

```ts
// Servicio — lógica de negocio, NO touched el request/response
export class ExamService {
  async startExam(userId: string, request: ExamStartRequest): Promise<ExamStartResponse> {
    // Validaciones de negocio
    if (!universityId) {
      throw new CustomError('Universidad requerida', 400, 'MISSING_UNIVERSITY');
    }

    // Consultas a Prisma
    const questions = await prisma.question.findMany({ ... });

    // Crear registros
    const examAttempt = await prisma.examAttempt.create({ ... });

    return { examAttempt, questions };
  }
}

export const examService = new ExamService();
```

### Controller (`backend/src/controllers/examController.ts`)

```ts
// Controller — recibe request/response, llama service, formatea respuesta
interface AuthenticatedRequest extends Request {
  user: { id: string; email: string; aud: string; role?: string };
}

export class ExamController {
  async startExam(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { universityId, subjectIds, careerIds, difficulty, questionCount } = req.body;

      const result = await examService.startExam(userId, {
        universityId, subjectIds, careerIds, difficulty, questionCount
      });

      res.status(201).json({ success: true, data: result });
    } catch (error) {
      logError('Start exam controller error', error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ success: false, error: error.message, code: error.code });
      } else {
        res.status(500).json({ success: false, error: 'Error al iniciar el examen', code: 'START_EXAM_ERROR' });
      }
    }
  }
}

export const examController = new ExamController();
```

### Route (`backend/src/routes/exam.ts`)

```ts
import express from 'express';
import { examController } from '@/controllers/examController';
import { authenticateToken } from '@/middleware/auth';
import { validateBody } from '@/middleware/validation';
import { startExamSchema } from '@/types/api';

const router = express.Router();

router.post('/',
  authenticateToken,                    // 1. Autenticar
  validateBody(startExamSchema),         // 2. Validar body
  examController.startExam              // 3. Controller
);
```

**Orden obligatorio**: auth → validation → controller

## Middleware de autenticación

### `authenticateToken` — para rutas protegidas
```ts
import { authenticateToken } from '@/middleware/auth';

router.get('/protected', authenticateToken, controller.method);
// Añade req.user = { id, email, aud, role }
```

### `optionalAuth` — para rutas públicas que pueden tener usuario
```ts
import { optionalAuth } from '@/middleware/auth';

router.get('/public', optionalAuth, controller.method);
// req.user existe solo si hay token válido
```

### `ensureUserExists` — crear usuario automáticamente
```ts
// Después de authenticateToken — crea User en DB si no existe
router.post('/exam/start',
  authenticateToken,
  ensureUserExists,   // Crea user en DB si es la primera request
  examController.startExam
);
```

### Middlewares de protección
```ts
import { requireOnboarding } from '@/middleware/auth';

// Verifica que el usuario completó onboarding
router.get('/profile', authenticateToken, requireOnboarding, controller.method);
```

## Validación con Zod

Los esquemas están en `backend/src/types/api.ts`:

```ts
import { z } from 'zod';

export const createCareerSchema = z.object({
  name: z.string().min(1).max(255),
});

export const updateCareerSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  isActive: z.boolean().optional(),
});

// Schema para pagination (query params)
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(50),
  search: z.string().optional(),
});
```

Usar en routes:
```ts
import { validateQuery, validateBody, validateParams } from '@/middleware/validation';

router.get('/', validateQuery(paginationSchema), controller.getAll);
router.post('/', validateBody(createCareerSchema), controller.create);
router.get('/:id', validateParams(idParamSchema), controller.getById);
```

## Errores personalizados

```ts
import { CustomError, createNotFoundError, createValidationError } from '@/middleware/errorHandler';

// En services
throw new CustomError('Mensaje', 404, 'CODE_UPPER_SNAKE');

// Helpers
throw createNotFoundError('Career', careerId);
throw createValidationError('Nombre es requerido');
throw createUnauthorizedError();
```

Manejo automático en errorHandler:
- `ZodError` → 400 con detalles de campo
- `Prisma.PrismaClientKnownRequestError` → errores P2002, P2025, P2003 con códigos claros
- `CustomError` → usa statusCode y code
- Cualquier otro error → 500

## Logging

```ts
import { logInfo, logError, logWarn, logDebug } from '@/utils/logger';

logInfo('Exam started', { examAttemptId, userId, questionCount });
logError('Start exam service error', error);
logWarn('Deprecated endpoint called', { path: req.path });
logDebug('Query params', { params: req.query });
```

Logs guardados en `backend/logs/error.log` y `backend/logs/combined.log`.

## Crear un endpoint nuevo (ejemplo: subjects)

1. **Service** (`backend/src/services/subjectService.ts`):
```ts
export class SubjectService {
  async getSubjects(page: number, limit: number, search?: string) {
    const offset = (page - 1) * limit;
    const where = { isActive: true, ...(search && { name: { contains: search } }) };
    const [subjects, total] = await Promise.all([
      prisma.subject.findMany({ where, skip: offset, take: limit, orderBy: { name: 'asc' } }),
      prisma.subject.count({ where }),
    ]);
    return { subjects, total, page, limit };
  }
}
export const subjectService = new SubjectService();
```

2. **Controller** (`backend/src/controllers/subjectController.ts`):
```ts
export class SubjectController {
  async getSubjects(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const search = req.query.search as string;
      const result = await subjectService.getSubjects(page, limit, search);
      res.json({ success: true, data: result });
    } catch (error) {
      logError('Get subjects error', error);
      res.status(500).json({ success: false, error: 'Error' });
    }
  }
}
export const subjectController = new SubjectController();
```

3. **Route** (`backend/src/routes/subjects.ts`):
```ts
import express from 'express';
import { subjectController } from '@/controllers/subjectController';
import { validateQuery } from '@/middleware/validation';
import { paginationSchema } from '@/types/api';

const router = express.Router();
router.get('/', validateQuery(paginationSchema), subjectController.getSubjects);
export default router;
```

4. **Registrar en `backend/src/index.ts`**:
```ts
import subjectsRouter from '@/routes/subjects';
app.use('/api/v1/subjects', subjectsRouter);
```

## Variables de entorno

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF]:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@[IP]:5432/postgres
SUPABASE_URL=https://nvfbppvseevfiagqmtgb.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
PORT=3000
NODE_ENV=development
```

## Correr el backend

```bash
cd backend
npm run dev
# Servidor en http://localhost:3000
```

El backend no puede correr localmente si Prisma no puede conectar a la base de datos. Ver skill `amauta-debugging` para resolver P1001.
