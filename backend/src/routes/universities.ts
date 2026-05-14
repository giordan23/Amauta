import express from 'express'
import universityController from '@/controllers/universityController'
import { validateBody, validateQuery, validateParams, paginationSchema, idParamSchema } from '@/middleware/validation'
import { createUniversitySchema, updateUniversitySchema } from '@/types/api'
import { authenticateToken, optionalAuth } from '@/middleware/auth'

const router = express.Router()

// ==========================================
// PUBLIC ROUTES
// ==========================================

/**
 * @route   GET /api/v1/universities
 * @desc    Get all universities (with optional search and pagination)
 * @access  Public
 * @query   { page?: number, limit?: number, search?: string }
 */
router.get('/', validateQuery(paginationSchema), universityController.getUniversities)

/**
 * @route   GET /api/v1/universities/:id
 * @desc    Get university by ID
 * @access  Public
 * @params  { id: string }
 */
router.get('/:id', validateParams(idParamSchema), universityController.getUniversityById)

/**
 * @route   GET /api/v1/universities/:id/subjects
 * @desc    Get subjects available for a specific university
 * @access  Public
 * @params  { id: string }
 */
router.get('/:id/subjects', validateParams(idParamSchema), universityController.getUniversitySubjects)

/**
 * @route   GET /api/v1/universities/:id/careers
 * @desc    Get careers available for a specific university
 * @access  Public
 * @params  { id: string }
 */
router.get('/:id/careers', validateParams(idParamSchema), universityController.getUniversityCareers)

// ==========================================
// ADMIN ROUTES (Protected)
// ==========================================

/**
 * @route   POST /api/v1/universities
 * @desc    Create a new university
 * @access  Private (Admin only)
 * @body    { name: string, shortName: string, city: string, region: string, country?: string }
 */
router.post(
  '/',
  authenticateToken,
  // TODO: Add admin role check middleware
  validateBody(createUniversitySchema),
  universityController.createUniversity
)

/**
 * @route   PUT /api/v1/universities/:id
 * @desc    Update university
 * @access  Private (Admin only)
 * @params  { id: string }
 * @body    Partial university data
 */
router.put(
  '/:id',
  authenticateToken,
  // TODO: Add admin role check middleware
  validateParams(idParamSchema),
  validateBody(updateUniversitySchema),
  universityController.updateUniversity
)

/**
 * @route   DELETE /api/v1/universities/:id
 * @desc    Delete university (soft delete - mark as inactive)
 * @access  Private (Admin only)
 * @params  { id: string }
 */
router.delete(
  '/:id',
  authenticateToken,
  // TODO: Add admin role check middleware
  validateParams(idParamSchema),
  universityController.deleteUniversity
)

export default router