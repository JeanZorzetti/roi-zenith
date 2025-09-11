// Mock PrismaClient for tests
jest.mock('../src/utils/database', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    lead: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    $disconnect: jest.fn(),
  },
}));

// Mock UserService
jest.mock('../src/models/User', () => ({
  UserService: {
    findUserByEmail: jest.fn(),
    findUserByEmailWithPassword: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    comparePassword: jest.fn(),
  },
}));

// Mock auth middleware
jest.mock('../src/middleware/authMiddleware', () => ({
  generateToken: jest.fn(() => 'mock-token'),
  authenticateUser: jest.fn(),
}));

// Global test timeout
jest.setTimeout(30000);

// Suppress console.log in tests unless CI
if (!process.env.CI) {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}