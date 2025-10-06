import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { boardService } from '../../services/boardService';
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
  Settings,
  ListChecks,
  Minus,
  ChevronDown,
  Grid3X3,
  Copy,
  Star,
  Share2,
  Mail,
  Users,
  Upload,
  FolderPlus,
  LayoutGrid,
  List,
  Gauge,
  BarChart3,
  TrendingUp,
  Target,
  Zap,
  AlertTriangle,
  GripVertical,
  CheckSquare,
  Square,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';
import { ActivityFeed } from '@/components/ActivityFeed';
import { ToastContainer } from '@/components/Notifications';
import { ImportModal } from '@/components/ImportModal';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

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
  checklist: ChecklistItem[];
  columnId?: string;
  subColumnId?: string | null;
  position?: number;
  movedToColumnAt?: string;
}

interface SubColumn {
  id: string;
  title: string;
  position: number;
  columnId: string;
  tasks: Task[];
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
  isExpanded?: boolean;
  subColumns?: SubColumn[];
  position?: number;
  boardId?: string;
  wipLimit?: number;
  enforceWipLimit?: boolean;
}

interface BoardMember {
  id: string;
  email: string;
  name?: string;
  permission: 'view' | 'edit' | 'admin';
  invitedAt: string;
  acceptedAt?: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  inviteToken?: string;
}

interface Board {
  id: string;
  title: string;
  description?: string;
  color: string;
  isFavorite: boolean;
  createdAt: string;
  columns: Column[];
  owner?: string;
  members?: BoardMember[];
  isShared?: boolean;
}

const TasksPage = () => {
  const [searchParams] = useSearchParams();

  // Load boards from API
  useEffect(() => {
    const loadBoards = async () => {
      try {
        setLoading(true);
        const apiBoards = await boardService.getBoards();
        console.log('📋 Boards carregados da API:', apiBoards);

        if (apiBoards.length > 0) {
          setBoards(apiBoards);
          if (!currentBoardId) {
            setCurrentBoardId(apiBoards[0].id);
          }
        } else {
          // Fallback para localStorage se API não retornar boards
          console.log('📋 Nenhum board na API, usando localStorage como fallback');
          const localBoards = loadInitialData();
          setBoards(localBoards);
          if (localBoards.length > 0 && !currentBoardId) {
            setCurrentBoardId(localBoards[0].id);
          }
        }
      } catch (error) {
        console.error('❌ Erro ao carregar boards da API:', error);
        // Fallback para localStorage em caso de erro
        const localBoards = loadInitialData();
        setBoards(localBoards);
        if (localBoards.length > 0 && !currentBoardId) {
          setCurrentBoardId(localBoards[0].id);
        }
      } finally {
        setLoading(false);
      }
    };

    loadBoards();
  }, []);

  // Function to create ERP IA Orion board
  const getERPBoard = (): Board => ({
    id: 'erp-ia-orion',
    title: 'ERP IA Orion - Sistema de Gestão Inteligente',
    description: 'Board completo para organização do projeto ERP com IA integrada',
    color: 'bg-indigo-600',
    isFavorite: true,
    createdAt: new Date().toISOString(),
    columns: [
      {
        id: 'backlog',
        title: '📌 BACKLOG',
        color: 'bg-gray-400',
        tasks: [
          {
            id: 'task-refactor',
            title: '🔧 Refatoração de Código',
            description: 'Limpar código e corrigir warnings ESLint',
            priority: 'low',
            assignee: 'Dev Team',
            dueDate: '',
            tags: ['refatoração', 'qualidade'],
            completed: false,
            createdAt: new Date().toISOString(),
            checklist: [
              { id: 'ref-1', text: 'Corrigir ESLint warnings', completed: false },
              { id: 'ref-2', text: 'Padronizar nomenclaturas', completed: false },
              { id: 'ref-3', text: 'Remover código morto', completed: false }
            ]
          },
          {
            id: 'task-ux',
            title: '🎨 Melhorias de UX/UI',
            description: 'Aprimorar experiência do usuário',
            priority: 'low',
            assignee: 'Design Team',
            dueDate: '',
            tags: ['ux', 'frontend'],
            completed: false,
            createdAt: new Date().toISOString(),
            checklist: [
              { id: 'ux-1', text: 'Modo escuro', completed: false },
              { id: 'ux-2', text: 'Navegação breadcrumb', completed: false },
              { id: 'ux-3', text: 'Acessibilidade (WCAG)', completed: false }
            ]
          },
          {
            id: 'task-rh',
            title: '👥 Módulo de RH',
            description: 'Sistema de recursos humanos completo',
            priority: 'medium',
            assignee: 'Future Dev',
            dueDate: '',
            tags: ['nova-funcionalidade', 'rh'],
            completed: false,
            createdAt: new Date().toISOString(),
            checklist: [
              { id: 'rh-1', text: 'Cadastro de funcionários', completed: false },
              { id: 'rh-2', text: 'Folha de pagamento', completed: false },
              { id: 'rh-3', text: 'Controle de ponto', completed: false }
            ]
          }
        ]
      },
      {
        id: 'analise',
        title: '🔍 EM ANÁLISE',
        color: 'bg-yellow-400',
        tasks: []
      },
      {
        id: 'todo-erp',
        title: '📋 TODO',
        color: 'bg-blue-400',
        tasks: [
          {
            id: 'task-tests',
            title: '🔥 Suite de Testes Completa',
            description: 'Implementar testes unitários, integração e E2E',
            priority: 'urgent',
            assignee: 'Dev Team',
            dueDate: '2024-12-31',
            tags: ['crítico', 'qualidade', 'testes'],
            completed: false,
            createdAt: new Date().toISOString(),
            checklist: [
              { id: 'test-1', text: 'Configurar Jest para Backend', completed: false },
              { id: 'test-2', text: 'React Testing Library para Frontend', completed: false },
              { id: 'test-3', text: 'Cypress para testes E2E', completed: false },
              { id: 'test-4', text: 'Coverage reports', completed: false }
            ]
          },
          {
            id: 'task-prod',
            title: '🐳 Ambiente de Produção',
            description: 'Configurar Docker Compose para produção',
            priority: 'urgent',
            assignee: 'DevOps',
            dueDate: '2024-12-25',
            tags: ['crítico', 'devops', 'produção'],
            completed: false,
            createdAt: new Date().toISOString(),
            checklist: [
              { id: 'prod-1', text: 'docker-compose.prod.yml', completed: false },
              { id: 'prod-2', text: 'Nginx reverse proxy', completed: false },
              { id: 'prod-3', text: 'SSL certificates', completed: false }
            ]
          },
          {
            id: 'task-cache',
            title: '⚡ Sistema de Cache Redis',
            description: 'Implementar cache para performance',
            priority: 'urgent',
            assignee: 'Backend Dev',
            dueDate: '2024-12-28',
            tags: ['alta-prioridade', 'performance'],
            completed: false,
            createdAt: new Date().toISOString(),
            checklist: [
              { id: 'cache-1', text: 'Configurar Redis container', completed: false },
              { id: 'cache-2', text: 'Cache para ML predictions', completed: false },
              { id: 'cache-3', text: 'Invalidação automática', completed: false }
            ]
          }
        ]
      },
      {
        id: 'desenvolvimento',
        title: '🚀 EM DESENVOLVIMENTO',
        color: 'bg-orange-500',
        tasks: [
          {
            id: 'task-docs',
            title: '📚 Documentação API (Swagger)',
            description: 'Criar documentação interativa da API',
            priority: 'high',
            assignee: 'Backend Dev',
            dueDate: '',
            tags: ['alta-prioridade', 'documentação'],
            completed: false,
            createdAt: new Date().toISOString(),
            checklist: [
              { id: 'docs-1', text: 'Implementar OpenAPI 3.0 spec', completed: true },
              { id: 'docs-2', text: 'Swagger UI integration', completed: false },
              { id: 'docs-3', text: 'Interactive API explorer', completed: false }
            ]
          }
        ]
      },
      {
        id: 'teste',
        title: '🧪 EM TESTE',
        color: 'bg-purple-500',
        tasks: [
          {
            id: 'task-monitoring',
            title: '📊 Sistema de Monitoramento',
            description: 'Observabilidade completa do sistema',
            priority: 'high',
            assignee: 'DevOps Team',
            dueDate: '',
            tags: ['alta-prioridade', 'monitoramento'],
            completed: false,
            createdAt: new Date().toISOString(),
            checklist: [
              { id: 'mon-1', text: 'Prometheus + Grafana setup', completed: true },
              { id: 'mon-2', text: 'Application metrics', completed: true },
              { id: 'mon-3', text: 'Alertas automáticos', completed: false }
            ]
          }
        ]
      },
      {
        id: 'review',
        title: '👀 REVIEW',
        color: 'bg-indigo-500',
        tasks: [
          {
            id: 'task-reports',
            title: '📄 Relatórios PDF/Excel',
            description: 'Sistema de geração de relatórios',
            priority: 'high',
            assignee: 'Frontend Team',
            dueDate: '',
            tags: ['alta-prioridade', 'funcionalidade'],
            completed: false,
            createdAt: new Date().toISOString(),
            checklist: [
              { id: 'rep-1', text: 'Relatórios financeiros', completed: true },
              { id: 'rep-2', text: 'Dashboard exports', completed: true },
              { id: 'rep-3', text: 'Templates customizáveis', completed: false }
            ]
          }
        ]
      },
      {
        id: 'concluido',
        title: '✅ CONCLUÍDO',
        color: 'bg-green-500',
        tasks: [
          {
            id: 'task-notifications',
            title: '🔔 Sistema de Notificações',
            description: 'Notificações multi-canal implementadas',
            priority: 'medium',
            assignee: 'Backend Team',
            dueDate: '',
            tags: ['funcionalidade', 'completo'],
            completed: true,
            createdAt: new Date().toISOString(),
            checklist: [
              { id: 'not-1', text: 'Email notifications', completed: true },
              { id: 'not-2', text: 'Push notifications', completed: true },
              { id: 'not-3', text: 'Template management', completed: true }
            ]
          }
        ]
      },
      {
        id: 'bloqueado',
        title: '❌ BLOQUEADO',
        color: 'bg-red-500',
        tasks: []
      }
    ]
  });

  // Load initial data from localStorage or use default
  const loadInitialData = (): Board[] => {
    // Try localStorage first
    const saved = localStorage.getItem('kanban-boards');
    if (saved) {
      const data = JSON.parse(saved);
      const existingBoards = data.map((board: Board) => ({
        ...board,
        columns: board.columns?.map((column: Column) => ({
          ...column,
          tasks: column.tasks?.map((task: Task) => ({
            ...task,
            checklist: task.checklist || []
          })) || []
        })) || []
      }));
      
      // Check if ERP IA Orion board exists and wasn't intentionally deleted
      const hasERPBoard = existingBoards.some((board: Board) => board.id === 'erp-ia-orion');
      const wasDeleted = localStorage.getItem('erp-board-deleted') === 'true';

      // Only add if it doesn't exist AND wasn't intentionally deleted by user
      if (!hasERPBoard && !wasDeleted) {
        const erpBoard = getERPBoard();
        return [...existingBoards, erpBoard];
      }
      
      return existingBoards;
    }
    
    // Default boards including ERP IA Orion
    return [
      {
        id: 'main-board',
        title: 'Quadro Principal',
        description: 'Quadro principal para organização geral de tarefas',
        color: 'bg-blue-500',
        isFavorite: true,
        createdAt: new Date().toISOString(),
        columns: [
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
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: '1-1', text: 'Revisar valores propostos', completed: true },
                  { id: '1-2', text: 'Verificar margem de lucro', completed: false },
                  { id: '1-3', text: 'Ajustar condições de pagamento', completed: false }
                ]
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
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: '2-1', text: 'Criar endpoint webhook', completed: false },
                  { id: '2-2', text: 'Configurar autenticação', completed: false },
                  { id: '2-3', text: 'Testar integração', completed: false }
                ]
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
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: '3-1', text: 'Coletar dados de vendas', completed: true },
                  { id: '3-2', text: 'Analisar métricas de conversão', completed: true },
                  { id: '3-3', text: 'Gerar gráficos e visualizações', completed: false },
                  { id: '3-4', text: 'Escrever conclusões', completed: false }
                ]
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
                createdAt: new Date().toISOString(),
                checklist: []
              }
            ]
          },
          {
            id: 'done',
            title: 'Concluído',
            color: 'bg-green-500',
            tasks: []
          }
        ]
      },
      {
        id: 'marketing-board',
        title: 'Marketing',
        description: 'Campanhas e estratégias de marketing',
        color: 'bg-purple-500',
        isFavorite: false,
        createdAt: new Date().toISOString(),
        columns: [
          {
            id: 'ideas',
            title: 'Ideias',
            color: 'bg-yellow-500',
            tasks: []
          },
          {
            id: 'planning',
            title: 'Planejamento',
            color: 'bg-orange-500',
            tasks: []
          },
          {
            id: 'execution',
            title: 'Execução',
            color: 'bg-blue-500',
            tasks: []
          },
          {
            id: 'analysis',
            title: 'Análise',
            color: 'bg-green-500',
            tasks: []
          }
        ]
      },
      {
        id: 'erp-ia-orion',
        title: 'ERP IA Orion - Sistema de Gestão Inteligente',
        description: 'Board completo para organização do projeto ERP com IA integrada',
        color: 'bg-indigo-600',
        isFavorite: true,
        createdAt: new Date().toISOString(),
        columns: [
          {
            id: 'backlog',
            title: '📌 BACKLOG',
            color: 'bg-gray-400',
            tasks: [
              {
                id: 'task-refactor',
                title: '🔧 Refatoração de Código',
                description: 'Limpar código e corrigir warnings ESLint',
                priority: 'low',
                assignee: 'Dev Team',
                dueDate: '',
                tags: ['refatoração', 'qualidade'],
                completed: false,
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: 'ref-1', text: 'Corrigir ESLint warnings', completed: false },
                  { id: 'ref-2', text: 'Padronizar nomenclaturas', completed: false },
                  { id: 'ref-3', text: 'Remover código morto', completed: false }
                ]
              },
              {
                id: 'task-ux',
                title: '🎨 Melhorias de UX/UI',
                description: 'Aprimorar experiência do usuário',
                priority: 'low',
                assignee: 'Design Team',
                dueDate: '',
                tags: ['ux', 'frontend'],
                completed: false,
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: 'ux-1', text: 'Modo escuro', completed: false },
                  { id: 'ux-2', text: 'Navegação breadcrumb', completed: false },
                  { id: 'ux-3', text: 'Acessibilidade (WCAG)', completed: false }
                ]
              },
              {
                id: 'task-rh',
                title: '👥 Módulo de RH',
                description: 'Sistema de recursos humanos completo',
                priority: 'medium',
                assignee: 'Future Dev',
                dueDate: '',
                tags: ['nova-funcionalidade', 'rh'],
                completed: false,
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: 'rh-1', text: 'Cadastro de funcionários', completed: false },
                  { id: 'rh-2', text: 'Folha de pagamento', completed: false },
                  { id: 'rh-3', text: 'Controle de ponto', completed: false }
                ]
              }
            ]
          },
          {
            id: 'analise',
            title: '🔍 EM ANÁLISE',
            color: 'bg-yellow-400',
            tasks: []
          },
          {
            id: 'todo-erp',
            title: '📋 TODO',
            color: 'bg-blue-400',
            tasks: [
              {
                id: 'task-tests',
                title: '🔥 Suite de Testes Completa',
                description: 'Implementar testes unitários, integração e E2E',
                priority: 'urgent',
                assignee: 'Dev Team',
                dueDate: '2024-12-31',
                tags: ['crítico', 'qualidade', 'testes'],
                completed: false,
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: 'test-1', text: 'Configurar Jest para Backend', completed: false },
                  { id: 'test-2', text: 'React Testing Library para Frontend', completed: false },
                  { id: 'test-3', text: 'Cypress para testes E2E', completed: false },
                  { id: 'test-4', text: 'Coverage reports', completed: false }
                ]
              },
              {
                id: 'task-prod',
                title: '🐳 Ambiente de Produção',
                description: 'Configurar Docker Compose para produção',
                priority: 'urgent',
                assignee: 'DevOps',
                dueDate: '2024-12-25',
                tags: ['crítico', 'devops', 'produção'],
                completed: false,
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: 'prod-1', text: 'docker-compose.prod.yml', completed: false },
                  { id: 'prod-2', text: 'Nginx reverse proxy', completed: false },
                  { id: 'prod-3', text: 'SSL certificates', completed: false }
                ]
              },
              {
                id: 'task-cache',
                title: '⚡ Sistema de Cache Redis',
                description: 'Implementar cache para performance',
                priority: 'urgent',
                assignee: 'Backend Dev',
                dueDate: '2024-12-28',
                tags: ['alta-prioridade', 'performance'],
                completed: false,
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: 'cache-1', text: 'Configurar Redis container', completed: false },
                  { id: 'cache-2', text: 'Cache para ML predictions', completed: false },
                  { id: 'cache-3', text: 'Invalidação automática', completed: false }
                ]
              }
            ]
          },
          {
            id: 'desenvolvimento',
            title: '🚀 EM DESENVOLVIMENTO',
            color: 'bg-orange-500',
            tasks: [
              {
                id: 'task-docs',
                title: '📚 Documentação API (Swagger)',
                description: 'Criar documentação interativa da API',
                priority: 'high',
                assignee: 'Backend Dev',
                dueDate: '',
                tags: ['alta-prioridade', 'documentação'],
                completed: false,
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: 'docs-1', text: 'Implementar OpenAPI 3.0 spec', completed: true },
                  { id: 'docs-2', text: 'Swagger UI integration', completed: false },
                  { id: 'docs-3', text: 'Interactive API explorer', completed: false }
                ]
              }
            ]
          },
          {
            id: 'teste',
            title: '🧪 EM TESTE',
            color: 'bg-purple-500',
            tasks: [
              {
                id: 'task-monitoring',
                title: '📊 Sistema de Monitoramento',
                description: 'Observabilidade completa do sistema',
                priority: 'high',
                assignee: 'DevOps Team',
                dueDate: '',
                tags: ['alta-prioridade', 'monitoramento'],
                completed: false,
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: 'mon-1', text: 'Prometheus + Grafana setup', completed: true },
                  { id: 'mon-2', text: 'Application metrics', completed: true },
                  { id: 'mon-3', text: 'Alertas automáticos', completed: false }
                ]
              }
            ]
          },
          {
            id: 'review',
            title: '👀 REVIEW',
            color: 'bg-indigo-500',
            tasks: [
              {
                id: 'task-reports',
                title: '📄 Relatórios PDF/Excel',
                description: 'Sistema de geração de relatórios',
                priority: 'high',
                assignee: 'Frontend Team',
                dueDate: '',
                tags: ['alta-prioridade', 'funcionalidade'],
                completed: false,
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: 'rep-1', text: 'Relatórios financeiros', completed: true },
                  { id: 'rep-2', text: 'Dashboard exports', completed: true },
                  { id: 'rep-3', text: 'Templates customizáveis', completed: false }
                ]
              }
            ]
          },
          {
            id: 'concluido',
            title: '✅ CONCLUÍDO',
            color: 'bg-green-500',
            tasks: [
              {
                id: 'task-notifications',
                title: '🔔 Sistema de Notificações',
                description: 'Notificações multi-canal implementadas',
                priority: 'medium',
                assignee: 'Backend Team',
                dueDate: '',
                tags: ['funcionalidade', 'completo'],
                completed: true,
                createdAt: new Date().toISOString(),
                checklist: [
                  { id: 'not-1', text: 'Email notifications', completed: true },
                  { id: 'not-2', text: 'Push notifications', completed: true },
                  { id: 'not-3', text: 'Template management', completed: true }
                ]
              }
            ]
          },
          {
            id: 'bloqueado',
            title: '❌ BLOQUEADO',
            color: 'bg-red-500',
            tasks: []
          }
        ]
      }
    ];
  };

  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBoardId, setCurrentBoardId] = useState<string>('');
  const [showBoardSelector, setShowBoardSelector] = useState(false);

  // Guest access state
  const [isGuest, setIsGuest] = useState(false);
  const [guestSession, setGuestSession] = useState<{
    email: string;
    name: string;
    boardAccess: { boardId: string; permission: 'view' | 'edit' }[];
    isGuest: boolean;
  } | null>(null);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [editingBoard, setEditingBoard] = useState<Board | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  
  // Board form state
  const [boardForm, setBoardForm] = useState({
    title: '',
    description: '',
    color: 'bg-blue-500'
  });

  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);
  const [draggedSubColumn, setDraggedSubColumn] = useState<string | null>(null);
  const [draggedSubColumnFrom, setDraggedSubColumnFrom] = useState<string | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  // Enhanced drag preview state
  const [dragPreview, setDragPreview] = useState<{x: number, y: number, task: Task | null}>({x: 0, y: 0, task: null});
  const [isDragging, setIsDragging] = useState(false);

  // Multi-select state
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  // Smart drop zones state
  const [dropIndicator, setDropIndicator] = useState<{columnId: string, subColumnId?: string, index: number} | null>(null);

  // Responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Swipe gesture state
  const [touchStart, setTouchStart] = useState<{x: number, y: number, taskId: string} | null>(null);
  const [swipedTask, setSwipedTask] = useState<{taskId: string, direction: 'left' | 'right'} | null>(null);

  // Compact mode state
  const [isCompactMode, setIsCompactMode] = useState(() => {
    const saved = localStorage.getItem('compact-mode');
    return saved ? JSON.parse(saved) : false;
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newColumnColor, setNewColumnColor] = useState('bg-purple-500');
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [editingColumnTitle, setEditingColumnTitle] = useState('');
  const [targetColumnId, setTargetColumnId] = useState<string | null>(null);
  const [expandedSubColumns, setExpandedSubColumns] = useState<Record<string, boolean>>({});

  // Board sharing state
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [sharePermission, setSharePermission] = useState<'view' | 'edit'>('view');
  const [sharingBoardId, setSharingBoardId] = useState<string | null>(null);

  // Invite link modal state
  const [showInviteLinkModal, setShowInviteLinkModal] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [inviteDetails, setInviteDetails] = useState({ email: '', permission: '' });

  // Horizontal scroll state
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStartX, setScrollStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Task form state
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    assignee: '',
    dueDate: '',
    tags: '',
    checklist: [] as ChecklistItem[]
  });

  // Check for guest access
  useEffect(() => {
    const boardParam = searchParams.get('board');
    const guestParam = searchParams.get('guest');

    if (guestParam === 'true') {
      const savedGuestSession = localStorage.getItem('guest-session');
      if (savedGuestSession) {
        const session = JSON.parse(savedGuestSession);
        setIsGuest(true);
        setGuestSession(session);

        // For guests, filter boards to only show accessible ones
        const allBoards = loadInitialData();
        const accessibleBoardIds = session.boardAccess.map((access: any) => access.boardId);
        let filteredBoards = allBoards.filter(board => accessibleBoardIds.includes(board.id));

        // Se não encontrou boards válidos, dar acesso ao main-board
        if (filteredBoards.length === 0) {
          const mainBoard = allBoards.find(board => board.id === 'main-board');
          if (mainBoard) {
            filteredBoards = [mainBoard];
            // Atualizar sessão para incluir acesso ao main-board
            const updatedSession = {
              ...session,
              boardAccess: [{ boardId: 'main-board', permission: 'view' }]
            };
            setGuestSession(updatedSession);
            localStorage.setItem('guestSession', JSON.stringify(updatedSession));
          }
        }

        setBoards(filteredBoards);

        if (boardParam && filteredBoards.some(board => board.id === boardParam)) {
          setCurrentBoardId(boardParam);
        } else if (filteredBoards.length > 0) {
          setCurrentBoardId(filteredBoards[0].id);
        }
      }
    } else {
      // For normal users, set default board
      const allBoards = loadInitialData();
      setCurrentBoardId(allBoards[0]?.id || 'main-board');
    }
  }, [searchParams]);

  // Get current board
  const currentBoard = boards.find(board => board.id === currentBoardId) || boards[0];
  const columns = currentBoard?.columns || [];

  // Check if current user has permission to edit
  const canEdit = () => {
    if (!isGuest || !guestSession) return true; // Full access for owners

    const boardAccess = guestSession.boardAccess.find(access => access.boardId === currentBoardId);
    return boardAccess?.permission === 'edit';
  };

  // Get the default column for new tasks - simply use the first column
  const getDefaultTaskColumn = () => {
    // Always use the first column since column names are dynamic
    return columns.length > 0 ? columns[0].id : 'todo';
  };


  // Save to localStorage whenever boards change
  useEffect(() => {
    localStorage.setItem('kanban-boards', JSON.stringify(boards));
  }, [boards]);

  // Responsive breakpoints detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save compact mode preference
  useEffect(() => {
    localStorage.setItem('compact-mode', JSON.stringify(isCompactMode));
  }, [isCompactMode]);

  // Socket.IO integration for real-time collaboration
  const [sessionId] = useState(() => {
    // Generate a unique session ID for this browser tab
    const saved = sessionStorage.getItem('tab-session-id');
    if (saved) return saved;

    const newId = `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('tab-session-id', newId);
    return newId;
  });

  const [onlineUsers, setOnlineUsers] = useState<{
    id: string;
    name: string;
    avatar: string;
    color: string;
    joinedAt: Date;
    isEditing?: string; // taskId being edited
  }[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [taskBeingEdited, setTaskBeingEdited] = useState<string | null>(null);
  const [editingUsers, setEditingUsers] = useState<Record<string, {
    userId: string;
    userName: string;
    color: string;
  }>>({});

  // Toast notification system
  const [notifications, setNotifications] = useState<{
    id: number;
    type: 'success' | 'info' | 'warning';
    message: string;
    userName?: string;
    timestamp: Date;
  }[]>([]);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    taskId: string;
    x: number;
    y: number;
  } | null>(null);

  const showNotification = (type: 'success' | 'info' | 'warning', message: string, userName?: string) => {
    const notification = {
      id: Date.now(),
      type,
      message,
      userName,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const handleTaskUpdated = (data: any) => {
    console.log('📝 Task updated by another user:', data);
    const userName = onlineUsers.find(user => user.id === data.updatedBy)?.name || data.updatedBy || 'Alguém';

    showNotification('info', `${userName} atualizou uma tarefa`, userName);

    setRecentActivity(prev => [
      {
        type: 'task-updated',
        ...data,
        id: Date.now(),
        timestamp: new Date(),
        userName,
        taskTitle: data.task?.title || 'Tarefa'
      },
      ...prev.slice(0, 9)
    ]);

    // Update the task in local state
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === data.boardId ? {
          ...board,
          columns: board.columns?.map(column => ({
            ...column,
            tasks: column.tasks?.map(task =>
              task.id === data.task?.id ? { ...task, ...data.task } : task
            ) || []
          })) || []
        } : board
      )
    );
  };

  const handleTaskCreated = (data: any) => {
    console.log('✨ Task created by another user:', data);
    const userName = onlineUsers.find(user => user.id === data.createdBy)?.name || data.createdBy || 'Alguém';

    showNotification('success', `${userName} criou uma nova tarefa: "${data.task?.title || 'Nova tarefa'}"`, userName);

    setRecentActivity(prev => [
      {
        type: 'task-created',
        ...data,
        id: Date.now(),
        timestamp: new Date(),
        userName,
        taskTitle: data.task?.title || 'Nova tarefa'
      },
      ...prev.slice(0, 9)
    ]);

    // Add the task to local state
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === data.boardId ? {
          ...board,
          columns: board.columns?.map(column =>
            column.id === data.columnId ? {
              ...column,
              tasks: [...(column.tasks || []), data.task]
            } : column
          ) || []
        } : board
      )
    );
  };

  const handleTaskDeleted = (data: any) => {
    console.log('🗑️ Task deleted by another user:', data);
    const userName = onlineUsers.find(user => user.id === data.deletedBy)?.name || data.deletedBy || 'Alguém';

    showNotification('warning', `${userName} excluiu uma tarefa`, userName);

    setRecentActivity(prev => [
      {
        type: 'task-deleted',
        ...data,
        id: Date.now(),
        timestamp: new Date(),
        userName,
        taskTitle: data.taskTitle || 'Tarefa'
      },
      ...prev.slice(0, 9)
    ]);

    // Remove the task from local state
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === data.boardId ? {
          ...board,
          columns: board.columns?.map(column => ({
            ...column,
            tasks: column.tasks?.filter(task => task.id !== data.taskId) || []
          })) || []
        } : board
      )
    );
  };

  const handleTaskMoved = (data: any) => {
    console.log('🔄 Task moved by another user:', data);
    const userName = onlineUsers.find(user => user.id === data.movedBy)?.name || data.movedBy || 'Alguém';

    showNotification('info', `${userName} moveu uma tarefa`, userName);

    setRecentActivity(prev => [
      {
        type: 'task-moved',
        ...data,
        id: Date.now(),
        timestamp: new Date(),
        userName,
        taskTitle: data.task?.title || 'Tarefa',
        fromColumnName: data.fromColumnName || data.fromColumn,
        toColumnName: data.toColumnName || data.toColumn
      },
      ...prev.slice(0, 9)
    ]);

    // Move the task in local state
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === data.boardId ? {
          ...board,
          columns: board.columns?.map(column => {
            // Remove task from source column
            if (column.id === data.fromColumn) {
              return {
                ...column,
                tasks: column.tasks?.filter(task => task.id !== data.taskId) || []
              };
            }
            // Add task to target column
            if (column.id === data.toColumn && data.task) {
              const newTasks = [...(column.tasks || [])];
              newTasks.splice(data.newIndex, 0, data.task);
              return { ...column, tasks: newTasks };
            }
            return column;
          }) || []
        } : board
      )
    );
  };

  // Generate consistent avatar and color for user
  const generateUserAvatar = (userId: string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500', 'bg-red-500'];
    const avatars = ['👤', '🧑‍💻', '👨‍💼', '👩‍💼', '🧑‍🎨', '👨‍🔧', '👩‍🔬', '🧑‍🚀'];
    const colorIndex = userId.length % colors.length;
    const avatarIndex = userId.charCodeAt(0) % avatars.length;
    return {
      color: colors[colorIndex],
      avatar: avatars[avatarIndex],
      name: `Usuário ${userId.slice(-4)}`
    };
  };

  const handleCurrentUsers = (data: any) => {
    console.log('👥 Current users received:', data);
    if (data.users && data.users.length > 0) {
      const users = data.users.map((user: any) => {
        const userInfo = generateUserAvatar(user.userId);
        return {
          id: user.userId,
          name: userInfo.name,
          avatar: userInfo.avatar,
          color: userInfo.color,
          joinedAt: new Date()
        };
      });
      setOnlineUsers(prev => {
        const newUsers = users.filter((user: any) => !prev.find(p => p.id === user.id));
        return [...prev, ...newUsers];
      });
    }
  };

  const handleUserJoined = (data: any) => {
    console.log('👤 User joined:', data);
    const userInfo = generateUserAvatar(data.userId);

    if (data.isMe) {
      // This is the current user joining - add self to users list
      setOnlineUsers(prev => {
        const existingUser = prev.find(user => user.id === data.userId);
        if (!existingUser) {
          return [...prev, {
            id: data.userId,
            name: userInfo.name + ' (Você)',
            avatar: userInfo.avatar,
            color: userInfo.color,
            joinedAt: new Date()
          }];
        }
        return prev;
      });
      showNotification('success', 'Conectado ao sistema de colaboração em tempo real!');
    } else {
      // Another user joined
      setOnlineUsers(prev => {
        const existingUser = prev.find(user => user.id === data.userId);
        if (!existingUser) {
          return [...prev, {
            id: data.userId,
            name: userInfo.name,
            avatar: userInfo.avatar,
            color: userInfo.color,
            joinedAt: new Date()
          }];
        }
        return prev;
      });

      showNotification('info', `${userInfo.name} entrou no board`);
      setRecentActivity(prev => [
        { type: 'user-joined', ...data, id: Date.now(), timestamp: new Date(), userName: userInfo.name },
        ...prev.slice(0, 9)
      ]);
    }
  };

  const handleUserLeft = (data: any) => {
    console.log('👋 User left:', data);
    setOnlineUsers(prev => prev.filter(user => user.id !== data.userId));
    setEditingUsers(prev => {
      const newEditing = { ...prev };
      Object.keys(newEditing).forEach(taskId => {
        if (newEditing[taskId].userId === data.userId) {
          delete newEditing[taskId];
        }
      });
      return newEditing;
    });
    setRecentActivity(prev => [
      { type: 'user-left', ...data, id: Date.now(), timestamp: new Date() },
      ...prev.slice(0, 9)
    ]);
  };

  // Enhanced Socket.IO user activity tracking
  const handleUserActivity = (data: any) => {
    console.log('🎯 User activity:', data);
    if (data.activity === 'editing-task') {
      setEditingUsers(prev => ({
        ...prev,
        [data.data.taskId]: {
          userId: data.userId,
          userName: onlineUsers.find(user => user.id === data.userId)?.name || `Usuário ${data.userId.slice(-4)}`,
          color: onlineUsers.find(user => user.id === data.userId)?.color || 'bg-blue-500'
        }
      }));

      // Remove editing indicator after 3 seconds of inactivity
      setTimeout(() => {
        setEditingUsers(prev => {
          const newEditing = { ...prev };
          delete newEditing[data.data.taskId];
          return newEditing;
        });
      }, 3000);
    }
  };

  // Remove mock data - now using real users only
  // Users will be populated via Socket.IO events

  const {
    socket,
    isConnected,
    emitTaskUpdated,
    emitTaskCreated,
    emitTaskDeleted,
    emitTaskMoved,
    emitBoardUpdated,
    emitUserActivity
  } = useSocket({
    boardId: currentBoardId,
    userId: isGuest ? `guest_${guestSession?.email || sessionId}` : sessionId, // Use unique session ID for each tab
    onTaskUpdated: handleTaskUpdated,
    onTaskCreated: handleTaskCreated,
    onTaskDeleted: handleTaskDeleted,
    onTaskMoved: handleTaskMoved,
    onUserJoined: handleUserJoined,
    onUserLeft: handleUserLeft,
    onUserActivity: handleUserActivity,
    onCurrentUsers: handleCurrentUsers
  });

  // Board management functions
  const resetBoardForm = () => {
    setBoardForm({
      title: '',
      description: '',
      color: 'bg-blue-500'
    });
    setEditingBoard(null);
  };

  const openEditBoard = (board: Board) => {
    setEditingBoard(board);
    setBoardForm({
      title: board.title,
      description: board.description || '',
      color: board.color
    });
    setShowBoardModal(true);
  };

  const saveBoard = async () => {
    if (!boardForm.title.trim()) return;

    try {
      setLoading(true);

      if (editingBoard) {
        // Atualizar board existente
        console.log('📝 Atualizando board:', editingBoard.id);
        const success = await boardService.updateBoard(editingBoard.id, {
          title: boardForm.title.trim(),
          description: boardForm.description.trim() || undefined,
          color: boardForm.color
        });

        if (success) {
          // Atualizar estado local
          setBoards(prev =>
            prev.map(board =>
              board.id === editingBoard.id
                ? { ...board, title: boardForm.title.trim(), description: boardForm.description.trim(), color: boardForm.color }
                : board
            )
          );
          console.log('✅ Board atualizado com sucesso');
        } else {
          console.error('❌ Erro ao atualizar board');
          alert('Erro ao atualizar quadro. Tente novamente.');
          return;
        }
      } else {
        // Criar novo board
        console.log('➕ Criando novo board');
        const newBoard = await boardService.createBoard({
          title: boardForm.title.trim(),
          description: boardForm.description.trim() || undefined,
          color: boardForm.color,
          columns: []
        });

        if (newBoard) {
          // Adicionar ao estado local
          setBoards(prev => [...prev, newBoard]);
          setCurrentBoardId(newBoard.id);
          console.log('✅ Board criado com sucesso:', newBoard.id);
        } else {
          console.error('❌ Erro ao criar board');
          alert('Erro ao criar quadro. Tente novamente.');
          return;
        }
      }

      setShowBoardModal(false);
      resetBoardForm();
    } catch (error) {
      console.error('❌ Erro ao salvar board:', error);
      alert('Erro ao salvar quadro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const deleteBoard = async (boardId: string) => {
    if (boards.length <= 1) {
      alert('Você deve ter pelo menos um quadro!');
      return;
    }

    if (confirm('Tem certeza que deseja excluir este quadro? Todas as tarefas serão perdidas.')) {
      try {
        setLoading(true);
        console.log('🗑️ Deletando board:', boardId);

        const success = await boardService.deleteBoard(boardId);

        if (success) {
          // Remover do estado local
          setBoards(prev => prev.filter(board => board.id !== boardId));

          if (currentBoardId === boardId) {
            const remainingBoards = boards.filter(board => board.id !== boardId);
            if (remainingBoards.length > 0) {
              setCurrentBoardId(remainingBoards[0].id);
            }
          }

          console.log('✅ Board deletado com sucesso');
        } else {
          console.error('❌ Erro ao deletar board');
          alert('Erro ao excluir quadro. Tente novamente.');
        }
      } catch (error) {
        console.error('❌ Erro ao deletar board:', error);
        alert('Erro ao excluir quadro. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Import function
  const handleImport = async (data: any) => {
    try {
      setLoading(true);
      let importedCount = 0;
      let columnsCreated = 0;
      let subColumnsCreated = 0;

      // Se tem board info, atualiza o board atual
      if (data.board && data.board.title) {
        await boardService.updateBoard(currentBoardId, {
          title: data.board.title,
          description: data.board.description || '',
          color: boardForm.color
        });
      }

      // Aceita columns no nível raiz OU dentro de board
      const columnsData = data.columns || data.board?.columns;

      // Se tem colunas, processa elas
      if (columnsData && Array.isArray(columnsData)) {
        for (const colData of columnsData) {
          // Busca coluna existente pelo título OU ID
          const currentBoard = boards.find(b => b.id === currentBoardId);
          const existingColumn = currentBoard?.columns.find(c =>
            c.title === colData.title || c.id === colData.id
          );

          let columnId: string;

          if (existingColumn) {
            // Usa coluna existente
            console.log("✅ Usando coluna existente:", existingColumn.title, existingColumn.id);
            columnId = existingColumn.id;
          } else {
            // Cria nova coluna
            try {
              const created = await boardService.createColumn(currentBoardId, {
                id: colData.id,
                title: colData.title,
                color: colData.color || "bg-gray-500",
                boardId: currentBoardId,
                position: 0
              });

              if (created) {
                console.log("✅ Coluna criada no banco:", created.id);
                columnId = created.id;

                // Atualiza estado local
                setBoards(prev => prev.map(board =>
                  board.id === currentBoardId ? {
                    ...board,
                    columns: [...board.columns, created]
                  } : board
                ));

                columnsCreated++;
              } else {
                console.log("❌ Falha ao criar coluna:", colData.title);
                continue;
              }
            } catch (error) {
              console.error("❌ Erro ao criar coluna:", error);
              continue;
            }
          }

          // Processa subcolunas se existirem
          if (colData.subColumns && Array.isArray(colData.subColumns)) {
            for (const subColData of colData.subColumns) {
              try {
                const subColCreated = await boardService.createSubColumn(columnId, subColData.title);

                if (subColCreated) {
                  console.log("✅ Subcoluna criada:", subColData.title);
                  subColumnsCreated++;

                  // Processa tasks da subcoluna
                  if (subColData.tasks && Array.isArray(subColData.tasks)) {
                    // Precisa recarregar para pegar o ID da subcoluna criada
                    const updatedBoards = await boardService.getBoards();
                    const currentBoard = updatedBoards.find(b => b.id === currentBoardId);
                    const column = currentBoard?.columns.find(c => c.id === columnId);
                    const subColumn = column?.subColumns?.find(sc => sc.title === subColData.title);

                    if (subColumn) {
                      for (const taskData of subColData.tasks) {
                        try {
                          const taskToCreate = {
                            title: taskData.title,
                            description: taskData.description || '',
                            priority: taskData.priority || 'medium',
                            dueDate: taskData.dueDate || null,
                            assignee: taskData.assignee || null,
                            tags: taskData.tags || [],
                            columnId: columnId,
                            subColumnId: subColumn.id,
                            checklist: (taskData.checklist || []).map((item: string) => ({
                              id: `check-${Date.now()}-${Math.random()}`,
                              text: item,
                              completed: false
                            }))
                          };

                          const created = await boardService.createTask(currentBoardId, taskToCreate);

                          if (created) {
                            console.log('✅ Task criada na subcoluna:', created.id);
                            importedCount++;
                          }
                        } catch (error) {
                          console.error('❌ Erro ao criar task na subcoluna:', error);
                        }
                      }
                    }
                  }
                }
              } catch (error) {
                console.error("❌ Erro ao criar subcoluna:", error);
              }
            }
          }
        }
      }

      // Importa tasks
      if (data.tasks && Array.isArray(data.tasks)) {
        for (const taskData of data.tasks) {
          try {
            // Prepara a task sem ID e timestamps (o backend vai gerar)
            const taskToCreate = {
              title: taskData.title,
              description: taskData.description || '',
              priority: taskData.priority || 'medium',
              dueDate: taskData.dueDate || null,
              assignee: taskData.assignee || null,
              tags: taskData.tags || [],
              columnId: taskData.column,  // ✅ Backend espera "columnId"
              checklist: (taskData.checklist || []).map((item: string) => ({
                id: `check-${Date.now()}-${Math.random()}`,
                text: item,
                completed: false
              }))
            };

            console.log('🔄 Criando task via API:', {
              boardId: currentBoardId,
              task: taskToCreate,
              columnDestino: taskData.column
            });

            // Cria no banco via API
            const created = await boardService.createTask(currentBoardId, taskToCreate);

            console.log('📦 Retorno do boardService.createTask:', created);

            if (created) {
              console.log('✅ Task criada no banco com ID:', created.id);

              // Atualiza estado local
              setBoards(prev => prev.map(board =>
                board.id === currentBoardId ? {
                  ...board,
                  columns: board.columns.map(col =>
                    col.id === taskData.column ? {
                      ...col,
                      tasks: [...col.tasks, created]
                    } : col
                  )
                } : board
              ));

              // Emite evento Socket.IO
              emitTaskCreated({ ...created, columnId: taskData.column });
              importedCount++;
            } else {
              console.error('❌ Falha ao criar task no banco:', taskData.title);
            }
          } catch (error) {
            console.error('❌ Erro ao criar task:', taskData.title, error);
          }
        }
      }

      // Recarrega os boards para mostrar as mudanças
      const reloadedBoards = await boardService.getBoards();
      setBoards(reloadedBoards);

      const message = [
        `✅ Importação concluída!`,
        columnsCreated > 0 && `${columnsCreated} coluna(s) criada(s)`,
        subColumnsCreated > 0 && `${subColumnsCreated} subcoluna(s) criada(s)`,
        importedCount > 0 && `${importedCount} tarefa(s) importada(s)`
      ].filter(Boolean).join('\n');

      alert(message);
    } catch (error) {
      console.error('Erro ao importar:', error);
      alert('❌ Erro ao importar. Verifique o formato do JSON.');
    } finally {
      setLoading(false);
    }
  };

  // Function to restore ERP IA Orion board if user wants it back
  const restoreERPBoard = () => {
    localStorage.removeItem('erp-board-deleted');
    const erpBoard = getERPBoard();
    setBoards(prev => [...prev, erpBoard]);
  };

  // Board sharing functions
  const openShareModal = (boardId: string) => {
    setSharingBoardId(boardId);
    setShowShareModal(true);
    setShareEmail('');
    setSharePermission('view');
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setSharingBoardId(null);
    setShareEmail('');
    setSharePermission('view');
  };

  const inviteMemberToBoard = () => {
    if (!shareEmail.trim() || !sharingBoardId) {
      alert('Por favor, digite um e-mail válido.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shareEmail)) {
      alert('Por favor, digite um e-mail válido.');
      return;
    }

    // Gerar token URL-safe único com informações do board
    const generateUrlSafeToken = (board: Board, email: string, timestamp: number, permission: string) => {
      // Adicionar componente aleatório para garantir unicidade
      const randomComponent = Math.random().toString(36).substring(2, 15);
      // Incluir informações básicas do board no token para funcionar em nova janela
      const tokenData = {
        boardId: board.id,
        boardTitle: board.title,
        boardDescription: board.description || '',
        boardColor: board.color,
        email,
        permission,
        timestamp,
        random: randomComponent
      };
      const data = JSON.stringify(tokenData);
      return btoa(data)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    };

    const timestamp = Date.now();
    const boardToShare = boards.find(b => b.id === sharingBoardId);
    if (!boardToShare) {
      alert('Quadro não encontrado.');
      return;
    }
    const inviteToken = generateUrlSafeToken(boardToShare, shareEmail.trim(), timestamp, sharePermission);

    // Gerar ID único para o membro
    const generateUniqueId = () => {
      return `member_${timestamp}_${Math.random().toString(36).substring(2, 15)}`;
    };

    const memberData: BoardMember = {
      id: generateUniqueId(),
      email: shareEmail.trim(),
      permission: sharePermission,
      invitedAt: new Date().toISOString(),
      status: 'pending',
      inviteToken
    };

    const updatedBoards = boards.map(board => {
      if (board.id === sharingBoardId) {
        const existingMember = board.members?.find(m => m.email === shareEmail);

        if (existingMember) {
          // Se já existe, verificar o status
          if (existingMember.status === 'accepted') {
            alert('Este e-mail já aceitou o convite e faz parte do quadro.');
            return board;
          } else {
            // Se o convite está pendente ou foi recusado, invalida o anterior e cria novo
            const updatedMembers = board.members?.map(m => {
              if (m.email === shareEmail && m.status !== 'accepted') {
                return { ...m, status: 'expired' as const };
              }
              return m;
            }) || [];

            return {
              ...board,
              isShared: true,
              members: [...updatedMembers, memberData]
            };
          }
        }

        return {
          ...board,
          isShared: true,
          members: [...(board.members || []), memberData]
        };
      }
      return board;
    });

    setBoards(updatedBoards);

    // Salvar no localStorage imediatamente
    localStorage.setItem('kanban-boards', JSON.stringify(updatedBoards));

    // Gerar link de convite
    const generatedInviteLink = `${window.location.origin}/invite/${inviteToken}`;

    // Simular envio de e-mail (em produção, chamar API)
    console.log(`
🔗 CONVITE GERADO:
📧 Para: ${shareEmail}
🎭 Permissão: ${sharePermission}
🔗 Link: ${generatedInviteLink}
🎟️  Token: ${inviteToken}
📋 BoardId: ${sharingBoardId}

📨 Em produção, este link seria enviado por e-mail!
    `);

    // Mostrar modal customizado com link selecionável
    setInviteLink(generatedInviteLink);
    setInviteDetails({
      email: shareEmail,
      permission: sharePermission === 'view' ? 'Visualização' : 'Edição'
    });
    setShowInviteLinkModal(true);

    closeShareModal();
  };

  const removeMemberFromBoard = (boardId: string, memberId: string) => {
    setBoards(prev => prev.map(board => {
      if (board.id === boardId) {
        const newMembers = (board.members || []).filter(m => m.id !== memberId);
        return {
          ...board,
          members: newMembers,
          isShared: newMembers.length > 0
        };
      }
      return board;
    }));
  };

  const updateMemberPermission = (boardId: string, memberId: string, newPermission: 'view' | 'edit') => {
    setBoards(prev => prev.map(board => {
      if (board.id === boardId) {
        return {
          ...board,
          members: (board.members || []).map(member =>
            member.id === memberId ? { ...member, permission: newPermission } : member
          )
        };
      }
      return board;
    }));
  };

  const duplicateBoard = (board: Board) => {
    const newBoard: Board = {
      ...board,
      id: Date.now().toString(),
      title: `${board.title} (Cópia)`,
      createdAt: new Date().toISOString(),
      isFavorite: false,
      columns: board.columns.map(col => ({
        ...col,
        id: `${col.id}-${Date.now()}`,
        tasks: col.tasks.map(task => ({
          ...task,
          id: `${task.id}-${Date.now()}`,
          createdAt: new Date().toISOString()
        }))
      }))
    };

    setBoards(prev => [...prev, newBoard]);
    setCurrentBoardId(newBoard.id);
  };

  const toggleBoardFavorite = (boardId: string) => {
    setBoards(prev => prev.map(board => 
      board.id === boardId ? { ...board, isFavorite: !board.isFavorite } : board
    ));
  };

  // Reset form
  const resetTaskForm = () => {
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: '',
      checklist: []
    });
    setEditingTask(null);
    setTargetColumnId(null);
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
      tags: task.tags.join(', '),
      checklist: [...(task.checklist || [])]
    });

    // Emit user activity for real-time collaboration
    if (emitUserActivity) {
      emitUserActivity('editing-task', { taskId: task.id, taskTitle: task.title });
    }
    setShowTaskModal(true);
  };

  // Checklist functions
  const addChecklistItem = () => {
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: '',
      completed: false
    };
    setTaskForm(prev => ({
      ...prev,
      checklist: [...prev.checklist, newItem]
    }));
  };

  const updateChecklistItem = (itemId: string, text: string) => {
    setTaskForm(prev => ({
      ...prev,
      checklist: prev.checklist.map(item =>
        item.id === itemId ? { ...item, text } : item
      )
    }));
  };

  const toggleChecklistItem = (itemId: string) => {
    setTaskForm(prev => ({
      ...prev,
      checklist: prev.checklist.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const removeChecklistItem = (itemId: string) => {
    setTaskForm(prev => ({
      ...prev,
      checklist: prev.checklist.filter(item => item.id !== itemId)
    }));
  };

  // Toggle checklist item directly in task (without opening modal)
  const toggleTaskChecklistItem = (taskId: string, itemId: string) => {
    setBoards(prev => prev.map(board => 
      board.id === currentBoardId ? {
        ...board,
        columns: board.columns.map(col => ({
          ...col,
          tasks: col.tasks.map(task => 
            task.id === taskId && task.checklist ? {
              ...task,
              checklist: task.checklist.map(item =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              )
            } : task
          )
        }))
      } : board
    ));
  };

  // Calculate checklist progress
  const getChecklistProgress = (checklist: ChecklistItem[]) => {
    if (!checklist || checklist.length === 0) return 0;
    const completed = checklist.filter(item => item.completed).length;
    return Math.round((completed / checklist.length) * 100);
  };

  // Save task (create or update)
  const saveTask = async (columnId: string) => {
    console.log('DEBUG: saveTask called with columnId:', columnId);
    console.log('DEBUG: taskForm.title:', taskForm.title);
    console.log('DEBUG: currentBoardId:', currentBoardId);

    if (!taskForm.title.trim()) {
      console.log('DEBUG: Título vazio, cancelando criação');
      return;
    }

    const taskData = {
      title: taskForm.title.trim(),
      description: taskForm.description.trim() || undefined,
      priority: taskForm.priority,
      assignee: taskForm.assignee.trim() || undefined,
      dueDate: taskForm.dueDate || undefined,
      tags: taskForm.tags ? taskForm.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      columnId,
      completed: false
    };

    try {
      setLoading(true);

      if (editingTask) {
        // Update existing task
        const success = await boardService.updateTask(currentBoardId, editingTask.id, taskData);
        if (success) {
          // Update local state
          setBoards(prev => prev.map(board =>
            board.id === currentBoardId ? {
              ...board,
              columns: board.columns.map(col => {
                const taskIndex = col.tasks.findIndex(t => t.id === editingTask.id);
                if (taskIndex >= 0) {
                  const updatedTask = {
                    ...editingTask,
                    ...taskData,
                    checklist: taskForm.checklist.filter(item => item.text.trim())
                  };
                  const newTasks = [...col.tasks];
                  newTasks[taskIndex] = updatedTask;
                  return { ...col, tasks: newTasks };
                }
                return col;
              })
            } : board
          ));
          emitTaskUpdated({ ...taskData, id: editingTask.id, columnId });

          // Add to local activity tracking
          const userInfo = generateUserAvatar(sessionId);
          setRecentActivity(prev => [
            {
              type: 'task-updated',
              taskId: editingTask.id,
              taskTitle: taskData.title,
              columnId,
              id: Date.now(),
              timestamp: new Date(),
              userName: userInfo.name + ' (Você)',
              updatedBy: sessionId
            },
            ...prev.slice(0, 9)
          ]);
        }
      } else {
        // Create new task
        const createdTask = await boardService.createTask(currentBoardId, taskData);
        if (createdTask) {
          // Update local state
          setBoards(prev => prev.map(board =>
            board.id === currentBoardId ? {
              ...board,
              columns: board.columns.map(col =>
                col.id === columnId ? {
                  ...col,
                  tasks: [...col.tasks, {
                    ...createdTask,
                    checklist: taskForm.checklist.filter(item => item.text.trim())
                  }]
                } : col
              )
            } : board
          ));
          emitTaskCreated({ ...createdTask, columnId });

          // Add to local activity tracking
          const userInfo = generateUserAvatar(sessionId);
          setRecentActivity(prev => [
            {
              type: 'task-created',
              taskId: createdTask.id,
              taskTitle: createdTask.title,
              columnId,
              id: Date.now(),
              timestamp: new Date(),
              userName: userInfo.name + ' (Você)',
              createdBy: sessionId
            },
            ...prev.slice(0, 9)
          ]);
        }
      }
    } catch (error) {
      console.error('❌ Erro ao salvar task:', error);
      alert('Erro ao salvar tarefa. Tente novamente.');
    } finally {
      setLoading(false);
    }

    setShowTaskModal(false);
    resetTaskForm();
  };

  // Delete task
  const deleteTask = async (taskId: string) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        setLoading(true);
        const success = await boardService.deleteTask(currentBoardId, taskId);

        if (success) {
          // Update local state
          setBoards(prev => prev.map(board =>
            board.id === currentBoardId ? {
              ...board,
              columns: board.columns.map(col => ({
                ...col,
                tasks: col.tasks.filter(task => task.id !== taskId)
              }))
            } : board
          ));

          // Emit socket event for real-time update
          emitTaskDeleted(taskId);
        }
      } catch (error) {
        console.error('❌ Erro ao deletar task:', error);
        alert('Erro ao deletar tarefa. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Duplicate task
  const duplicateTask = async (taskId: string) => {
    try {
      setLoading(true);

      // Find the task to duplicate
      const currentBoard = boards.find(b => b.id === currentBoardId);
      if (!currentBoard) return;

      let taskToDuplicate: Task | undefined;
      let targetColumnId: string | undefined;

      for (const col of currentBoard.columns) {
        taskToDuplicate = col.tasks.find(t => t.id === taskId);
        if (taskToDuplicate) {
          targetColumnId = col.id;
          break;
        }
        // Check in subcolumns
        if (col.subColumns) {
          for (const subCol of col.subColumns) {
            taskToDuplicate = subCol.tasks?.find(t => t.id === taskId);
            if (taskToDuplicate) {
              targetColumnId = col.id;
              break;
            }
          }
        }
        if (taskToDuplicate) break;
      }

      if (!taskToDuplicate || !targetColumnId) return;

      // Create duplicate with new ID and title
      const duplicatedTask = {
        ...taskToDuplicate,
        title: `${taskToDuplicate.title} (cópia)`,
        completed: false,
        id: undefined, // Let backend generate new ID
      };

      const success = await boardService.createTask(currentBoardId, duplicatedTask);

      if (success) {
        const reloadedBoards = await boardService.getBoards();
        setBoards(reloadedBoards);
      }
    } catch (error) {
      console.error('❌ Erro ao duplicar task:', error);
      alert('Erro ao duplicar tarefa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent, taskId: string) => {
    e.preventDefault();
    setContextMenu({
      taskId,
      x: e.clientX,
      y: e.clientY
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClick = () => closeContextMenu();
    if (contextMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [contextMenu]);

  // Selected task for keyboard shortcuts
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Inline editing state
  const [inlineEditingTaskId, setInlineEditingTaskId] = useState<string | null>(null);
  const [inlineEditTitle, setInlineEditTitle] = useState<string>('');

  // Search and filters state
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string[]>([]);
  const [filterAssignee, setFilterAssignee] = useState<string[]>([]);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // WIP Limit modal state
  const [showWipLimitModal, setShowWipLimitModal] = useState(false);
  const [wipLimitColumnId, setWipLimitColumnId] = useState<string | null>(null);
  const [wipLimitValue, setWipLimitValue] = useState<number>(0);
  const [enforceWipLimit, setEnforceWipLimit] = useState(false);

  // Column metrics expanded state
  const [expandedMetricsColumnId, setExpandedMetricsColumnId] = useState<string | null>(null);

  // Filter tasks based on search and filters (memoized)
  const filterTask = useCallback((task: Task): boolean => {
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(query);
      const matchDescription = task.description?.toLowerCase().includes(query);
      const matchTags = task.tags.some(tag => tag.toLowerCase().includes(query));

      if (!matchTitle && !matchDescription && !matchTags) {
        return false;
      }
    }

    // Priority filter
    if (filterPriority.length > 0 && !filterPriority.includes(task.priority)) {
      return false;
    }

    // Assignee filter
    if (filterAssignee.length > 0 && task.assignee && !filterAssignee.includes(task.assignee)) {
      return false;
    }

    // Tags filter
    if (filterTags.length > 0) {
      const hasMatchingTag = filterTags.some(filterTag =>
        task.tags.some(taskTag => taskTag.toLowerCase().includes(filterTag.toLowerCase()))
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    return true;
  }, [searchQuery, filterPriority, filterAssignee, filterTags]);

  // Check if any filters are active
  const hasActiveFilters = searchQuery.trim() || filterPriority.length > 0 || filterAssignee.length > 0 || filterTags.length > 0;

  // Count filtered tasks
  const getFilteredTasksCount = (): number => {
    if (!hasActiveFilters) return 0;

    const currentBoard = boards.find(b => b.id === currentBoardId);
    if (!currentBoard) return 0;

    let count = 0;
    currentBoard.columns.forEach(col => {
      count += col.tasks.filter(filterTask).length;
      col.subColumns?.forEach(subCol => {
        count += (subCol.tasks || []).filter(filterTask).length;
      });
    });
    return count;
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setFilterPriority([]);
    setFilterAssignee([]);
    setFilterTags([]);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        // Only handle Esc in modals
        if (e.key === 'Escape') {
          if (showTaskModal) {
            setShowTaskModal(false);
            setEditingTask(null);
          }
          if (showColumnModal) {
            setShowColumnModal(false);
          }
          if (showBoardModal) {
            setShowBoardModal(false);
          }
          if (showShareModal) {
            setShowShareModal(false);
          }
        }
        return;
      }

      // N - New task
      if (e.key === 'n' || e.key === 'N') {
        if (!showTaskModal && !showColumnModal && !showBoardModal && canEdit()) {
          const currentBoard = boards.find(b => b.id === currentBoardId);
          if (currentBoard && currentBoard.columns.length > 0) {
            resetTaskForm();
            setTargetColumnId(currentBoard.columns[0].id);
            setShowTaskModal(true);
          }
        }
      }

      // Esc - Close modals and cancel inline editing
      if (e.key === 'Escape') {
        if (inlineEditingTaskId) {
          cancelInlineEdit();
          return;
        }
        if (showTaskModal) {
          setShowTaskModal(false);
          setEditingTask(null);
        }
        if (showColumnModal) {
          setShowColumnModal(false);
        }
        if (showBoardModal) {
          setShowBoardModal(false);
        }
        if (showShareModal) {
          setShowShareModal(false);
        }
        if (contextMenu) {
          closeContextMenu();
        }
        setSelectedTaskId(null);
      }

      // E - Edit selected task
      if ((e.key === 'e' || e.key === 'E') && selectedTaskId) {
        const currentBoard = boards.find(b => b.id === currentBoardId);
        const task = currentBoard?.columns
          .flatMap(c => [...c.tasks, ...(c.subColumns?.flatMap(s => s.tasks || []) || [])])
          .find(t => t.id === selectedTaskId);
        if (task) {
          openEditTask(task);
        }
      }

      // D - Delete selected task
      if ((e.key === 'd' || e.key === 'D') && selectedTaskId && canEdit()) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
          deleteTask(selectedTaskId);
          setSelectedTaskId(null);
        }
      }

      // C - Toggle complete selected task
      if ((e.key === 'c' || e.key === 'C') && selectedTaskId) {
        toggleTaskCompletion(selectedTaskId);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedTaskId, showTaskModal, showColumnModal, showBoardModal, showShareModal, contextMenu, boards, currentBoardId]);

  // Move task to different column from context menu
  const moveTaskToColumn = async (taskId: string, targetColumnId: string) => {
    try {
      setLoading(true);
      const currentBoard = boards.find(b => b.id === currentBoardId);
      if (!currentBoard) return;

      // Find task in all columns and subcolumns
      let taskToMove: Task | undefined;
      for (const col of currentBoard.columns) {
        taskToMove = col.tasks.find(t => t.id === taskId);
        if (taskToMove) break;
        if (col.subColumns) {
          for (const subCol of col.subColumns) {
            taskToMove = subCol.tasks?.find(t => t.id === taskId);
            if (taskToMove) break;
          }
        }
        if (taskToMove) break;
      }

      if (!taskToMove) return;

      const success = await boardService.updateTask(currentBoardId, taskId, {
        columnId: targetColumnId,
        subColumnId: null
      });

      if (success) {
        const reloadedBoards = await boardService.getBoards();
        setBoards(reloadedBoards);
      }
    } catch (error) {
      console.error('❌ Erro ao mover task:', error);
    } finally {
      setLoading(false);
      closeContextMenu();
    }
  };

  // Change task priority from context menu
  const changeTaskPriority = async (taskId: string, priority: 'low' | 'medium' | 'high' | 'urgent') => {
    try {
      setLoading(true);
      const success = await boardService.updateTask(currentBoardId, taskId, { priority });

      if (success) {
        const reloadedBoards = await boardService.getBoards();
        setBoards(reloadedBoards);
      }
    } catch (error) {
      console.error('❌ Erro ao mudar prioridade:', error);
    } finally {
      setLoading(false);
      closeContextMenu();
    }
  };

  // Start inline editing
  const startInlineEditing = (taskId: string, currentTitle: string) => {
    setInlineEditingTaskId(taskId);
    setInlineEditTitle(currentTitle);
  };

  // Save inline editing
  const saveInlineEdit = async () => {
    if (!inlineEditingTaskId || !inlineEditTitle.trim()) {
      setInlineEditingTaskId(null);
      return;
    }

    try {
      setLoading(true);
      const success = await boardService.updateTask(currentBoardId, inlineEditingTaskId, {
        title: inlineEditTitle.trim()
      });

      if (success) {
        const reloadedBoards = await boardService.getBoards();
        setBoards(reloadedBoards);
      }
    } catch (error) {
      console.error('❌ Erro ao atualizar título:', error);
    } finally {
      setLoading(false);
      setInlineEditingTaskId(null);
      setInlineEditTitle('');
    }
  };

  // Cancel inline editing
  const cancelInlineEdit = () => {
    setInlineEditingTaskId(null);
    setInlineEditTitle('');
  };

  // Toggle task completion
  const toggleTaskCompletion = async (taskId: string) => {
    let updatedTask: Task | null = null;
    let taskColumnId: string | null = null;

    // Find the task to update
    const currentBoard = boards.find(b => b.id === currentBoardId);
    const taskColumn = currentBoard?.columns.find(col =>
      col.tasks.some(task => task.id === taskId)
    );
    const existingTask = taskColumn?.tasks.find(task => task.id === taskId);

    if (!existingTask || !taskColumn) return;

    try {
      setLoading(true);

      const success = await boardService.updateTask(currentBoardId, taskId, {
        completed: !existingTask.completed
      });

      if (success) {
        // Update local state
        setBoards(prev => prev.map(board =>
          board.id === currentBoardId ? {
            ...board,
            columns: board.columns.map(col => ({
              ...col,
              tasks: col.tasks.map(task => {
                if (task.id === taskId) {
                  updatedTask = { ...task, completed: !task.completed };
                  taskColumnId = col.id;
                  return updatedTask;
                }
                return task;
              })
            }))
          } : board
        ));

        // Emit socket event for real-time update
        if (updatedTask && taskColumnId) {
          emitTaskUpdated({ ...updatedTask, columnId: taskColumnId });
        }
      }
    } catch (error) {
      console.error('❌ Erro ao atualizar tarefa:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle SubColumn expanded state
  const toggleSubColumnExpanded = (subColumnId: string) => {
    setExpandedSubColumns(prev => ({
      ...prev,
      [subColumnId]: !prev[subColumnId]
    }));
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

    setBoards(prev => prev.map(board => 
      board.id === currentBoardId ? {
        ...board,
        columns: [...board.columns, newColumn]
      } : board
    ));
    
    setNewColumnTitle('');
    setShowColumnModal(false);
  };

  // Delete column
  const deleteColumn = (columnId: string) => {
    if (columns.length <= 1) {
      alert('Você deve ter pelo menos uma coluna!');
      return;
    }

    if (confirm('Tem certeza que deseja excluir esta coluna? Todas as tarefas serão perdidas.')) {
      setBoards(prev => prev.map(board =>
        board.id === currentBoardId ? {
          ...board,
          columns: board.columns.filter(col => col.id !== columnId)
        } : board
      ));
    }
  };

  // Start editing column title
  const startEditingColumn = (columnId: string, currentTitle: string) => {
    setEditingColumnId(columnId);
    setEditingColumnTitle(currentTitle);
  };

  // Save column title
  const saveColumnTitle = () => {
    if (!editingColumnTitle.trim()) return;

    setBoards(prev => prev.map(board =>
      board.id === currentBoardId ? {
        ...board,
        columns: board.columns.map(col =>
          col.id === editingColumnId ? {
            ...col,
            title: editingColumnTitle.trim()
          } : col
        )
      } : board
    ));

    setEditingColumnId(null);
    setEditingColumnTitle('');
  };

  // Cancel editing column title
  const cancelEditingColumn = () => {
    setEditingColumnId(null);
    setEditingColumnTitle('');
  };

  // SubColumn management functions
  const createSubColumn = async (columnId: string) => {
    const title = prompt('Digite o título da nova subcoluna:');
    if (!title || !title.trim()) return;

    try {
      setLoading(true);
      const success = await boardService.createSubColumn(columnId, title.trim());

      if (success) {
        const reloadedBoards = await boardService.getBoards();
        setBoards(reloadedBoards);
      }
    } catch (error) {
      console.error('❌ Erro ao criar subcoluna:', error);
      alert('Erro ao criar subcoluna. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const updateSubColumn = async (subColumnId: string, currentTitle: string) => {
    const title = prompt('Digite o novo título da subcoluna:', currentTitle);
    if (!title || !title.trim() || title.trim() === currentTitle) return;

    try {
      setLoading(true);
      const success = await boardService.updateSubColumn(subColumnId, { title: title.trim() });

      if (success) {
        const reloadedBoards = await boardService.getBoards();
        setBoards(reloadedBoards);
      }
    } catch (error) {
      console.error('❌ Erro ao atualizar subcoluna:', error);
      alert('Erro ao atualizar subcoluna. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const deleteSubColumn = async (subColumnId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta subcoluna? Todas as tarefas serão movidas para a coluna principal.')) {
      return;
    }

    try {
      setLoading(true);
      const success = await boardService.deleteSubColumn(subColumnId);

      if (success) {
        const reloadedBoards = await boardService.getBoards();
        setBoards(reloadedBoards);
      }
    } catch (error) {
      console.error('❌ Erro ao deletar subcoluna:', error);
      alert('Erro ao deletar subcoluna. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll when dragging near edges
  const handleAutoScroll = (e: React.DragEvent) => {
    const threshold = 150;
    const scrollSpeed = 50;
    const { clientY } = e;
    const windowHeight = window.innerHeight;

    if (clientY < threshold) {
      window.scrollBy(0, -scrollSpeed);
    } else if (clientY > windowHeight - threshold) {
      window.scrollBy(0, scrollSpeed);
    }
  };

  // Drag and drop handlers for tasks
  const handleDragStart = (e: React.DragEvent, taskId: string, columnId: string) => {
    setDraggedTask(taskId);
    setDraggedFrom(columnId);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    handleAutoScroll(e);
  };

  // Drag and drop handlers for columns
  const handleColumnDragStart = (e: React.DragEvent, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleColumnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleColumnDrop = async (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();

    if (!draggedColumn || draggedColumn === targetColumnId) {
      setDraggedColumn(null);
      return;
    }

    try {
      setLoading(true);

      const currentBoard = boards.find(b => b.id === currentBoardId);
      if (!currentBoard) return;

      const draggedIndex = currentBoard.columns.findIndex(c => c.id === draggedColumn);
      const targetIndex = currentBoard.columns.findIndex(c => c.id === targetColumnId);

      if (draggedIndex === -1 || targetIndex === -1) {
        setDraggedColumn(null);
        return;
      }

      // Reorder columns locally
      const newColumns = [...currentBoard.columns];
      const [movedColumn] = newColumns.splice(draggedIndex, 1);
      newColumns.splice(targetIndex, 0, movedColumn);

      // Update positions
      const updates = newColumns.map((col, idx) => ({
        columnId: col.id,
        position: idx
      }));

      // Send updates to backend
      for (const update of updates) {
        await boardService.updateColumn(update.columnId, { position: update.position });
      }

      // Reload boards
      const reloadedBoards = await boardService.getBoards();
      setBoards(reloadedBoards);
    } catch (error) {
      console.error('❌ Erro ao reordenar colunas:', error);
      alert('Erro ao reordenar colunas. Tente novamente.');
    } finally {
      setLoading(false);
      setDraggedColumn(null);
    }
  };

  // Drag and drop handlers for subcolumns
  const handleSubColumnDragStart = (e: React.DragEvent, subColumnId: string, columnId: string) => {
    setDraggedSubColumn(subColumnId);
    setDraggedSubColumnFrom(columnId);
    e.dataTransfer.effectAllowed = 'move';
    e.stopPropagation();
  };

  const handleSubColumnDrop = async (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedSubColumn || !draggedSubColumnFrom || draggedSubColumnFrom === targetColumnId) {
      setDraggedSubColumn(null);
      setDraggedSubColumnFrom(null);
      return;
    }

    try {
      setLoading(true);

      // Update subcolumn's columnId via API
      const success = await boardService.updateSubColumn(draggedSubColumn, {
        columnId: targetColumnId
      });

      if (success) {
        const reloadedBoards = await boardService.getBoards();
        setBoards(reloadedBoards);
      } else {
        alert('Erro ao mover subcoluna. Tente novamente.');
      }
    } catch (error) {
      console.error('❌ Erro ao mover subcoluna:', error);
      alert('Erro ao mover subcoluna. Tente novamente.');
    } finally {
      setLoading(false);
      setDraggedSubColumn(null);
      setDraggedSubColumnFrom(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();

    if (!draggedTask || !draggedFrom || draggedFrom === targetColumnId) {
      return;
    }

    // Find the moved task before updating state
    const currentBoard = boards.find(b => b.id === currentBoardId);
    const sourceColumn = currentBoard?.columns.find(c => c.id === draggedFrom);
    const movedTask = sourceColumn?.tasks.find(t => t.id === draggedTask);
    const newIndex = currentBoard?.columns.find(c => c.id === targetColumnId)?.tasks.length || 0;

    if (!movedTask) {
      setDraggedTask(null);
      setDraggedFrom(null);
      setIsDragging(false);
      setDropIndicator(null);
      return;
    }

    try {
      setLoading(true);

      // Update task's columnId via API
      const success = await boardService.updateTask(currentBoardId, draggedTask, {
        columnId: targetColumnId
      });

      if (success) {
        // Update local state
        setBoards(prev => prev.map(board =>
          board.id === currentBoardId ? {
            ...board,
            columns: board.columns.map(col => {
              if (col.id === draggedFrom) {
                // Remove from source
                return {
                  ...col,
                  tasks: col.tasks.filter(task => task.id !== draggedTask)
                };
              } else if (col.id === targetColumnId) {
                // Add to target
                return {
                  ...col,
                  tasks: [...col.tasks, { ...movedTask, columnId: targetColumnId, movedToColumnAt: new Date().toISOString() }]
                };
              }
              return col;
            })
          } : board
        ));

        // Emit socket event for real-time update
        emitTaskMoved(draggedTask, draggedFrom, targetColumnId, newIndex);

        // Add to local activity tracking
        const userInfo = generateUserAvatar(sessionId);
        const movedTask = boards.find(b => b.id === currentBoardId)
          ?.columns.find(col => col.id === draggedFrom)
          ?.tasks.find(t => t.id === draggedTask);

        if (movedTask) {
          setRecentActivity(prev => [
            {
              type: 'task-moved',
              taskId: draggedTask,
              taskTitle: movedTask.title,
              fromColumn: draggedFrom,
              toColumn: targetColumnId,
              id: Date.now(),
              timestamp: new Date(),
              userName: userInfo.name + ' (Você)',
              movedBy: sessionId
            },
            ...prev.slice(0, 9)
          ]);
        }
      }
    } catch (error) {
      console.error('❌ Erro ao mover task:', error);
      alert('Erro ao mover tarefa. Tente novamente.');
    } finally {
      setLoading(false);
    }

    setDraggedTask(null);
    setDraggedFrom(null);
    setIsDragging(false);
    setDropIndicator(null);
  };

  // Handle drop in subcolumn
  const handleDropInSubColumn = async (e: React.DragEvent, targetColumnId: string, targetSubColumnId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedTask || !draggedFrom) {
      return;
    }

    // Find the moved task
    const currentBoard = boards.find(b => b.id === currentBoardId);
    if (!currentBoard) return;

    let movedTask: Task | undefined;

    // Search in all columns and subcolumns for the dragged task
    for (const col of currentBoard.columns) {
      // Check in column's direct tasks
      movedTask = col.tasks.find(t => t.id === draggedTask);
      if (movedTask) break;

      // Check in column's subcolumns
      if (col.subColumns) {
        for (const subCol of col.subColumns) {
          movedTask = subCol.tasks?.find(t => t.id === draggedTask);
          if (movedTask) break;
        }
      }
      if (movedTask) break;
    }

    if (!movedTask) {
      setDraggedTask(null);
      setDraggedFrom(null);
      setIsDragging(false);
      setDropIndicator(null);
      return;
    }

    try {
      setLoading(true);

      // Update task's columnId and subColumnId via API
      const success = await boardService.updateTask(currentBoardId, draggedTask, {
        columnId: targetColumnId,
        subColumnId: targetSubColumnId
      });

      if (success) {
        // Reload boards to get fresh data
        const reloadedBoards = await boardService.getBoards();
        setBoards(reloadedBoards);
      }
    } catch (error) {
      console.error('❌ Erro ao mover task para subcoluna:', error);
      alert('Erro ao mover tarefa. Tente novamente.');
    } finally {
      setLoading(false);
    }

    setDraggedTask(null);
    setDraggedFrom(null);
    setIsDragging(false);
    setDropIndicator(null);
  };

  // Swipe gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, taskId: string) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY, taskId });
  };

  const handleTouchMove = (e: React.TouchEvent, taskId: string) => {
    if (!isMobile || !touchStart || touchStart.taskId !== taskId) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = Math.abs(touch.clientY - touchStart.y);

    // Only trigger swipe if horizontal movement is dominant
    if (Math.abs(deltaX) > 50 && deltaY < 30) {
      if (deltaX > 0) {
        setSwipedTask({ taskId, direction: 'right' });
      } else {
        setSwipedTask({ taskId, direction: 'left' });
      }
    }
  };

  const handleTouchEnd = async (taskId: string) => {
    if (!isMobile || !swipedTask || swipedTask.taskId !== taskId) {
      setTouchStart(null);
      return;
    }

    // Swipe right: mark complete
    if (swipedTask.direction === 'right') {
      await toggleTaskCompletion(taskId);
    }
    // Swipe left: delete
    else if (swipedTask.direction === 'left') {
      if (confirm('Deseja excluir esta task?')) {
        await deleteTask(taskId);
      }
    }

    setTouchStart(null);
    setSwipedTask(null);
  };

  // Horizontal scroll functions
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Only start scrolling if clicking on the background (not on cards or buttons)
    if (target.closest('.kanban-card') || target.closest('button') || target.closest('input') || target.closest('textarea')) {
      return;
    }
    
    setIsScrolling(true);
    setScrollStartX(e.pageX - (e.currentTarget.offsetLeft || 0));
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isScrolling) return;
    e.preventDefault();
    const x = e.pageX - (e.currentTarget.offsetLeft || 0);
    const walk = (x - scrollStartX) * 2; // Scroll speed multiplier
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsScrolling(false);
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

  const getPriorityBorderClass = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-4 border-l-red-500';
      case 'high': return 'border-l-4 border-l-amber-500';
      case 'medium': return 'border-l-2 border-l-yellow-500';
      case 'low': return 'border-l-2 border-l-green-500';
      default: return 'border-l border-l-gray-600';
    }
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-teal-500'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  const getTagColor = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    // Priority tags
    if (lowerTag.includes('crítico') || lowerTag.includes('urgente') || lowerTag.includes('urgent'))
      return 'bg-red-500/30 text-red-200 border-red-400/50 shadow-sm shadow-red-500/20';
    if (lowerTag.includes('alta') || lowerTag.includes('high'))
      return 'bg-orange-500/30 text-orange-200 border-orange-400/50 shadow-sm shadow-orange-500/20';
    if (lowerTag.includes('média') || lowerTag.includes('medium'))
      return 'bg-yellow-500/30 text-yellow-200 border-yellow-400/50 shadow-sm shadow-yellow-500/20';
    if (lowerTag.includes('baixa') || lowerTag.includes('low'))
      return 'bg-green-500/30 text-green-200 border-green-400/50 shadow-sm shadow-green-500/20';

    // Tech tags
    if (lowerTag.includes('frontend') || lowerTag.includes('ui') || lowerTag.includes('ux'))
      return 'bg-purple-500/30 text-purple-200 border-purple-400/50 shadow-sm shadow-purple-500/20';
    if (lowerTag.includes('backend') || lowerTag.includes('api'))
      return 'bg-blue-500/30 text-blue-200 border-blue-400/50 shadow-sm shadow-blue-500/20';
    if (lowerTag.includes('devops') || lowerTag.includes('infra'))
      return 'bg-gray-500/30 text-gray-200 border-gray-400/50 shadow-sm shadow-gray-500/20';
    if (lowerTag.includes('test') || lowerTag.includes('qualidade') || lowerTag.includes('qa'))
      return 'bg-cyan-500/30 text-cyan-200 border-cyan-400/50 shadow-sm shadow-cyan-500/20';
    if (lowerTag.includes('doc') || lowerTag.includes('documentação'))
      return 'bg-indigo-500/30 text-indigo-200 border-indigo-400/50 shadow-sm shadow-indigo-500/20';
    if (lowerTag.includes('ml') || lowerTag.includes('ia') || lowerTag.includes('ai'))
      return 'bg-pink-500/30 text-pink-200 border-pink-400/50 shadow-sm shadow-pink-500/20';
    if (lowerTag.includes('bug') || lowerTag.includes('fix'))
      return 'bg-red-600/30 text-red-200 border-red-500/50 shadow-sm shadow-red-600/20';
    if (lowerTag.includes('feature') || lowerTag.includes('novo'))
      return 'bg-emerald-500/30 text-emerald-200 border-emerald-400/50 shadow-sm shadow-emerald-500/20';
    if (lowerTag.includes('refactor') || lowerTag.includes('melhoria'))
      return 'bg-violet-500/30 text-violet-200 border-violet-400/50 shadow-sm shadow-violet-500/20';

    // Default
    return 'bg-primary-500/30 text-primary-200 border-primary-400/50 shadow-sm shadow-primary-500/20';
  };

  const getProgressBarColor = (progress: number) => {
    if (progress === 100) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (progress >= 75) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    if (progress >= 50) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (progress >= 25) return 'bg-gradient-to-r from-orange-500 to-red-500';
    return 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  // WIP Limit functions
  const openWipLimitModal = (columnId: string) => {
    const column = columns.find(c => c.id === columnId);
    if (column) {
      setWipLimitColumnId(columnId);
      setWipLimitValue(column.wipLimit || 0);
      setEnforceWipLimit(column.enforceWipLimit || false);
      setShowWipLimitModal(true);
    }
  };

  const saveWipLimit = () => {
    if (!wipLimitColumnId) return;

    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === currentBoardId
          ? {
              ...board,
              columns: board.columns.map(col =>
                col.id === wipLimitColumnId
                  ? { ...col, wipLimit: wipLimitValue > 0 ? wipLimitValue : undefined, enforceWipLimit }
                  : col
              ),
            }
          : board
      )
    );

    setShowWipLimitModal(false);
    setWipLimitColumnId(null);
  };

  const getWipLimitPercentage = (column: Column): number => {
    if (!column.wipLimit) return 0;
    return Math.min((column.tasks.length / column.wipLimit) * 100, 100);
  };

  const isWipLimitExceeded = (column: Column): boolean => {
    if (!column.wipLimit) return false;
    return column.tasks.length >= column.wipLimit;
  };

  // Task Age functions
  const getTaskAgeDays = (task: Task): number => {
    const ageStart = task.movedToColumnAt || task.createdAt;
    const diffMs = new Date().getTime() - new Date(ageStart).getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  };

  const getTaskAgeColor = (days: number) => {
    if (days <= 2) return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50' };
    if (days <= 5) return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50' };
    if (days <= 10) return { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50' };
    return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' };
  };

  const isTaskOld = (task: Task): boolean => {
    return getTaskAgeDays(task) > 7;
  };

  // Column Metrics functions
  const getColumnMetrics = (column: Column) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const tasksThisWeek = column.tasks.filter(task => {
      const taskDate = new Date(task.movedToColumnAt || task.createdAt);
      return taskDate >= oneWeekAgo;
    }).length;

    const completedTasks = column.tasks.filter(task => task.completed).length;
    const completionRate = column.tasks.length > 0
      ? Math.round((completedTasks / column.tasks.length) * 100)
      : 0;

    const avgTimeInColumn = column.tasks.length > 0
      ? Math.round(column.tasks.reduce((acc, task) => acc + getTaskAgeDays(task), 0) / column.tasks.length)
      : 0;

    return {
      total: column.tasks.length,
      thisWeek: tasksThisWeek,
      avgTime: avgTimeInColumn,
      completionRate
    };
  };

  // Board Dashboard Metrics
  const getBoardDashboardMetrics = () => {
    const currentBoard = boards.find(b => b.id === currentBoardId);
    if (!currentBoard) return null;

    const allTasks = currentBoard.columns.flatMap(col => col.tasks);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const completedToday = allTasks.filter(task => {
      if (!task.completed) return false;
      const taskDate = new Date(task.movedToColumnAt || task.createdAt);
      return taskDate >= today;
    }).length;

    const completedThisWeek = allTasks.filter(task => {
      if (!task.completed) return false;
      const taskDate = new Date(task.movedToColumnAt || task.createdAt);
      return taskDate >= oneWeekAgo;
    }).length;

    const velocity = completedThisWeek / 7;

    // Detect bottlenecks (columns with high avg time and many tasks)
    const bottlenecks = currentBoard.columns.filter(col => {
      const metrics = getColumnMetrics(col);
      return col.tasks.length > 3 && metrics.avgTime > 5;
    });

    return {
      total: allTasks.length,
      completedToday,
      completedThisWeek,
      velocity: Math.round(velocity * 10) / 10,
      bottleneckCount: bottlenecks.length,
      bottleneckNames: bottlenecks.map(col => col.title)
    };
  };

  // Multi-select functions
  const toggleTaskSelection = (taskId: string, shiftKey: boolean) => {
    if (shiftKey) {
      // Multi-select with shift
      setSelectedTasks(prev =>
        prev.includes(taskId)
          ? prev.filter(id => id !== taskId)
          : [...prev, taskId]
      );
    } else {
      // Single select
      setSelectedTasks([taskId]);
    }
  };

  const clearSelection = () => {
    setSelectedTasks([]);
  };

  const bulkDeleteTasks = async () => {
    if (selectedTasks.length === 0) return;

    const confirmed = confirm(`Deseja excluir ${selectedTasks.length} task(s) selecionada(s)?`);
    if (!confirmed) return;

    for (const taskId of selectedTasks) {
      await deleteTask(taskId);
    }
    clearSelection();
  };

  const bulkMoveTasks = async (targetColumnId: string) => {
    if (selectedTasks.length === 0) return;

    for (const taskId of selectedTasks) {
      const currentBoard = boards.find(b => b.id === currentBoardId);
      const sourceColumn = currentBoard?.columns.find(col =>
        col.tasks.some(t => t.id === taskId)
      );

      if (sourceColumn && sourceColumn.id !== targetColumnId) {
        const task = sourceColumn.tasks.find(t => t.id === taskId);
        if (task) {
          await boardService.updateTask(currentBoardId, taskId, { columnId: targetColumnId });
        }
      }
    }

    // Reload boards
    const reloadedBoards = await boardService.getBoards();
    setBoards(reloadedBoards);
    clearSelection();
  };

  const getDueDateStatus = (dueDate: string | null) => {
    if (!dueDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { color: 'text-red-400 bg-red-500/20 border-red-500/50', label: 'Vencido', urgent: true };
    } else if (diffDays === 0) {
      return { color: 'text-orange-400 bg-orange-500/20 border-orange-500/50', label: 'Hoje', urgent: true };
    } else if (diffDays === 1) {
      return { color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50', label: 'Amanhã', urgent: false };
    } else if (diffDays <= 3) {
      return { color: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/30', label: `${diffDays} dias`, urgent: false };
    } else if (diffDays <= 7) {
      return { color: 'text-green-400 bg-green-500/10 border-green-500/30', label: `${diffDays} dias`, urgent: false };
    } else {
      return { color: 'text-gray-400 bg-gray-500/10 border-gray-500/30', label: new Date(dueDate).toLocaleDateString('pt-BR'), urgent: false };
    }
  };

  const colorOptions = [
    'bg-gray-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 
    'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'
  ];

  // Skeleton loader component
  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-pure-black text-pure-white">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-10 bg-gray-800/50 rounded-lg w-64 mb-4"></div>
            <div className="h-6 bg-gray-800/30 rounded w-96"></div>
          </div>

          {/* Filters Skeleton */}
          <div className="flex gap-4 mb-6">
            <div className="h-12 bg-gray-800/50 rounded-lg flex-1"></div>
            <div className="h-12 bg-gray-800/50 rounded-lg w-32"></div>
            <div className="h-12 bg-gray-800/50 rounded-lg w-32"></div>
          </div>

          {/* Columns Skeleton */}
          <div className="flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1">
                <div className="h-8 bg-gray-800/50 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-32 bg-gray-800/30 rounded-xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent shimmer"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .shimmer {
            animation: shimmer 2s infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-pure-black text-pure-white">
      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.5) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.7);
        }

        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-from-right-2 {
          from {
            transform: translateX(8px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-in {
          animation: animate-in 0.3s ease-out;
        }

        .slide-in-from-right-2 {
          animation: slide-in-from-right-2 0.3s ease-out;
        }

        .collaboration-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1);
        }

        .user-avatar-glow {
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }

        .notification-slide {
          transform: translateX(100%);
          animation: slideInFromRight 0.3s ease-out forwards;
        }

        @keyframes slideInFromRight {
          to {
            transform: translateX(0);
          }
        }

        .task-editing-pulse {
          animation: editingPulse 2s infinite;
        }

        @keyframes editingPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(251, 191, 36, 0);
          }
        }
      `}</style>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-white via-gray-100 to-primary-300 bg-clip-text text-transparent">
                Organizador de Tarefas
                {isGuest && (
                  <span className="ml-3 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300 font-normal">
                    👤 Acesso Compartilhado
                  </span>
                )}
              </h1>
              <p className="text-gray-400 mt-2">
                {isGuest && guestSession ?
                  `Bem-vindo, ${guestSession.name}! Você tem acesso ${canEdit() ? 'de edição' : 'somente leitura'} a este quadro.` :
                  'Gerencie seus projetos com quadros Kanban personalizados'
                }
              </p>
            </div>
            
            {/* Board Selector */}
            <div className="relative">
              <button
                onClick={() => setShowBoardSelector(!showBoardSelector)}
                className="flex items-center space-x-3 bg-gray-800/50 hover:bg-gray-700/50 px-4 py-3 rounded-xl border border-gray-700/50 transition-all duration-300"
              >
                <div className={`w-4 h-4 rounded-full ${currentBoard?.color || 'bg-blue-500'}`}></div>
                <div className="text-left">
                  <div className="font-medium text-white">{currentBoard?.title || 'Selecionar Quadro'}</div>
                  <div className="text-xs text-gray-400">{columns.length} colunas</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {/* Board Selector Dropdown */}
              {showBoardSelector && (
                <div className="absolute top-full mt-2 left-0 w-80 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-700/30">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white">Seus Quadros</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {setShowImportModal(true); setShowBoardSelector(false);}}
                          className="flex items-center space-x-1 text-xs text-green-400 hover:text-green-300 transition-colors"
                          title="Importar JSON"
                        >
                          <Upload className="h-3 w-3" />
                          <span>Importar</span>
                        </button>
                        <button
                          onClick={() => {setShowBoardModal(true); setShowBoardSelector(false);}}
                          className="flex items-center space-x-1 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Novo</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto">
                    {boards
                      .sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0))
                      .map((board) => (
                      <div
                        key={board.id}
                        className={`p-4 hover:bg-gray-800/30 transition-colors border-b border-gray-700/20 last:border-b-0 ${
                          board.id === currentBoardId ? 'bg-gray-800/20' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => {setCurrentBoardId(board.id); setShowBoardSelector(false);}}
                            className="flex items-center space-x-3 flex-1 text-left"
                          >
                            <div className={`w-3 h-3 rounded-full ${board.color}`}></div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className={`font-medium ${board.id === currentBoardId ? 'text-primary-300' : 'text-white'}`}>
                                  {board.title}
                                </span>
                                {board.isFavorite && (
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                )}
                              </div>
                              {board.description && (
                                <div className="text-xs text-gray-400 mt-1">{board.description}</div>
                              )}
                              <div className="text-xs text-gray-500 mt-1">
                                {board.columns.reduce((acc, col) => acc + col.tasks.length, 0)} tarefas
                              </div>
                            </div>
                          </button>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => toggleBoardFavorite(board.id)}
                              className="p-1 rounded text-gray-400 hover:text-yellow-400 transition-colors"
                            >
                              <Star className={`h-3 w-3 ${board.isFavorite ? 'fill-current text-yellow-400' : ''}`} />
                            </button>
                            <button
                              onClick={() => duplicateBoard(board)}
                              className="p-1 rounded text-gray-400 hover:text-blue-400 transition-colors"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => openShareModal(board.id)}
                              className="p-1 rounded text-gray-400 hover:text-purple-400 transition-colors"
                              title="Compartilhar quadro"
                            >
                              <Share2 className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => openEditBoard(board)}
                              className="p-1 rounded text-gray-400 hover:text-green-400 transition-colors"
                            >
                              <Edit3 className="h-3 w-3" />
                            </button>
                            {boards.length > 1 && (
                              <button
                                onClick={() => deleteBoard(board.id)}
                                className="p-1 rounded text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowColumnModal(true)}
              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
              <span className="font-medium">Nova Coluna</span>
            </button>
            {canEdit() && (
              <button
                onClick={() => {
                  console.log('DEBUG: Nova Tarefa button clicked');
                  setTargetColumnId(getDefaultTaskColumn());
                  setShowTaskModal(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-4 w-4" />
                <span className="font-medium">Nova Tarefa</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 space-y-4">
        {/* Search Row */}
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar tasks... (título, descrição, tags)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-gray-900/60 border border-gray-700/50 rounded-lg px-4 py-2.5 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Results Counter */}
          {hasActiveFilters && (
            <div className="flex items-center space-x-2 px-4 py-2.5 bg-primary-500/20 border border-primary-500/50 rounded-lg">
              <span className="text-sm font-medium text-primary-300">
                {getFilteredTasksCount()} resultado{getFilteredTasksCount() !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-300 hover:text-red-200 transition-all duration-200"
            >
              <X className="h-4 w-4" />
              <span className="text-sm font-medium">Limpar Filtros</span>
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Quick Views */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400 font-semibold uppercase">Views:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    clearFilters();
                    setFilterPriority(['urgent', 'high']);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-purple-500/50 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-xs font-medium transition-all duration-200"
                >
                  Alta Prioridade
                </button>
                <button
                  onClick={() => {
                    clearFilters();
                    setFilterPriority(['urgent']);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-red-500/50 bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs font-medium transition-all duration-200"
                >
                  Urgente
                </button>
                <button
                  onClick={clearFilters}
                  className="px-3 py-1.5 rounded-lg border border-gray-500/50 bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 text-xs font-medium transition-all duration-200"
                >
                  Todas
                </button>
              </div>
            </div>

            {/* Priority Filters */}
            <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 font-semibold uppercase">Prioridade:</span>
            <div className="flex items-center space-x-2">
              {(['urgent', 'high', 'medium', 'low'] as const).map((priority) => {
                const isActive = filterPriority.includes(priority);
                const colors = {
                  urgent: 'bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30',
                  high: 'bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30',
                  medium: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/30',
                  low: 'bg-green-500/20 border-green-500/50 text-green-300 hover:bg-green-500/30'
                };
                const activeColors = {
                  urgent: 'bg-red-500/40 border-red-400 text-red-200 ring-2 ring-red-500/30',
                  high: 'bg-amber-500/40 border-amber-400 text-amber-200 ring-2 ring-amber-500/30',
                  medium: 'bg-yellow-500/40 border-yellow-400 text-yellow-200 ring-2 ring-yellow-500/30',
                  low: 'bg-green-500/40 border-green-400 text-green-200 ring-2 ring-green-500/30'
                };
                const labels = { urgent: 'Urgente', high: 'Alta', medium: 'Média', low: 'Baixa' };

                return (
                  <button
                    key={priority}
                    onClick={() => {
                      setFilterPriority(prev =>
                        prev.includes(priority)
                          ? prev.filter(p => p !== priority)
                          : [...prev, priority]
                      );
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                      isActive ? activeColors[priority] : colors[priority]
                    }`}
                  >
                    {labels[priority]}
                  </button>
                );
              })}
            </div>
          </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Switcher */}
            <div className="flex items-center bg-gray-700/30 border border-gray-600/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('kanban')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all duration-200 ${
                  viewMode === 'kanban'
                    ? 'bg-primary-500/30 text-primary-300 shadow-sm'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-600/30'
                }`}
                title="Kanban View"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="text-xs font-medium">Kanban</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-primary-500/30 text-primary-300 shadow-sm'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-600/30'
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
                <span className="text-xs font-medium">Lista</span>
              </button>
            </div>

            {/* Compact Mode Toggle */}
            <button
              onClick={() => setIsCompactMode(!isCompactMode)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                isCompactMode
                  ? 'bg-purple-500/30 border-purple-500/50 text-purple-300'
                  : 'bg-gray-700/30 border-gray-600/50 text-gray-400 hover:text-gray-300'
              }`}
              title={isCompactMode ? 'Modo Normal' : 'Modo Compacto'}
            >
              {isCompactMode ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
              <span className="text-xs font-medium">
                {isCompactMode ? 'Normal' : 'Compacto'}
              </span>
            </button>

            {/* Multi-Select Toggle */}
            <button
              onClick={() => {
                setIsMultiSelectMode(!isMultiSelectMode);
                if (isMultiSelectMode) clearSelection();
              }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                isMultiSelectMode
                  ? 'bg-blue-500/30 border-blue-500/50 text-blue-300'
                  : 'bg-gray-700/30 border-gray-600/50 text-gray-400 hover:text-gray-300'
              }`}
              title="Multi-select mode"
            >
              {isMultiSelectMode ? (
                <CheckSquare className="h-4 w-4" />
              ) : (
                <Square className="h-4 w-4" />
              )}
              <span className="text-xs font-medium">
                {isMultiSelectMode ? `${selectedTasks.length} selecionadas` : 'Selecionar múltiplas'}
              </span>
            </button>

            {/* Bulk Actions */}
            {isMultiSelectMode && selectedTasks.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={bulkDeleteTasks}
                  className="px-3 py-2 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-all"
                >
                  Excluir {selectedTasks.length}
                </button>
              </div>
            )}

            {/* Mini Dashboard */}
            {(() => {
              const metrics = getBoardDashboardMetrics();
              if (!metrics) return null;

              return (
                <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg backdrop-blur-md">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-purple-400" />
                    <div>
                      <div className="text-xs text-gray-400">Total</div>
                      <div className="text-sm font-bold text-white">{metrics.total}</div>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-600"></div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <div>
                      <div className="text-xs text-gray-400">Hoje</div>
                      <div className="text-sm font-bold text-white">{metrics.completedToday}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    <div>
                      <div className="text-xs text-gray-400">Semana</div>
                      <div className="text-sm font-bold text-white">{metrics.completedThisWeek}</div>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-600"></div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <div>
                      <div className="text-xs text-gray-400">Velocity</div>
                      <div className="text-sm font-bold text-white">{metrics.velocity}/dia</div>
                    </div>
                  </div>
                  {metrics.bottleneckCount > 0 && (
                    <>
                      <div className="w-px h-8 bg-gray-600"></div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 animate-pulse" />
                        <div>
                          <div className="text-xs text-gray-400">Bottlenecks</div>
                          <div className="text-sm font-bold text-red-400" title={metrics.bottleneckNames.join(', ')}>
                            {metrics.bottleneckCount}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`
              max-w-sm p-4 rounded-lg shadow-lg border transition-all duration-300 ease-in-out
              transform animate-in slide-in-from-right-2
              ${
                notification.type === 'success'
                  ? 'bg-green-900/90 border-green-500/50 text-green-100'
                  : notification.type === 'warning'
                  ? 'bg-yellow-900/90 border-yellow-500/50 text-yellow-100'
                  : 'bg-blue-900/90 border-blue-500/50 text-blue-100'
              }
            `}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {notification.type === 'success' && <span className="text-green-400">✅</span>}
                {notification.type === 'warning' && <span className="text-yellow-400">⚠️</span>}
                {notification.type === 'info' && <span className="text-blue-400">ℹ️</span>}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs opacity-75 mt-1">
                  {notification.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Board Content - Kanban or List */}
      {viewMode === 'list' ? (
        /* List View */
        <div className="space-y-4">
          {columns.map((column) => (
            <div key={column.id} className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                  <h3 className="font-bold text-white text-lg">{column.title}</h3>
                  <span className="bg-gray-700/50 text-gray-400 px-2 py-1 rounded text-xs">
                    {column.tasks.length}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {column.tasks.map((task) => {
                  const isHighlighted = !hasActiveFilters || filterTask(task);
                  return (
                    <div
                      key={task.id}
                      onClick={() => openEditTask(task)}
                      className={`flex items-center justify-between p-3 bg-gray-900/40 border border-gray-700/50 rounded-lg hover:border-gray-600/70 cursor-pointer transition-all ${
                        !isHighlighted ? 'opacity-30 hover:opacity-50' : ''
                      } ${getPriorityBorderClass(task.priority)}`}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTaskCompletion(task.id);
                          }}
                          className="hover:scale-110 transition-transform"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                        <span className={`font-medium flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                          {task.title}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {task.assignee && (
                          <div className={`w-6 h-6 rounded-full ${getAvatarColor(task.assignee)} flex items-center justify-center text-xs font-bold text-white`}>
                            {getInitials(task.assignee)}
                          </div>
                        )}
                        {task.dueDate && getDueDateStatus(task.dueDate) && (
                          <span className={`text-xs px-2 py-1 rounded border ${getDueDateStatus(task.dueDate)?.color}`}>
                            {getDueDateStatus(task.dueDate)?.label}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Kanban View */
        <div
          className={`${
            isMobile
              ? 'flex flex-col gap-4'
              : isTablet
              ? 'grid grid-cols-2 gap-6 overflow-x-auto pb-6'
              : 'flex gap-8 overflow-x-auto pb-6'
          } select-none ${!isMobile && !isTablet ? (isScrolling ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
          onMouseDown={!isMobile ? handleMouseDown : undefined}
          onMouseMove={!isMobile ? handleMouseMove : undefined}
          onMouseUp={!isMobile ? handleMouseUp : undefined}
          onMouseLeave={!isMobile ? handleMouseLeave : undefined}
          style={{ scrollbarWidth: 'thin' }}
        >
          {columns.map((column) => (
          <div
            key={column.id}
            className={`${
              isMobile
                ? 'w-full'
                : isTablet
                ? 'w-full'
                : 'flex-shrink-0 w-80'
            }`}
            onDragOver={(e) => {
              if (draggedColumn) {
                handleColumnDragOver(e);
              } else {
                handleDragOver(e);
              }
            }}
            onDrop={(e) => {
              // Handle column drops, task drops, and subcolumn drops
              if (draggedColumn) {
                handleColumnDrop(e, column.id);
              } else if (draggedSubColumn) {
                handleSubColumnDrop(e, column.id);
              } else {
                handleDrop(e, column.id);
              }
            }}
          >
            {/* Column Header */}
            <div
              className={`flex items-center justify-between mb-4 cursor-move p-3 rounded-xl bg-gradient-to-r from-gray-800/60 via-gray-800/40 to-gray-800/60 backdrop-blur-md border transition-all duration-300 shadow-lg ${
                isWipLimitExceeded(column)
                  ? 'border-red-500/50 hover:border-red-500/70 animate-pulse'
                  : 'border-white/10 hover:border-white/20'
              }`}
              draggable
              onDragStart={(e) => handleColumnDragStart(e, column.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${column.color} shadow-lg`}></div>
                {editingColumnId === column.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editingColumnTitle}
                      onChange={(e) => setEditingColumnTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          saveColumnTitle();
                        } else if (e.key === 'Escape') {
                          cancelEditingColumn();
                        }
                      }}
                      onBlur={saveColumnTitle}
                      className="font-bold text-white bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary-500"
                      autoFocus
                    />
                  </div>
                ) : (
                  <h3
                    className="font-bold text-white cursor-pointer hover:text-primary-300 transition-colors"
                    onClick={() => startEditingColumn(column.id, column.title)}
                    title="Clique para editar o título"
                  >
                    {column.title}
                  </h3>
                )}
                <span className="bg-gradient-to-br from-gray-700/60 to-gray-800/60 backdrop-blur-sm text-gray-300 px-2.5 py-1 rounded-lg text-xs font-bold border border-white/10 shadow-sm">
                  {column.tasks.length}
                  {column.wipLimit && <span className="text-gray-500">/{column.wipLimit}</span>}
                </span>
                {column.wipLimit && (
                  <div className="relative w-8 h-8">
                    <svg className="w-8 h-8 transform -rotate-90">
                      <circle
                        cx="16"
                        cy="16"
                        r="12"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className="text-gray-700"
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="12"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 12}`}
                        strokeDashoffset={`${2 * Math.PI * 12 * (1 - getWipLimitPercentage(column) / 100)}`}
                        className={`transition-all duration-300 ${
                          isWipLimitExceeded(column)
                            ? 'text-red-500 animate-pulse'
                            : getWipLimitPercentage(column) > 75
                            ? 'text-yellow-500'
                            : 'text-green-500'
                        }`}
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => startEditingColumn(column.id, column.title)}
                  className="p-1 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-gray-800/50 transition-all duration-200 hover:scale-110 active:scale-95"
                  title="Editar título da coluna"
                >
                  <Edit3 className="h-4 w-4 transition-transform duration-200 hover:rotate-12" />
                </button>
                {canEdit() && (
                  <>
                    <button
                      onClick={() => {
                        resetTaskForm();
                        setTargetColumnId(column.id);
                        setShowTaskModal(true);
                      }}
                      className="p-1 rounded-lg text-gray-400 hover:text-green-400 hover:bg-gray-800/50 transition-all duration-200 hover:scale-110 active:scale-95"
                      title="Adicionar tarefa aqui"
                    >
                      <Plus className="h-4 w-4 transition-transform duration-200 hover:rotate-90" />
                    </button>
                    <button
                      onClick={() => createSubColumn(column.id)}
                      className="p-1 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-gray-800/50 transition-all duration-200 hover:scale-110 active:scale-95"
                      title="Adicionar subcoluna"
                    >
                      <FolderPlus className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
                    </button>
                    <button
                      onClick={() => openWipLimitModal(column.id)}
                      className="p-1 rounded-lg text-gray-400 hover:text-orange-400 hover:bg-gray-800/50 transition-all duration-200 hover:scale-110 active:scale-95"
                      title="Configurar WIP Limit"
                    >
                      <Gauge className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
                    </button>
                    <button
                      onClick={() => setExpandedMetricsColumnId(expandedMetricsColumnId === column.id ? null : column.id)}
                      className="p-1 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-200 hover:scale-110 active:scale-95"
                      title="Ver métricas"
                    >
                      <BarChart3 className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
                    </button>
                  </>
                )}
                {columns.length > 1 && (
                  <button
                    onClick={() => deleteColumn(column.id)}
                    className="p-1 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800/50 transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Excluir coluna"
                  >
                    <Trash2 className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
                  </button>
                )}
              </div>
            </div>

            {/* Column Metrics Panel */}
            {expandedMetricsColumnId === column.id && (() => {
              const metrics = getColumnMetrics(column);
              return (
                <div className="mb-3 p-3 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl backdrop-blur-md">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-cyan-400" />
                      <div>
                        <div className="text-xs text-gray-400">Total</div>
                        <div className="text-sm font-bold text-white">{metrics.total}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <div>
                        <div className="text-xs text-gray-400">Esta semana</div>
                        <div className="text-sm font-bold text-white">{metrics.thisWeek}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-400" />
                      <div>
                        <div className="text-xs text-gray-400">Tempo médio</div>
                        <div className="text-sm font-bold text-white">{metrics.avgTime}d</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-400" />
                      <div>
                        <div className="text-xs text-gray-400">Taxa conclusão</div>
                        <div className="text-sm font-bold text-white">{metrics.completionRate}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Tasks or SubColumns (Accordion) */}
            <div className="space-y-3 min-h-[200px]">
              {/* Render SubColumns if they exist (Accordion mode) */}
              {column.subColumns && column.subColumns.length > 0 ? (
                <>
                  {/* Render SubColumns as Accordion */}
                  {column.subColumns.map((subColumn) => {
                    const isExpanded = expandedSubColumns[subColumn.id] !== false; // Default to true (expanded)

                    return (
                    <div
                      key={subColumn.id}
                      className="border border-white/10 rounded-xl overflow-hidden backdrop-blur-md bg-gradient-to-br from-gray-800/40 to-gray-900/40 shadow-lg shadow-black/20"
                      onDragOver={(e) => {
                        e.preventDefault();
                        // Auto-expand on hover during drag
                        if (isDragging && !isExpanded) {
                          setExpandedSubColumns(prev => ({ ...prev, [subColumn.id]: true }));
                        }
                      }}
                    >
                      {/* SubColumn Header */}
                      <div
                        className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 backdrop-blur-sm p-3 flex items-center justify-between hover:from-gray-700/60 hover:to-gray-700/40 transition-all duration-300 cursor-move border-b border-white/5"
                        draggable
                        onDragStart={(e) => handleSubColumnDragStart(e, subColumn.id, column.id)}
                      >
                        <div
                          className="flex items-center space-x-3 flex-1 cursor-pointer"
                          onClick={() => toggleSubColumnExpanded(subColumn.id)}
                        >
                          <ChevronDown
                            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-0' : '-rotate-90'
                            }`}
                          />
                          <h4 className="font-semibold text-white">{subColumn.title}</h4>
                          <span className="bg-gray-700/50 text-gray-400 px-2 py-0.5 rounded text-xs">
                            {subColumn.tasks?.length || 0}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateSubColumn(subColumn.id, subColumn.title);
                            }}
                            className="p-1 rounded text-gray-400 hover:text-blue-400 transition-colors"
                            title="Editar subcoluna"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSubColumn(subColumn.id);
                            }}
                            className="p-1 rounded text-gray-400 hover:text-red-400 transition-colors"
                            title="Deletar subcoluna"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* SubColumn Tasks */}
                      {isExpanded && (
                      <div
                        className="p-3 space-y-3 bg-gradient-to-b from-gray-900/20 to-gray-900/40 backdrop-blur-sm min-h-[100px]"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropInSubColumn(e, column.id, subColumn.id)}
                      >
                        {subColumn.tasks?.map((task, taskIndex) => {
                          const checklist = task.checklist || [];
                          const checklistProgress = getChecklistProgress(checklist);
                          const hasChecklist = checklist.length > 0;
                          const isHighlighted = !hasActiveFilters || filterTask(task);

                          return (
                            <React.Fragment key={task.id}>
                              {/* Drop indicator line */}
                              {isDragging && dropIndicator?.columnId === column.id && dropIndicator?.subColumnId === subColumn.id && dropIndicator?.index === taskIndex && (
                                <div className="h-1 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 my-2 animate-pulse" />
                              )}
                              <div
                                draggable={!isMobile}
                                onDragStart={(e) => !isMobile && handleDragStart(e, task.id, column.id)}
                                onTouchStart={(e) => handleTouchStart(e, task.id)}
                                onTouchMove={(e) => handleTouchMove(e, task.id)}
                                onTouchEnd={() => handleTouchEnd(task.id)}
                              onClick={(e) => {
                                if (e.target instanceof HTMLElement && !e.target.closest('button')) {
                                  if (isMultiSelectMode || e.shiftKey) {
                                    e.stopPropagation();
                                    toggleTaskSelection(task.id, true);
                                  } else {
                                    openEditTask(task);
                                  }
                                }
                              }}
                              onContextMenu={(e) => handleContextMenu(e, task.id)}
                              className={`group kanban-card bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border rounded-xl ${isCompactMode ? 'p-3' : 'p-5'} hover:from-gray-900/70 hover:to-gray-900/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary-500/20 hover:scale-[1.02] ${getPriorityBorderClass(task.priority)} ${
                                task.completed ? 'opacity-75' : ''
                              } ${
                                !isHighlighted ? 'opacity-30 hover:opacity-50' : ''
                              } ${
                                selectedTasks.includes(task.id)
                                  ? 'border-blue-500/80 shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/50 bg-blue-900/20'
                                  : selectedTaskId === task.id
                                  ? 'border-primary-500/80 shadow-lg shadow-primary-500/30 ring-2 ring-primary-500/50'
                                  : 'border-gray-700/50 hover:border-gray-600/70'
                              } ${
                                isTaskOld(task) ? 'animate-pulse' : ''
                              }`}
                            >
                              {/* Task Header */}
                              <div className={`flex items-start justify-between ${isCompactMode ? 'mb-2' : 'mb-3'}`}>
                                <div className="flex items-center space-x-2">
                                  {/* Drag Handle */}
                                  <div className={`${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-200 cursor-grab active:cursor-grabbing`}>
                                    <GripVertical className={`${isMobile ? 'h-6 w-6' : 'h-4 w-4'} text-gray-500`} />
                                  </div>
                                  {isMultiSelectMode && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleTaskSelection(task.id, true);
                                      }}
                                      className={`hover:scale-110 transition-all duration-200 ${isMobile ? 'p-2' : ''}`}
                                    >
                                      {selectedTasks.includes(task.id) ? (
                                        <CheckSquare className={`${isMobile ? 'h-6 w-6' : 'h-5 w-5'} text-blue-400`} />
                                      ) : (
                                        <Square className={`${isMobile ? 'h-6 w-6' : 'h-5 w-5'} text-gray-400`} />
                                      )}
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleTaskCompletion(task.id);
                                    }}
                                    className={`hover:scale-125 active:scale-95 transition-all duration-200 group ${isMobile ? 'p-2' : ''}`}
                                  >
                                    {task.completed ? (
                                      <CheckCircle2 className={`${isMobile ? 'h-6 w-6' : 'h-4 w-4'} text-green-400 flex-shrink-0 animate-pulse`} />
                                    ) : (
                                      <Circle className={`${isMobile ? 'h-6 w-6' : 'h-4 w-4'} text-gray-400 flex-shrink-0 hover:text-green-400 group-hover:rotate-90 transition-all duration-300`} />
                                    )}
                                  </button>
                                  <div className="flex items-center space-x-2">
                                    {getPriorityIcon(task.priority)}
                                    {hasChecklist && (
                                      <ListChecks className="h-3 w-3 text-blue-400" />
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <button
                                    onClick={() => duplicateTask(task.id)}
                                    className="p-1 rounded text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-200 hover:scale-110 active:scale-95"
                                    title="Duplicar tarefa"
                                  >
                                    <Copy className="h-3 w-3 transition-transform duration-200 hover:scale-110" />
                                  </button>
                                  <button
                                    onClick={() => openEditTask(task)}
                                    className={`${isMobile ? 'p-2' : 'p-1'} rounded text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200 hover:scale-110 active:scale-95`}
                                    title="Editar tarefa"
                                  >
                                    <Edit3 className={`${isMobile ? 'h-5 w-5' : 'h-3 w-3'} transition-transform duration-200 hover:rotate-12`} />
                                  </button>
                                  <button
                                    onClick={() => deleteTask(task.id)}
                                    className={`${isMobile ? 'p-2' : 'p-1'} rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 hover:scale-110 active:scale-95`}
                                    title="Excluir tarefa"
                                  >
                                    <Trash2 className={`${isMobile ? 'h-5 w-5' : 'h-3 w-3'} transition-transform duration-200 hover:scale-110`} />
                                  </button>
                                </div>
                              </div>

                              {/* Task Content */}
                              <div className="mb-3">
                                {inlineEditingTaskId === task.id ? (
                                  <input
                                    type="text"
                                    value={inlineEditTitle}
                                    onChange={(e) => setInlineEditTitle(e.target.value)}
                                    onBlur={saveInlineEdit}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') saveInlineEdit();
                                      if (e.key === 'Escape') cancelInlineEdit();
                                    }}
                                    className="w-full font-bold text-lg mb-1 bg-gray-800 border border-primary-500 rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                    autoFocus
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                ) : (
                                  <h4
                                    className={`font-bold text-lg mb-1 cursor-text ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}
                                    onDoubleClick={(e) => {
                                      e.stopPropagation();
                                      startInlineEditing(task.id, task.title);
                                    }}
                                    title="Double-click para editar"
                                  >
                                    {task.title}
                                  </h4>
                                )}
                                {task.description && (
                                  <p className="text-sm text-gray-400 line-clamp-2">{task.description}</p>
                                )}
                              </div>

                              {/* Checklist Progress */}
                              {hasChecklist && (
                                <div className="mb-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      <ListChecks className="h-3.5 w-3.5 text-blue-400" />
                                      <span className="text-xs font-medium text-gray-300">
                                        {checklist.filter(item => item.completed).length}/{checklist.length} concluídos
                                      </span>
                                    </div>
                                    <span className={`text-xs font-bold ${checklistProgress === 100 ? 'text-green-400' : 'text-gray-400'}`}>
                                      {checklistProgress}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden border border-gray-600/50">
                                    <div
                                      className={`h-2.5 rounded-full transition-all duration-500 ${getProgressBarColor(checklistProgress)}`}
                                      style={{ width: `${checklistProgress}%` }}
                                    ></div>
                                  </div>

                                  {/* Mini Checklist Preview */}
                                  <div className="mt-2 space-y-1 max-h-20 overflow-y-auto">
                                    {checklist.slice(0, 3).map((item) => (
                                      <div key={item.id} className="flex items-center space-x-2">
                                        <button
                                          onClick={() => toggleTaskChecklistItem(task.id, item.id)}
                                          className="hover:scale-110 transition-transform"
                                        >
                                          {item.completed ? (
                                            <CheckCircle2 className="h-3 w-3 text-green-400 flex-shrink-0" />
                                          ) : (
                                            <Circle className="h-3 w-3 text-gray-400 flex-shrink-0 hover:text-green-400" />
                                          )}
                                        </button>
                                        <span className={`text-xs ${item.completed ? 'line-through text-gray-500' : 'text-gray-300'} truncate`}>
                                          {item.text}
                                        </span>
                                      </div>
                                    ))}
                                    {checklist.length > 3 && (
                                      <div className="text-xs text-gray-500 pl-5">
                                        +{checklist.length - 3} mais itens...
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Real-time editing indicator */}
                              {editingUsers[task.id] && (
                                <div className="mb-3 flex items-center space-x-2 bg-yellow-900/20 border border-yellow-500/30 px-3 py-2 rounded-lg">
                                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                  <span className="text-yellow-300 text-xs font-medium">
                                    {editingUsers[task.id].userName} está editando esta tarefa...
                                  </span>
                                  <div className="flex space-x-0.5">
                                    <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                  </div>
                                </div>
                              )}

                              {/* Tags */}
                              {task.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                  {task.tags.map((tag, index) => (
                                    <span
                                      key={index}
                                      className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-all duration-200 hover:scale-105 hover:shadow-md backdrop-blur-sm ${getTagColor(tag)}`}
                                      title={`Tag: ${tag}`}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Task Age Indicator */}
                              {(() => {
                                const ageDays = getTaskAgeDays(task);
                                const ageColor = getTaskAgeColor(ageDays);
                                return (
                                  <div className={`flex items-center space-x-1.5 px-2 py-1 rounded-md border mb-3 ${ageColor.bg} ${ageColor.border}`}>
                                    <Clock className={`h-3 w-3 ${ageColor.text}`} />
                                    <span className={`text-xs font-medium ${ageColor.text}`}>
                                      {ageDays === 0 ? 'Hoje' : ageDays === 1 ? '1 dia' : `${ageDays} dias`}
                                    </span>
                                  </div>
                                );
                              })()}

                              {/* Task Footer */}
                              <div className="flex items-center justify-between text-xs text-gray-400">
                                <div className="flex items-center space-x-3">
                                  {task.assignee && (
                                    <div className="flex items-center space-x-2" title={task.assignee}>
                                      <div className={`w-8 h-8 rounded-full ${getAvatarColor(task.assignee)} flex items-center justify-center text-white text-xs font-semibold`}>
                                        {getInitials(task.assignee)}
                                      </div>
                                      <span className="text-gray-300">{task.assignee}</span>
                                    </div>
                                  )}
                                  {task.dueDate && (() => {
                                    const dueDateStatus = getDueDateStatus(task.dueDate);
                                    return dueDateStatus ? (
                                      <div className={`flex items-center space-x-1.5 px-2 py-1 rounded-md border ${dueDateStatus.color} ${dueDateStatus.urgent ? 'animate-pulse' : ''}`}>
                                        <Clock className="h-3 w-3" />
                                        <span className="font-medium">{dueDateStatus.label}</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center space-x-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                                      </div>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                      )}
                    </div>
                    );
                  })}

                  {/* Direct Tasks (not in any subcolumn) */}
                  {column.tasks.filter(task => !task.subColumnId).map((task, taskIndex) => {
                    const checklist = task.checklist || [];
                    const checklistProgress = getChecklistProgress(checklist);
                    const hasChecklist = checklist.length > 0;
                    const isHighlighted = !hasActiveFilters || filterTask(task);

                    return (
                      <React.Fragment key={task.id}>
                        {/* Drop indicator line */}
                        {isDragging && dropIndicator?.columnId === column.id && !dropIndicator?.subColumnId && dropIndicator?.index === taskIndex && (
                          <div className="h-1 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 my-2 animate-pulse" />
                        )}
                        <div
                          draggable={!isMobile}
                          onDragStart={(e) => !isMobile && handleDragStart(e, task.id, column.id)}
                          onTouchStart={(e) => handleTouchStart(e, task.id)}
                          onTouchMove={(e) => handleTouchMove(e, task.id)}
                          onTouchEnd={() => handleTouchEnd(task.id)}
                        onClick={(e) => {
                          if (e.target instanceof HTMLElement && !e.target.closest('button')) {
                            if (isMultiSelectMode || e.shiftKey) {
                              e.stopPropagation();
                              toggleTaskSelection(task.id, true);
                            } else {
                              openEditTask(task);
                            }
                          }
                        }}
                        onContextMenu={(e) => handleContextMenu(e, task.id)}
                        className={`group kanban-card bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border rounded-xl ${isCompactMode ? 'p-3' : 'p-5'} hover:from-gray-900/70 hover:to-gray-900/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary-500/20 hover:scale-[1.02] ${getPriorityBorderClass(task.priority)} ${
                          task.completed ? 'opacity-75' : ''
                        } ${
                          !isHighlighted ? 'opacity-30 hover:opacity-50' : ''
                        } ${
                          selectedTasks.includes(task.id)
                            ? 'border-blue-500/80 shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/50 bg-blue-900/20'
                            : selectedTaskId === task.id
                            ? 'border-primary-500/80 shadow-lg shadow-primary-500/30 ring-2 ring-primary-500/50'
                            : 'border-gray-700/50 hover:border-gray-600/70'
                        } ${
                          isTaskOld(task) ? 'animate-pulse' : ''
                        }`}
                      >
                        {/* Same task rendering as above - keeping original code */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {/* Drag Handle */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing">
                              <GripVertical className="h-4 w-4 text-gray-500" />
                            </div>
                            {isMultiSelectMode && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTaskSelection(task.id, true);
                                }}
                                className="hover:scale-110 transition-all duration-200"
                              >
                                {selectedTasks.includes(task.id) ? (
                                  <CheckSquare className="h-5 w-5 text-blue-400" />
                                ) : (
                                  <Square className="h-5 w-5 text-gray-400" />
                                )}
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTaskCompletion(task.id);
                              }}
                              className="hover:scale-125 active:scale-95 transition-all duration-200 group"
                            >
                              {task.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 animate-pulse" />
                              ) : (
                                <Circle className="h-4 w-4 text-gray-400 flex-shrink-0 hover:text-green-400 group-hover:rotate-90 transition-all duration-300" />
                              )}
                            </button>
                            <div className="flex items-center space-x-2">
                              {getPriorityIcon(task.priority)}
                              {hasChecklist && (
                                <ListChecks className="h-3 w-3 text-blue-400" />
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => duplicateTask(task.id)}
                              className="p-1 rounded text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-200 hover:scale-110 active:scale-95"
                              title="Duplicar tarefa"
                            >
                              <Copy className="h-3 w-3 transition-transform duration-200 hover:scale-110" />
                            </button>
                            <button
                              onClick={() => openEditTask(task)}
                              className="p-1 rounded text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200 hover:scale-110 active:scale-95"
                              title="Editar tarefa"
                            >
                              <Edit3 className="h-3 w-3 transition-transform duration-200 hover:rotate-12" />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-1 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 hover:scale-110 active:scale-95"
                              title="Excluir tarefa"
                            >
                              <Trash2 className="h-3 w-3 transition-transform duration-200 hover:scale-110" />
                            </button>
                          </div>
                        </div>
                        <div className="mb-3">
                          {inlineEditingTaskId === task.id ? (
                            <input
                              type="text"
                              value={inlineEditTitle}
                              onChange={(e) => setInlineEditTitle(e.target.value)}
                              onBlur={saveInlineEdit}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveInlineEdit();
                                if (e.key === 'Escape') cancelInlineEdit();
                              }}
                              className="w-full font-bold text-lg mb-1 bg-gray-800 border border-primary-500 rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <h4
                              className={`font-bold text-lg mb-1 cursor-text ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}
                              onDoubleClick={(e) => {
                                e.stopPropagation();
                                startInlineEditing(task.id, task.title);
                              }}
                              title="Double-click para editar"
                            >
                              {task.title}
                            </h4>
                          )}
                          {task.description && (
                            <p className="text-sm text-gray-400 line-clamp-2">{task.description}</p>
                          )}
                        </div>
                        {hasChecklist && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <ListChecks className="h-3.5 w-3.5 text-blue-400" />
                                <span className="text-xs font-medium text-gray-300">
                                  {checklist.filter(item => item.completed).length}/{checklist.length} concluídos
                                </span>
                              </div>
                              <span className={`text-xs font-bold ${checklistProgress === 100 ? 'text-green-400' : 'text-gray-400'}`}>
                                {checklistProgress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden border border-gray-600/50">
                              <div
                                className={`h-2.5 rounded-full transition-all duration-500 ${getProgressBarColor(checklistProgress)}`}
                                style={{ width: `${checklistProgress}%` }}
                              ></div>
                            </div>
                            <div className="mt-2 space-y-1 max-h-20 overflow-y-auto">
                              {checklist.slice(0, 3).map((item) => (
                                <div key={item.id} className="flex items-center space-x-2">
                                  <button
                                    onClick={() => toggleTaskChecklistItem(task.id, item.id)}
                                    className="hover:scale-110 transition-transform"
                                  >
                                    {item.completed ? (
                                      <CheckCircle2 className="h-3 w-3 text-green-400 flex-shrink-0" />
                                    ) : (
                                      <Circle className="h-3 w-3 text-gray-400 flex-shrink-0 hover:text-green-400" />
                                    )}
                                  </button>
                                  <span className={`text-xs ${item.completed ? 'line-through text-gray-500' : 'text-gray-300'} truncate`}>
                                    {item.text}
                                  </span>
                                </div>
                              ))}
                              {checklist.length > 3 && (
                                <div className="text-xs text-gray-500 pl-5">
                                  +{checklist.length - 3} mais itens...
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        {editingUsers[task.id] && (
                          <div className="mb-3 flex items-center space-x-2 bg-yellow-900/20 border border-yellow-500/30 px-3 py-2 rounded-lg">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            <span className="text-yellow-300 text-xs font-medium">
                              {editingUsers[task.id].userName} está editando esta tarefa...
                            </span>
                            <div className="flex space-x-0.5">
                              <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          </div>
                        )}
                        {task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {task.tags.map((tag, index) => {
                              const getTagColor = (tag: string) => {
                                const lowerTag = tag.toLowerCase();
                                if (lowerTag.includes('crítico') || lowerTag.includes('urgente')) return 'bg-red-500/20 text-red-300 border-red-500/30';
                                if (lowerTag.includes('alta')) return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
                                if (lowerTag.includes('média') || lowerTag.includes('medium')) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
                                if (lowerTag.includes('baixa') || lowerTag.includes('low')) return 'bg-green-500/20 text-green-300 border-green-500/30';
                                if (lowerTag.includes('frontend') || lowerTag.includes('ui') || lowerTag.includes('ux')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
                                if (lowerTag.includes('backend') || lowerTag.includes('api')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
                                if (lowerTag.includes('devops') || lowerTag.includes('infra')) return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
                                if (lowerTag.includes('test') || lowerTag.includes('qualidade')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
                                if (lowerTag.includes('doc') || lowerTag.includes('documentação')) return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
                                if (lowerTag.includes('ml') || lowerTag.includes('ia')) return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
                                return 'bg-primary-500/20 text-primary-300 border-primary-500/30';
                              };

                              return (
                                <span
                                  key={index}
                                  className={`px-2 py-1 text-xs rounded-lg border transition-all duration-200 hover:scale-105 hover:shadow-sm ${getTagColor(tag)}`}
                                  title={`Tag: ${tag}`}
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {/* Task Age Indicator */}
                        {(() => {
                          const ageDays = getTaskAgeDays(task);
                          const ageColor = getTaskAgeColor(ageDays);
                          return (
                            <div className={`flex items-center space-x-1.5 px-2 py-1 rounded-md border mb-3 ${ageColor.bg} ${ageColor.border}`}>
                              <Clock className={`h-3 w-3 ${ageColor.text}`} />
                              <span className={`text-xs font-medium ${ageColor.text}`}>
                                {ageDays === 0 ? 'Hoje' : ageDays === 1 ? '1 dia' : `${ageDays} dias`}
                              </span>
                            </div>
                          );
                        })()}

                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center space-x-3">
                            {task.assignee && (
                              <div className="flex items-center space-x-2" title={task.assignee}>
                                <div className={`w-8 h-8 rounded-full ${getAvatarColor(task.assignee)} flex items-center justify-center text-white text-xs font-semibold`}>
                                  {getInitials(task.assignee)}
                                </div>
                                <span className="text-gray-300">{task.assignee}</span>
                              </div>
                            )}
                            {task.dueDate && (() => {
                              const dueDateStatus = getDueDateStatus(task.dueDate);
                              return dueDateStatus ? (
                                <div className={`flex items-center space-x-1.5 px-2 py-1 rounded-md border ${dueDateStatus.color} ${dueDateStatus.urgent ? 'animate-pulse' : ''}`}>
                                  <Clock className="h-3 w-3" />
                                  <span className="font-medium">{dueDateStatus.label}</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                      </React.Fragment>
                    );
                  })}
                </>
              ) : (
                /* No SubColumns - Render tasks normally (original behavior) */
                column.tasks.map((task, taskIndex) => {
                // Ensure checklist exists for backward compatibility
                const checklist = task.checklist || [];
                const checklistProgress = getChecklistProgress(checklist);
                const hasChecklist = checklist.length > 0;
                const isHighlighted = !hasActiveFilters || filterTask(task);

                return (
                  <React.Fragment key={task.id}>
                    {/* Drop indicator line */}
                    {isDragging && dropIndicator?.columnId === column.id && dropIndicator?.index === taskIndex && (
                      <div className="h-1 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 my-2 animate-pulse" />
                    )}
                    <div
                      draggable={!isMobile}
                      onDragStart={(e) => !isMobile && handleDragStart(e, task.id, column.id)}
                      onTouchStart={(e) => handleTouchStart(e, task.id)}
                      onTouchMove={(e) => handleTouchMove(e, task.id)}
                      onTouchEnd={() => handleTouchEnd(task.id)}
                    onClick={(e) => {
                      // Avoid opening when clicking on buttons or when dragging
                      if (e.target instanceof HTMLElement && !e.target.closest('button')) {
                        if (e.shiftKey) {
                          setSelectedTaskId(task.id);
                        } else {
                          openEditTask(task);
                        }
                      }
                    }}
                    onContextMenu={(e) => handleContextMenu(e, task.id)}
                    className={`group kanban-card bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border rounded-xl ${isCompactMode ? 'p-3' : 'p-5'} hover:from-gray-900/70 hover:to-gray-900/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary-500/20 hover:scale-[1.02] ${getPriorityBorderClass(task.priority)} ${
                      task.completed ? 'opacity-75' : ''
                    } ${
                      !isHighlighted ? 'opacity-30 hover:opacity-50' : ''
                    } ${
                      selectedTaskId === task.id
                        ? 'border-primary-500/80 shadow-lg shadow-primary-500/30 ring-2 ring-primary-500/50'
                        : 'border-gray-700/50 hover:border-gray-600/70'
                    }`}
                  >
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="hover:scale-125 active:scale-95 transition-all duration-200 group"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 animate-pulse" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-400 flex-shrink-0 hover:text-green-400 group-hover:rotate-90 transition-all duration-300" />
                          )}
                        </button>
                        <div className="flex items-center space-x-2">
                          {getPriorityIcon(task.priority)}
                          {hasChecklist && (
                            <ListChecks className="h-3 w-3 text-blue-400" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => duplicateTask(task.id)}
                          className="p-1 rounded text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-200 hover:scale-110 active:scale-95"
                          title="Duplicar tarefa"
                        >
                          <Copy className="h-3 w-3 transition-transform duration-200 hover:scale-110" />
                        </button>
                        <button
                          onClick={() => openEditTask(task)}
                          className="p-1 rounded text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200 hover:scale-110 active:scale-95"
                          title="Editar tarefa"
                        >
                          <Edit3 className="h-3 w-3 transition-transform duration-200 hover:rotate-12" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 hover:scale-110 active:scale-95"
                          title="Excluir tarefa"
                        >
                          <Trash2 className="h-3 w-3 transition-transform duration-200 hover:scale-110" />
                        </button>
                      </div>
                    </div>

                    {/* Task Content */}
                    <div className="mb-3">
                      {inlineEditingTaskId === task.id ? (
                        <input
                          type="text"
                          value={inlineEditTitle}
                          onChange={(e) => setInlineEditTitle(e.target.value)}
                          onBlur={saveInlineEdit}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveInlineEdit();
                            if (e.key === 'Escape') cancelInlineEdit();
                          }}
                          className="w-full font-bold text-lg mb-1 bg-gray-800 border border-primary-500 rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <h4
                          className={`font-bold text-lg mb-1 cursor-text ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            startInlineEditing(task.id, task.title);
                          }}
                          title="Double-click para editar"
                        >
                          {task.title}
                        </h4>
                      )}
                      {task.description && (
                        <p className="text-sm text-gray-400 line-clamp-2">{task.description}</p>
                      )}
                    </div>

                    {/* Checklist Progress */}
                    {hasChecklist && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <ListChecks className="h-3.5 w-3.5 text-blue-400" />
                            <span className="text-xs font-medium text-gray-300">
                              {checklist.filter(item => item.completed).length}/{checklist.length} concluídos
                            </span>
                          </div>
                          <span className={`text-xs font-bold ${checklistProgress === 100 ? 'text-green-400' : 'text-gray-400'}`}>
                            {checklistProgress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden border border-gray-600/50">
                          <div
                            className={`h-2.5 rounded-full transition-all duration-500 ${getProgressBarColor(checklistProgress)}`}
                            style={{ width: `${checklistProgress}%` }}
                          ></div>
                        </div>
                        
                        {/* Mini Checklist Preview */}
                        <div className="mt-2 space-y-1 max-h-20 overflow-y-auto">
                          {checklist.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleTaskChecklistItem(task.id, item.id)}
                                className="hover:scale-110 transition-transform"
                              >
                                {item.completed ? (
                                  <CheckCircle2 className="h-3 w-3 text-green-400 flex-shrink-0" />
                                ) : (
                                  <Circle className="h-3 w-3 text-gray-400 flex-shrink-0 hover:text-green-400" />
                                )}
                              </button>
                              <span className={`text-xs ${item.completed ? 'line-through text-gray-500' : 'text-gray-300'} truncate`}>
                                {item.text}
                              </span>
                            </div>
                          ))}
                          {checklist.length > 3 && (
                            <div className="text-xs text-gray-500 pl-5">
                              +{checklist.length - 3} mais itens...
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Real-time editing indicator */}
                    {editingUsers[task.id] && (
                      <div className="mb-3 flex items-center space-x-2 bg-yellow-900/20 border border-yellow-500/30 px-3 py-2 rounded-lg">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-yellow-300 text-xs font-medium">
                          {editingUsers[task.id].userName} está editando esta tarefa...
                        </span>
                        <div className="flex space-x-0.5">
                          <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    )}

                    {/* Tags - Sistema de Etiquetas Visuais */}
                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.map((tag, index) => {
                          // Cores diferentes para diferentes tipos de tags
                          const getTagColor = (tag: string) => {
                            const lowerTag = tag.toLowerCase();
                            if (lowerTag.includes('crítico') || lowerTag.includes('urgente')) return 'bg-red-500/20 text-red-300 border-red-500/30';
                            if (lowerTag.includes('alta')) return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
                            if (lowerTag.includes('média') || lowerTag.includes('medium')) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
                            if (lowerTag.includes('baixa') || lowerTag.includes('low')) return 'bg-green-500/20 text-green-300 border-green-500/30';
                            if (lowerTag.includes('frontend') || lowerTag.includes('ui') || lowerTag.includes('ux')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
                            if (lowerTag.includes('backend') || lowerTag.includes('api')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
                            if (lowerTag.includes('devops') || lowerTag.includes('infra')) return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
                            if (lowerTag.includes('test') || lowerTag.includes('qualidade')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
                            if (lowerTag.includes('doc') || lowerTag.includes('documentação')) return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
                            if (lowerTag.includes('ml') || lowerTag.includes('ia')) return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
                            return 'bg-primary-500/20 text-primary-300 border-primary-500/30'; // Default
                          };
                          
                          return (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs rounded-lg border transition-all duration-200 hover:scale-105 hover:shadow-sm ${getTagColor(tag)}`}
                              title={`Tag: ${tag}`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Task Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center space-x-3">
                        {task.assignee && (
                          <div className="flex items-center space-x-2" title={task.assignee}>
                            <div className={`w-8 h-8 rounded-full ${getAvatarColor(task.assignee)} flex items-center justify-center text-white text-xs font-semibold`}>
                              {getInitials(task.assignee)}
                            </div>
                            <span className="text-gray-300">{task.assignee}</span>
                          </div>
                        )}
                        {task.dueDate && (() => {
                          const dueDateStatus = getDueDateStatus(task.dueDate);
                          return dueDateStatus ? (
                            <div className={`flex items-center space-x-1.5 px-2 py-1 rounded-md border ${dueDateStatus.color} ${dueDateStatus.urgent ? 'animate-pulse' : ''}`}>
                              <Clock className="h-3 w-3" />
                              <span className="font-medium">{dueDateStatus.label}</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                  </React.Fragment>
                );
              })
              )}

              {/* Add Task Button */}
              {canEdit() && (
                <button
                  onClick={() => {
                    resetTaskForm();
                    setTargetColumnId(column.id);
                    setShowTaskModal(true);
                  }}
                  className="w-full p-3 border-2 border-dashed border-gray-700/50 rounded-xl text-gray-400 hover:text-white hover:border-gray-600/50 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm font-medium">Adicionar tarefa</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Board Modal */}
      {showBoardModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingBoard ? 'Editar Quadro' : 'Novo Quadro'}
              </h3>
              <button 
                onClick={() => {setShowBoardModal(false); resetBoardForm();}}
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
                  value={boardForm.title}
                  onChange={(e) => setBoardForm(prev => ({...prev, title: e.target.value}))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  placeholder="Ex: Projeto Marketing"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  value={boardForm.description}
                  onChange={(e) => setBoardForm(prev => ({...prev, description: e.target.value}))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  rows={3}
                  placeholder="Descreva o propósito deste quadro (opcional)"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cor
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setBoardForm(prev => ({...prev, color}))}
                      className={`w-8 h-8 rounded-lg ${color} ${
                        boardForm.color === color ? 'ring-2 ring-white' : ''
                      } transition-all hover:scale-110`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {setShowBoardModal(false); resetBoardForm();}}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={saveBoard}
                disabled={!boardForm.title.trim()}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 disabled:from-gray-600 disabled:to-gray-600 px-4 py-2 rounded-lg text-white transition-all duration-300"
              >
                <Save className="h-4 w-4" />
                <span>{editingBoard ? 'Salvar' : 'Criar'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WIP Limit Modal */}
      {showWipLimitModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Configurar WIP Limit
              </h3>
              <button
                onClick={() => setShowWipLimitModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Limite de WIP (Work In Progress)
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Define o número máximo de tarefas permitidas nesta coluna. Defina como 0 para desabilitar.
                </p>
                <input
                  type="number"
                  min="0"
                  value={wipLimitValue}
                  onChange={(e) => setWipLimitValue(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  placeholder="Ex: 5"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="enforceWipLimit"
                  checked={enforceWipLimit}
                  onChange={(e) => setEnforceWipLimit(e.target.checked)}
                  className="mt-1 w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-primary-500"
                />
                <div className="flex-1">
                  <label htmlFor="enforceWipLimit" className="text-sm font-medium text-gray-300 cursor-pointer">
                    Bloquear novos cards ao atingir limite
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Impede a adição de novas tarefas quando o limite for atingido.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowWipLimitModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={saveWipLimit}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 px-4 py-2 rounded-lg text-white transition-all duration-300"
              >
                <Save className="h-4 w-4" />
                <span>Salvar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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

              {/* Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Checklist ({taskForm.checklist.filter(item => item.completed).length}/{taskForm.checklist.length})
                  </label>
                  <button
                    onClick={addChecklistItem}
                    className="flex items-center space-x-1 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Adicionar item</span>
                  </button>
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {taskForm.checklist.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-2 group">
                      <button
                        onClick={() => toggleChecklistItem(item.id)}
                        className="hover:scale-110 transition-transform"
                      >
                        {item.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-400 flex-shrink-0 hover:text-green-400" />
                        )}
                      </button>
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => updateChecklistItem(item.id, e.target.value)}
                        className={`flex-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-primary-500 ${
                          item.completed ? 'line-through text-gray-500' : ''
                        }`}
                        placeholder={`Item ${index + 1}`}
                      />
                      <button
                        onClick={() => removeChecklistItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition-all"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  
                  {taskForm.checklist.length === 0 && (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      Nenhum item no checklist. Clique em "Adicionar item" para começar.
                    </div>
                  )}
                </div>
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
                onClick={() => {
                  console.log('DEBUG: Criar/Salvar button clicked');
                  const columnId = targetColumnId || getDefaultTaskColumn();
                  console.log('DEBUG: Using columnId:', columnId);
                  saveTask(columnId);
                }}
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

      {/* Share Board Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <Share2 className="h-5 w-5" />
                <span>Compartilhar Quadro</span>
              </h3>
              <button
                onClick={closeShareModal}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail do convidado *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="exemplo@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de Permissão
                </label>
                <select
                  value={sharePermission}
                  onChange={(e) => setSharePermission(e.target.value as 'view' | 'edit')}
                  className="w-full px-3 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                >
                  <option value="view">👀 Visualização (apenas ver)</option>
                  <option value="edit">✏️ Edição (criar e editar tarefas)</option>
                </select>
              </div>

              {/* Current Board Members */}
              {(() => {
                const currentBoard = boards.find(b => b.id === sharingBoardId);
                const members = currentBoard?.members || [];

                if (members.length > 0) {
                  return (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        <Users className="inline h-4 w-4 mr-1" />
                        Membros do Quadro ({members.length})
                      </label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {members.map((member) => (
                          <div key={member.id} className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center">
                                <Mail className="h-4 w-4 text-primary-400" />
                              </div>
                              <div>
                                <div className="text-sm text-white font-medium">{member.email}</div>
                                <div className="text-xs text-gray-400">
                                  {member.permission === 'view' ? '👀 Visualização' : '✏️ Edição'}
                                  {member.status === 'pending' && ' • Pendente'}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeMemberFromBoard(sharingBoardId!, member.id)}
                              className="p-1 rounded text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={closeShareModal}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={inviteMemberToBoard}
                disabled={!shareEmail.trim()}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 px-4 py-2 rounded-lg text-white transition-all duration-300"
              >
                <Mail className="h-4 w-4" />
                <span>Enviar Convite</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Link Modal */}
      {showInviteLinkModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span>Convite Enviado</span>
              </h3>
              <button
                onClick={() => setShowInviteLinkModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium">Convite criado com sucesso!</span>
                </div>
                <div className="text-sm text-gray-300">
                  <p><strong>Destinatário:</strong> {inviteDetails.email}</p>
                  <p><strong>Permissão:</strong> {inviteDetails.permission}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Link do Convite
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inviteLink}
                    readOnly
                    className="w-full px-3 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm select-all focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    onClick={(e) => {
                      e.currentTarget.select();
                    }}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(inviteLink).then(() => {
                        alert('✅ Link copiado para a área de transferência!');
                      }).catch(() => {
                        alert('❌ Erro ao copiar. Tente selecionar o texto manualmente.');
                      });
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary-600 hover:bg-primary-500 rounded-lg text-white transition-colors"
                    title="Copiar link"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                  <div className="text-sm text-blue-300">
                    <p className="font-medium mb-1">Para testar:</p>
                    <p>1. Copie o link acima</p>
                    <p>2. Abra em uma nova aba ou janela anônima</p>
                    <p>3. O convidado poderá aceitar e acessar o quadro</p>
                    <p className="mt-2 text-blue-400">
                      <strong>Em produção:</strong> Este link seria enviado automaticamente por e-mail.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowInviteLinkModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink).then(() => {
                    alert('✅ Link copiado!');
                    setShowInviteLinkModal(false);
                  }).catch(() => {
                    alert('❌ Erro ao copiar.');
                  });
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 px-4 py-2 rounded-lg text-white transition-all duration-300"
              >
                <Copy className="h-4 w-4" />
                <span>Copiar e Fechar</span>
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
              <Grid3X3 className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {boards.length}
              </div>
              <div className="text-sm text-gray-400">Quadros Ativos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-50 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-md py-2 min-w-[220px]"
          style={{
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
          }}
        >
          <button
            onClick={() => {
              const task = boards.find(b => b.id === currentBoardId)?.columns
                .flatMap(c => [...c.tasks, ...(c.subColumns?.flatMap(s => s.tasks || []) || [])])
                .find(t => t.id === contextMenu.taskId);
              if (task) openEditTask(task);
              closeContextMenu();
            }}
            className="w-full px-4 py-2 text-left text-gray-200 hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-200 flex items-center space-x-2"
          >
            <Edit3 className="h-4 w-4" />
            <span>Editar</span>
          </button>

          <button
            onClick={() => {
              duplicateTask(contextMenu.taskId);
              closeContextMenu();
            }}
            className="w-full px-4 py-2 text-left text-gray-200 hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-200 flex items-center space-x-2"
          >
            <Copy className="h-4 w-4" />
            <span>Duplicar</span>
          </button>

          <div className="h-px bg-gray-700 my-1"></div>

          <div className="px-4 py-1.5 text-xs text-gray-500 font-semibold uppercase">Mover para</div>
          {boards.find(b => b.id === currentBoardId)?.columns.map(col => (
            <button
              key={col.id}
              onClick={() => moveTaskToColumn(contextMenu.taskId, col.id)}
              className="w-full px-4 py-2 text-left text-gray-200 hover:bg-green-500/20 hover:text-green-400 transition-all duration-200 flex items-center space-x-2"
            >
              <ArrowRight className="h-4 w-4" />
              <span>{col.title}</span>
            </button>
          ))}

          <div className="h-px bg-gray-700 my-1"></div>

          <div className="px-4 py-1.5 text-xs text-gray-500 font-semibold uppercase">Prioridade</div>
          <button
            onClick={() => changeTaskPriority(contextMenu.taskId, 'urgent')}
            className="w-full px-4 py-2 text-left text-gray-200 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 flex items-center space-x-2"
          >
            <Flag className="h-4 w-4 text-red-500" />
            <span>Urgente</span>
          </button>
          <button
            onClick={() => changeTaskPriority(contextMenu.taskId, 'high')}
            className="w-full px-4 py-2 text-left text-gray-200 hover:bg-amber-500/20 hover:text-amber-400 transition-all duration-200 flex items-center space-x-2"
          >
            <Flag className="h-4 w-4 text-amber-500" />
            <span>Alta</span>
          </button>
          <button
            onClick={() => changeTaskPriority(contextMenu.taskId, 'medium')}
            className="w-full px-4 py-2 text-left text-gray-200 hover:bg-yellow-500/20 hover:text-yellow-400 transition-all duration-200 flex items-center space-x-2"
          >
            <Flag className="h-4 w-4 text-yellow-500" />
            <span>Média</span>
          </button>
          <button
            onClick={() => changeTaskPriority(contextMenu.taskId, 'low')}
            className="w-full px-4 py-2 text-left text-gray-200 hover:bg-green-500/20 hover:text-green-400 transition-all duration-200 flex items-center space-x-2"
          >
            <Flag className="h-4 w-4 text-green-500" />
            <span>Baixa</span>
          </button>

          <div className="h-px bg-gray-700 my-1"></div>

          <button
            onClick={() => {
              deleteTask(contextMenu.taskId);
              closeContextMenu();
            }}
            className="w-full px-4 py-2 text-left text-gray-200 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 flex items-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Excluir</span>
          </button>
        </div>
      )}

      {/* Container de Notificações Globais */}
      <ToastContainer />

      {/* Import Modal */}
      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImport}
        currentBoardId={currentBoardId}
      />

      {/* Mobile FAB (Floating Action Button) */}
      {isMobile && canEdit() && (
        <button
          onClick={() => {
            resetTaskForm();
            setTargetColumnId(columns[0]?.id || null);
            setShowTaskModal(true);
          }}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-2xl shadow-primary-500/50 flex items-center justify-center z-50 transition-all duration-200 hover:scale-110 active:scale-95"
          title="Nova Task"
        >
          <Plus className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default TasksPage;
