export type DealStage = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'DEMO' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST';

export type ActivityType = 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE' | 'TASK';

export interface Company {
  id: string;
  name: string;
  sector?: string;
  size?: string;
  website?: string;
  phone?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  contacts?: Contact[];
  deals?: Deal[];
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  position?: string;
  notes?: string;
  companyId?: string;
  company?: Company;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  title: string;
  description?: string;
  value: number;
  currency: string;
  stage: DealStage;
  probability: number;
  expectedCloseDate?: string;
  closedDate?: string;
  lostReason?: string;
  position: number;
  companyId?: string;
  company?: Company;
  contactId?: string;
  contact?: Contact;
  activities?: Activity[];
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  subject: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  dealId?: string;
  deal?: Deal;
  contactId?: string;
  contact?: Contact;
  createdAt: string;
  updatedAt: string;
}

export interface Pipeline {
  stage: DealStage;
  title: string;
  color: string;
  deals: Deal[];
}

// Stage labels e cores
export const STAGE_CONFIG: Record<DealStage, { title: string; color: string }> = {
  NEW: { title: 'Novo Lead', color: '#6366f1' },
  CONTACTED: { title: 'Contato Feito', color: '#8b5cf6' },
  QUALIFIED: { title: 'Qualificado', color: '#3b82f6' },
  DEMO: { title: 'Demo Agendada', color: '#06b6d4' },
  PROPOSAL: { title: 'Proposta Enviada', color: '#f59e0b' },
  NEGOTIATION: { title: 'Negociação', color: '#f97316' },
  CLOSED_WON: { title: 'Fechado - Ganho', color: '#10b981' },
  CLOSED_LOST: { title: 'Fechado - Perdido', color: '#ef4444' }
};

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  CALL: 'Ligação',
  EMAIL: 'E-mail',
  MEETING: 'Reunião',
  NOTE: 'Nota',
  TASK: 'Tarefa'
};
