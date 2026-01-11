export interface Board {
  id: string;
  title: string;
  description?: string;
  color: string;
  createdAt: string;
  updatedAt?: string;
  userId?: string;
  isPublic?: boolean;
  isFavorite?: boolean;
  columns: Column[];
  members?: BoardMember[];
}

export interface Column {
  id: string;
  title: string;
  color: string;
  boardId: string;
  position: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  tags: string[];
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
  columnId: string;
  position: number;
  checklist: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  taskId: string;
}

export interface BoardMember {
  id: string;
  email: string;
  name: string;
  permission: 'view' | 'edit';
  invitedAt: string;
  boardId: string;
}

export interface GuestSession {
  email: string;
  name: string;
  boardAccess: { boardId: string; permission: 'view' | 'edit' }[];
  isGuest: boolean;
}