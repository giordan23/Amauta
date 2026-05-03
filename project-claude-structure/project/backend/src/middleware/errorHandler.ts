import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'

export interface ApiError extends Error {
  statusCode?: number
  code?: string
}

// Middleware global de manejo de errores
export const errorHandler = (
  error: Error | ApiError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
    body: req.body
  })

  // Error de validación Zod
  if (error instanceof ZodError) {
    res.status(400).json({
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        value: err.input
      }))
    })
    return
  }

  // Errores de Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': // Unique constraint violation
        res.status(409).json({
          error: 'Resource already exists',
          code: 'DUPLICATE_RESOURCE',
          field: error.meta?.target
        })
        return

      case 'P2025': // Record not found
        res.status(404).json({
          error: 'Resource not found',
          code: 'NOT_FOUND'
        })
        return

      case 'P2003': // Foreign key constraint violation
        res.status(400).json({
          error: 'Invalid reference',
          code: 'INVALID_REFERENCE',
          field: error.meta?.field_name
        })
        return

      default:
        res.status(500).json({
          error: 'Database error',
          code: 'DATABASE_ERROR'
        })
        return
    }
  }

  // Error personalizado con statusCode
  if ('statusCode' in error && error.statusCode) {
    res.status(error.statusCode).json({
      error: error.message,
      code: (error as ApiError).code || 'API_ERROR'
    })
    return
  }

  // Error genérico del servidor
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : error.message,
    code: 'INTERNAL_SERVER_ERROR'
  })
}

// Middleware para rutas no encontradas
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    error: `Route ${req.method} ${req.path} not found`,
    code: 'ROUTE_NOT_FOUND'
  })
}

// Helper para crear errores personalizados
export class CustomError extends Error {
  statusCode: number
  code: string

  constructor(message: string, statusCode: number = 500, code: string = 'CUSTOM_ERROR') {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.name = 'CustomError'
  }
}

// Helpers específicos para errores comunes
export const createNotFoundError = (resource: string, id?: string): CustomError => {
  const message = id 
    ? `${resource} with id '${id}' not found`
    : `${resource} not found`
  return new CustomError(message, 404, 'NOT_FOUND')
}

export const createValidationError = (message: string): CustomError => {
  return new CustomError(message, 400, 'VALIDATION_ERROR')
}

export const createUnauthorizedError = (message: string = 'Unauthorized'): CustomError => {
  return new CustomError(message, 401, 'UNAUTHORIZED')
}

export const createForbiddenError = (message: string = 'Forbidden'): CustomError => {
  return new CustomError(message, 403, 'FORBIDDEN')
}