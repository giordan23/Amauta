import { prisma } from '@/utils/database';
import { logInfo, logError } from '@/utils/logger';
import { CustomError } from '@/middleware/errorHandler';

export interface ExamStartRequest {
  universityId: string;
  subjectIds?: string[];
  careerIds?: string[];
  difficulty?: string;
  questionCount?: number;
}

export interface ExamStartResponse {
  examAttempt: {
    id: string;
    status: string;
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
    options: Array<{
      id: string;
      text: string;
      orderIndex: number;
    }>;
  }>;
}

export interface ExamCompleteResponse {
  examAttempt: {
    id: string;
    status: string;
    score: number;
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
      isCorrect: boolean;
    }>;
    explanation: string | null;
  }>;
}

export class ExamService {
  async startExam(userId: string, request: ExamStartRequest): Promise<ExamStartResponse> {
    try {
      const { universityId, subjectIds, careerIds, difficulty, questionCount = 100 } = request;

      if (!universityId) {
        throw new CustomError('Universidad requerida', 400, 'MISSING_UNIVERSITY');
      }

      // Si careerIds viene vacío, usar targetCareer del usuario
      let examCareerIds = careerIds && careerIds.length > 0 ? careerIds : [];
      
      if (examCareerIds.length === 0) {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { targetCareer: true }
        });
        
        if (user?.targetCareerId) {
          examCareerIds = [user.targetCareerId];
        }
      }

      // Derivar subjectIds desde CareerSubject si no se proporcionan
      let examSubjectIds = subjectIds || [];
      if (examSubjectIds.length === 0 && examCareerIds.length > 0) {
        const careerSubjects = await prisma.careerSubject.findMany({
          where: { careerId: { in: examCareerIds } },
          select: { subjectId: true }
        });
        examSubjectIds = [...new Set(careerSubjects.map(cs => cs.subjectId))];
      }

      // Validar que tengamos configuración
      if (!universityId || examSubjectIds.length === 0 || examCareerIds.length === 0) {
        throw new CustomError('Faltan parámetros requeridos para el examen', 400, 'MISSING_PARAMS');
      }

      // Obtener preguntas aleatorias basadas en filtros
      const whereClause: any = {
        isActive: true,
        universityId,
      };

      if (examSubjectIds.length > 0 || examCareerIds.length > 0) {
        const conditions: any[] = [];
        
        if (examSubjectIds.length > 0) {
          conditions.push({ subjectId: { in: examSubjectIds } });
        }
        
        if (examCareerIds.length > 0) {
          conditions.push({ careerId: { in: examCareerIds } });
        }
        
        whereClause.OR = conditions;
      }

      if (difficulty) {
        whereClause.difficulty = difficulty;
      }

      const questions = await prisma.question.findMany({
        where: whereClause,
        include: {
          options: {
            select: {
              id: true,
              text: true,
              orderIndex: true,
              isCorrect: true,
            },
            orderBy: { orderIndex: 'asc' },
          },
        },
        take: questionCount,
        orderBy: { id: 'asc' },
      });

      // Mezclar preguntas
      const shuffled = questions.sort(() => Math.random() - 0.5);

      // Ocultar respuestas correctas del cliente
      const questionsForClient = shuffled.map((q) => ({
        id: q.id,
        text: q.text,
        imageUrl: q.imageUrl,
        difficulty: q.difficulty,
        options: q.options.map((o) => ({
          id: o.id,
          text: o.text,
          orderIndex: o.orderIndex,
        })),
      }));

      // Crear intento de examen
      const examAttempt = await prisma.examAttempt.create({
        data: {
          userId,
          universityId,
          subjectIds: examSubjectIds,
          careerIds: examCareerIds,
          difficulty,
          totalQuestions: shuffled.length,
          status: 'IN_PROGRESS',
        },
      });

      logInfo('Exam started', { examAttemptId: examAttempt.id, userId, questionCount: shuffled.length });

      return {
        examAttempt: {
          id: examAttempt.id,
          status: examAttempt.status,
          totalQuestions: examAttempt.totalQuestions,
          startedAt: examAttempt.startedAt,
          universityId: examAttempt.universityId,
          subjectIds: examAttempt.subjectIds,
          careerIds: examAttempt.careerIds,
          difficulty: examAttempt.difficulty,
        },
        questions: questionsForClient,
      };
    } catch (error) {
      logError('Start exam service error', error);
      throw error;
    }
  }

  async getExamAttempt(examAttemptId: string, userId: string) {
    try {
      const examAttempt = await prisma.examAttempt.findFirst({
        where: { id: examAttemptId, userId },
        include: {
          university: true,
          studentAnswers: {
            select: {
              questionId: true,
              selectedOptionId: true,
            },
          },
        },
      });

      if (!examAttempt) {
        throw new CustomError('Examen no encontrado', 404, 'EXAM_NOT_FOUND');
      }

      // Obtener preguntas para este examen
      const conditions: any[] = [];
      if (examAttempt.subjectIds?.length) {
        conditions.push({ subjectId: { in: examAttempt.subjectIds } });
      }
      if (examAttempt.careerIds?.length) {
        conditions.push({ careerId: { in: examAttempt.careerIds } });
      }

      const whereClause: any = {
        isActive: true,
        universityId: examAttempt.universityId,
        ...(conditions.length > 0 ? { OR: conditions } : {}),
      };

      if (examAttempt.difficulty) {
        whereClause.difficulty = examAttempt.difficulty;
      }

      const questions = await prisma.question.findMany({
        where: whereClause,
        include: {
          options: {
            select: {
              id: true,
              text: true,
              orderIndex: true,
              isCorrect: true,
            },
            orderBy: { orderIndex: 'asc' },
          },
        },
        take: examAttempt.totalQuestions,
        orderBy: { id: 'asc' },
      });

      // Mezclar y ocultar respuestas correctas
      const shuffled = questions.sort(() => Math.random() - 0.5);
      const questionsForClient = shuffled.map((q) => ({
        id: q.id,
        text: q.text,
        imageUrl: q.imageUrl,
        difficulty: q.difficulty,
        options: q.options.map((o) => ({ 
          id: o.id, 
          text: o.text, 
          orderIndex: o.orderIndex 
        })),
      }));

      // Mapear IDs de preguntas respondidas
      const answeredMap: Record<string, string> = {};
      examAttempt.studentAnswers.forEach((sa) => {
        if (sa.selectedOptionId) {
          answeredMap[sa.questionId] = sa.selectedOptionId;
        }
      });

      return {
        examAttempt: {
          id: examAttempt.id,
          status: examAttempt.status,
          totalQuestions: examAttempt.totalQuestions,
          correctAnswers: examAttempt.correctAnswers,
          startedAt: examAttempt.startedAt,
          university: examAttempt.university,
          subjectIds: examAttempt.subjectIds,
          careerIds: examAttempt.careerIds,
          difficulty: examAttempt.difficulty,
        },
        questions: questionsForClient,
        answeredMap,
      };
    } catch (error) {
      logError('Get exam attempt service error', error);
      throw error;
    }
  }

  async answerQuestion(examAttemptId: string, userId: string, questionId: string, selectedOptionId: string) {
    try {
      if (!questionId || !selectedOptionId) {
        throw new CustomError('Faltan parámetros', 400, 'MISSING_PARAMS');
      }

      // Verificar que el intento de examen pertenezca al usuario y esté en progreso
      const examAttempt = await prisma.examAttempt.findFirst({
        where: { id: examAttemptId, userId, status: 'IN_PROGRESS' },
      });

      if (!examAttempt) {
        throw new CustomError('Examen no encontrado o ya terminado', 404, 'EXAM_NOT_FOUND');
      }

      const question = await prisma.question.findUnique({
        where: { id: questionId },
        include: { options: true },
      });

      if (!question) {
        throw new CustomError('Pregunta no encontrada', 404, 'QUESTION_NOT_FOUND');
      }

      const selectedOption = question.options.find((o) => o.id === selectedOptionId);
      const isCorrect = selectedOption?.isCorrect || false;

      // Registrar o actualizar respuesta
      const studentAnswer = await prisma.studentAnswer.upsert({
        where: {
          examAttemptId_questionId: { examAttemptId, questionId },
        },
        create: {
          examAttemptId,
          questionId,
          selectedOptionId,
          isCorrect,
        },
        update: {
          selectedOptionId,
          isCorrect,
        },
      });

      return {
        questionId,
        selectedOptionId,
        isCorrect,
      };
    } catch (error) {
      logError('Answer question service error', error);
      throw error;
    }
  }

  async completeExam(examAttemptId: string, userId: string): Promise<ExamCompleteResponse> {
    try {
      const examAttempt = await prisma.examAttempt.findFirst({
        where: { id: examAttemptId, userId, status: 'IN_PROGRESS' },
        include: {
          studentAnswers: true,
          university: true,
        },
      });

      if (!examAttempt) {
        throw new CustomError('Examen no encontrado o ya terminado', 404, 'EXAM_NOT_FOUND');
      }

      const correctAnswers = examAttempt.studentAnswers.filter((a) => a.isCorrect).length;
      const totalQuestions = examAttempt.totalQuestions;
      const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

      const updated = await prisma.examAttempt.update({
        where: { id: examAttemptId },
        data: {
          status: 'COMPLETED',
          score,
          correctAnswers,
          completedAt: new Date(),
        },
        include: {
          university: true,
          studentAnswers: {
            include: {
              question: {
                include: {
                  options: {
                    select: {
                      id: true,
                      text: true,
                      orderIndex: true,
                      isCorrect: true,
                    },
                  },
                },
              },
              selectedOption: true,
            },
          },
        },
      });

      logInfo('Exam completed', { examAttemptId, score, correctAnswers, totalQuestions });

      const answers = updated.studentAnswers.map((a) => ({
        questionId: a.questionId,
        selectedOptionId: a.selectedOptionId,
        isCorrect: a.isCorrect,
      }));

      const questions = updated.studentAnswers.map((a) => ({
        id: a.question.id,
        text: a.question.text,
        imageUrl: a.question.imageUrl,
        difficulty: a.question.difficulty,
        options: a.question.options,
        explanation: a.question.explanation,
      }));

      return {
        examAttempt: {
          id: updated.id,
          status: updated.status,
          score: updated.score,
          totalQuestions: updated.totalQuestions,
          correctAnswers: updated.correctAnswers,
          startedAt: updated.startedAt,
          completedAt: updated.completedAt,
          university: updated.university,
        },
        answers,
        questions,
      };
    } catch (error) {
      logError('Complete exam service error', error);
      throw error;
    }
  }

  async abandonExam(examAttemptId: string, userId: string) {
    try {
      const examAttempt = await prisma.examAttempt.findFirst({
        where: { id: examAttemptId, userId, status: 'IN_PROGRESS' },
      });

      if (!examAttempt) {
        throw new CustomError('Examen no encontrado', 404, 'EXAM_NOT_FOUND');
      }

      await prisma.examAttempt.update({
        where: { id: examAttemptId },
        data: { status: 'ABANDONED' },
      });

      return { success: true };
    } catch (error) {
      logError('Abandon exam service error', error);
      throw error;
    }
  }

  async getExamHistory(userId: string) {
    try {
      const attempts = await prisma.examAttempt.findMany({
        where: { userId, status: { in: ['COMPLETED', 'ABANDONED'] } },
        include: {
          university: true,
          studentAnswers: true,
        },
        orderBy: { startedAt: 'desc' },
        take: 20,
      });

      return attempts.map((a) => ({
        examAttempt: {
          id: a.id,
          status: a.status,
          score: a.score,
          totalQuestions: a.totalQuestions,
          correctAnswers: a.correctAnswers,
          startedAt: a.startedAt,
          completedAt: a.completedAt,
          university: a.university,
          subjectIds: a.subjectIds,
          careerIds: a.careerIds,
          difficulty: a.difficulty,
        },
        answers: a.studentAnswers.map((sa) => ({
          questionId: sa.questionId,
          selectedOptionId: sa.selectedOptionId,
          isCorrect: sa.isCorrect,
        })),
      }));
    } catch (error) {
      logError('Get exam history service error', error);
      throw error;
    }
  }
}

export const examService = new ExamService();