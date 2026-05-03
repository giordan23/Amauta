import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

import { database } from '@/utils/database'
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler'
import logger, { logInfo, logError } from '@/utils/logger'

// Routes
import authRoutes from '@/routes/auth'
import userRoutes from '@/routes/users'
import universityRoutes from '@/routes/universities'
import subjectRoutes from '@/routes/subjects'
import careerRoutes from '@/routes/careers'
// import questionRoutes from '@/routes/questions'
// import examRoutes from '@/routes/exams'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const API_VERSION = process.env.API_VERSION || 'v1'

// ==========================================
// MIDDLEWARE SETUP
// ==========================================

// Security middleware
app.use(helmet())

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || [
    'http://localhost:19006',  // Expo default
    'exp://192.168.1.*:19000'  // Expo LAN
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    body: req.method !== 'GET' ? req.body : undefined
  })
  next()
})

// ==========================================
// HEALTH CHECK
// ==========================================

app.get('/health', async (req, res) => {
  try {
    const dbHealth = await database.healthCheck()
    
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      database: dbHealth ? 'connected' : 'disconnected'
    })
  } catch (error) {
    logError('Health check failed', error)
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      database: 'error'
    })
  }
})

// ==========================================
// API ROUTES
// ==========================================

// Base API route
app.get(`/api/${API_VERSION}`, (req, res) => {
  res.json({
    message: 'Amauta API - Exam Simulator MVP',
    version: API_VERSION,
    documentation: '/api/docs', // Future: Swagger docs
    endpoints: {
      auth: `/api/${API_VERSION}/auth`,
      users: `/api/${API_VERSION}/users`,
      universities: `/api/${API_VERSION}/universities`,
      subjects: `/api/${API_VERSION}/subjects`,
      careers: `/api/${API_VERSION}/careers`,
      questions: `/api/${API_VERSION}/questions`,
      exams: `/api/${API_VERSION}/exams`
    }
  })
})

// Mount routes
app.use(`/api/${API_VERSION}/auth`, authRoutes)
app.use(`/api/${API_VERSION}/users`, userRoutes)
app.use(`/api/${API_VERSION}/universities`, universityRoutes)
app.use(`/api/${API_VERSION}/subjects`, subjectRoutes)
app.use(`/api/${API_VERSION}/careers`, careerRoutes)
// app.use(`/api/${API_VERSION}/questions`, questionRoutes)
// app.use(`/api/${API_VERSION}/exams`, examRoutes)

// ==========================================
// ERROR HANDLING
// ==========================================

// 404 handler
app.use(notFoundHandler)

// Global error handler
app.use(errorHandler)

// ==========================================
// SERVER STARTUP
// ==========================================

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await database.connect()
    
    // Start HTTP server
    app.listen(PORT, () => {
      logInfo(`🚀 Server running on port ${PORT}`, {
        environment: process.env.NODE_ENV,
        apiVersion: API_VERSION,
        healthCheck: `http://localhost:${PORT}/health`,
        apiDocs: `http://localhost:${PORT}/api/${API_VERSION}`
      })
    })

  } catch (error) {
    logError('Failed to start server', error)
    process.exit(1)
  }
}

// Graceful shutdown
const gracefulShutdown = async (): Promise<void> => {
  logInfo('Graceful shutdown initiated...')
  
  try {
    await database.disconnect()
    logInfo('Database disconnected successfully')
    process.exit(0)
  } catch (error) {
    logError('Error during graceful shutdown', error)
    process.exit(1)
  }
}

// Handle process termination
process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logError('Uncaught Exception', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  logError('Unhandled Rejection', reason, { promise })
  process.exit(1)
})

// Start the server
startServer()

export default app