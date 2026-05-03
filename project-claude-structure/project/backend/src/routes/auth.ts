import express from 'express'
import authController from '@/controllers/authController'
import { validateBody } from '@/middleware/validation'
import { loginSchema, registerSchema } from '@/types/api'
import { authenticateToken } from '@/middleware/auth'

const router = express.Router()

// ==========================================
// PUBLIC ROUTES
// ==========================================

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    { email: string, password: string, firstName?: string, lastName?: string }
 */
router.post('/register', validateBody(registerSchema), authController.register)

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 * @body    { email: string, password: string }
 */
router.post('/login', validateBody(loginSchema), authController.login)

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user
 * @access  Public (but token is used if present)
 */
router.post('/logout', authController.logout)

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 * @body    { refreshToken: string }
 */
router.post('/refresh', authController.refreshToken)

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 * @body    { email: string }
 */
router.post('/forgot-password', authController.forgotPassword)

// ==========================================
// PROTECTED ROUTES
// ==========================================

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user profile
 * @access  Private
 * @headers Authorization: Bearer <token>
 */
router.get('/me', authenticateToken, authController.getMe)

export default router