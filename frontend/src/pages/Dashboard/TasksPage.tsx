import { useState } from 'react';
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
  ArrowRight
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
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const TasksPage = () => {
  const [columns, setColumns] = useState<Column[]>([
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
          completed: false
        },
        {
          id: '2',
          title: 'Configurar integração webhook',
          description: 'Implementar webhook para sincronizar leads',
          priority: 'medium',
          assignee: 'Maria Santos',
          dueDate: '2024-12-20',
          tags: ['técnico', 'integração'],
          completed: false
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
          completed: false
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
          completed: false
        }
      ]
    },
    {
      id: 'done',
      title: 'Concluído',
      color: 'bg-green-500',
      tasks: [
        {
          id: '5',
          title: 'Setup Google Analytics',
          description: 'Configurar tracking completo no site',
          priority: 'medium',
          assignee: 'Claude AI',
          dueDate: '2024-12-10',
          tags: ['analytics', 'setup'],
          completed: true
        }
      ]
    }
  ]);

  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);

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
      
      // Find source and target columns
      const sourceColumn = newColumns.find(col => col.id === draggedFrom);
      const targetColumn = newColumns.find(col => col.id === targetColumnId);
      
      if (!sourceColumn || !targetColumn) return prev;
      
      // Find and remove task from source
      const taskIndex = sourceColumn.tasks.findIndex(task => task.id === draggedTask);
      if (taskIndex === -1) return prev;
      
      const [movedTask] = sourceColumn.tasks.splice(taskIndex, 1);
      
      // Add task to target
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
          <button className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105">
            <Plus className="h-4 w-4" />
            <span className="font-medium">Nova Tarefa</span>
          </button>
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
              <button className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Tasks */}
            <div className="space-y-3 min-h-[200px]">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-all duration-300 cursor-move hover:shadow-lg hover:shadow-primary-500/10"
                >
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {task.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      )}
                      <div className="flex items-center space-x-2">
                        {getPriorityIcon(task.priority)}
                      </div>
                    </div>
                    <button className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
                      <MoreHorizontal className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Task Content */}
                  <div className="mb-3">
                    <h4 className="font-medium text-white mb-1">{task.title}</h4>
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
                    <div className="flex items-center space-x-1">
                      <button className="p-1 rounded text-gray-400 hover:text-blue-400 transition-colors">
                        <Edit3 className="h-3 w-3" />
                      </button>
                      <button className="p-1 rounded text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Task Button */}
              <button className="w-full p-3 border-2 border-dashed border-gray-700/50 rounded-xl text-gray-400 hover:text-white hover:border-gray-600/50 transition-all duration-300 flex items-center justify-center space-x-2">
                <Plus className="h-4 w-4" />
                <span className="text-sm font-medium">Adicionar tarefa</span>
              </button>
            </div>
          </div>
        ))}
      </div>

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
                {Math.round((columns.reduce((acc, col) => acc + col.tasks.filter(t => t.completed).length, 0) / columns.reduce((acc, col) => acc + col.tasks.length, 0)) * 100) || 0}%
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