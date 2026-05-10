# Flujo de Selección de Preguntas por Universidad y Carrera

## Objetivo
Las preguntas del simulacro se seleccionan automáticamente según la **universidad objetivo** y la **carrera** del usuario, sin intervención manual en la elección de materias.

---

## Estructura de Datos del Examen de Admisión

### Modelo: `ExamStructure`

Cada universidad define su estructura de examen:

```typescript
interface ExamStructure {
  universityId: string;
  careerId: string; // nullable = estructura general de la universidad
  totalQuestions: number;
  sections: ExamSection[];
  scoring: ScoringRule;
  timeLimit?: number; // en minutos
  negativeScoring?: boolean;
}

interface ExamSection {
  name: string;
  questionCount: number;
  subjectIds: string[]; // materias que cubren esta sección
  weight: number; // peso para puntaje final (0-100)
}

interface ScoringRule {
  correctPoints: number;
  incorrectPoints: number; // negativo o 0
  omittedPoints: number;
}
```

### Estructuras predefinidas (Perú 2025–2026)

#### UNMSM — Universidad Nacional Mayor de San Marcos

**Área B/C (Ingenierías y Ciencias Básicas)**

| Sección | Preguntas | Materias |
|---|---|---|
| Actitudinal | 10 | Orientación vocacional (sin peso en puntaje) |
| Habilidades | 20 | Comprensión lectora (10) + Razonamiento lógico-matemático (10) |
| Conocimientos | 70 | Física, Química, Matemáticas |

**Scoring:**
- Correcta: +20 pts
- Incorrecta: −1.125 pts
- Omitida: 0 pts

**Datos de competitividad:**
- Postulantes: 1,385
- Vacantes: 44
- Puntaje promedio: 840.90
- Puntaje recomendado simulacros: 1,300+ pts

#### UNI — Universidad Nacional de Ingeniería

**Ingeniería de Sistemas**

El examen se divide en **tres jornadas**:

| Área | Descripción |
|---|---|
| Matemática | Examen dedicado |
| Aptitud Académica | Razonamiento y lógica |
| Física y Química | Examen dedicado |
| Humanidades | Comprensión, historia, etc. |
| Aptitud Vocacional | Solo para Arquitectura |

**Scoring:**
- Puntaje total: 2,000 pts
- Puntaje mínimo: 900 pts
- Penalidad por error: Sí

**Datos:**
- Postulantes Ing. Sistemas: 669

---

## Lógica de Selección de Preguntas (Backend)

### Endpoint: `POST /api/v1/exam/start`

```typescript
// Input
{
  universityId: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  questionCount?: number; // override opcional
}

// Derivación automática:
// 1. Obtener targetCareer del usuario desde su perfil
// 2. Obtener CareerSubjects (materias vinculadas a la carrera)
// 3. Obtener ExamStructure para universityId + careerId
// 4. Si no existe estructura específica, buscar estructura general de la universidad
// 5. Seleccionar preguntas según weights de cada sección
```

### Algoritmo de selección

```
1. Cargar ExamStructure para (universityId, careerId)
   - Si careerId no tiene estructura, usar estructura general de universityId

2. Para cada sección de ExamStructure:
   - calcular preguntas_sección = floor(totalQuestions * weight / 100)
   - distribuir questionCount proporcionalmente

3. Para cada sección, filtrar preguntas:
   - subjectId IN sección.subjectIds
   - universityId = exam.universityId
   - difficulty = filtro (opcional)
   - isActive = true
   - ORDER BY RANDOM()
   - LIMIT preguntas_sección

4. Shuffle final y ocultar isCorrect
```

### Fallback actual (sin ExamStructure)

El sistema actual deriva `subjectIds` desde `CareerSubject` y filtra con OR:

```typescript
whereClause.OR = [
  { subjectId: { in: examSubjectIds } },
  { careerId: { in: examCareerIds } },
];
```

Esto será reemplazado por el algoritmo de secciones.

---

## Modelo Prisma Necesario

```prisma
model ExamStructure {
  id            String   @id @default(cuid())
  universityId  String
  university    University @relation(...)
  careerId      String?  // null = estructura general
  career        Career?  @relation(...)
  totalQuestions Int
  timeLimit     Int?     // minutos
  negativeScoring Boolean @default(true)
  correctPoints  Float    @default(20)
  incorrectPoints Float   @default(-1.125)
  omittedPoints  Float    @default(0)
  sections       ExamSection[]
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@unique([universityId, careerId])
}

model ExamSection {
  id              String   @id @default(cuid())
  examStructureId String
  examStructure   ExamStructure @relation(...)
  name            String
  questionCount   Int
  subjects        String[] // subjectIds como JSON array
  weight          Float    @default(1.0) // peso proporcional (0-1)
  orderIndex      Int      @default(0)
}
```

---

## UI Actual (Simplificada)

La pantalla `config.tsx` ahora muestra:

1. **Universidad objetivo** (chips para selección)
2. **Dificultad** (Todas/Fácil/Intermedio/Difícil)
3. **Número de preguntas** (5/10/20/50)

La sección de "Carrera" y "Materias" fue removida. El usuario no elige materias manualmente.

---

## Roadmap de Implementación

- [ ] Crear modelo `ExamStructure` y `ExamSection` en Prisma
- [ ] Poblar estructuras para UNMSM y UNI con datos reales
- [ ] Modificar `POST /exam/start` para usar ExamStructure
- [ ] Modificar `GET /exam/:id` para usar ExamStructure
- [ ] Agregar pantalla de info del examen (secciones, puntajes) en config.tsx
- [ ] Integrar scoring real según configuración de la universidad

---

*Documento creado: Mayo 2026 — Giordan / AMAUTA Project*