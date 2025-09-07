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
    console.log('📋 Database: SQLite (development)');
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