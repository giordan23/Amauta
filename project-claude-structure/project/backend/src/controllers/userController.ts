import { Request, Response } from 'express'
import { prisma } from '@/utils/database'
import { 
  updateUserProfileSchema, 
  completeOnboardingSchema,
  type UpdateUserProfileRequest,
  type CompleteOnboardingRequest 
} from '@/types/api'
import { logInfo, logError } from '@/utils/logger'
import { CustomError } from '@/middleware/errorHandler'

class UserController {
  // Update user profile
  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new CustomError('User not authenticated', 401, 'NOT_AUTHENTICATED')
      }

      const validatedData: UpdateUserProfileRequest = updateUserProfileSchema.parse(req.body)

      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          ...validatedData,
          updatedAt: new Date()
        },
        include: {
          targetUniversity: true
        }
      })

      logInfo('User profile updated', { userId: updatedUser.id, fields: Object.keys(validatedData) })

      res.json({
        data: {
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            country: updatedUser.country,
            hasCompletedOnboarding: updatedUser.hasCompletedOnboarding,
            targetUniversity: updatedUser.targetUniversity,
            updatedAt: updatedUser.updatedAt
          }
        },
        error: null
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          data: null,
          error: { code: error.code, message: error.message }
        })
      } else {
        logError('Update profile error', error)
        res.status(500).json({
          data: null,
          error: { code: 'UPDATE_PROFILE_ERROR', message: 'Failed to update profile' }
        })
      }
    }
  }

  // Complete onboarding process
  async completeOnboarding(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new CustomError('User not authenticated', 401, 'NOT_AUTHENTICATED')
      }

      const validatedData: CompleteOnboardingRequest = completeOnboardingSchema.parse(req.body)
      const { country, targetUniversityId, firstName, lastName } = validatedData

      // Verify university exists
      const university = await prisma.university.findUnique({
        where: { id: targetUniversityId }
      })

      if (!university) {
        throw new CustomError('Invalid university selected', 400, 'INVALID_UNIVERSITY')
      }

      // Update user with onboarding data
      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          country,
          targetUniversityId,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          hasCompletedOnboarding: true,
          updatedAt: new Date()
        },
        include: {
          targetUniversity: true
        }
      })

      logInfo('User completed onboarding', { 
        userId: updatedUser.id, 
        country: updatedUser.country,
        university: university.name 
      })

      res.json({
        data: {
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            country: updatedUser.country,
            hasCompletedOnboarding: updatedUser.hasCompletedOnboarding,
            targetUniversity: updatedUser.targetUniversity,
            updatedAt: updatedUser.updatedAt
          }
        },
        error: null
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          data: null,
          error: { code: error.code, message: error.message }
        })
      } else {
        logError('Complete onboarding error', error)
        res.status(500).json({
          data: null,
          error: { code: 'ONBOARDING_ERROR', message: 'Failed to complete onboarding' }
        })
      }
    }
  }

  // Get user's exam history
  async getExamHistory(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new CustomError('User not authenticated', 401, 'NOT_AUTHENTICATED')
      }

      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 10
      const offset = (page - 1) * limit

      const [examAttempts, total] = await Promise.all([
        prisma.examAttempt.findMany({
          where: { userId: req.user.id },
          include: {
            university: true,
            studentAnswers: {
              include: {
                question: {
                  include: {
                    subject: true
                  }
                },
                selectedOption: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          skip: offset,
          take: limit
        }),
        prisma.examAttempt.count({
          where: { userId: req.user.id }
        })
      ])

      const totalPages = Math.ceil(total / limit)

      res.json({
        success: true,
        data: {
          examAttempts: examAttempts.map(attempt => ({
            id: attempt.id,
            status: attempt.status,
            score: attempt.score,
            totalQuestions: attempt.totalQuestions,
            correctAnswers: attempt.correctAnswers,
            university: attempt.university,
            startedAt: attempt.startedAt,
            completedAt: attempt.completedAt,
            answersCount: attempt.studentAnswers.length
          })),
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        }
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code
        })
      } else {
        logError('Get exam history error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to get exam history',
          code: 'EXAM_HISTORY_ERROR'
        })
      }
    }
  }

  // Get user statistics
  async getStatistics(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new CustomError('User not authenticated', 401, 'NOT_AUTHENTICATED')
      }

      const [
        totalExams,
        completedExams,
        averageScore,
        subjectStats
      ] = await Promise.all([
        // Total exam attempts
        prisma.examAttempt.count({
          where: { userId: req.user.id }
        }),

        // Completed exams
        prisma.examAttempt.count({
          where: { 
            userId: req.user.id,
            status: 'COMPLETED'
          }
        }),

        // Average score
        prisma.examAttempt.aggregate({
          where: { 
            userId: req.user.id,
            status: 'COMPLETED',
            score: { not: null }
          },
          _avg: { score: true }
        }),

        // Subject performance
        prisma.studentAnswer.groupBy({
          by: ['questionId'],
          where: {
            examAttempt: {
              userId: req.user.id,
              status: 'COMPLETED'
            }
          },
          _sum: {
            isCorrect: true
          },
          _count: true
        })
      ])

      res.json({
        success: true,
        data: {
          totalExams,
          completedExams,
          averageScore: averageScore._avg.score || 0,
          completionRate: totalExams > 0 ? (completedExams / totalExams) * 100 : 0,
          totalQuestionsAnswered: subjectStats.reduce((sum, stat) => sum + stat._count, 0),
          totalCorrectAnswers: subjectStats.reduce((sum, stat) => sum + (stat._sum.isCorrect || 0), 0)
        }
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code
        })
      } else {
        logError('Get statistics error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to get statistics',
          code: 'STATISTICS_ERROR'
        })
      }
    }
  }

  // Delete user account (soft delete by deactivating)
  async deleteAccount(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new CustomError('User not authenticated', 401, 'NOT_AUTHENTICATED')
      }

      // In a real app, you might want to soft delete or anonymize data
      // For now, we'll just mark the user as inactive by updating email
      const timestamp = Date.now()
      await prisma.user.update({
        where: { id: req.user.id },
        data: {
          email: `deleted_${timestamp}@deleted.local`,
          firstName: null,
          lastName: null,
          country: null,
          targetUniversityId: null,
          hasCompletedOnboarding: false
        }
      })

      logInfo('User account deleted', { userId: req.user.id })

      res.json({
        success: true,
        message: 'Account deleted successfully'
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code
        })
      } else {
        logError('Delete account error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to delete account',
          code: 'DELETE_ACCOUNT_ERROR'
        })
      }
    }
  }
}

export default new UserController()