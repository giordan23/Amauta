---
name: amauta-database-schema
description: Base de datos Amauta — schema Prisma, seed data, SQL en dashboard de Supabase, y cómo poblar preguntas de examen
triggers:
  - database schema
  - prisma schema
  - seed data
  - agregar preguntas
  - supabase sql editor
  - migrations
  - career subjects
  - exam questions
  - database
category: amauta
---

# Amauta Database Schema

## Panorámica

La base de datos usa **PostgreSQL** via **Prisma ORM**. El schema está en `backend/prisma/schema.prisma`. Las tablas se crearon manualmente en el dashboard de Supabase porque Prisma no puede conectarse directamente (Supabase bloquea acceso externo a PostgreSQL — error P1001).

## Modelos

### User
```
User (id: UUID, email, firstName, lastName, country,
      targetUniversityId, targetCareerId, hasCompletedOnboarding)
```
- `id` debe coincidir con `auth.users.id` de Supabase
- Se crea automáticamente en el middleware `ensureUserExists` si no existe
- `targetUniversityId` y `targetCareerId` determinan qué examen puede tomar

### University
```
University (id: cuid, name, shortName, city, region, country, isActive)
```
- 3 universidades seed: UNMSM, UNI, UNSAAC
- Relación: una university tiene muchas questions y examAttempts

### Subject
```
Subject (id: cuid, name, description, isActive)
```
- 10 materias seed
- Relación: muchos-to-muchos con Career via `CareerSubject`

### Career
```
Career (id: cuid, name, isActive)
```
- 20 carreras seed
- Relación: muchos-to-muchos con Subject via `CareerSubject`

### CareerSubject (tabla de join)
```
CareerSubject (careerId, subjectId) — @@unique([careerId, subjectId])
```
- Define qué materias entran en qué carrera
- **Derivación automática**: cuando starts un exam sin `subjectIds`, el sistema busca `CareerSubject` por las `careerIds` seleccionadas y deriva los `subjectIds`

### Question
```
Question (id: cuid, text, imageUrl?, difficulty, examYear?, examPeriod?,
          explanation?, isActive, universityId, subjectId, careerId?)
```
- `difficulty`: EASY | MEDIUM | HARD
- `universityId` es obligatorio — las preguntas son específicas por universidad
- `subjectId` obligatorio
- `careerId` opcional — si existe, la pregunta es solo para esa carrera
- `options`: relación uno-a-muchos con Question_Option

### Question_Option
```
Question_Option (id: cuid, text, isCorrect, orderIndex, questionId)
@@unique([questionId, orderIndex])
```
- Cada pregunta tiene entre 2-5 opciones
- `orderIndex`: 0=A, 1=B, 2=C, 3=D, 4=E
- Solo una opción puede tener `isCorrect: true` por pregunta

### ExamAttempt
```
ExamAttempt (id: cuid, status, score?, totalQuestions, correctAnswers,
             startedAt, completedAt?, universityId, subjectIds[], careerIds[],
             difficulty?, examYears[], userId)
status: IN_PROGRESS | COMPLETED | ABANDONED
```
- `subjectIds` y `careerIds` se guardan como arrays de strings
- `score` es 0-100 (porcentaje), no 0-20

### StudentAnswer
```
StudentAnswer (examAttemptId, questionId, isCorrect, answeredAt,
               selectedOptionId?)
@@unique([examAttemptId, questionId])
```
- Una respuesta por pregunta por intento
- Se usa upsert (crea o actualiza si el estudiante cambia de respuesta)

## Cómo agregar seed data

### Opción 1: SQL Editor del dashboard de Supabase

Ve a https://supabase.com/dashboard → tu proyecto → SQL Editor → New query.

#### Insertar una pregunta completa:
```sql
-- 1. Insertar opciones primero
INSERT INTO question_options (id, text, "isCorrect", "orderIndex", "questionId")
VALUES
  ('opt-uuid-1', 'Respuesta A', false, 0, 'question-uuid'),
  ('opt-uuid-2', 'Respuesta B', true,  1, 'question-uuid'),
  ('opt-uuid-3', 'Respuesta C', false, 2, 'question-uuid'),
  ('opt-uuid-4', 'Respuesta D', false, 3, 'question-uuid');

-- 2. Insertar la pregunta
INSERT INTO questions (id, text, difficulty, "universityId", "subjectId", "careerId", "examYear", "examPeriod", "isActive")
VALUES ('question-uuid', '¿Cuál es la capital del Perú?', 'EASY',
        (SELECT id FROM universities WHERE "shortName" = 'UNMSM'),
        (SELECT id FROM subjects WHERE name = 'Comunicación'),
        NULL, 2023, '2023-I', true);
```

#### Obtener IDs necesarios:
```sql
-- Ver universidades
SELECT id, name, "shortName" FROM universities;

-- Ver materias
SELECT id, name FROM subjects;

-- Ver carreras
SELECT id, name FROM careers;

-- Ver CareerSubject (qué materias tiene cada carrera)
SELECT c.name as career, s.name as subject
FROM career_subjects cs
JOIN careers c ON c.id = cs."careerId"
JOIN subjects s ON s.id = cs."subjectId";
```

### Opción 2: API REST de Supabase (service_role)

```bash
# Insertar pregunta
curl -X POST 'https://nvfbppvseevfiagqmtgb.supabase.co/rest/v1/questions' \
  -H 'apikey: SERVICE_ROLE_KEY' \
  -H 'Authorization: Bearer SERVICE_ROLE_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"text": "...", "difficulty": "MEDIUM", ...}'

# Insertar opciones
curl -X POST 'https://nvfbppvseevfiagqmtgb.supabase.co/rest/v1/question_options' \
  -H 'apikey: SERVICE_ROLE_KEY' \
  -H 'Authorization: Bearer SERVICE_ROLE_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"text": "...", "isCorrect": true, "orderIndex": 1, "questionId": "..."}'
```

## Cómo funciona la derivación de materias (CareerSubject)

Cuando un estudiante inicia un examen:

1. Si no envía `subjectIds` pero sí envía `careerIds`:
   ```ts
   // ExamService.ts líneas 93-98
   const careerSubjects = await prisma.careerSubject.findMany({
     where: { careerId: { in: examCareerIds } },
     select: { subjectId: true }
   });
   examSubjectIds = [...new Set(careerSubjects.map(cs => cs.subjectId))];
   ```

2. Si tampoco envía `careerIds`, usa `targetCareerId` del perfil del usuario

**En la práctica**: para que un examen funcione, necesitas:
- CareerSubject registros que vinculen carreras con materias
- Questions que tengan `subjectId` matching las materias derivadass
- Questions que tengan `universityId` matching la universidad seleccionada

## Migrations de Prisma

Prisma migrations no funcionan actualmente porque Supabase bloquea acceso directo a PostgreSQL. Para hacer cambios:

1. Modifica `backend/prisma/schema.prisma`
2. Ve al SQL Editor del dashboard de Supabase
3. Ejecuta el SQL de creación/modificación manualmente
4. O espera que el teammate configure Supabase GitHub Deploy

```bash
# Generar SQL sin ejecutar (para ver qué cambiaría)
cd backend
npx prisma migrate dev --name nombre_del_cambio --create-only

# Ver el schema actual en formato SQL
npx prisma db pull --print
```

## Errores comunes de base de datos

| Error | Causa | Solución |
|-------|-------|----------|
| P1001 | Supabase bloquea conexión directa | Usar SQL Editor o esperar deploy de Supabase |
| P2002 | Violación de constraint único | El registro ya existe |
| P2025 | Registro no encontrado | Verificar que el ID existe |
| P2003 | Foreign key inválida | El ID referenciado no existe |

## Ver datos actuales

```bash
# Tablas completas via REST API
curl 'https://nvfbppvseevfiagqmtgb.supabase.co/rest/v1/universities' \
  -H 'apikey: SERVICE_ROLE_KEY'

curl 'https://nvfbppvseevfiagqmtgb.supabase.co/rest/v1/questions?select=id,text,difficulty' \
  -H 'apikey: SERVICE_ROLE_KEY'
```
