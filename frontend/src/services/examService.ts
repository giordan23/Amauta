import { api } from './api';

export interface ExamStartResponse {
  examAttempt: {
    id: string;
    status: string;
    totalQuestions: number;
    startedAt: string;
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
    startedAt: string;
    completedAt: string;
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
    options: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
    }>;
  }>;
}

export const examService = {
  // Start a new exam with 100 random questions
  startExam: async (universityId: string, questionCount = 100): Promise<ExamStartResponse> => {
    const response = await api.post('exam/start', {
      json: {
        universityId,
        questionCount,
        // No subjectIds means get any questions
        // careerIds empty will use user's targetCareer if available
      }
    }).json<{ success: true; data: ExamStartResponse } | { success: false; error: string; code: string }>();

    if (!response.success) {
      throw new Error(response.error || 'Error al iniciar el examen');
    }

    return response.data;
  },

  // Get an existing exam attempt
  getExam: async (examAttemptId: string) => {
    const response = await api.get(`exam/${examAttemptId}`).json<{ success: true; data: any }>();
    return response;
  },

  // Answer a question
  answerQuestion: async (examAttemptId: string, questionId: string, selectedOptionId: string) => {
    const response = await api.post(`exam/${examAttemptId}/answer`, {
      json: { questionId, selectedOptionId }
    }).json<{ success: true; data: { questionId: string; selectedOptionId: string; isCorrect: boolean } }>();
    return response;
  },

  // Complete an exam and get results
  completeExam: async (examAttemptId: string): Promise<ExamCompleteResponse> => {
    const response = await api.post(`exam/${examAttemptId}/complete`).json<{ success: true; data: ExamCompleteResponse }>();
    return response.data;
  },

  // Abandon an exam
  abandonExam: async (examAttemptId: string) => {
    const response = await api.post(`exam/${examAttemptId}/abandon`).json<{ success: true }>();
    return response;
  },

  // Get exam history
  getHistory: async () => {
    const response = await api.get('exam/history').json<{ success: true; data: any[] }>();
    return response;
  },
};