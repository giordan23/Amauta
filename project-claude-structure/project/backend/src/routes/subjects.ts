import express from 'express'
import subjectController from '@/controllers/subjectController'
import { validateBody, validateQuery, validateParams, paginationSchema, idParamSchema } from '@/middleware/validation'
import { createSubjectSchema, updateSubjectSchema } from '@/types/api'
import { authenticateToken } from '@/middleware/auth'

const router = express.Router()

// ==========================================
// PUBLIC ROUTES
// ==========================================

/**
 * @route   GET /api/v1/subjects
 * @desc    Get all subjects (with optional search and pagination)
 * @access  Public
 * @query   { page?: number, limit?: number, search?: string }
 */
router.get('/', validateQuery(paginationSchema), subjectController.getSubjects)

/**
 * @route   GET /api/v1/subjects/:id
 * @desc    Get subject by ID
 * @access  Public
 * @params  { id: string }
 */
router.get('/:id', validateParams(idParamSchema), subjectController.getSubjectById)

// ==========================================
// ADMIN ROUTES (Protected)
// ==========================================

/**
 * @route   POST /api/v1/subjects
 * @desc    Create a new subject
 * @access  Private (Admin only)
 * @body    { name: string, description?: string }
 */
router.post(
  '/',
  authenticateToken,
  // TODO: Add admin role check middleware
  validateBody(createSubjectSchema),
  subjectController.createSubject
)

/**
 * @route   PUT /api/v1/subjects/:id
 * @desc    Update subject
 * @access  Private (Admin only)
 * @params  { id: string }
 * @body    Partial subject data
 */
router.put(
  '/:id',
  authenticateToken,
  // TODO: Add admin role check middleware
  validateParams(idParamSchema),
  validateBody(updateSubjectSchema),
  subjectController.updateSubject
)

/**
 * @route   DELETE /api/v1/subjects/:id
 * @desc    Delete subject (soft delete - mark as inactive)
 * @access  Private (Admin only)
 * @params  { id: string }
 */
router.delete(
  '/:id',
  authenticateToken,
  // TODO: Add admin role check middleware
  validateParams(idParamSchema),
  subjectController.deleteSubject
)

export default router