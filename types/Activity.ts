export interface ActivityUser {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export interface BaseActivity {
  id: string;
  type: ActivityType;
  timestamp: Date;
  user: ActivityUser;
  boardId: string;
  metadata?: Record<string, any>;
}

// Tipos de atividade organizados por categoria
export type ActivityType =
  // Atividades de Tasks
  | 'task-created'
  | 'task-updated'
  | 'task-deleted'
  | 'task-moved'
  | 'task-assigned'
  | 'task-unassigned'
  | 'task-completed'
  | 'task-reopened'
  | 'task-priority-changed'
  | 'task-due-date-changed'
  | 'task-description-updated'

  // Atividades de Checklist
  | 'checklist-item-added'
  | 'checklist-item-completed'
  | 'checklist-item-uncompleted'
  | 'checklist-item-deleted'

  // Atividades de Usuário
  | 'user-joined'
  | 'user-left'
  | 'user-activity'
  | 'user-editing-task'
  | 'user-stopped-editing'

  // Atividades de Board
  | 'board-created'
  | 'board-updated'
  | 'board-deleted'
  | 'board-shared'
  | 'board-access-changed'

  // Atividades de Colunas
  | 'column-added'
  | 'column-deleted'
  | 'column-updated'
  | 'column-reordered'

  // Atividades de Comentários
  | 'comment-added'
  | 'comment-updated'
  | 'comment-deleted'

  // Atividades de Anexos
  | 'file-attached'
  | 'file-deleted'

  // Atividades de Sistema
  | 'system-backup'
  | 'system-restore'
  | 'system-maintenance';

// Interfaces específicas para cada tipo de atividade
export interface TaskActivity extends BaseActivity {
  taskId: string;
  taskTitle: string;
  columnId?: string;
  columnName?: string;
}

export interface TaskCreatedActivity extends TaskActivity {
  type: 'task-created';
}

export interface TaskUpdatedActivity extends TaskActivity {
  type: 'task-updated';
  changes?: {
    title?: { from: string; to: string };
    description?: { from: string; to: string };
    priority?: { from: string; to: string };
    assignee?: { from: string; to: string };
    dueDate?: { from: string; to: string };
    tags?: { from: string[]; to: string[] };
  };
}

export interface TaskDeletedActivity extends TaskActivity {
  type: 'task-deleted';
}

export interface TaskMovedActivity extends TaskActivity {
  type: 'task-moved';
  fromColumn: string;
  toColumn: string;
  fromColumnName?: string;
  toColumnName?: string;
  position?: number;
}

export interface TaskAssignedActivity extends TaskActivity {
  type: 'task-assigned' | 'task-unassigned';
  assignee?: string;
  previousAssignee?: string;
}

export interface TaskCompletedActivity extends TaskActivity {
  type: 'task-completed' | 'task-reopened';
}

export interface TaskPriorityChangedActivity extends TaskActivity {
  type: 'task-priority-changed';
  fromPriority: string;
  toPriority: string;
}

export interface TaskDueDateChangedActivity extends TaskActivity {
  type: 'task-due-date-changed';
  fromDate?: string;
  toDate?: string;
}

export interface ChecklistItemActivity extends TaskActivity {
  type: 'checklist-item-added' | 'checklist-item-completed' | 'checklist-item-uncompleted' | 'checklist-item-deleted';
  itemId: string;
  itemText: string;
}

export interface UserActivity extends BaseActivity {
  type: 'user-joined' | 'user-left' | 'user-activity' | 'user-editing-task' | 'user-stopped-editing';
  targetTaskId?: string;
  activityType?: string;
}

export interface BoardActivity extends BaseActivity {
  type: 'board-created' | 'board-updated' | 'board-deleted' | 'board-shared' | 'board-access-changed';
  boardName: string;
  changes?: {
    title?: { from: string; to: string };
    description?: { from: string; to: string };
    color?: { from: string; to: string };
  };
  sharedWith?: string[];
  accessLevel?: 'view' | 'edit' | 'admin';
}

export interface ColumnActivity extends BaseActivity {
  type: 'column-added' | 'column-deleted' | 'column-updated' | 'column-reordered';
  columnId: string;
  columnName: string;
  changes?: {
    title?: { from: string; to: string };
    color?: { from: string; to: string };
    position?: { from: number; to: number };
  };
}

export interface CommentActivity extends TaskActivity {
  type: 'comment-added' | 'comment-updated' | 'comment-deleted';
  commentId: string;
  comment: string;
  previousComment?: string;
}

export interface FileActivity extends TaskActivity {
  type: 'file-attached' | 'file-deleted';
  fileName: string;
  fileSize?: number;
  fileType?: string;
}

export interface SystemActivity extends BaseActivity {
  type: 'system-backup' | 'system-restore' | 'system-maintenance';
  details: string;
  duration?: number;
}

// Union type de todas as atividades
export type Activity =
  | TaskCreatedActivity
  | TaskUpdatedActivity
  | TaskDeletedActivity
  | TaskMovedActivity
  | TaskAssignedActivity
  | TaskCompletedActivity
  | TaskPriorityChangedActivity
  | TaskDueDateChangedActivity
  | ChecklistItemActivity
  | UserActivity
  | BoardActivity
  | ColumnActivity
  | CommentActivity
  | FileActivity
  | SystemActivity;

// Filtros para atividades
export interface ActivityFilter {
  types?: ActivityType[];
  users?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  boardId?: string;
  taskId?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

// Estatísticas de atividade
export interface ActivityStats {
  totalActivities: number;
  activitiesByType: Record<ActivityType, number>;
  activitiesByUser: Record<string, number>;
  activitiesByHour: Record<number, number>;
  activitiesByDay: Record<string, number>;
  activitiesByWeek: Record<string, number>;
  mostActiveUser: {
    id: string;
    name: string;
    count: number;
  };
  peakHour: number;
  peakDay: string;
  averageActivitiesPerDay: number;
  streak: {
    current: number;
    longest: number;
  };
}

// Configurações de notificação
export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
  types: ActivityType[];
  quietHours?: {
    start: string; // "22:00"
    end: string;   // "08:00"
  };
  excludeOwnActions: boolean;
}

// Categorias de atividade para organização
export const ActivityCategories = {
  TASKS: [
    'task-created',
    'task-updated',
    'task-deleted',
    'task-moved',
    'task-assigned',
    'task-unassigned',
    'task-completed',
    'task-reopened',
    'task-priority-changed',
    'task-due-date-changed',
    'task-description-updated'
  ] as ActivityType[],

  COLLABORATION: [
    'user-joined',
    'user-left',
    'user-editing-task',
    'comment-added',
    'comment-updated',
    'comment-deleted'
  ] as ActivityType[],

  STRUCTURE: [
    'board-created',
    'board-updated',
    'board-deleted',
    'column-added',
    'column-deleted',
    'column-updated'
  ] as ActivityType[],

  CONTENT: [
    'checklist-item-added',
    'checklist-item-completed',
    'file-attached',
    'file-deleted'
  ] as ActivityType[],

  SYSTEM: [
    'system-backup',
    'system-restore',
    'system-maintenance'
  ] as ActivityType[]
};

// Ícones e cores para cada tipo de atividade
export const ActivityIcons: Record<ActivityType, string> = {
  // Tasks
  'task-created': '✨',
  'task-updated': '📝',
  'task-deleted': '🗑️',
  'task-moved': '🔄',
  'task-assigned': '👤',
  'task-unassigned': '👤',
  'task-completed': '✅',
  'task-reopened': '🔄',
  'task-priority-changed': '🔥',
  'task-due-date-changed': '📅',
  'task-description-updated': '📄',

  // Checklist
  'checklist-item-added': '➕',
  'checklist-item-completed': '☑️',
  'checklist-item-uncompleted': '🔲',
  'checklist-item-deleted': '➖',

  // Users
  'user-joined': '👋',
  'user-left': '👋',
  'user-activity': '⚡',
  'user-editing-task': '✏️',
  'user-stopped-editing': '✏️',

  // Board
  'board-created': '📋',
  'board-updated': '📋',
  'board-deleted': '🗑️',
  'board-shared': '📤',
  'board-access-changed': '🔒',

  // Columns
  'column-added': '📊',
  'column-deleted': '📊',
  'column-updated': '📊',
  'column-reordered': '🔄',

  // Comments
  'comment-added': '💬',
  'comment-updated': '💬',
  'comment-deleted': '💬',

  // Files
  'file-attached': '📎',
  'file-deleted': '📎',

  // System
  'system-backup': '💾',
  'system-restore': '🔄',
  'system-maintenance': '🔧'
};

// Cores para cada categoria
export const ActivityColors: Record<string, string> = {
  TASKS: 'blue',
  COLLABORATION: 'green',
  STRUCTURE: 'purple',
  CONTENT: 'orange',
  SYSTEM: 'gray'
};

// Textos amigáveis para tipos de atividade
export const ActivityTexts: Record<ActivityType, string> = {
  'task-created': 'criou a tarefa',
  'task-updated': 'atualizou a tarefa',
  'task-deleted': 'excluiu a tarefa',
  'task-moved': 'moveu a tarefa',
  'task-assigned': 'atribuiu a tarefa',
  'task-unassigned': 'removeu atribuição da tarefa',
  'task-completed': 'completou a tarefa',
  'task-reopened': 'reabriu a tarefa',
  'task-priority-changed': 'alterou prioridade da tarefa',
  'task-due-date-changed': 'alterou prazo da tarefa',
  'task-description-updated': 'atualizou descrição da tarefa',
  'checklist-item-added': 'adicionou item na checklist',
  'checklist-item-completed': 'completou item da checklist',
  'checklist-item-uncompleted': 'desmarcou item da checklist',
  'checklist-item-deleted': 'removeu item da checklist',
  'user-joined': 'entrou no board',
  'user-left': 'saiu do board',
  'user-activity': 'está ativo',
  'user-editing-task': 'está editando tarefa',
  'user-stopped-editing': 'parou de editar',
  'board-created': 'criou o board',
  'board-updated': 'atualizou o board',
  'board-deleted': 'excluiu o board',
  'board-shared': 'compartilhou o board',
  'board-access-changed': 'alterou acesso ao board',
  'column-added': 'adicionou coluna',
  'column-deleted': 'removeu coluna',
  'column-updated': 'atualizou coluna',
  'column-reordered': 'reordenou colunas',
  'comment-added': 'adicionou comentário',
  'comment-updated': 'editou comentário',
  'comment-deleted': 'removeu comentário',
  'file-attached': 'anexou arquivo',
  'file-deleted': 'removeu arquivo',
  'system-backup': 'backup do sistema',
  'system-restore': 'restaurou sistema',
  'system-maintenance': 'manutenção do sistema'
};