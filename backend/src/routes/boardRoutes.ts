import { Router } from 'express';
import {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  createColumn,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/boardController';

const router = Router();

// Board routes
router.get('/boards', getBoards);
router.get('/boards/:id', getBoard);
router.post('/boards', createBoard);
router.put('/boards/:id', updateBoard);
router.delete('/boards/:id', deleteBoard);

// Column routes
router.post('/boards/:boardId/columns', createColumn);

// Task routes
router.post('/boards/:boardId/tasks', createTask);
router.put('/boards/:boardId/tasks/:taskId', updateTask);
router.delete('/boards/:boardId/tasks/:taskId', deleteTask);

export default router;