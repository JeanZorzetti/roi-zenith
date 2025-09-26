import { Board, Task, Column } from '../types/Board';

// Detectar ambiente: se a URL contém 'roilabs.com.br', é produção
const isProduction = process.env.NODE_ENV === 'production' ||
  (typeof window !== 'undefined' && window.location.hostname.includes('roilabs.com'));

const API_BASE_URL = isProduction
  ? 'https://back.roilabs.com.br/api'
  : 'http://localhost:5002/api';

console.log(`🌍 API Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
console.log(`🔗 API Base URL: ${API_BASE_URL}`);

class BoardService {
  async getBoards(): Promise<Board[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/boards`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.boards || [];
    } catch (error) {
      console.error('Error fetching boards:', error);

      // Fallback to localStorage if API fails
      const saved = localStorage.getItem('kanban-boards');
      if (saved) {
        return JSON.parse(saved);
      }

      return [];
    }
  }

  async getBoard(id: string): Promise<Board | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.board || null;
    } catch (error) {
      console.error('Error fetching board:', error);
      return null;
    }
  }

  async createBoard(board: Omit<Board, 'id' | 'createdAt'>): Promise<Board | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(board),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.board || null;
    } catch (error) {
      console.error('Error creating board:', error);
      return null;
    }
  }

  async updateBoard(id: string, updates: Partial<Board>): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      return response.ok;
    } catch (error) {
      console.error('Error updating board:', error);
      return false;
    }
  }

  async deleteBoard(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting board:', error);
      return false;
    }
  }

  async createTask(boardId: string, task: Omit<Task, 'id' | 'createdAt'>): Promise<Task | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/boards/${boardId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.task || null;
    } catch (error) {
      console.error('Error creating task:', error);
      return null;
    }
  }

  async updateTask(boardId: string, taskId: string, updates: Partial<Task>): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/boards/${boardId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      return response.ok;
    } catch (error) {
      console.error('Error updating task:', error);
      return false;
    }
  }

  async deleteTask(boardId: string, taskId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/boards/${boardId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  }
}

export const boardService = new BoardService();