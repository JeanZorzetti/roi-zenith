// Mock Prisma client for browser environment
const mockPrismaClient = {
  lead: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => null,
    update: async (data: any) => null,
    delete: async (data: any) => null,
    count: async () => 0,
    groupBy: async () => [],
  },
  $connect: async () => {
    throw new Error('Database not available in browser environment');
  },
  $disconnect: async () => {},
};

// Browser-safe Prisma client
export const prisma = typeof window !== 'undefined' 
  ? mockPrismaClient 
  : (() => {
      try {
        const { PrismaClient } = require('@prisma/client');
        
        declare global {
          var __prisma: any | undefined;
        }

        if (!globalThis.__prisma) {
          globalThis.__prisma = new PrismaClient({
            log: process.env.NODE_ENV === 'development' ? ['query'] : [],
          });
        }

        return globalThis.__prisma;
      } catch (error) {
        console.warn('Prisma Client not available, using mock client');
        return mockPrismaClient;
      }
    })();

// Database connection test function
export async function testDatabaseConnection() {
  // In browser environment, database is not available
  if (typeof window !== 'undefined') {
    console.info('🌐 Browser environment - database fallback disabled, using API only');
    return false;
  }

  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Graceful shutdown
export async function disconnectDatabase() {
  await prisma.$disconnect();
}