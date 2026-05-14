import { z } from 'zod';

export interface Subject {
  id: string;
  name: string;
  description?: string;
}

export interface Career {
  id: string;
  name: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  city: string;
  region: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  orderIndex: number;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  imageUrl?: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  options: QuestionOption[];
  explanation?: string;
}

export interface ExamAttempt {
  id: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  score?: number;
  totalQuestions: number;
  correctAnswers: number;
  startedAt: string;
  completedAt?: string;
  universityId: string;
  university: University;
  subjectIds: string[];
  careerIds: string[];
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface ExamConfig {
  universityId: string;
  subjectIds?: string[];
  careerIds?: string[];
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  questionCount: number;
}

export interface ExamAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

export interface ExamStartResponse {
  examAttempt: ExamAttempt;
  questions: Question[];
}

export interface ExamResultResponse {
  examAttempt: ExamAttempt;
  answers: ExamAnswer[];
  questions: Question[];
}

export const examConfigSchema = z.object({
  universityId: z.string().min(1, 'Selecciona una universidad'),
  subjectIds: z.array(z.string()).optional(),
  careerIds: z.array(z.string()).optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
  questionCount: z.number().min(5).max(50).default(10),
});

export type ExamConfigFormData = z.infer<typeof examConfigSchema>;
