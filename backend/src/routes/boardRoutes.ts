import { Router } from 'express';
import {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  createColumn,
  deleteColumn,
  toggleColumnExpanded,
  createSubColumn,
  updateSubColumn,
  deleteSubColumn,
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
router.delete('/boards/:boardId/columns/:columnId', deleteColumn);
router.patch('/columns/:columnId/toggle', toggleColumnExpanded);

// Sub-column routes
router.post('/columns/:columnId/sub-columns', createSubColumn);
router.put('/sub-columns/:subColumnId', updateSubColumn);
router.delete('/sub-columns/:subColumnId', deleteSubColumn);

// Task routes
router.post('/boards/:boardId/tasks', createTask);
router.put('/boards/:boardId/tasks/:taskId', updateTask);
router.delete('/boards/:boardId/tasks/:taskId', deleteTask);

export default router;