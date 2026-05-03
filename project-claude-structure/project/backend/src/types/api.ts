import { z } from 'zod'

// ==========================================
// AUTH TYPES
// ==========================================

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional()
})

export type LoginRequest = z.infer<typeof loginSchema>
export type RegisterRequest = z.infer<typeof registerSchema>

// ==========================================
// USER TYPES  
// ==========================================

export const updateUserProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  targetUniversityId: z.string().optional()
})

export const completeOnboardingSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  targetUniversityId: z.string().min(1, 'Target university is required'),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional()
})

export type UpdateUserProfileRequest = z.infer<typeof updateUserProfileSchema>
export type CompleteOnboardingRequest = z.infer<typeof completeOnboardingSchema>

// ==========================================
// UNIVERSITY TYPES
// ==========================================

export const createUniversitySchema = z.object({
  name: z.string().min(1, 'University name is required'),
  shortName: z.string().min(1, 'Short name is required'),
  city: z.string().min(1, 'City is required'),
  region: z.string().min(1, 'Region is required'),
  country: z.string().default('Peru')
})

export const updateUniversitySchema = createUniversitySchema.partial()

export type CreateUniversityRequest = z.infer<typeof createUniversitySchema>
export type UpdateUniversityRequest = z.infer<typeof updateUniversitySchema>

// ==========================================
// SUBJECT TYPES
// ==========================================

export const createSubjectSchema = z.object({
  name: z.string().min(1, 'Subject name is required'),
  description: z.string().optional()
})

export const updateSubjectSchema = createSubjectSchema.partial()

export type CreateSubjectRequest = z.infer<typeof createSubjectSchema>
export type UpdateSubjectRequest = z.infer<typeof updateSubjectSchema>

// ==========================================
// CAREER TYPES
// ==========================================

export const createCareerSchema = z.object({
  name: z.string().min(1, 'Career name is required')
})

export const updateCareerSchema = createCareerSchema.partial()

export type CreateCareerRequest = z.infer<typeof createCareerSchema>
export type UpdateCareerRequest = z.infer<typeof updateCareerSchema>

// ==========================================
// QUESTION TYPES
// ==========================================

export const difficultyLevelSchema = z.enum(['EASY', 'MEDIUM', 'HARD'])

export const questionOptionSchema = z.object({
  text: z.string().min(1, 'Option text is required'),
  isCorrect: z.boolean().default(false),
  orderIndex: z.number().min(0).max(4) // A=0, B=1, C=2, D=3, E=4
})

export const createQuestionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  imageUrl: z.string().url('Invalid image URL').optional(),
  difficulty: difficultyLevelSchema,
  examYear: z.number().min(2000).max(2030).optional(),
  examPeriod: z.string().optional(),
  explanation: z.string().optional(),
  universityId: z.string().min(1, 'University ID is required'),
  subjectId: z.string().min(1, 'Subject ID is required'),
  careerId: z.string().min(1, 'Career ID is required'),
  options: z.array(questionOptionSchema)
    .min(2, 'At least 2 options required')
    .max(5, 'Maximum 5 options allowed')
    .refine(
      (options) => options.filter(opt => opt.isCorrect).length === 1,
      'Exactly one option must be marked as correct'
    )
})

export const updateQuestionSchema = createQuestionSchema.partial().extend({
  options: z.array(questionOptionSchema.extend({
    id: z.string().optional() // Para actualizar opciones existentes
  })).optional()
})

export type CreateQuestionRequest = z.infer<typeof createQuestionSchema>
export type UpdateQuestionRequest = z.infer<typeof updateQuestionSchema>
export type QuestionOption = z.infer<typeof questionOptionSchema>

// ==========================================
// EXAM ATTEMPT TYPES
// ==========================================

export const examAttemptStatusSchema = z.enum(['IN_PROGRESS', 'COMPLETED', 'ABANDONED'])

export const createExamAttemptSchema = z.object({
  universityId: z.string().min(1, 'University ID is required'),
  subjectIds: z.array(z.string()).min(1, 'At least one subject required'),
  careerIds: z.array(z.string()).min(1, 'At least one career required'),
  difficulty: difficultyLevelSchema.optional(),
  examYears: z.array(z.number()).optional(),
  totalQuestions: z.number().min(1).max(100)
})

export const submitAnswerSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  selectedOptionId: z.string().min(1, 'Selected option ID is required')
})

export const completeExamSchema = z.object({
  examAttemptId: z.string().min(1, 'Exam attempt ID is required')
})

export type CreateExamAttemptRequest = z.infer<typeof createExamAttemptSchema>
export type SubmitAnswerRequest = z.infer<typeof submitAnswerSchema>
export type CompleteExamRequest = z.infer<typeof completeExamSchema>

// ==========================================
// RESPONSE TYPES
// ==========================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  code?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// ==========================================
// QUERY FILTERS
// ==========================================

export const questionFiltersSchema = z.object({
  universityId: z.string().optional(),
  subjectId: z.string().optional(),
  careerId: z.string().optional(),
  difficulty: difficultyLevelSchema.optional(),
  examYear: z.coerce.number().optional(),
  examPeriod: z.string().optional(),
  search: z.string().optional()
})

export type QuestionFilters = z.infer<typeof questionFiltersSchema>