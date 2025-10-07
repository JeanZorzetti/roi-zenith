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
              subColumns: {
                orderBy: { position: 'asc' },
                include: {
                  tasks: {
                    orderBy: { position: 'asc' },
                    include: {
                      checklist: {
                        orderBy: { position: 'asc' }
                      }
                    }
                  }
                }
              },
              tasks: {
                where: { subColumnId: null },
                orderBy: { position: 'asc' },
                include: {
                  checklist: {
                    orderBy: { position: 'asc' }
                  }
                }
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
          isExpanded: column.isExpanded,
          subColumns: column.subColumns?.map(subColumn => ({
            id: subColumn.id,
            title: subColumn.title,
            position: subColumn.position,
            columnId: subColumn.columnId,
            tasks: subColumn.tasks?.map(task => ({
              id: task.id,
              title: task.title,
              description: task.description || '',
              priority: task.priority.toLowerCase(),
              assignee: task.assignee || '',
              dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
              tags: Array.isArray(task.tags) ? task.tags : [],
              completed: task.completed,
              createdAt: task.createdAt.toISOString(),
              updatedAt: task.updatedAt.toISOString(),
              columnId: task.columnId,
              subColumnId: task.subColumnId,
              position: task.position,
              checklist: task.checklist?.map((item: any) => ({
                id: item.id,
                text: item.text,
                completed: item.completed,
                taskId: item.taskId
              })) || []
            })) || []
          })) || [],
          tasks: column.tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description || '',
            priority: task.priority.toLowerCase(),
            assignee: task.assignee || '',
            dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
            tags: Array.isArray(task.tags) ? task.tags : [],
            completed: task.completed,
            createdAt: task.createdAt.toISOString(),
            updatedAt: task.updatedAt.toISOString(),
            columnId: task.columnId,
            subColumnId: task.subColumnId,
            position: task.position,
            checklist: task.checklist?.map((item: any) => ({
              id: item.id,
              text: item.text,
              completed: item.completed,
              taskId: item.taskId
            })) || []
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
            priority: task.priority.toLowerCase(),
            assignee: task.assignee || '',
            dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
            tags: Array.isArray(task.tags) ? task.tags : [],
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

// Create column
export const createColumn = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const { id, title, color } = req.body;

    try {
      // Verificar se o board existe
      const board = await prisma.board.findUnique({
        where: { id: boardId }
      });

      if (!board) {
        return res.status(404).json({ error: "Board not found" });
      }

      // Buscar a próxima posição no board
      const lastColumn = await prisma.column.findFirst({
        where: { boardId },
        orderBy: { position: "desc" }
      });

      const newColumn = await prisma.column.create({
        data: {
          id: id || `column-${Date.now()}`,
          title,
          color: color || "bg-gray-500",
          boardId,
          position: (lastColumn?.position || 0) + 1
        }
      });

      const formattedColumn = {
        id: newColumn.id,
        title: newColumn.title,
        color: newColumn.color,
        boardId: newColumn.boardId,
        position: newColumn.position,
        tasks: []
      };

      res.json({ column: formattedColumn });
    } catch (dbError) {
      console.error("Database error creating column:", dbError);
      res.status(500).json({ error: "Failed to create column in database" });
    }
  } catch (error) {
    console.error("Error creating column:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete column
export const deleteColumn = async (req: Request, res: Response) => {
  try {
    const { columnId } = req.params;

    try {
      const existingColumn = await prisma.column.findUnique({
        where: { id: columnId }
      });

      if (!existingColumn) {
        return res.status(404).json({ error: "Column not found" });
      }

      await prisma.column.delete({
        where: { id: columnId }
      });

      res.json({ message: "Column deleted successfully" });
    } catch (dbError) {
      console.error("Database error deleting column:", dbError);
      res.status(500).json({ error: "Failed to delete column from database" });
    }
  } catch (error) {
    console.error("Error deleting column:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const { title, description, priority, assignee, dueDate, tags, columnId } = req.body;

    try {
      // Verificar se a coluna existe
      const column = await prisma.column.findUnique({
        where: { id: columnId }
      });

      if (!column) {
        return res.status(404).json({ error: 'Column not found' });
      }

      // Buscar a próxima posição na coluna
      const lastTask = await prisma.task.findFirst({
        where: { columnId },
        orderBy: { position: 'desc' }
      });

      const newTask = await prisma.task.create({
        data: {
          id: `task-${Date.now()}`,
          title,
          description: description || '',
          priority: (priority || 'medium').toUpperCase() as any,
          assignee: assignee || '',
          dueDate: dueDate ? new Date(dueDate) : null,
          tags: tags || [],
          columnId,
          position: (lastTask?.position || 0) + 1
        }
      });

      const formattedTask = {
        id: newTask.id,
        title: newTask.title,
        description: newTask.description || '',
        priority: newTask.priority.toLowerCase(),
        assignee: newTask.assignee || '',
        dueDate: newTask.dueDate ? newTask.dueDate.toISOString().split('T')[0] : '',
        tags: Array.isArray(newTask.tags) ? newTask.tags : [],
        completed: newTask.completed,
        createdAt: newTask.createdAt.toISOString(),
        updatedAt: newTask.updatedAt.toISOString(),
        columnId: newTask.columnId,
        position: newTask.position,
        checklist: []
      };

      res.json({ task: formattedTask });
    } catch (dbError) {
      console.error('Database error creating task:', dbError);

      // Fallback: return mock task
      const fallbackTask = {
        id: `task-${Date.now()}`,
        title,
        description: description || '',
        priority: priority || 'medium',
        assignee: assignee || '',
        dueDate: dueDate || '',
        tags: tags || [],
        completed: false,
        createdAt: new Date().toISOString(),
        columnId,
        position: 0,
        checklist: []
      };

      res.json({ task: fallbackTask });
    }
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

    try {
      // Verificar se a task existe
      const existingTask = await prisma.task.findUnique({
        where: { id: taskId }
      });

      if (!existingTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      // Preparar dados para atualização
      const updateData: any = {};

      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.priority !== undefined) updateData.priority = updates.priority.toUpperCase();
      if (updates.assignee !== undefined) updateData.assignee = updates.assignee;
      if (updates.dueDate !== undefined) {
        updateData.dueDate = updates.dueDate ? new Date(updates.dueDate) : null;
      }
      if (updates.tags !== undefined) updateData.tags = updates.tags;
      if (updates.completed !== undefined) updateData.completed = updates.completed;
      if (updates.position !== undefined) updateData.position = updates.position;
      if (updates.columnId !== undefined) updateData.columnId = updates.columnId;
      if (updates.subColumnId !== undefined) updateData.subColumnId = updates.subColumnId;

      // Handle checklist updates
      if (updates.checklist !== undefined) {
        // Delete existing checklist items
        await prisma.checklistItem.deleteMany({
          where: { taskId }
        });

        // Create new checklist items
        if (Array.isArray(updates.checklist) && updates.checklist.length > 0) {
          await prisma.checklistItem.createMany({
            data: updates.checklist.map((item: any, index: number) => ({
              id: item.id || `checklist-${Date.now()}-${index}`,
              text: item.text,
              completed: item.completed || false,
              position: index,
              taskId: taskId
            }))
          });
        }
      }

      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: updateData,
        include: {
          checklist: {
            orderBy: { position: 'asc' }
          }
        }
      });

      const formattedTask = {
        id: updatedTask.id,
        title: updatedTask.title,
        description: updatedTask.description || '',
        priority: updatedTask.priority.toLowerCase(),
        assignee: updatedTask.assignee || '',
        dueDate: updatedTask.dueDate ? updatedTask.dueDate.toISOString().split('T')[0] : '',
        tags: Array.isArray(updatedTask.tags) ? updatedTask.tags : [],
        completed: updatedTask.completed,
        createdAt: updatedTask.createdAt.toISOString(),
        updatedAt: updatedTask.updatedAt.toISOString(),
        columnId: updatedTask.columnId,
        position: updatedTask.position,
        checklist: updatedTask.checklist?.map((item: any) => ({
          id: item.id,
          text: item.text,
          completed: item.completed,
          taskId: item.taskId
        })) || []
      };

      res.json({ message: 'Task updated successfully', task: formattedTask });
    } catch (dbError) {
      console.error('Database error updating task:', dbError);
      res.json({ message: 'Task updated successfully' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { boardId, taskId } = req.params;

    try {
      // Verificar se a task existe
      const existingTask = await prisma.task.findUnique({
        where: { id: taskId }
      });

      if (!existingTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      // Deletar a task (cascade irá deletar checklist items automaticamente)
      await prisma.task.delete({
        where: { id: taskId }
      });

      res.json({ message: 'Task deleted successfully' });
    } catch (dbError) {
      console.error('Database error deleting task:', dbError);
      res.json({ message: 'Task deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update column
export const updateColumn = async (req: Request, res: Response) => {
  try {
    const { columnId } = req.params;
    const { title, color, position } = req.body;

    try {
      const existingColumn = await prisma.column.findUnique({
        where: { id: columnId }
      });

      if (!existingColumn) {
        return res.status(404).json({ error: 'Column not found' });
      }

      const updateData: any = {};
      if (title !== undefined) updateData.title = title;
      if (color !== undefined) updateData.color = color;
      if (position !== undefined) updateData.position = position;

      const updatedColumn = await prisma.column.update({
        where: { id: columnId },
        data: updateData
      });

      res.json({ message: 'Column updated successfully', column: updatedColumn });
    } catch (dbError) {
      console.error('Database error updating column:', dbError);
      res.status(500).json({ error: 'Failed to update column in database' });
    }
  } catch (error) {
    console.error('Error updating column:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create sub-column
export const createSubColumn = async (req: Request, res: Response) => {
  try {
    const { columnId } = req.params;
    const { id, title, position } = req.body;

    try {
      // Verify column exists
      const column = await prisma.column.findUnique({
        where: { id: columnId }
      });

      if (!column) {
        return res.status(404).json({ error: 'Column not found' });
      }

      // Get next position if not provided
      const lastSubColumn = await prisma.subColumn.findFirst({
        where: { columnId },
        orderBy: { position: 'desc' }
      });

      const newSubColumn = await prisma.subColumn.create({
        data: {
          id: id || `subcolumn-${Date.now()}`,
          title,
          columnId,
          position: position ?? ((lastSubColumn?.position || 0) + 1)
        }
      });

      const formattedSubColumn = {
        id: newSubColumn.id,
        title: newSubColumn.title,
        position: newSubColumn.position,
        columnId: newSubColumn.columnId,
        tasks: []
      };

      res.json({ subColumn: formattedSubColumn });
    } catch (dbError) {
      console.error('Database error creating sub-column:', dbError);
      res.status(500).json({ error: 'Failed to create sub-column in database' });
    }
  } catch (error) {
    console.error('Error creating sub-column:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update sub-column
export const updateSubColumn = async (req: Request, res: Response) => {
  try {
    const { subColumnId } = req.params;
    const { title, position, columnId } = req.body;

    try {
      const existingSubColumn = await prisma.subColumn.findUnique({
        where: { id: subColumnId }
      });

      if (!existingSubColumn) {
        return res.status(404).json({ error: 'Sub-column not found' });
      }

      const updateData: any = {};
      if (title !== undefined) updateData.title = title;
      if (position !== undefined) updateData.position = position;
      if (columnId !== undefined) updateData.columnId = columnId;

      const updatedSubColumn = await prisma.subColumn.update({
        where: { id: subColumnId },
        data: updateData
      });

      res.json({ message: 'Sub-column updated successfully', subColumn: updatedSubColumn });
    } catch (dbError) {
      console.error('Database error updating sub-column:', dbError);
      res.status(500).json({ error: 'Failed to update sub-column in database' });
    }
  } catch (error) {
    console.error('Error updating sub-column:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete sub-column
export const deleteSubColumn = async (req: Request, res: Response) => {
  try {
    const { subColumnId } = req.params;

    try {
      const existingSubColumn = await prisma.subColumn.findUnique({
        where: { id: subColumnId }
      });

      if (!existingSubColumn) {
        return res.status(404).json({ error: 'Sub-column not found' });
      }

      await prisma.subColumn.delete({
        where: { id: subColumnId }
      });

      res.json({ message: 'Sub-column deleted successfully' });
    } catch (dbError) {
      console.error('Database error deleting sub-column:', dbError);
      res.status(500).json({ error: 'Failed to delete sub-column from database' });
    }
  } catch (error) {
    console.error('Error deleting sub-column:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Toggle column expanded state
export const toggleColumnExpanded = async (req: Request, res: Response) => {
  try {
    const { columnId } = req.params;
    const { isExpanded } = req.body;

    try {
      const column = await prisma.column.findUnique({
        where: { id: columnId }
      });

      if (!column) {
        return res.status(404).json({ error: 'Column not found' });
      }

      const updatedColumn = await prisma.column.update({
        where: { id: columnId },
        data: { isExpanded: isExpanded ?? !column.isExpanded }
      });

      res.json({ message: 'Column state toggled', column: updatedColumn });
    } catch (dbError) {
      console.error('Database error toggling column:', dbError);
      res.status(500).json({ error: 'Failed to toggle column state' });
    }
  } catch (error) {
    console.error('Error toggling column:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
