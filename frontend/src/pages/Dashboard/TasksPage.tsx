import { useState, useEffect } from 'react';
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
  Upload
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
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
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
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newColumnColor, setNewColumnColor] = useState('bg-purple-500');
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [editingColumnTitle, setEditingColumnTitle] = useState('');
  const [targetColumnId, setTargetColumnId] = useState<string | null>(null);

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

      // Se tem board info, atualiza o board atual
      if (data.board && data.board.title) {
        await boardService.updateBoard(currentBoardId, {
          title: data.board.title,
          description: data.board.description || '',
          color: boardForm.color
        });
      }

      // Se tem colunas, adiciona elas ao estado local (não precisa criar via API)
      if (data.columns && Array.isArray(data.columns)) {
        const newColumns = data.columns.map((col: any) => ({
          id: col.id || `column-${Date.now()}-${Math.random()}`,
          title: col.title,
          color: col.color || 'bg-gray-500',
          tasks: []
        }));

        // Atualiza estado local adicionando novas colunas
        setBoards(prev => prev.map(board =>
          board.id === currentBoardId ? {
            ...board,
            columns: [...board.columns, ...newColumns]
          } : board
        ));

        columnsCreated = newColumns.length;

        // Salva no localStorage
        const currentBoard = boards.find(b => b.id === currentBoardId);
        if (currentBoard) {
          const updatedBoard = {
            ...currentBoard,
            columns: [...currentBoard.columns, ...newColumns]
          };
          localStorage.setItem('kanban-boards', JSON.stringify(
            boards.map(b => b.id === currentBoardId ? updatedBoard : b)
          ));
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

      const message = [
        `✅ Importação concluída!`,
        columnsCreated > 0 && `${columnsCreated} coluna(s) criada(s)`,
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
                  tasks: [...col.tasks, { ...movedTask, columnId: targetColumnId }]
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

  const colorOptions = [
    'bg-gray-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 
    'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'
  ];

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

      {/* Kanban Board */}
      <div 
        className={`flex gap-6 overflow-x-auto pb-6 select-none ${isScrolling ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ scrollbarWidth: 'thin' }}
      >
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
                <span className="bg-gray-800/50 text-gray-400 px-2 py-1 rounded-lg text-xs font-medium">
                  {column.tasks.length}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => startEditingColumn(column.id, column.title)}
                  className="p-1 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-gray-800/50 transition-colors"
                  title="Editar título da coluna"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                {canEdit() && (
                  <button
                    onClick={() => {
                      resetTaskForm();
                      setTargetColumnId(column.id);
                      setShowTaskModal(true);
                    }}
                    className="p-1 rounded-lg text-gray-400 hover:text-green-400 hover:bg-gray-800/50 transition-colors"
                    title="Adicionar tarefa aqui"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                )}
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
              {column.tasks.map((task) => {
                // Ensure checklist exists for backward compatibility
                const checklist = task.checklist || [];
                const checklistProgress = getChecklistProgress(checklist);
                const hasChecklist = checklist.length > 0;
                
                return (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                    onClick={(e) => {
                      // Avoid opening when clicking on buttons or when dragging
                      if (e.target instanceof HTMLElement && !e.target.closest('button')) {
                        openEditTask(task);
                      }
                    }}
                    className={`kanban-card bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary-500/10 hover:scale-[1.02] ${
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
                          {hasChecklist && (
                            <ListChecks className="h-3 w-3 text-blue-400" />
                          )}
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

                    {/* Checklist Progress */}
                    {hasChecklist && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">
                            Checklist ({checklist.filter(item => item.completed).length}/{checklist.length})
                          </span>
                          <span className="text-xs text-gray-400">{checklistProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300" 
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
                );
              })}

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

      {/* Container de Notificações Globais */}
      <ToastContainer />

      {/* Import Modal */}
      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImport}
        currentBoardId={currentBoardId}
      />
    </div>
  );
};

export default TasksPage;