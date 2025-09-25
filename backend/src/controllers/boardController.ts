import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Board, Column, Task, ChecklistItem } from '../models/Board';

const prisma = new PrismaClient();

// Get all boards for a user
export const getBoards = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id || 'anonymous';

    // For now, return mock data that matches the frontend structure
    const boards: Board[] = [
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
                checklist: [
                  { id: '1-1', text: 'Revisar valores propostos', completed: true, taskId: 'task-1' },
                  { id: '1-2', text: 'Verificar margem de lucro', completed: false, taskId: 'task-1' },
                  { id: '1-3', text: 'Ajustar condições de pagamento', completed: false, taskId: 'task-1' }
                ]
              },
              {
                id: 'task-2',
                title: '🔗 Integração API Webhook',
                description: 'Implementar sistema de webhooks para notificações',
                priority: 'medium',
                assignee: 'Dev Backend',
                dueDate: '',
                tags: ['desenvolvimento', 'api'],
                completed: false,
                createdAt: new Date().toISOString(),
                columnId: 'todo',
                position: 1,
                checklist: [
                  { id: '2-1', text: 'Criar endpoint webhook', completed: false, taskId: 'task-2' },
                  { id: '2-2', text: 'Configurar autenticação', completed: false, taskId: 'task-2' },
                  { id: '2-3', text: 'Testar integração', completed: false, taskId: 'task-2' }
                ]
              }
            ]
          },
          {
            id: 'doing',
            title: 'Em Andamento',
            color: 'bg-blue-500',
            boardId: 'main-board',
            position: 1,
            tasks: [
              {
                id: 'task-3',
                title: '📊 Relatório de Performance Q3',
                description: 'Análise completa dos resultados do trimestre',
                priority: 'high',
                assignee: 'Analista BI',
                dueDate: '2024-10-01',
                tags: ['relatório', 'analytics'],
                completed: false,
                createdAt: new Date().toISOString(),
                columnId: 'doing',
                position: 0,
                checklist: [
                  { id: '3-1', text: 'Coletar dados de vendas', completed: true, taskId: 'task-3' },
                  { id: '3-2', text: 'Analisar métricas de conversão', completed: true, taskId: 'task-3' },
                  { id: '3-3', text: 'Gerar gráficos e visualizações', completed: false, taskId: 'task-3' },
                  { id: '3-4', text: 'Escrever conclusões', completed: false, taskId: 'task-3' }
                ]
              }
            ]
          },
          {
            id: 'done',
            title: 'Concluído',
            color: 'bg-green-500',
            boardId: 'main-board',
            position: 2,
            tasks: [
              {
                id: 'task-4',
                title: '✅ Setup Ambiente de Produção',
                description: 'Configuração completa do servidor de produção',
                priority: 'high',
                assignee: 'DevOps',
                dueDate: '',
                tags: ['infraestrutura', 'produção'],
                completed: true,
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                columnId: 'done',
                position: 0,
                checklist: [
                  { id: '4-1', text: 'Configurar Docker containers', completed: true, taskId: 'task-4' },
                  { id: '4-2', text: 'Setup banco de dados', completed: true, taskId: 'task-4' },
                  { id: '4-3', text: 'Configurar SSL e domínio', completed: true, taskId: 'task-4' },
                  { id: '4-4', text: 'Testes de performance', completed: true, taskId: 'task-4' }
                ]
              }
            ]
          }
        ]
      }
    ];

    res.json({ boards });
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
    const userId = req.user?.id || 'anonymous';

    const newBoard: Board = {
      id: `board-${Date.now()}`,
      title,
      description,
      color: color || 'bg-blue-500',
      createdAt: new Date().toISOString(),
      userId,
      columns: [
        { id: 'todo', title: 'Para Fazer', color: 'bg-gray-500', boardId: `board-${Date.now()}`, position: 0, tasks: [] },
        { id: 'doing', title: 'Em Andamento', color: 'bg-blue-500', boardId: `board-${Date.now()}`, position: 1, tasks: [] },
        { id: 'done', title: 'Concluído', color: 'bg-green-500', boardId: `board-${Date.now()}`, position: 2, tasks: [] }
      ]
    };

    // TODO: Save to database

    res.json({ board: newBoard });
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

    // TODO: Update in database

    res.json({ message: 'Board updated successfully' });
  } catch (error) {
    console.error('Error updating board:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete board
export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TODO: Delete from database

    res.json({ message: 'Board deleted successfully' });
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