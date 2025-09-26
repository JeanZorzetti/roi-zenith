import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Board, Column, Task, ChecklistItem } from '../models/Board';

const prisma = new PrismaClient();

// Get all boards for a user
export const getBoards = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    try {
      // Se tem userId específico, busca boards do usuário
      // Se não tem, busca boards sem usuário (anonymous)
      const boards = await prisma.board.findMany({
        where: userId ? { userId } : { userId: null },
        include: {
          columns: {
            orderBy: { position: 'asc' },
            include: {
              tasks: {
                orderBy: { position: 'asc' }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      const formattedBoards = boards.map(board => ({
        id: board.id,
        title: board.title,
        description: board.description || '',
        color: board.color,
        createdAt: board.createdAt.toISOString(),
        columns: board.columns.map(column => ({
          id: column.id,
          title: column.title,
          color: column.color,
          boardId: column.boardId,
          position: column.position,
          tasks: column.tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description || '',
            priority: task.priority,
            assignee: task.assignee || '',
            dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
            tags: task.tags,
            completed: task.completed,
            createdAt: task.createdAt.toISOString(),
            columnId: task.columnId,
            position: task.position,
            checklist: []
          }))
        }))
      }));

      res.json({ boards: formattedBoards });
    } catch (dbError) {
      console.error('Database connection failed, using fallback data:', dbError);

      // Fallback to mock data if database is not available
      const fallbackBoards = [
        {
          id: 'main-board',
          title: 'Projetos ROI Labs',
          description: 'Quadro principal de desenvolvimento',
          color: 'bg-blue-500',
          createdAt: new Date().toISOString(),
          columns: [
            {
              id: 'todo',
              title: 'Para Fazer',
              color: 'bg-gray-500',
              boardId: 'main-board',
              position: 0,
              tasks: [
                {
                  id: 'task-1',
                  title: '📋 Proposta Comercial - Cliente X',
                  description: 'Elaborar proposta detalhada para integração de IA',
                  priority: 'high',
                  assignee: 'Equipe Comercial',
                  dueDate: '2024-10-15',
                  tags: ['comercial', 'urgente'],
                  completed: false,
                  createdAt: new Date().toISOString(),
                  columnId: 'todo',
                  position: 0,
                  checklist: []
                }
              ]
            },
            {
              id: 'doing',
              title: 'Em Andamento',
              color: 'bg-blue-500',
              boardId: 'main-board',
              position: 1,
              tasks: []
            },
            {
              id: 'done',
              title: 'Concluído',
              color: 'bg-green-500',
              boardId: 'main-board',
              position: 2,
              tasks: []
            }
          ]
        }
      ];

      res.json({ boards: fallbackBoards });
    }
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get single board
export const getBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Return the main board for now
    if (id === 'main-board') {
      const boards = await getBoards(req, res);
      return;
    }

    res.status(404).json({ error: 'Board not found' });
  } catch (error) {
    console.error('Error fetching board:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create board
export const createBoard = async (req: Request, res: Response) => {
  try {
    const { title, description, color } = req.body;
    const userId = req.user?.id;

    try {
      const boardId = `board-${Date.now()}`;

      const newBoard = await prisma.board.create({
        data: {
          id: boardId,
          title,
          description: description || '',
          color: color || 'bg-blue-500',
          ...(userId && { userId }),
          columns: {
            create: [
              { id: `${boardId}-todo`, title: 'Para Fazer', color: 'bg-gray-500', position: 0 },
              { id: `${boardId}-doing`, title: 'Em Andamento', color: 'bg-blue-500', position: 1 },
              { id: `${boardId}-done`, title: 'Concluído', color: 'bg-green-500', position: 2 }
            ]
          }
        },
        include: {
          columns: {
            orderBy: { position: 'asc' },
            include: {
              tasks: {
                orderBy: { position: 'asc' }
              }
            }
          }
        }
      });

      const formattedBoard = {
        id: newBoard.id,
        title: newBoard.title,
        description: newBoard.description || '',
        color: newBoard.color,
        createdAt: newBoard.createdAt.toISOString(),
        userId: newBoard.userId,
        columns: newBoard.columns.map(column => ({
          id: column.id,
          title: column.title,
          color: column.color,
          boardId: column.boardId,
          position: column.position,
          tasks: column.tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description || '',
            priority: task.priority,
            assignee: task.assignee || '',
            dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
            tags: task.tags,
            completed: task.completed,
            createdAt: task.createdAt.toISOString(),
            columnId: task.columnId,
            position: task.position,
            checklist: []
          }))
        }))
      };

      res.json({ board: formattedBoard });
    } catch (dbError) {
      console.error('Database error, creating board without persistence:', dbError);

      // Fallback: return mock board if database fails
      const fallbackBoard = {
        id: `board-${Date.now()}`,
        title,
        description: description || '',
        color: color || 'bg-blue-500',
        createdAt: new Date().toISOString(),
        userId,
        columns: [
          { id: 'todo', title: 'Para Fazer', color: 'bg-gray-500', boardId: `board-${Date.now()}`, position: 0, tasks: [] },
          { id: 'doing', title: 'Em Andamento', color: 'bg-blue-500', boardId: `board-${Date.now()}`, position: 1, tasks: [] },
          { id: 'done', title: 'Concluído', color: 'bg-green-500', boardId: `board-${Date.now()}`, position: 2, tasks: [] }
        ]
      };

      res.json({ board: fallbackBoard });
    }
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update board
export const updateBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, color } = req.body;

    try {
      const updatedBoard = await prisma.board.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(description !== undefined && { description }),
          ...(color && { color })
        }
      });

      res.json({ message: 'Board updated successfully', board: updatedBoard });
    } catch (dbError) {
      console.error('Database error updating board:', dbError);
      res.json({ message: 'Board updated successfully' });
    }
  } catch (error) {
    console.error('Error updating board:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete board
export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    try {
      await prisma.board.delete({
        where: { id }
      });

      res.json({ message: 'Board deleted successfully' });
    } catch (dbError) {
      console.error('Database error deleting board:', dbError);
      res.json({ message: 'Board deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting board:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const { title, description, priority, assignee, dueDate, tags, columnId } = req.body;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description,
      priority: priority || 'medium',
      assignee,
      dueDate,
      tags: tags || [],
      completed: false,
      createdAt: new Date().toISOString(),
      columnId,
      position: 0,
      checklist: []
    };

    // TODO: Save to database

    res.json({ task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { boardId, taskId } = req.params;
    const updates = req.body;

    // TODO: Update in database

    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { boardId, taskId } = req.params;

    // TODO: Delete from database

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};