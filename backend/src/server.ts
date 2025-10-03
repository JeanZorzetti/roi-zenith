import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './utils/database';
import { errorHandler, notFound } from './middleware/errorMiddleware';

// Route imports
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';
import boardRoutes from './routes/boardRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:8082',
  'https://roilabs.com.br',
  'https://www.roilabs.com.br',
  'http://localhost:3000',
  'http://localhost:3005',
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      return callback(null, true); // Allow all origins temporarily for debugging
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 200
}));

// Trust proxy (needed for rate limiting behind proxy)
app.set('trust proxy', 1);

// Rate limiting - very high limits for testing
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute 
  max: 10000, // 10000 requests per minute
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsing with UTF-8 encoding
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Set UTF-8 encoding for all responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api', boardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ROI Labs API is healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Create HTTP server
const server = createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`🔗 User connected: ${socket.id}`);

  // Join a specific board room
  socket.on('join-board', (boardId: string) => {
    socket.join(boardId);
    console.log(`👤 User ${socket.id} joined board: ${boardId}`);

    // Get current users in the room (excluding the joining user)
    const room = io.sockets.adapter.rooms.get(boardId);
    const currentUsers = room ? Array.from(room).filter(id => id !== socket.id) : [];

    // Send current users list to the joining user
    if (currentUsers.length > 0) {
      socket.emit('current-users', {
        boardId,
        users: currentUsers.map(id => ({ userId: id }))
      });
    }

    // Notify existing users about the new user
    socket.to(boardId).emit('user-joined', {
      userId: socket.id,
      boardId
    });

    // Also emit to the joining user so they know they're connected
    socket.emit('user-joined', {
      userId: socket.id,
      boardId,
      isMe: true
    });
  });

  // Leave a board room
  socket.on('leave-board', (boardId: string) => {
    socket.leave(boardId);
    console.log(`👋 User ${socket.id} left board: ${boardId}`);

    // Notify others in the room
    socket.to(boardId).emit('user-left', {
      userId: socket.id,
      boardId
    });
  });

  // Handle task updates
  socket.on('task-updated', (data) => {
    console.log(`📝 Task updated in board ${data.boardId} by ${socket.id}`);

    // Broadcast to all users in the board room except sender
    socket.to(data.boardId).emit('task-updated', {
      ...data,
      updatedBy: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  // Handle task creation
  socket.on('task-created', (data) => {
    console.log(`✨ Task created in board ${data.boardId} by ${socket.id}`);

    socket.to(data.boardId).emit('task-created', {
      ...data,
      createdBy: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  // Handle task deletion
  socket.on('task-deleted', (data) => {
    console.log(`🗑️ Task deleted in board ${data.boardId} by ${socket.id}`);

    socket.to(data.boardId).emit('task-deleted', {
      ...data,
      deletedBy: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  // Handle task movement
  socket.on('task-moved', (data) => {
    console.log(`🔄 Task moved in board ${data.boardId} by ${socket.id}`);

    socket.to(data.boardId).emit('task-moved', {
      ...data,
      movedBy: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  // Handle board updates
  socket.on('board-updated', (data) => {
    console.log(`🏷️ Board updated: ${data.boardId} by ${socket.id}`);

    socket.to(data.boardId).emit('board-updated', {
      ...data,
      updatedBy: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  // Handle user cursor/activity
  socket.on('user-activity', (data) => {
    socket.to(data.boardId).emit('user-activity', {
      ...data,
      userId: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 ROI Labs API server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`⚡ Socket.IO server ready`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

export default app;