export type ActivityType = 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE' | 'TASK' | 'INTERVIEW' | 'SURVEY';

// Enums para Market Research
export type PipelineType = 'MARKET_RESEARCH' | 'SALES';
export type ResearchType = 'MARKET_RESEARCH' | 'SALES';
export type TargetProfile = 'B2B_ENTERPRISE' | 'B2B_SMB' | 'B2C';

export interface Pipeline {
  id: string;
  title: string;
  description?: string;
  color: string;
  isDefault: boolean;
  position: number;
  type?: PipelineType; // Market Research or Sales
  allowPromotion?: boolean; // Se permite promoção Research → Sales
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

  // ===== MARKET RESEARCH FIELDS =====
  researchType?: ResearchType; // MARKET_RESEARCH ou SALES
  targetProfile?: TargetProfile; // B2B_ENTERPRISE, B2B_SMB, B2C
  marketSegment?: string; // Ex: "Varejo", "Indústria", "Serviços"
  companySizeTarget?: string; // Ex: "1-10", "11-50", "51-200"
  budgetRangeMin?: number; // Orçamento mínimo estimado
  budgetRangeMax?: number; // Orçamento máximo estimado
  decisionMakerIdentified?: boolean; // Se o decision maker foi identificado
  decisionMakerName?: string; // Nome do decision maker
  decisionMakerRole?: string; // Cargo do decision maker
  qualificationScore?: number; // Score de qualificação (0-100)
  researchNotes?: string; // Notas de pesquisa
  painPointsList?: string[]; // Lista de pain points descobertos
  promotedToSales?: boolean; // Se foi promovido para Sales
  promotedFromDealId?: string; // ID do deal de research original

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

  // ===== MARKET RESEARCH FIELDS =====
  researchFindings?: string; // Descobertas da pesquisa/entrevista
  painPointsDiscovered?: string[]; // Pain points descobertos na atividade
  qualificationImpact?: number; // Impacto no qualification score (-50 a +50)

  createdAt: string;
  updatedAt: string;
}

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  CALL: 'Ligação',
  EMAIL: 'E-mail',
  MEETING: 'Reunião',
  NOTE: 'Nota',
  TASK: 'Tarefa',
  INTERVIEW: 'Entrevista',
  SURVEY: 'Pesquisa'
};
