import { Request, Response, NextFunction } from 'express'
import { supabasePublic } from '@/utils/supabase'
import { prisma } from '@/utils/database'

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        aud: string
        role?: string
      }
    }
  }
}

interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    aud: string
    role?: string
  }
}

// Middleware para validar token de Supabase
export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        data: null,
        error: { code: 'MISSING_TOKEN', message: 'Access token required' }
      })
      return
    }

    // Verificar token con Supabase
    const { data: { user }, error } = await supabasePublic.auth.getUser(token)

    if (error || !user) {
      res.status(401).json({
        data: null,
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' }
      })
      return
    }

    // Agregar user info al request
    req.user = {
      id: user.id,
      email: user.email || '',
      aud: user.aud,
      role: user.role
    }

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(500).json({
      data: null,
      error: { code: 'AUTH_ERROR', message: 'Authentication failed' }
    })
  }
}

// Middleware opcional para rutas públicas que pueden tener usuario autenticado
export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
      const { data: { user }, error } = await supabasePublic.auth.getUser(token)
      
      if (!error && user) {
        req.user = {
          id: user.id,
          email: user.email || '',
          aud: user.aud,
          role: user.role
        }
      }
    }

    next()
  } catch (error) {
    // Si falla la auth opcional, continuar sin usuario
    console.warn('Optional auth failed:', error)
    next()
  }
}

// Middleware para verificar que el usuario existe en nuestra DB
export const ensureUserExists = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ 
        error: 'Authentication required',
        code: 'NO_USER' 
      })
      return
    }

    // Verificar si el usuario existe en nuestra base de datos
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        targetUniversity: true
      }
    })

    if (!user) {
      // Crear usuario automáticamente si no existe
      await prisma.user.create({
        data: {
          id: req.user.id,
          email: req.user.email,
          hasCompletedOnboarding: false
        }
      })
    }

    next()
  } catch (error) {
    console.error('User existence check failed:', error)
    res.status(500).json({ 
      error: 'User verification failed',
      code: 'USER_CHECK_ERROR' 
    })
  }
}

// Middleware para verificar que el usuario ha completado onboarding
export const requireOnboarding = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ 
        error: 'Authentication required',
        code: 'NO_USER' 
      })
      return
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { hasCompletedOnboarding: true }
    })

    if (!user?.hasCompletedOnboarding) {
      res.status(403).json({ 
        error: 'Onboarding required',
        code: 'ONBOARDING_REQUIRED' 
      })
      return
    }

    next()
  } catch (error) {
    console.error('Onboarding check failed:', error)
    res.status(500).json({ 
      error: 'Onboarding verification failed',
      code: 'ONBOARDING_CHECK_ERROR' 
    })
  }
}