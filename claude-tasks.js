#!/usr/bin/env node

/**
 * Claude Code Task Manager
 * CLI tool para gerenciar o organizador de tarefas de qualquer projeto
 */

const http = require('http');
const path = require('path');

const API_BASE = 'http://localhost:5555';
const ORGANIZER_URL = 'http://localhost:3000/dashboard/tasks';

// Utility functions
const makeRequest = (endpoint, method = 'GET', data = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, API_BASE);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(jsonData);
          } else {
            reject(new Error(jsonData.error || `HTTP ${res.statusCode}`));
          }
        } catch (error) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const formatPriority = (priority) => {
  const colors = {
    low: '\x1b[32m',     // Green
    medium: '\x1b[33m',  // Yellow
    high: '\x1b[31m',    // Red
    urgent: '\x1b[35m'   // Magenta
  };
  const reset = '\x1b[0m';
  return `${colors[priority] || ''}${priority.toUpperCase()}${reset}`;
};

// Command handlers
const commands = {
  async 'list-boards'() {
    try {
      const response = await makeRequest('/boards');
      const boards = response.boards;
      
      console.log('\n📋 Quadros Disponíveis:\n');
      if (boards.length === 0) {
        console.log('   Nenhum quadro encontrado.');
      } else {
        boards.forEach(board => {
          const favorite = board.isFavorite ? '⭐' : '  ';
          console.log(`${favorite} ${board.title} (${board.id})`);
          if (board.description) {
            console.log(`     📝 ${board.description}`);
          }
          console.log(`     📊 ${board.columnsCount} colunas, ${board.tasksCount} tarefas`);
          console.log(`     📅 Criado em: ${formatDate(board.createdAt)}\n`);
        });
      }
    } catch (error) {
      console.error('❌ Erro ao listar quadros:', error.message);
    }
  },

  async 'create-board'(title, description = '', color = 'bg-blue-500') {
    if (!title) {
      console.error('❌ Título do quadro é obrigatório');
      return;
    }

    try {
      const response = await makeRequest('/boards', 'POST', {
        title,
        description,
        color
      });
      
      console.log('✅ Quadro criado com sucesso!');
      console.log(`📋 ${response.board.title} (${response.board.id})`);
      if (response.board.description) {
        console.log(`📝 ${response.board.description}`);
      }
    } catch (error) {
      console.error('❌ Erro ao criar quadro:', error.message);
    }
  },

  async 'list-columns'(boardId) {
    if (!boardId) {
      console.error('❌ ID do quadro é obrigatório');
      return;
    }

    try {
      const response = await makeRequest(`/boards/${boardId}/columns`);
      const columns = response.columns;
      
      console.log(`\n📄 Colunas do Quadro (${boardId}):\n`);
      if (columns.length === 0) {
        console.log('   Nenhuma coluna encontrada.');
      } else {
        columns.forEach(column => {
          console.log(`   📂 ${column.title} (${column.id})`);
          console.log(`      🎯 ${column.tasksCount} tarefas\n`);
        });
      }
    } catch (error) {
      console.error('❌ Erro ao listar colunas:', error.message);
    }
  },

  async 'create-column'(boardId, title, color = 'bg-gray-500') {
    if (!boardId || !title) {
      console.error('❌ ID do quadro e título da coluna são obrigatórios');
      return;
    }

    try {
      const response = await makeRequest(`/boards/${boardId}/columns`, 'POST', {
        title,
        color
      });
      
      console.log('✅ Coluna criada com sucesso!');
      console.log(`📂 ${response.column.title} (${response.column.id})`);
    } catch (error) {
      console.error('❌ Erro ao criar coluna:', error.message);
    }
  },

  async 'list-tasks'(boardId, columnId) {
    if (!boardId || !columnId) {
      console.error('❌ ID do quadro e ID da coluna são obrigatórios');
      return;
    }

    try {
      const response = await makeRequest(`/boards/${boardId}/columns/${columnId}/tasks`);
      const tasks = response.tasks;
      
      console.log(`\n📝 Tarefas da Coluna (${columnId}):\n`);
      if (tasks.length === 0) {
        console.log('   Nenhuma tarefa encontrada.');
      } else {
        tasks.forEach(task => {
          const completed = task.completed ? '✅' : '⏳';
          const checklistProgress = task.checklist?.length > 0 ? 
            ` [${task.checklist.filter(i => i.completed).length}/${task.checklist.length}]` : '';
          
          console.log(`${completed} ${task.title} (${task.id})`);
          console.log(`     🎯 Prioridade: ${formatPriority(task.priority)}`);
          if (task.assignee) {
            console.log(`     👤 Responsável: ${task.assignee}`);
          }
          if (task.dueDate) {
            console.log(`     📅 Prazo: ${formatDate(task.dueDate)}`);
          }
          if (task.tags?.length > 0) {
            console.log(`     🏷️  Tags: ${task.tags.join(', ')}`);
          }
          if (checklistProgress) {
            console.log(`     ✓ Checklist: ${checklistProgress}`);
          }
          if (task.description) {
            console.log(`     📄 ${task.description}`);
          }
          console.log('');
        });
      }
    } catch (error) {
      console.error('❌ Erro ao listar tarefas:', error.message);
    }
  },

  async 'create-task'(boardId, columnId, title, options = {}) {
    if (!boardId || !columnId || !title) {
      console.error('❌ ID do quadro, ID da coluna e título da tarefa são obrigatórios');
      return;
    }

    try {
      const taskData = {
        title,
        description: options.description || '',
        priority: options.priority || 'medium',
        assignee: options.assignee || '',
        dueDate: options.dueDate || '',
        tags: options.tags ? options.tags.split(',').map(tag => tag.trim()) : []
      };

      console.log(`🔄 Criando tarefa na coluna ${columnId} do quadro ${boardId}...`);
      const response = await makeRequest(`/boards/${boardId}/columns/${columnId}/tasks`, 'POST', taskData);
      
      console.log('✅ Tarefa criada com sucesso!');
      console.log(`📝 ${response.task.title} (${response.task.id})`);
      console.log(`🎯 Prioridade: ${formatPriority(response.task.priority)}`);
      if (response.task.assignee) {
        console.log(`👤 Responsável: ${response.task.assignee}`);
      }
    } catch (error) {
      console.error('❌ Erro ao criar tarefa:', error.message);
    }
  },

  async 'complete-task'(boardId, taskId) {
    if (!boardId || !taskId) {
      console.error('❌ ID do quadro e ID da tarefa são obrigatórios');
      return;
    }

    try {
      const response = await makeRequest(`/boards/${boardId}/tasks/${taskId}`, 'PUT', {
        completed: true
      });
      
      console.log(`✅ Tarefa ${response.task.completed ? 'concluída' : 'reaberta'}!`);
      console.log(`📝 ${response.task.title}`);
    } catch (error) {
      console.error('❌ Erro ao atualizar tarefa:', error.message);
    }
  },

  async 'add-checklist-item'(boardId, taskId, text) {
    if (!boardId || !taskId || !text) {
      console.error('❌ ID do quadro, ID da tarefa e texto do item são obrigatórios');
      return;
    }

    try {
      // Note: This would need to be implemented in the API
      console.log('📝 Funcionalidade de checklist será implementada na próxima versão da API');
    } catch (error) {
      console.error('❌ Erro ao adicionar item ao checklist:', error.message);
    }
  },

  'help'() {
    console.log(`
🤖 Claude Code Task Manager

📋 COMANDOS DE QUADROS:
  list-boards                              Lista todos os quadros
  create-board "Nome" ["Descrição"] [cor]  Cria novo quadro
  
📂 COMANDOS DE COLUNAS:  
  list-columns <board-id>                  Lista colunas do quadro
  create-column <board-id> "Nome" [cor]    Cria nova coluna
  
📝 COMANDOS DE TAREFAS:
  list-tasks <board-id> <column-id>        Lista tarefas da coluna
  create-task <board-id> <column-id> "Título" [opções]
  complete-task <board-id> <task-id>       Marca/desmarca como concluída
  
🔗 LINKS ÚTEIS:
  Organizador: ${ORGANIZER_URL}
  API Local:   ${API_BASE}

💡 EXEMPLOS:
  node claude-tasks.js list-boards
  node claude-tasks.js create-board "Meu Projeto" "Descrição do projeto"
  node claude-tasks.js create-task board123 todo "Implementar feature X" --priority high --assignee "João"

⚙️  Para funcionar, certifique-se de que:
  1. O organizador está rodando em localhost:3000
  2. A API está rodando em localhost:5555 (node claude-tasks-api.js)
`);
  },

  'status'() {
    console.log('\n🔍 Verificando status da integração...\n');
    
    // Check API
    makeRequest('/boards')
      .then(() => {
        console.log('✅ API Local (localhost:5555) - Conectada');
      })
      .catch(() => {
        console.log('❌ API Local (localhost:5555) - Desconectada');
        console.log('   Execute: node claude-tasks-api.js');
      });

    console.log(`🌐 Organizador: ${ORGANIZER_URL}`);
    console.log('   Acesse manualmente para verificar se está funcionando\n');
  }
};

// CLI argument parsing
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'help') {
  commands.help();
  process.exit(0);
}

if (!commands[command]) {
  console.error(`❌ Comando desconhecido: ${command}`);
  console.log('\n💡 Use "help" para ver comandos disponíveis');
  process.exit(1);
}

// Parse additional arguments
const commandArgs = args.slice(1);

// Parse options (--key value format)
const options = {};
for (let i = 0; i < commandArgs.length; i++) {
  if (commandArgs[i].startsWith('--')) {
    const key = commandArgs[i].substring(2);
    const value = commandArgs[i + 1];
    if (value && !value.startsWith('--')) {
      options[key] = value;
      i++; // Skip next argument as it's the value
    }
  }
}

// Execute command
try {
  const result = commands[command](...commandArgs.filter(arg => !arg.startsWith('--')), options);
  if (result instanceof Promise) {
    result.catch(error => {
      console.error('❌ Erro inesperado:', error.message);
      process.exit(1);
    });
  }
} catch (error) {
  console.error('❌ Erro inesperado:', error.message);
  process.exit(1);
}