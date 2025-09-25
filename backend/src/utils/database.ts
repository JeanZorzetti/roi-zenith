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
    // Check for required environment variables in production
    if (process.env.NODE_ENV === 'production') {
      const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT'];
      const missingVars = requiredVars.filter(varName => !process.env[varName]);

      if (missingVars.length > 0) {
        console.error('🚨 CRITICAL: Missing required environment variables:');
        missingVars.forEach(varName => {
          console.error(`   ❌ ${varName} not defined`);
        });
        console.error('💡 Please configure these variables in EasyPanel Environment section');
        console.error('📖 See EASYPANEL_CONFIG.md for detailed instructions');
        console.log('⚠️  Server will continue without database connection');
        return;
      }
    }

    // Dynamic DATABASE_URL construction for production
    if (process.env.NODE_ENV === 'production' && process.env.DB_HOST) {
      // URL encode password to handle special characters
      const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD || '');
      const dbUrl = `mysql://${process.env.DB_USER}:${encodedPassword}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?connect_timeout=60&pool_timeout=60&socket_timeout=60`;
      process.env.DATABASE_URL = dbUrl;
      console.log('📋 Database: MySQL (production)');
      console.log(`🔗 Database URL: mysql://${process.env.DB_USER}:***@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    } else if (!process.env.DATABASE_URL) {
      console.error('🚨 DATABASE_URL not found in development environment');
      console.error('💡 Check your .env file has DATABASE_URL defined');
      console.log('⚠️  Server will continue without database connection');
      return;
    } else {
      console.log('📋 Database: MySQL (development)');
      console.log(`🔗 Using DATABASE_URL from .env`);
    }

    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error: any) {
    console.error('❌ Database connection error:', error.message);
    console.error('❌ Error code:', error.code);

    // Check if it's a specific Prisma error
    if (error.code === 'P1001') {
      console.error('💡 P1001: Can\'t reach database server. Check network/credentials.');
    } else if (error.code === 'P1002') {
      console.error('💡 P1002: Database server timeout. Check connection settings.');
    } else if (error.code === 'P1012') {
      console.error('💡 P1012: Environment variable missing. Check EasyPanel configuration.');
    }

    console.log('⚠️  Server will continue without database connection');
    console.log('📖 See EASYPANEL_CONFIG.md for configuration instructions');
    // Don't exit - allow server to start without database
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