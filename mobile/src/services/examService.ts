import { api } from './api';
import { ExamConfig, ExamStartResponse, ExamResultResponse, ExamAnswer, ExamAttempt, Question } from '@/types/exam';

export const examService = {
  startExam: async (config: ExamConfig): Promise<ExamStartResponse> => {
    const response = await api.post<
      { data: ExamStartResponse; error: null } | { data: null; error: { code: string; message: string } }
    >('/exam/start', config);

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    if (!response.data.data) {
      throw new Error('Error al iniciar el examen');
    }
    return response.data.data;
  },

  answerQuestion: async (
    examAttemptId: string,
    questionId: string,
    selectedOptionId: string
  ): Promise<ExamAnswer> => {
    const response = await api.post<
      { data: ExamAnswer; error: null } | { data: null; error: { code: string; message: string } }
    >(`/exam/${examAttemptId}/answer`, { questionId, selectedOptionId });

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    if (!response.data.data) {
      throw new Error('Error al registrar la respuesta');
    }
    return response.data.data;
  },

  completeExam: async (examAttemptId: string): Promise<ExamResultResponse> => {
    const response = await api.post<
      { data: ExamResultResponse; error: null } | { data: null; error: { code: string; message: string } }
    >(`/exam/${examAttemptId}/complete`);

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    if (!response.data.data) {
      throw new Error('Error al completar el examen');
    }
    return response.data.data;
  },

  abandonExam: async (examAttemptId: string): Promise<void> => {
    await api.post(`/exam/${examAttemptId}/abandon`);
  },

  getExamHistory: async (): Promise<ExamResultResponse[]> => {
    const response = await api.get<{
      success: boolean;
      data: ExamResultResponse[];
    }>('/exam/history');

    // Backend returns { success, data: [...] }
    return response.data.data || [];
  },

  getExam: async (examAttemptId: string) => {
    const response = await api.get<{
      success: boolean;
      data: {
        examAttempt: ExamAttempt;
        questions: Question[];
        answeredMap: Record<string, string>;
      };
    }>(`/exam/${examAttemptId}`);

    if (!response.data.data) {
      throw new Error('Examen no encontrado');
    }
    return response.data.data;
  },
};
