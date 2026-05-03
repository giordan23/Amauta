import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

// Load test environment variables
dotenv.config({ path: '.env.test' })

// Global test setup
const prisma = new PrismaClient()

beforeAll(async () => {
  // Setup test database if needed
  console.log('🧪 Setting up test environment...')
})

afterAll(async () => {
  // Clean up
  await prisma.$disconnect()
  console.log('🧹 Test environment cleaned up')
})