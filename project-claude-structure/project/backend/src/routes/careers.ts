import express from 'express'
import careerController from '@/controllers/careerController'
import { validateBody, validateQuery, validateParams, paginationSchema, idParamSchema } from '@/middleware/validation'
import { createCareerSchema, updateCareerSchema } from '@/types/api'
import { authenticateToken } from '@/middleware/auth'

const router = express.Router()

// ==========================================
// PUBLIC ROUTES
// ==========================================

/**
 * @route   GET /api/v1/careers
 * @desc    Get all careers (with optional search and pagination)
 * @access  Public
 * @query   { page?: number, limit?: number, search?: string }
 */
router.get('/', validateQuery(paginationSchema), careerController.getCareers)

/**
 * @route   GET /api/v1/careers/:id
 * @desc    Get career by ID
 * @access  Public
 * @params  { id: string }
 */
router.get('/:id', validateParams(idParamSchema), careerController.getCareerById)

// ==========================================
// ADMIN ROUTES (Protected)
// ==========================================

/**
 * @route   POST /api/v1/careers
 * @desc    Create a new career
 * @access  Private (Admin only)
 * @body    { name: string }
 */
router.post(
  '/',
  authenticateToken,
  // TODO: Add admin role check middleware
  validateBody(createCareerSchema),
  careerController.createCareer
)

/**
 * @route   PUT /api/v1/careers/:id
 * @desc    Update career
 * @access  Private (Admin only)
 * @params  { id: string }
 * @body    Partial career data
 */
router.put(
  '/:id',
  authenticateToken,
  // TODO: Add admin role check middleware
  validateParams(idParamSchema),
  validateBody(updateCareerSchema),
  careerController.updateCareer
)

/**
 * @route   DELETE /api/v1/careers/:id
 * @desc    Delete career (soft delete - mark as inactive)
 * @access  Private (Admin only)
 * @params  { id: string }
 */
router.delete(
  '/:id',
  authenticateToken,
  // TODO: Add admin role check middleware
  validateParams(idParamSchema),
  careerController.deleteCareer
)

export default router