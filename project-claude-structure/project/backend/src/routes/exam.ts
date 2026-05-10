import express from 'express';
import { authenticateToken } from '@/middleware/auth';
import { prisma } from '@/utils/database';
import { logInfo, logError } from '@/utils/logger';
import { CustomError } from '@/middleware/errorHandler';

const router = express.Router();

// Apply auth middleware to all exam routes
router.use(authenticateToken);

// Start a new exam attempt
router.post('/start', async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const { universityId, subjectIds, careerIds, difficulty, questionCount = 10 } = req.body;

    if (!universityId) {
      throw new CustomError('Universidad requerida', 400, 'MISSING_UNIVERSITY');
    }

    // Si careerIds viene vacío, usar targetCareer del usuario
    let examCareerIds = careerIds && careerIds.length > 0 ? careerIds : [];
    
    // Si no hay careerIds, verificar si el usuario tiene targetCareer
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

    // Validar que tengamos配置
    if (!universityId || examSubjectIds.length === 0 || examCareerIds.length === 0) {
      throw new CustomError('Faltan parámetros requeridos para el examen', 400, 'MISSING_PARAMS');
    }

    // Get random questions based on filters
    // OR logic: question matches if it belongs to ANY selected subject OR ANY selected career
    const whereClause: any = {
      isActive: true,
      universityId,
    };

    // Match subject OR career (liberal matching)
    if (examSubjectIds.length > 0 && examCareerIds.length > 0) {
      whereClause.OR = [
        { subjectId: { in: examSubjectIds } },
        { careerId: { in: examCareerIds } },
      ];
    } else if (examSubjectIds.length > 0) {
      whereClause.subjectId = { in: examSubjectIds };
    } else if (examCareerIds.length > 0) {
      whereClause.careerId = { in: examCareerIds };
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

    // Shuffle questions
    const shuffled = questions.sort(() => Math.random() - 0.5);

    // Hide correct answers from client
    const questionsForClient = shuffled.map((q) => ({
      ...q,
      options: q.options.map((o) => ({ ...o, isCorrect: undefined })),
    }));

    // Create exam attempt
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

    res.status(201).json({
      success: true,
      data: {
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
      },
    });
  } catch (error) {
    logError('Start exam error', error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ success: false, error: error.message, code: error.code });
    } else {
      res.status(500).json({ success: false, error: 'Error al iniciar el examen', code: 'START_EXAM_ERROR' });
    }
  }
});

// Get exam attempt with questions (for in-progress exams)
router.get('/:examAttemptId', async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const { examAttemptId } = req.params;

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

    // Get questions for this exam (from subjectIds/careerIds/difficulty)
    const whereClause: any = {
      isActive: true,
      universityId: examAttempt.universityId,
      subjectId: { in: examAttempt.subjectIds },
      careerId: { in: examAttempt.careerIds },
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

    // Shuffle and hide correct answers
    const shuffled = questions.sort(() => Math.random() - 0.5);
    const questionsForClient = shuffled.map((q) => ({
      id: q.id,
      text: q.text,
      imageUrl: q.imageUrl,
      difficulty: q.difficulty,
      options: q.options.map((o) => ({ id: o.id, text: o.text, orderIndex: o.orderIndex, isCorrect: undefined })),
    }));

    // Map answered question IDs
    const answeredMap: Record<string, string> = {};
    examAttempt.studentAnswers.forEach((sa) => {
      if (sa.selectedOptionId) {
        answeredMap[sa.questionId] = sa.selectedOptionId;
      }
    });

    res.json({
      success: true,
      data: {
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
      },
    });
  } catch (error) {
    logError('Get exam error', error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ success: false, error: error.message, code: error.code });
    } else {
      res.status(500).json({ success: false, error: 'Error al obtener el examen', code: 'GET_EXAM_ERROR' });
    }
  }
});

// Answer a question
router.post('/:examAttemptId/answer', async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const { examAttemptId } = req.params;
    const { questionId, selectedOptionId } = req.body;

    if (!questionId || !selectedOptionId) {
      throw new CustomError('Faltan parámetros', 400, 'MISSING_PARAMS');
    }

    // Verify exam attempt belongs to user and is in progress
    const examAttempt = await prisma.examAttempt.findFirst({
      where: { id: examAttemptId, userId, status: 'IN_PROGRESS' },
    });

    if (!examAttempt) {
      throw new CustomError('Examen no encontrado o ya terminado', 404, 'EXAM_NOT_FOUND');
    }

    // Check if question belongs to this exam's questions (via the exam attempt)
    // For now, we just record the answer
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { options: true },
    });

    if (!question) {
      throw new CustomError('Pregunta no encontrada', 404, 'QUESTION_NOT_FOUND');
    }

    const selectedOption = question.options.find((o) => o.id === selectedOptionId);
    const isCorrect = selectedOption?.isCorrect || false;

    // Record or update answer
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

    res.json({
      success: true,
      data: {
        questionId,
        selectedOptionId,
        isCorrect,
      },
    });
  } catch (error) {
    logError('Answer question error', error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ success: false, error: error.message, code: error.code });
    } else {
      res.status(500).json({ success: false, error: 'Error al registrar respuesta', code: 'ANSWER_ERROR' });
    }
  }
});

// Complete exam
router.post('/:examAttemptId/complete', async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const { examAttemptId } = req.params;

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

    // Format answers for client (hide correct unless answered wrong)
    const answers = updated.studentAnswers.map((a) => ({
      questionId: a.questionId,
      selectedOptionId: a.selectedOptionId,
      isCorrect: a.isCorrect,
    }));

    // Include questions with correct answers for review
    const questions = updated.studentAnswers.map((a) => ({
      id: a.question.id,
      text: a.question.text,
      imageUrl: a.question.imageUrl,
      difficulty: a.question.difficulty,
      options: a.question.options,
      explanation: a.question.explanation,
    }));

    res.json({
      success: true,
      data: {
        examAttempt: {
          id: updated.id,
          status: updated.status,
          score: updated.score,
          totalQuestions: updated.totalQuestions,
          correctAnswers: updated.correctAnswers,
          startedAt: updated.startedAt,
          completedAt: updated.completedAt,
          university: updated.university,
          subjectIds: updated.subjectIds,
          careerIds: updated.careerIds,
          difficulty: updated.difficulty,
        },
        answers,
        questions,
      },
    });
  } catch (error) {
    logError('Complete exam error', error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ success: false, error: error.message, code: error.code });
    } else {
      res.status(500).json({ success: false, error: 'Error al completar el examen', code: 'COMPLETE_EXAM_ERROR' });
    }
  }
});

// Abandon exam
router.post('/:examAttemptId/abandon', async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const { examAttemptId } = req.params;

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

    res.json({ success: true });
  } catch (error) {
    logError('Abandon exam error', error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ success: false, error: error.message, code: error.code });
    } else {
      res.status(500).json({ success: false, error: 'Error al abandonar el examen', code: 'ABANDON_EXAM_ERROR' });
    }
  }
});

// Get exam history
router.get('/history', async (req: any, res: any) => {
  try {
    const userId = req.user.id;

    const attempts = await prisma.examAttempt.findMany({
      where: { userId, status: { in: ['COMPLETED', 'ABANDONED'] } },
      include: {
        university: true,
        studentAnswers: true,
      },
      orderBy: { startedAt: 'desc' },
      take: 20,
    });

    const history = attempts.map((a) => ({
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

    res.json({ success: true, data: history });
  } catch (error) {
    logError('Get exam history error', error);
    res.status(500).json({ success: false, error: 'Error al obtener historial', code: 'HISTORY_ERROR' });
  }
});

export default router;
