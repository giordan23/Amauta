import { Request, Response, NextFunction } from 'express'
import { ZodSchema, z } from 'zod'

// Middleware genérico para validación con Zod
export const validateBody = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      next(error) // Se maneja en errorHandler
    }
  }
}

export const validateQuery = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query)
      next()
    } catch (error) {
      next(error)
    }
  }
}

export const validateParams = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.params = schema.parse(req.params)
      next()
    } catch (error) {
      next(error)
    }
  }
}

// Schemas comunes
export const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required')
})

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional()
})

export const uuidParamSchema = z.object({
  id: z.string().uuid('Invalid UUID format')
})