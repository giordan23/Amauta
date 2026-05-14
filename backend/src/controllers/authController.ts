import { Request, Response } from 'express'
import { supabasePublic } from '@/utils/supabase'
import { prisma } from '@/utils/database'
import { loginSchema, registerSchema, type LoginRequest, type RegisterRequest } from '@/types/api'
import { logInfo, logError } from '@/utils/logger'
import { CustomError } from '@/middleware/errorHandler'

class AuthController {
  // Register new user
  async register(req: Request, res: Response): Promise<void> {
    try {
      const validatedData: RegisterRequest = registerSchema.parse(req.body)
      const { email, password, firstName, lastName } = validatedData

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabasePublic.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      })

      if (authError) {
        logError('Supabase registration failed', authError)
        throw new CustomError(authError.message, 400, 'REGISTRATION_FAILED')
      }

      if (!authData.user) {
        throw new CustomError('User creation failed', 400, 'USER_CREATION_FAILED')
      }

      // Create user profile in our database
      const user = await prisma.user.create({
        data: {
          id: authData.user.id,
          email: authData.user.email!,
          firstName: firstName || null,
          lastName: lastName || null,
          hasCompletedOnboarding: false
        },
        include: {
          targetUniversity: true
        }
      })

      logInfo('User registered successfully', { userId: user.id, email: user.email })

      res.status(201).json({
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            hasCompletedOnboarding: user.hasCompletedOnboarding,
            targetUniversity: user.targetUniversity
          },
          session: authData.session,
          needsEmailConfirmation: !authData.session
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
        logError('Registration error', error)
        res.status(500).json({
          data: null,
          error: { code: 'REGISTRATION_ERROR', message: 'Registration failed' }
        })
      }
    }
  }

  // Login user
  async login(req: Request, res: Response): Promise<void> {
    try {
      const validatedData: LoginRequest = loginSchema.parse(req.body)
      const { email, password } = validatedData

      // Authenticate with Supabase
      const { data: authData, error: authError } = await supabasePublic.auth.signInWithPassword({
        email,
        password
      })

      if (authError) {
        logError('Supabase login failed', authError)
        throw new CustomError(authError.message, 401, 'LOGIN_FAILED')
      }

      if (!authData.user || !authData.session) {
        throw new CustomError('Authentication failed', 401, 'AUTH_FAILED')
      }

      // Get user profile from our database
      let user = await prisma.user.findUnique({
        where: { id: authData.user.id },
        include: {
          targetUniversity: true
        }
      })

      // Create user profile if doesn't exist (edge case)
      if (!user) {
        user = await prisma.user.create({
          data: {
            id: authData.user.id,
            email: authData.user.email!,
            hasCompletedOnboarding: false
          },
          include: {
            targetUniversity: true
          }
        })
      }

      logInfo('User logged in successfully', { userId: user.id, email: user.email })

      res.json({
        data: {
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            hasCompletedOnboarding: user.hasCompletedOnboarding,
            targetUniversity: user.targetUniversity
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
        logError('Login error', error)
        res.status(500).json({
          data: null,
          error: { code: 'LOGIN_ERROR', message: 'Login failed' }
        })
      }
    }
  }

  // Logout user
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]

      if (token) {
        const { error } = await supabasePublic.auth.signOut()
        if (error) {
          logError('Supabase logout failed', error)
        }
      }

      res.json({
        data: { message: 'Logged out successfully' },
        error: null
      })
    } catch (error) {
      logError('Logout error', error)
      res.status(500).json({
        data: null,
        error: { code: 'LOGOUT_ERROR', message: 'Logout failed' }
      })
    }
  }

  // Refresh token
  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body

      if (!refreshToken) {
        throw new CustomError('Refresh token is required', 400, 'MISSING_REFRESH_TOKEN')
      }

      const { data, error } = await supabasePublic.auth.refreshSession({
        refresh_token: refreshToken
      })

      if (error) {
        logError('Token refresh failed', error)
        throw new CustomError(error.message, 401, 'REFRESH_FAILED')
      }

      res.json({
        data: { session: data.session },
        error: null
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          data: null,
          error: { code: error.code, message: error.message }
        })
      } else {
        logError('Token refresh error', error)
        res.status(500).json({
          data: null,
          error: { code: 'REFRESH_ERROR', message: 'Token refresh failed' }
        })
      }
    }
  }

  // Forgot password
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body

      if (!email) {
        throw new CustomError('Email is required', 400, 'MISSING_EMAIL')
      }

      const { error } = await supabasePublic.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL}/auth/reset-password`
      })

      if (error) {
        logError('Password reset failed', error)
        throw new CustomError(error.message, 400, 'RESET_PASSWORD_FAILED')
      }

      res.json({
        data: { message: 'Password reset email sent successfully' },
        error: null
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          data: null,
          error: { code: error.code, message: error.message }
        })
      } else {
        logError('Forgot password error', error)
        res.status(500).json({
          data: null,
          error: { code: 'FORGOT_PASSWORD_ERROR', message: 'Password reset failed' }
        })
      }
    }
  }

  // Get current user (protected route)
  async getMe(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new CustomError('User not authenticated', 401, 'NOT_AUTHENTICATED')
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
          targetUniversity: true
        }
      })

      if (!user) {
        throw new CustomError('User not found', 404, 'USER_NOT_FOUND')
      }

      res.json({
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            country: user.country,
            hasCompletedOnboarding: user.hasCompletedOnboarding,
            targetUniversity: user.targetUniversity,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
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
        logError('Get user error', error)
        res.status(500).json({
          data: null,
          error: { code: 'GET_USER_ERROR', message: 'Failed to get user' }
        })
      }
    }
  }
}

export default new AuthController()