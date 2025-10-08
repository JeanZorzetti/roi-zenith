export type ActivityType = 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE' | 'TASK';

export interface Pipeline {
  id: string;
  title: string;
  description?: string;
  color: string;
  isDefault: boolean;
  position: number;
  stages: PipelineStage[];
  deals?: Deal[];
  createdAt: string;
  updatedAt: string;
}

export interface PipelineStage {
  id: string;
  title: string;
  color: string;
  position: number;
  pipelineId: string;
  deals?: Deal[];
  createdAt: string;
  updatedAt: string;
}

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
  pipelineId: string;
  pipeline?: Pipeline;
  stageId: string;
  stage?: PipelineStage;
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

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  CALL: 'Ligação',
  EMAIL: 'E-mail',
  MEETING: 'Reunião',
  NOTE: 'Nota',
  TASK: 'Tarefa'
};
