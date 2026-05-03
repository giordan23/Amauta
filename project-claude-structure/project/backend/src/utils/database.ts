import { PrismaClient } from '@prisma/client'

// Singleton pattern for Prisma client
class Database {
  private static instance: Database
  public prisma: PrismaClient

  private constructor() {
    this.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
    })
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  public async connect(): Promise<void> {
    try {
      await this.prisma.$connect()
      console.log('✅ Database connected successfully')
    } catch (error) {
      console.error('❌ Database connection failed:', error)
      process.exit(1)
    }
  }

  public async disconnect(): Promise<void> {
    await this.prisma.$disconnect()
    console.log('🔌 Database disconnected')
  }

  public async healthCheck(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`
      return true
    } catch {
      return false
    }
  }
}

export const database = Database.getInstance()
export const prisma = database.prisma