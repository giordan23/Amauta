import winston from 'winston'
import path from 'path'

// Configuración de Winston
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { 
    service: 'amauta-api',
    environment: process.env.NODE_ENV || 'development'
  },
  transports: [
    // Error log file
    new winston.transports.File({ 
      filename: path.join(process.cwd(), 'logs', 'error.log'), 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    
    // Combined log file
    new winston.transports.File({ 
      filename: path.join(process.cwd(), 'logs', 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
})

// Console transport for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.printf(({ level, message, timestamp, ...meta }) => {
        const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
        return `${timestamp} [${level}]: ${message} ${metaString}`
      })
    )
  }))
}

// Helper functions
export const logError = (message: string, error?: Error | any, metadata?: object) => {
  logger.error(message, {
    error: error?.message || error,
    stack: error?.stack,
    ...metadata
  })
}

export const logInfo = (message: string, metadata?: object) => {
  logger.info(message, metadata)
}

export const logWarn = (message: string, metadata?: object) => {
  logger.warn(message, metadata)
}

export const logDebug = (message: string, metadata?: object) => {
  logger.debug(message, metadata)
}

export default logger