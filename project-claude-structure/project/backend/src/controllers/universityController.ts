import { Request, Response } from 'express'
import { prisma } from '@/utils/database'
import { 
  createUniversitySchema,
  updateUniversitySchema,
  type CreateUniversityRequest,
  type UpdateUniversityRequest 
} from '@/types/api'
import { logInfo, logError } from '@/utils/logger'
import { CustomError } from '@/middleware/errorHandler'

class UniversityController {
  // Get all universities
  async getUniversities(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 10
      const search = req.query.search as string
      const offset = (page - 1) * limit

      const where = {
        isActive: true,
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { shortName: { contains: search, mode: 'insensitive' as const } },
            { city: { contains: search, mode: 'insensitive' as const } },
            { region: { contains: search, mode: 'insensitive' as const } }
          ]
        })
      }

      const [universities, total] = await Promise.all([
        prisma.university.findMany({
          where,
          select: {
            id: true,
            name: true,
            shortName: true,
            city: true,
            region: true,
            country: true,
            isActive: true,
            createdAt: true,
            _count: {
              select: {
                questions: true,
                users: true
              }
            }
          },
          orderBy: { name: 'asc' },
          skip: offset,
          take: limit
        }),
        prisma.university.count({ where })
      ])

      const totalPages = Math.ceil(total / limit)

      res.json({
        data: {
          universities: universities.map(uni => ({
            id: uni.id,
            name: uni.name,
            shortName: uni.shortName,
            city: uni.city,
            region: uni.region,
            country: uni.country,
            isActive: uni.isActive,
            createdAt: uni.createdAt,
            questionsCount: uni._count.questions,
            studentsCount: uni._count.users
          })),
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        },
        error: null
      })
    } catch (error) {
      logError('Get universities error', error)
      res.status(500).json({
        data: null,
        error: { code: 'GET_UNIVERSITIES_ERROR', message: 'Failed to get universities' }
      })
    }
  }

  // Get university by ID
  async getUniversityById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const university = await prisma.university.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              questions: true,
              users: true,
              examAttempts: true
            }
          }
        }
      })

      if (!university) {
        throw new CustomError('University not found', 404, 'UNIVERSITY_NOT_FOUND')
      }

      res.json({
        success: true,
        data: {
          university: {
            id: university.id,
            name: university.name,
            shortName: university.shortName,
            city: university.city,
            region: university.region,
            country: university.country,
            isActive: university.isActive,
            createdAt: university.createdAt,
            updatedAt: university.updatedAt,
            questionsCount: university._count.questions,
            studentsCount: university._count.users,
            examAttemptsCount: university._count.examAttempts
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
        logError('Get university error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to get university',
          code: 'GET_UNIVERSITY_ERROR'
        })
      }
    }
  }

  // Create university (Admin only)
  async createUniversity(req: Request, res: Response): Promise<void> {
    try {
      const validatedData: CreateUniversityRequest = createUniversitySchema.parse(req.body)

      const university = await prisma.university.create({
        data: {
          ...validatedData,
          isActive: true
        }
      })

      logInfo('University created', { universityId: university.id, name: university.name })

      res.status(201).json({
        success: true,
        message: 'University created successfully',
        data: { university }
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code
        })
      } else {
        logError('Create university error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to create university',
          code: 'CREATE_UNIVERSITY_ERROR'
        })
      }
    }
  }

  // Update university (Admin only)
  async updateUniversity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const validatedData: UpdateUniversityRequest = updateUniversitySchema.parse(req.body)

      const university = await prisma.university.update({
        where: { id },
        data: {
          ...validatedData,
          updatedAt: new Date()
        }
      })

      logInfo('University updated', { universityId: university.id, fields: Object.keys(validatedData) })

      res.json({
        success: true,
        message: 'University updated successfully',
        data: { university }
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code
        })
      } else {
        logError('Update university error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to update university',
          code: 'UPDATE_UNIVERSITY_ERROR'
        })
      }
    }
  }

  // Delete university (Admin only - soft delete)
  async deleteUniversity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      // Check if university has questions
      const questionCount = await prisma.question.count({
        where: { universityId: id }
      })

      if (questionCount > 0) {
        throw new CustomError(
          'Cannot delete university with existing questions. Set as inactive instead.',
          400,
          'UNIVERSITY_HAS_QUESTIONS'
        )
      }

      // Soft delete by marking as inactive
      const university = await prisma.university.update({
        where: { id },
        data: { 
          isActive: false,
          updatedAt: new Date()
        }
      })

      logInfo('University deleted (soft)', { universityId: university.id })

      res.json({
        success: true,
        message: 'University deleted successfully',
        data: { university }
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code
        })
      } else {
        logError('Delete university error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to delete university',
          code: 'DELETE_UNIVERSITY_ERROR'
        })
      }
    }
  }

  // Get university subjects
  async getUniversitySubjects(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      // Verify university exists
      const university = await prisma.university.findUnique({
        where: { id }
      })

      if (!university) {
        throw new CustomError('University not found', 404, 'UNIVERSITY_NOT_FOUND')
      }

      // Get subjects that have questions for this university
      const subjects = await prisma.subject.findMany({
        where: {
          questions: {
            some: {
              universityId: id
            }
          },
          isActive: true
        },
        select: {
          id: true,
          name: true,
          description: true,
          _count: {
            select: {
              questions: {
                where: {
                  universityId: id,
                  isActive: true
                }
              }
            }
          }
        },
        orderBy: { name: 'asc' }
      })

      res.json({
        success: true,
        data: {
          subjects: subjects.map(subject => ({
            id: subject.id,
            name: subject.name,
            description: subject.description,
            questionsCount: subject._count.questions
          }))
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
        logError('Get university subjects error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to get university subjects',
          code: 'GET_UNIVERSITY_SUBJECTS_ERROR'
        })
      }
    }
  }

  // Get university careers
  async getUniversityCareers(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      // Verify university exists
      const university = await prisma.university.findUnique({
        where: { id }
      })

      if (!university) {
        throw new CustomError('University not found', 404, 'UNIVERSITY_NOT_FOUND')
      }

      // Get careers that have questions for this university
      const careers = await prisma.career.findMany({
        where: {
          questions: {
            some: {
              universityId: id
            }
          },
          isActive: true
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              questions: {
                where: {
                  universityId: id,
                  isActive: true
                }
              }
            }
          }
        },
        orderBy: { name: 'asc' }
      })

      res.json({
        success: true,
        data: {
          careers: careers.map(career => ({
            id: career.id,
            name: career.name,
            questionsCount: career._count.questions
          }))
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
        logError('Get university careers error', error)
        res.status(500).json({
          success: false,
          error: 'Failed to get university careers',
          code: 'GET_UNIVERSITY_CAREERS_ERROR'
        })
      }
    }
  }
}

export default new UniversityController()