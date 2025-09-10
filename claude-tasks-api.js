#!/usr/bin/env node

/**
 * Claude Code Task Organizer API
 * API local para integração do Claude Code com o organizador de tarefas
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 5555;
const TASKS_FILE = path.join(__dirname, 'frontend', 'public', 'tasks-data.json');

// Ensure tasks file exists
if (!fs.existsSync(TASKS_FILE)) {
  const defaultData = {
    boards: [],
    lastUpdated: new Date().toISOString()
  };
  fs.writeFileSync(TASKS_FILE, JSON.stringify(defaultData, null, 2));
}

class TasksAPI {
  constructor() {
    this.loadData();
  }

  loadData() {
    try {
      const data = fs.readFileSync(TASKS_FILE, 'utf8');
      this.data = JSON.parse(data);
    } catch (error) {
      console.error('Error loading tasks data:', error);
      this.data = { boards: [], lastUpdated: new Date().toISOString() };
    }
  }

  saveData() {
    try {
      this.data.lastUpdated = new Date().toISOString();
      fs.writeFileSync(TASKS_FILE, JSON.stringify(this.data, null, 2));
      return true;
    } catch (error) {
      console.error('Error saving tasks data:', error);
      return false;
    }
  }

  // Board operations
  listBoards() {
    return this.data.boards.map(board => ({
      id: board.id,
      title: board.title,
      description: board.description,
      color: board.color,
      isFavorite: board.isFavorite,
      createdAt: board.createdAt,
      columnsCount: board.columns.length,
      tasksCount: board.columns.reduce((acc, col) => acc + col.tasks.length, 0)
    }));
  }

  createBoard(title, description = '', color = 'bg-blue-500') {
    const newBoard = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || undefined,
      color: color || 'bg-blue-500',
      isFavorite: false,
      createdAt: new Date().toISOString(),
      columns: [
        { id: 'todo', title: 'Para Fazer', color: 'bg-gray-500', tasks: [] },
        { id: 'doing', title: 'Em Andamento', color: 'bg-blue-500', tasks: [] },
        { id: 'done', title: 'Concluído', color: 'bg-green-500', tasks: [] }
      ]
    };

    this.data.boards.push(newBoard);
    this.saveData();
    return newBoard;
  }

  editBoard(boardId, updates) {
    const boardIndex = this.data.boards.findIndex(b => b.id === boardId);
    if (boardIndex === -1) return null;

    const board = this.data.boards[boardIndex];
    if (updates.title) board.title = updates.title.trim();
    if (updates.description !== undefined) board.description = updates.description.trim() || undefined;
    if (updates.color) board.color = updates.color;
    if (updates.isFavorite !== undefined) board.isFavorite = updates.isFavorite;

    this.saveData();
    return board;
  }

  deleteBoard(boardId) {
    const initialLength = this.data.boards.length;
    this.data.boards = this.data.boards.filter(b => b.id !== boardId);
    const deleted = this.data.boards.length < initialLength;
    if (deleted) this.saveData();
    return deleted;
  }

  duplicateBoard(boardId, newTitle) {
    const originalBoard = this.data.boards.find(b => b.id === boardId);
    if (!originalBoard) return null;

    const newBoard = {
      ...originalBoard,
      id: Date.now().toString(),
      title: newTitle || `${originalBoard.title} (Cópia)`,
      createdAt: new Date().toISOString(),
      isFavorite: false,
      columns: originalBoard.columns.map(col => ({
        ...col,
        id: `${col.id}-${Date.now()}`,
        tasks: col.tasks.map(task => ({
          ...task,
          id: `${task.id}-${Date.now()}`,
          createdAt: new Date().toISOString()
        }))
      }))
    };

    this.data.boards.push(newBoard);
    this.saveData();
    return newBoard;
  }

  // Column operations
  listColumns(boardId) {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return null;
    
    return board.columns.map(col => ({
      id: col.id,
      title: col.title,
      color: col.color,
      tasksCount: col.tasks.length
    }));
  }

  createColumn(boardId, title, color = 'bg-gray-500') {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return null;

    const newColumn = {
      id: Date.now().toString(),
      title: title.trim(),
      color,
      tasks: []
    };

    board.columns.push(newColumn);
    this.saveData();
    return newColumn;
  }

  editColumn(boardId, columnId, updates) {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return null;

    const column = board.columns.find(c => c.id === columnId);
    if (!column) return null;

    if (updates.title) column.title = updates.title.trim();
    if (updates.color) column.color = updates.color;

    this.saveData();
    return column;
  }

  deleteColumn(boardId, columnId) {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return false;

    const initialLength = board.columns.length;
    board.columns = board.columns.filter(c => c.id !== columnId);
    const deleted = board.columns.length < initialLength;
    if (deleted) this.saveData();
    return deleted;
  }

  // Task operations
  listTasks(boardId, columnId) {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return null;

    const column = board.columns.find(c => c.id === columnId);
    if (!column) return null;

    return column.tasks;
  }

  createTask(boardId, columnId, taskData) {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return null;

    const column = board.columns.find(c => c.id === columnId);
    if (!column) return null;

    const newTask = {
      id: Date.now().toString(),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      priority: taskData.priority || 'medium',
      assignee: taskData.assignee?.trim() || '',
      dueDate: taskData.dueDate || '',
      tags: taskData.tags || [],
      completed: false,
      createdAt: new Date().toISOString(),
      checklist: []
    };

    column.tasks.push(newTask);
    this.saveData();
    return newTask;
  }

  editTask(boardId, taskId, updates) {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return null;

    let targetTask = null;
    for (const column of board.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) {
        targetTask = task;
        break;
      }
    }

    if (!targetTask) return null;

    // Update task properties
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        targetTask[key] = updates[key];
      }
    });

    this.saveData();
    return targetTask;
  }

  moveTask(boardId, taskId, targetColumnId) {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return false;

    let sourceColumn = null;
    let task = null;

    // Find task and source column
    for (const column of board.columns) {
      const taskIndex = column.tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        sourceColumn = column;
        task = column.tasks.splice(taskIndex, 1)[0];
        break;
      }
    }

    if (!task) return false;

    // Find target column
    const targetColumn = board.columns.find(c => c.id === targetColumnId);
    if (!targetColumn) {
      // Restore task to source column if target not found
      sourceColumn.tasks.push(task);
      return false;
    }

    // Move task to target column
    targetColumn.tasks.push(task);
    this.saveData();
    return true;
  }

  deleteTask(boardId, taskId) {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return false;

    for (const column of board.columns) {
      const initialLength = column.tasks.length;
      column.tasks = column.tasks.filter(t => t.id !== taskId);
      if (column.tasks.length < initialLength) {
        this.saveData();
        return true;
      }
    }
    return false;
  }

  completeTask(boardId, taskId) {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return null;

    for (const column of board.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.saveData();
        return task;
      }
    }
    return null;
  }

  // Checklist operations
  addChecklistItem(boardId, taskId, text) {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return null;

    for (const column of board.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) {
        const newItem = {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false
        };
        task.checklist.push(newItem);
        this.saveData();
        return newItem;
      }
    }
    return null;
  }

  toggleChecklistItem(boardId, taskId, itemId) {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return null;

    for (const column of board.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) {
        const item = task.checklist.find(i => i.id === itemId);
        if (item) {
          item.completed = !item.completed;
          this.saveData();
          return item;
        }
      }
    }
    return null;
  }

  removeChecklistItem(boardId, taskId, itemId) {
    const board = this.data.boards.find(b => b.id === boardId);
    if (!board) return false;

    for (const column of board.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) {
        const initialLength = task.checklist.length;
        task.checklist = task.checklist.filter(i => i.id !== itemId);
        if (task.checklist.length < initialLength) {
          this.saveData();
          return true;
        }
      }
    }
    return false;
  }
}

// HTTP Server
const api = new TasksAPI();

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;
  const method = req.method;

  res.setHeader('Content-Type', 'application/json');

  // Helper function to send JSON response
  const sendJSON = (data, status = 200) => {
    res.writeHead(status);
    res.end(JSON.stringify(data));
  };

  // Helper function to get request body
  const getBody = () => {
    return new Promise((resolve) => {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          resolve({});
        }
      });
    });
  };

  // Route handling
  (async () => {
    try {
      // Boards
      if (pathname === '/boards' && method === 'GET') {
        sendJSON({ boards: api.listBoards() });
      } else if (pathname === '/boards' && method === 'POST') {
        const body = await getBody();
        const board = api.createBoard(body.title, body.description, body.color);
        sendJSON({ board });
      } else if (pathname.startsWith('/boards/') && method === 'PUT') {
        const boardId = pathname.split('/')[2];
        const body = await getBody();
        const board = api.editBoard(boardId, body);
        if (board) sendJSON({ board });
        else sendJSON({ error: 'Board not found' }, 404);
      } else if (pathname.startsWith('/boards/') && method === 'DELETE') {
        const boardId = pathname.split('/')[2];
        const deleted = api.deleteBoard(boardId);
        sendJSON({ deleted });
      } else if (pathname.endsWith('/duplicate') && method === 'POST') {
        const boardId = pathname.split('/')[2];
        const body = await getBody();
        const board = api.duplicateBoard(boardId, body.title);
        if (board) sendJSON({ board });
        else sendJSON({ error: 'Board not found' }, 404);
      }
      
      // Columns
      else if (pathname.includes('/columns') && method === 'GET') {
        const boardId = pathname.split('/')[2];
        const columns = api.listColumns(boardId);
        if (columns) sendJSON({ columns });
        else sendJSON({ error: 'Board not found' }, 404);
      } else if (pathname.includes('/columns') && method === 'POST') {
        const boardId = pathname.split('/')[2];
        const body = await getBody();
        const column = api.createColumn(boardId, body.title, body.color);
        if (column) sendJSON({ column });
        else sendJSON({ error: 'Board not found' }, 404);
      }
      
      // Tasks
      else if (pathname.includes('/columns/') && pathname.includes('/tasks') && method === 'GET') {
        const parts = pathname.split('/');
        const boardId = parts[2];
        const columnId = parts[4];
        const tasks = api.listTasks(boardId, columnId);
        if (tasks) sendJSON({ tasks });
        else sendJSON({ error: 'Board or column not found' }, 404);
      } else if (pathname.includes('/columns/') && pathname.includes('/tasks') && method === 'POST') {
        const parts = pathname.split('/');
        const boardId = parts[2];
        const columnId = parts[4];
        const body = await getBody();
        const task = api.createTask(boardId, columnId, body);
        if (task) sendJSON({ task });
        else sendJSON({ error: 'Board or column not found' }, 404);
      } else if (pathname.includes('/tasks/') && method === 'PUT') {
        const parts = pathname.split('/');
        const boardId = parts[2];
        const taskId = parts[4];
        const body = await getBody();
        const task = api.editTask(boardId, taskId, body);
        if (task) sendJSON({ task });
        else sendJSON({ error: 'Task not found' }, 404);
      }
      
      // Default
      else {
        sendJSON({ error: 'Endpoint not found' }, 404);
      }
    } catch (error) {
      console.error('API Error:', error);
      sendJSON({ error: 'Internal server error' }, 500);
    }
  })();
});

server.listen(PORT, () => {
  console.log(`🚀 Claude Code Tasks API running on http://localhost:${PORT}`);
  console.log(`📝 Managing tasks for: ${TASKS_FILE}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`  GET    /boards                    - List all boards`);
  console.log(`  POST   /boards                    - Create board`);
  console.log(`  PUT    /boards/:id                - Edit board`);
  console.log(`  DELETE /boards/:id                - Delete board`);
  console.log(`  POST   /boards/:id/duplicate      - Duplicate board`);
  console.log(`  GET    /boards/:id/columns        - List columns`);
  console.log(`  POST   /boards/:id/columns        - Create column`);
  console.log(`  GET    /boards/:id/columns/:id/tasks - List tasks`);
  console.log(`  POST   /boards/:id/columns/:id/tasks - Create task`);
  console.log(`  PUT    /boards/:id/tasks/:id      - Edit task`);
  console.log(`\n🔗 Integration ready! Use CLAUDE.md commands to manage tasks.`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please stop the existing server or use a different port.`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Claude Code Tasks API...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});