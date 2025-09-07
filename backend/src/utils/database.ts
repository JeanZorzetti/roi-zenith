import { PrismaClient } from '@prisma/client';

declare global {
  var __prisma: PrismaClient | undefined;
}

// Initialize Prisma Client
export const prisma = globalThis.__prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

export const connectDB = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Dynamic DATABASE_URL construction for production
    if (process.env.NODE_ENV === 'production' && process.env.DB_HOST) {
      const dbUrl = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
      process.env.DATABASE_URL = dbUrl;
      console.log('📋 Database: MySQL (production)');
    } else {
      console.log('📋 Database: MySQL (development)');
    }
  } catch (error: any) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

// Handle graceful shutdown
export const disconnectDB = async (): Promise<void> => {
  await prisma.$disconnect();
};

process.on('SIGINT', async () => {
  try {
    await disconnectDB();
    console.log('👋 Database connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing database connection:', error);
    process.exit(1);
  }
});