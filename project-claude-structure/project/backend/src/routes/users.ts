import express from 'express'
import userController from '@/controllers/userController'
import { validateBody, validateQuery, paginationSchema } from '@/middleware/validation'
import { updateUserProfileSchema, completeOnboardingSchema } from '@/types/api'
import { authenticateToken, ensureUserExists } from '@/middleware/auth'

const router = express.Router()

// ==========================================
// PROTECTED ROUTES (All require authentication)
// ==========================================

// Apply auth middleware to all routes
router.use(authenticateToken)
router.use(ensureUserExists)

/**
 * @route   PUT /api/v1/users/profile
 * @desc    Update user profile
 * @access  Private
 * @body    { firstName?: string, lastName?: string, country?: string, targetUniversityId?: string }
 */
router.put('/profile', validateBody(updateUserProfileSchema), userController.updateProfile)

/**
 * @route   POST /api/v1/users/complete-onboarding
 * @desc    Complete user onboarding process
 * @access  Private
 * @body    { country: string, targetUniversityId: string, firstName?: string, lastName?: string }
 */
router.post('/complete-onboarding', validateBody(completeOnboardingSchema), userController.completeOnboarding)

/**
 * @route   GET /api/v1/users/exam-history
 * @desc    Get user's exam attempt history
 * @access  Private
 * @query   { page?: number, limit?: number }
 */
router.get('/exam-history', validateQuery(paginationSchema), userController.getExamHistory)

/**
 * @route   GET /api/v1/users/statistics
 * @desc    Get user's performance statistics
 * @access  Private
 */
router.get('/statistics', userController.getStatistics)

/**
 * @route   DELETE /api/v1/users/account
 * @desc    Delete user account (soft delete)
 * @access  Private
 */
router.delete('/account', userController.deleteAccount)

export default router