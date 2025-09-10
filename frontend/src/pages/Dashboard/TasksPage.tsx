import { useState, useEffect } from 'react';
import { 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  User, 
  CheckCircle2, 
  Circle, 
  Clock,
  Flag,
  Edit3,
  Trash2,
  ArrowRight,
  X,
  Save,
  AlertCircle,
  Settings
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  dueDate?: string;
  tags: string[];
  completed: boolean;
  createdAt: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const TasksPage = () => {
  // Load initial data from localStorage or use default
  const loadInitialData = (): Column[] => {
    const saved = localStorage.getItem('kanban-data');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 'todo',
        title: 'Para Fazer',
        color: 'bg-gray-500',
        tasks: [
          {
            id: '1',
            title: 'Revisar proposta comercial',
            description: 'Analisar proposta da TechCorp e ajustar valores',
            priority: 'high',
            assignee: 'João Silva',
            dueDate: '2024-12-15',
            tags: ['vendas', 'proposta'],
            completed: false,
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Configurar integração webhook',
            description: 'Implementar webhook para sincronizar leads',
            priority: 'medium',
            assignee: 'Maria Santos',
            dueDate: '2024-12-20',
            tags: ['técnico', 'integração'],
            completed: false,
            createdAt: new Date().toISOString()
          }
        ]
      },
      {
        id: 'doing',
        title: 'Em Andamento',
        color: 'bg-blue-500',
        tasks: [
          {
            id: '3',
            title: 'Análise de performance Q4',
            description: 'Relatório completo de métricas do último trimestre',
            priority: 'high',
            assignee: 'Ana Costa',
            dueDate: '2024-12-18',
            tags: ['relatório', 'análise'],
            completed: false,
            createdAt: new Date().toISOString()
          }
        ]
      },
      {
        id: 'review',
        title: 'Em Revisão',
        color: 'bg-yellow-500',
        tasks: [
          {
            id: '4',
            title: 'Documentação API v2',
            description: 'Documentar novos endpoints da API',
            priority: 'medium',
            assignee: 'Pedro Lima',
            dueDate: '2024-12-22',
            tags: ['documentação', 'api'],
            completed: false,
            createdAt: new Date().toISOString()
          }
        ]
      },
      {
        id: 'done',
        title: 'Concluído',
        color: 'bg-green-500',
        tasks: []
      }
    ];
  };

  const [columns, setColumns] = useState<Column[]>(loadInitialData);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newColumnColor, setNewColumnColor] = useState('bg-purple-500');

  // Task form state
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    assignee: '',
    dueDate: '',
    tags: ''
  });

  // Save to localStorage whenever columns change
  useEffect(() => {
    localStorage.setItem('kanban-data', JSON.stringify(columns));
  }, [columns]);

  // Reset form
  const resetTaskForm = () => {
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: ''
    });
    setEditingTask(null);
  };

  // Open task modal for editing
  const openEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      assignee: task.assignee || '',
      dueDate: task.dueDate || '',
      tags: task.tags.join(', ')
    });
    setShowTaskModal(true);
  };

  // Save task (create or update)
  const saveTask = (columnId: string) => {
    if (!taskForm.title.trim()) return;

    const newTask: Task = {
      id: editingTask?.id || Date.now().toString(),
      title: taskForm.title.trim(),
      description: taskForm.description.trim() || undefined,
      priority: taskForm.priority,
      assignee: taskForm.assignee.trim() || undefined,
      dueDate: taskForm.dueDate || undefined,
      tags: taskForm.tags ? taskForm.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      completed: false,
      createdAt: editingTask?.createdAt || new Date().toISOString()
    };

    setColumns(prev => {
      const newColumns = [...prev];
      
      if (editingTask) {
        // Update existing task
        newColumns.forEach(col => {
          const taskIndex = col.tasks.findIndex(t => t.id === editingTask.id);
          if (taskIndex >= 0) {
            col.tasks[taskIndex] = newTask;
          }
        });
      } else {
        // Add new task to specified column
        const targetColumn = newColumns.find(col => col.id === columnId);
        if (targetColumn) {
          targetColumn.tasks.push(newTask);
        }
      }
      
      return newColumns;
    });

    setShowTaskModal(false);
    resetTaskForm();
  };

  // Delete task
  const deleteTask = (taskId: string) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setColumns(prev => {
        const newColumns = [...prev];
        newColumns.forEach(col => {
          col.tasks = col.tasks.filter(task => task.id !== taskId);
        });
        return newColumns;
      });
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setColumns(prev => {
      const newColumns = [...prev];
      newColumns.forEach(col => {
        const task = col.tasks.find(t => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      });
      return newColumns;
    });
  };

  // Add new column
  const addColumn = () => {
    if (!newColumnTitle.trim()) return;
    
    const newColumn: Column = {
      id: Date.now().toString(),
      title: newColumnTitle.trim(),
      color: newColumnColor,
      tasks: []
    };

    setColumns(prev => [...prev, newColumn]);
    setNewColumnTitle('');
    setShowColumnModal(false);
  };

  // Delete column
  const deleteColumn = (columnId: string) => {
    if (confirm('Tem certeza que deseja excluir esta coluna? Todas as tarefas serão perdidas.')) {
      setColumns(prev => prev.filter(col => col.id !== columnId));
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, taskId: string, columnId: string) => {
    setDraggedTask(taskId);
    setDraggedFrom(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedTask || !draggedFrom || draggedFrom === targetColumnId) {
      return;
    }

    setColumns(prev => {
      const newColumns = [...prev];
      
      const sourceColumn = newColumns.find(col => col.id === draggedFrom);
      const targetColumn = newColumns.find(col => col.id === targetColumnId);
      
      if (!sourceColumn || !targetColumn) return prev;
      
      const taskIndex = sourceColumn.tasks.findIndex(task => task.id === draggedTask);
      if (taskIndex === -1) return prev;
      
      const [movedTask] = sourceColumn.tasks.splice(taskIndex, 1);
      targetColumn.tasks.push(movedTask);
      
      return newColumns;
    });
    
    setDraggedTask(null);
    setDraggedFrom(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Flag className="h-3 w-3 text-red-400" />;
      case 'high': return <Flag className="h-3 w-3 text-orange-400" />;
      case 'medium': return <Flag className="h-3 w-3 text-yellow-400" />;
      case 'low': return <Flag className="h-3 w-3 text-green-400" />;
      default: return <Flag className="h-3 w-3 text-gray-400" />;
    }
  };

  const colorOptions = [
    'bg-gray-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 
    'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'
  ];

  return (
    <div className="p-6 min-h-screen bg-pure-black text-pure-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-white via-gray-100 to-primary-300 bg-clip-text text-transparent">
              Organizador de Tarefas
            </h1>
            <p className="text-gray-400 mt-2">
              Gerencie suas tarefas e projetos de forma visual e eficiente
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowColumnModal(true)}
              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
              <span className="font-medium">Nova Coluna</span>
            </button>
            <button 
              onClick={() => setShowTaskModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              <span className="font-medium">Nova Tarefa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-80"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                <h3 className="font-bold text-white">{column.title}</h3>
                <span className="bg-gray-800/50 text-gray-400 px-2 py-1 rounded-lg text-xs font-medium">
                  {column.tasks.length}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => saveTask(column.id)}
                  className="p-1 rounded-lg text-gray-400 hover:text-green-400 hover:bg-gray-800/50 transition-colors"
                  title="Adicionar tarefa aqui"
                >
                  <Plus className="h-4 w-4" />
                </button>
                {columns.length > 1 && (
                  <button 
                    onClick={() => deleteColumn(column.id)}
                    className="p-1 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800/50 transition-colors"
                    title="Excluir coluna"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-3 min-h-[200px]">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                  className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-all duration-300 cursor-move hover:shadow-lg hover:shadow-primary-500/10 ${
                    task.completed ? 'opacity-75' : ''
                  }`}
                >
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="hover:scale-110 transition-transform"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-400 flex-shrink-0 hover:text-green-400" />
                        )}
                      </button>
                      <div className="flex items-center space-x-2">
                        {getPriorityIcon(task.priority)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => openEditTask(task)}
                        className="p-1 rounded text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Edit3 className="h-3 w-3" />
                      </button>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="p-1 rounded text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Task Content */}
                  <div className="mb-3">
                    <h4 className={`font-medium mb-1 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-sm text-gray-400 line-clamp-2">{task.description}</p>
                    )}
                  </div>

                  {/* Tags */}
                  {task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-lg border border-primary-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Task Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-3">
                      {task.assignee && (
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{task.assignee}</span>
                        </div>
                      )}
                      {task.dueDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Task Button */}
              <button 
                onClick={() => {
                  resetTaskForm();
                  setShowTaskModal(true);
                  // Pre-select this column when modal opens
                  setTimeout(() => saveTask(column.id), 0);
                }}
                className="w-full p-3 border-2 border-dashed border-gray-700/50 rounded-xl text-gray-400 hover:text-white hover:border-gray-600/50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm font-medium">Adicionar tarefa</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
              </h3>
              <button 
                onClick={() => {setShowTaskModal(false); resetTaskForm();}}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm(prev => ({...prev, title: e.target.value}))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  placeholder="Digite o título da tarefa"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm(prev => ({...prev, description: e.target.value}))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  rows={3}
                  placeholder="Descreva a tarefa (opcional)"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prioridade
                </label>
                <select
                  value={taskForm.priority}
                  onChange={(e) => setTaskForm(prev => ({...prev, priority: e.target.value as Task['priority']}))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>

              {/* Assignee & Due Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Responsável
                  </label>
                  <input
                    type="text"
                    value={taskForm.assignee}
                    onChange={(e) => setTaskForm(prev => ({...prev, assignee: e.target.value}))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    placeholder="Nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Data limite
                  </label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm(prev => ({...prev, dueDate: e.target.value}))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={taskForm.tags}
                  onChange={(e) => setTaskForm(prev => ({...prev, tags: e.target.value}))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  placeholder="vendas, urgent, cliente (separadas por vírgula)"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {setShowTaskModal(false); resetTaskForm();}}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => saveTask('todo')}
                disabled={!taskForm.title.trim()}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 disabled:from-gray-600 disabled:to-gray-600 px-4 py-2 rounded-lg text-white transition-all duration-300"
              >
                <Save className="h-4 w-4" />
                <span>{editingTask ? 'Salvar' : 'Criar'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Column Modal */}
      {showColumnModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Nova Coluna</h3>
              <button 
                onClick={() => setShowColumnModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título da Coluna
                </label>
                <input
                  type="text"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  placeholder="Ex: Em Teste"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cor
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewColumnColor(color)}
                      className={`w-8 h-8 rounded-lg ${color} ${
                        newColumnColor === color ? 'ring-2 ring-white' : ''
                      } transition-all hover:scale-110`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowColumnModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={addColumn}
                disabled={!newColumnTitle.trim()}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 disabled:from-gray-600 disabled:to-gray-600 px-4 py-2 rounded-lg text-white transition-all duration-300"
              >
                <Plus className="h-4 w-4" />
                <span>Criar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Footer */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {columns.reduce((acc, col) => acc + col.tasks.filter(t => !t.completed).length, 0)}
              </div>
              <div className="text-sm text-gray-400">Tarefas Pendentes</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {columns.reduce((acc, col) => acc + col.tasks.filter(t => t.completed).length, 0)}
              </div>
              <div className="text-sm text-gray-400">Concluídas</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
              <Flag className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {columns.reduce((acc, col) => acc + col.tasks.filter(t => t.priority === 'urgent' || t.priority === 'high').length, 0)}
              </div>
              <div className="text-sm text-gray-400">Alta Prioridade</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {Math.round((columns.reduce((acc, col) => acc + col.tasks.filter(t => t.completed).length, 0) / Math.max(1, columns.reduce((acc, col) => acc + col.tasks.length, 0))) * 100) || 0}%
              </div>
              <div className="text-sm text-gray-400">Progresso Geral</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;