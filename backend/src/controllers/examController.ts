import { Request, Response } from 'express';
import { examService } from '@/services/ExamService';
import { logError } from '@/utils/logger';
import { CustomError } from '@/middleware/errorHandler';

interface AuthenticatedRequest extends Request {
  user: { id: string; email: string; aud: string; role?: string };
}

export class ExamController {
  async startExam(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { universityId, subjectIds, careerIds, difficulty, questionCount = 100 } = req.body;

      const result = await examService.startExam(userId, {
        universityId,
        subjectIds,
        careerIds,
        difficulty,
        questionCount,
      });

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      logError('Start exam controller error', error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ 
          success: false, 
          error: error.message, 
          code: error.code 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: 'Error al iniciar el examen', 
          code: 'START_EXAM_ERROR' 
        });
      }
    }
  }

  async getExamHistory(req: AuthenticatedRequest, res: Response) {
    try {
      console.log('[HISTORY] ====== NEW REQUEST ======');
      console.log('[HISTORY] IP:', req.ip, '| Origin:', req.get('Origin'));
      console.log('[HISTORY] Auth header present:', !!req.headers.authorization);
      console.log('[HISTORY] User on request:', req.user);
      
      const userId = req.user?.id;
      if (!userId) {
        console.log('[HISTORY] ERROR: No userId on request - auth middleware may have failed');
        return res.status(401).json({
          data: null,
          error: { code: 'MISSING_TOKEN', message: 'Access token required' }
        });
      }

      console.log('[HISTORY] Looking up exams for userId:', userId);

      const history = await examService.getExamHistory(userId);
      res.json({ success: true, data: history });
    } catch (error) {
      logError('Get exam history controller error', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error al obtener historial', 
        code: 'HISTORY_ERROR' 
      });
    }
  }

  async getExamAttempt(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { examAttemptId } = req.params;

      const result = await examService.getExamAttempt(examAttemptId, userId);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      logError('Get exam controller error', error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ 
          success: false, 
          error: error.message, 
          code: error.code 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: 'Error al obtener el examen', 
          code: 'GET_EXAM_ERROR' 
        });
      }
    }
  }

  async answerQuestion(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { examAttemptId } = req.params;
      const { questionId, selectedOptionId } = req.body;

      const result = await examService.answerQuestion(
        examAttemptId, 
        userId, 
        questionId, 
        selectedOptionId
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      logError('Answer question controller error', error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ 
          success: false, 
          error: error.message, 
          code: error.code 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: 'Error al registrar respuesta', 
          code: 'ANSWER_ERROR' 
        });
      }
    }
  }

  async completeExam(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { examAttemptId } = req.params;

      const result = await examService.completeExam(examAttemptId, userId);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      logError('Complete exam controller error', error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ 
          success: false, 
          error: error.message, 
          code: error.code 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: 'Error al completar el examen', 
          code: 'COMPLETE_EXAM_ERROR' 
        });
      }
    }
  }

  async abandonExam(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { examAttemptId } = req.params;

      const result = await examService.abandonExam(examAttemptId, userId);
      res.json(result);
    } catch (error) {
      logError('Abandon exam controller error', error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ 
          success: false, 
          error: error.message, 
          code: error.code 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: 'Error al abandonar el examen', 
          code: 'ABANDON_EXAM_ERROR' 
        });
      }
    }
  }
}

export const examController = new ExamController();