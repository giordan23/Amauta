import { Request, Response } from 'express'
import { prisma } from '@/utils/database'
import { 
  createCareerSchema,
  updateCareerSchema,
  type CreateCareerRequest,
  type UpdateCareerRequest 
} from '@/types/api'
import { logInfo, logError } from '@/utils/logger'
import { CustomError } from '@/middleware/errorHandler'

class CareerController {
  // Get all careers
  async getCareers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 50
      const search = req.query.search as string
      const offset = (page - 1) * limit

      const where = {
        isActive: true,
        ...(search && {
          name: { contains: search, mode: 'insensitive' as const }
        })
      }

      const [careers, total] = await Promise.all([
        prisma.career.findMany({
          where,
          select: {
            id: true,
            name: true,
            isActive: true,
            createdAt: true,
            _count: {
              select: {
                questions: {
                  where: {
                    isActive: true
                  }
                }
              }
            }
          },
          orderBy: { name: 'asc' },
          skip: offset,
          take: limit
        }),
        prisma.career.count({ where })
      ])

      const totalPages = Math.ceil(total / limit)

      res.json({
        success: true,
        data: {
          careers: careers.map(career => ({
            id: career.id,
            name: career.name,
            isActive: career.isActive,
            createdAt: career.createdAt,
            questionsCount: career._count.questions
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
      logError('Get careers error', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get careers',
        code: 'GET_CAREERS_ERROR'
      })
    }
  }

  // Get career by ID
  async getCareerById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const career = await prisma.career.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              questions: {
                where: {
                  isActive: true
                }
              }
            }
          }
        }
      })

      if (!career) {
        throw new CustomError('Career not found', 404, 'CAREER_NOT_FOUND')
      }

      res.json({
        success: true,
        data: {
          career: {
            id: career.id,
            name: career.name,
            isActive: career.isActive,
            createdAt: career.createdAt,
            updatedAt: career.updatedAt,
            questionsCount: career._count.questions
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
        logError('Get career error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to get career',
          code: 'GET_CAREER_ERROR'
        })
      }
    }
  }

  // Create career (Admin only)
  async createCareer(req: Request, res: Response): Promise<void> {
    try {
      const validatedData: CreateCareerRequest = createCareerSchema.parse(req.body)

      const career = await prisma.career.create({
        data: {
          ...validatedData,
          isActive: true
        }
      })

      logInfo('Career created', { careerId: career.id, name: career.name })

      res.status(201).json({
        success: true,
        message: 'Career created successfully',
        data: { career }
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code
        })
      } else {
        logError('Create career error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to create career',
          code: 'CREATE_CAREER_ERROR'
        })
      }
    }
  }

  // Update career (Admin only)
  async updateCareer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const validatedData: UpdateCareerRequest = updateCareerSchema.parse(req.body)

      const career = await prisma.career.update({
        where: { id },
        data: {
          ...validatedData,
          updatedAt: new Date()
        }
      })

      logInfo('Career updated', { careerId: career.id, fields: Object.keys(validatedData) })

      res.json({
        success: true,
        message: 'Career updated successfully',
        data: { career }
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code
        })
      } else {
        logError('Update career error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to update career',
          code: 'UPDATE_CAREER_ERROR'
        })
      }
    }
  }

  // Delete career (Admin only - soft delete)
  async deleteCareer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      // Check if career has questions
      const questionCount = await prisma.question.count({
        where: { careerId: id, isActive: true }
      })

      if (questionCount > 0) {
        throw new CustomError(
          'Cannot delete career with existing questions. Set as inactive instead.',
          400,
          'CAREER_HAS_QUESTIONS'
        )
      }

      // Soft delete by marking as inactive
      const career = await prisma.career.update({
        where: { id },
        data: { 
          isActive: false,
          updatedAt: new Date()
        }
      })

      logInfo('Career deleted (soft)', { careerId: career.id })

      res.json({
        success: true,
        message: 'Career deleted successfully',
        data: { career }
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code
        })
      } else {
        logError('Delete career error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to delete career',
          code: 'DELETE_CAREER_ERROR'
        })
      }
    }
  }
}

export default new CareerController()