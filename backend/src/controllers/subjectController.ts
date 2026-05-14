import { Request, Response } from 'express'
import { prisma } from '@/utils/database'
import { 
  createSubjectSchema,
  updateSubjectSchema,
  type CreateSubjectRequest,
  type UpdateSubjectRequest 
} from '@/types/api'
import { logInfo, logError } from '@/utils/logger'
import { CustomError } from '@/middleware/errorHandler'

class SubjectController {
  // Get all subjects
  async getSubjects(req: Request, res: Response): Promise<void> {
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

      const [subjects, total] = await Promise.all([
        prisma.subject.findMany({
          where,
          select: {
            id: true,
            name: true,
            description: true,
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
        prisma.subject.count({ where })
      ])

      const totalPages = Math.ceil(total / limit)

      res.json({
        success: true,
        data: {
          subjects: subjects.map(subject => ({
            id: subject.id,
            name: subject.name,
            description: subject.description,
            isActive: subject.isActive,
            createdAt: subject.createdAt,
            questionsCount: subject._count.questions
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
      logError('Get subjects error', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get subjects',
        code: 'GET_SUBJECTS_ERROR'
      })
    }
  }

  // Get subject by ID
  async getSubjectById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const subject = await prisma.subject.findUnique({
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

      if (!subject) {
        throw new CustomError('Subject not found', 404, 'SUBJECT_NOT_FOUND')
      }

      res.json({
        success: true,
        data: {
          subject: {
            id: subject.id,
            name: subject.name,
            description: subject.description,
            isActive: subject.isActive,
            createdAt: subject.createdAt,
            updatedAt: subject.updatedAt,
            questionsCount: subject._count.questions
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
        logError('Get subject error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to get subject',
          code: 'GET_SUBJECT_ERROR'
        })
      }
    }
  }

  // Create subject (Admin only)
  async createSubject(req: Request, res: Response): Promise<void> {
    try {
      const validatedData: CreateSubjectRequest = createSubjectSchema.parse(req.body)

      const subject = await prisma.subject.create({
        data: {
          ...validatedData,
          isActive: true
        }
      })

      logInfo('Subject created', { subjectId: subject.id, name: subject.name })

      res.status(201).json({
        success: true,
        message: 'Subject created successfully',
        data: { subject }
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code
        })
      } else {
        logError('Create subject error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to create subject',
          code: 'CREATE_SUBJECT_ERROR'
        })
      }
    }
  }

  // Update subject (Admin only)
  async updateSubject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const validatedData: UpdateSubjectRequest = updateSubjectSchema.parse(req.body)

      const subject = await prisma.subject.update({
        where: { id },
        data: {
          ...validatedData,
          updatedAt: new Date()
        }
      })

      logInfo('Subject updated', { subjectId: subject.id, fields: Object.keys(validatedData) })

      res.json({
        success: true,
        message: 'Subject updated successfully',
        data: { subject }
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code
        })
      } else {
        logError('Update subject error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to update subject',
          code: 'UPDATE_SUBJECT_ERROR'
        })
      }
    }
  }

  // Delete subject (Admin only - soft delete)
  async deleteSubject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      // Check if subject has questions
      const questionCount = await prisma.question.count({
        where: { subjectId: id, isActive: true }
      })

      if (questionCount > 0) {
        throw new CustomError(
          'Cannot delete subject with existing questions. Set as inactive instead.',
          400,
          'SUBJECT_HAS_QUESTIONS'
        )
      }

      // Soft delete by marking as inactive
      const subject = await prisma.subject.update({
        where: { id },
        data: { 
          isActive: false,
          updatedAt: new Date()
        }
      })

      logInfo('Subject deleted (soft)', { subjectId: subject.id })

      res.json({
        success: true,
        message: 'Subject deleted successfully',
        data: { subject }
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code
        })
      } else {
        logError('Delete subject error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to delete subject',
          code: 'DELETE_SUBJECT_ERROR'
        })
      }
    }
  }
}

export default new SubjectController()