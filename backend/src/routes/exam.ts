import express from 'express';
import { authenticateToken } from '@/middleware/auth';
import { examController } from '@/controllers/examController';

const router = express.Router();

// Apply auth middleware to all exam routes
router.use(authenticateToken);

// Exam routes
router.post('/start', (req, res) => examController.startExam(req as any, res));
router.get('/history', (req, res) => examController.getExamHistory(req as any, res)); 
router.get('/:examAttemptId', (req, res) => examController.getExamAttempt(req as any, res));
router.post('/:examAttemptId/answer', (req, res) => examController.answerQuestion(req as any, res));
router.post('/:examAttemptId/complete', (req, res) => examController.completeExam(req as any, res));
router.post('/:examAttemptId/abandon', (req, res) => examController.abandonExam(req as any, res));

export default router;
