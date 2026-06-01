---
name: amauta-exam-flow
description: Exam flow for Amauta — triggers on exam, start exam, answer question, complete exam, exam results, exam history, exam service, ExamService, ExamStartRequest, ExamCompleteResponse, exam attempt, simulacro, preguntas de examen.
---

# Exam Flow — Amauta

Complete lifecycle of an exam attempt: start → answer → complete → results → history.

## Flow Overview

```
startExam → getExam → answerQuestion (xN) → completeExam → getExamHistory
```

## Interfaces (from ExamService.ts)

```typescript
// Request to start exam
interface ExamStartRequest {
  universityId: string;
  subjectIds?: string[];
  careerIds?: string[];
  difficulty?: string;
  questionCount?: number; // default 100
}

// Response from startExam
interface ExamStartResponse {
  examAttempt: {
    id: string;
    status: 'IN_PROGRESS';
    totalQuestions: number;
    startedAt: Date;
    universityId: string;
    subjectIds: string[];
    careerIds: string[];
    difficulty: string | null;
  };
  questions: Array<{
    id: string;
    text: string;
    imageUrl: string | null;
    difficulty: string | null;
    options: Array<{ id: string; text: string; orderIndex: number }>;
    // NOTE: isCorrect is NOT sent to client — hidden for security
  }>;
}

// Response from completeExam
interface ExamCompleteResponse {
  examAttempt: {
    id: string;
    status: 'COMPLETED';
    score: number; // percentage 0-100
    totalQuestions: number;
    correctAnswers: number;
    startedAt: Date;
    completedAt: Date | null;
    university: { id: string; name: string };
  };
  answers: Array<{
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }>;
  questions: Array<{
    id: string;
    text: string;
    imageUrl: string | null;
    difficulty: string | null;
    options: Array<{
      id: string;
      text: string;
      orderIndex: number;
      isCorrect: boolean; // NOW visible
    }>;
    explanation: string | null;
  }>;
}
```

## Step 1: Start Exam

**Endpoint:** `POST /api/v1/exam/start`

```typescript
// Backend: ExamService.startExam()
const examAttempt = await prisma.examAttempt.create({
  data: {
    userId,
    universityId,
    subjectIds: examSubjectIds,
    careerIds: examCareerIds,
    difficulty,
    totalQuestions: shuffled.length,
    status: 'IN_PROGRESS',
  }
});
```

**Frontend service call:**
```typescript
// frontend/src/services/examService.ts
const response = await api.post('exam/start', {
  json: { universityId, questionCount: 100 }
}).json<{ success: true; data: ExamStartResponse }>();

const { examAttempt, questions } = response.data;
sessionStorage.setItem('currentExamId', examAttempt.id);
```

**Key behavior:** If `careerIds` is empty, the service falls back to user's `targetCareerId`:
```typescript
if (examCareerIds.length === 0) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { targetCareer: true }
  });
  if (user?.targetCareerId) {
    examCareerIds = [user.targetCareerId];
  }
}
```

**Key behavior:** If `subjectIds` is empty, subjects are derived from `CareerSubject` table:
```typescript
if (examSubjectIds.length === 0 && examCareerIds.length > 0) {
  const careerSubjects = await prisma.careerSubject.findMany({
    where: { careerId: { in: examCareerIds } },
    select: { subjectId: true }
  });
  examSubjectIds = [...new Set(careerSubjects.map(cs => cs.subjectId))];
}
```

## Step 2: Get Exam (resume)

**Endpoint:** `GET /api/v1/exam/:examAttemptId`

Questions are re-fetched and **reshuffled** on each getExam call. The `answeredMap` tells frontend which questions already have answers.

```typescript
// Frontend: examService.getExam()
const response = await api.get(`exam/${examAttemptId}`).json();
setExamData(response.data);
// answeredMap: { [questionId]: selectedOptionId }
```

## Step 3: Answer Question

**Endpoint:** `POST /api/v1/exam/:examAttemptId/answer`

```json
{ "questionId": "uuid", "selectedOptionId": "uuid" }
```

**Backend uses upsert** — answering same question twice updates the answer:
```typescript
const studentAnswer = await prisma.studentAnswer.upsert({
  where: {
    examAttemptId_questionId: { examAttemptId, questionId }
  },
  create: { examAttemptId, questionId, selectedOptionId, isCorrect },
  update: { selectedOptionId, isCorrect },
});
```

**Frontend debounces/auto-saves** (ExamTakePage.tsx lines 89-117):
```typescript
const handleSubmit = async () => {
  // Send all answers first
  for (const question of examData.questions) {
    if (answers[question.id]) {
      await examService.answerQuestion(examId!, question.id, answers[question.id]);
    }
  }
  // Then complete
  const result = await examService.completeExam(examId!);
  sessionStorage.setItem('examResult', JSON.stringify(result));
  navigate('/app/exam/results');
};
```

## Step 4: Complete Exam

**Endpoint:** `POST /api/v1/exam/:examAttemptId/complete`

```typescript
const correctAnswers = examAttempt.studentAnswers.filter((a) => a.isCorrect).length;
const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

const updated = await prisma.examAttempt.update({
  where: { id: examAttemptId },
  data: {
    status: 'COMPLETED',
    score,
    correctAnswers,
    completedAt: new Date(),
  }
});
```

## Step 5: Exam History

**Endpoint:** `GET /api/v1/exam/history`

Returns last 20 attempts (completed or abandoned):
```typescript
const attempts = await prisma.examAttempt.findMany({
  where: { userId, status: { in: ['COMPLETED', 'ABANDONED'] } },
  include: { university: true, studentAnswers: true },
  orderBy: { startedAt: 'desc' },
  take: 20,
});
```

## Common Errors

| Code | Message | Cause |
|------|---------|-------|
| `MISSING_UNIVERSITY` | Universidad requerida | `universityId` not provided |
| `MISSING_PARAMS` | Faltan parámetros requeridos | `careerIds` empty and user has no `targetCareerId` |
| `EXAM_NOT_FOUND` | Examen no encontrado o ya terminado | Attempt is COMPLETED/ABANDONED or doesn't belong to user |
| `QUESTION_NOT_FOUND` | Pregunta no encontrada | Question ID doesn't exist |

## Key Conventions

1. **Questions are shuffled** with `Math.random() - 0.5` on every fetch
2. **Correct answers are hidden** from client until `completeExam` is called
3. **Exam attempt IDs are stored in sessionStorage** — no auth token needed to resume (backend validates `userId` from JWT)
4. **Auto-derivation**: if you don't pass `subjectIds`, they come from the `CareerSubject` join table
5. **Timer lives in frontend state** (ExamTakePage) — backend doesn't track time

## File Locations

- Backend service: `backend/src/services/ExamService.ts`
- Frontend service: `frontend/src/services/examService.ts`
- Exam take page: `frontend/src/pages/ExamTakePage.tsx`
- Exam results page: `frontend/src/pages/ExamResultsPage.tsx`
- Routes: `backend/src/routes/exam.ts`