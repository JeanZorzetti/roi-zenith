// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: any[];
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  company?: string;
  position?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  company?: string;
  position?: string;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Contact form types
export interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

// Lead capture types
export interface LeadCaptureRequest {
  fullName: string;
  email: string;
  company: string;
  role: string;
  companySector: 'saas' | 'fintech' | 'ecommerce' | 'startup' | 'consulting' | 'other';
  teamSize: '1-5' | '6-15' | '16-50' | '51+';
  monthlyLeads: '<100' | '100-500' | '500-1000' | '1000+';
  budget: '<5k' | '5k-15k' | '15k-30k' | '30k+';
  currentChallenges: string;
  timeline: 'immediate' | '30days' | '90days' | 'planning';
  gdprConsent: boolean;
  marketingConsent?: boolean;
}

export interface Lead {
  _id: string;
  fullName: string;
  email: string;
  company: string;
  role: string;
  companySector: string;
  teamSize: string;
  monthlyLeads: string;
  budget: string;
  currentChallenges: string;
  timeline: string;
  gdprConsent: boolean;
  marketingConsent?: boolean;
  status: 'new' | 'contacted' | 'qualified' | 'demo_scheduled' | 'proposal_sent' | 'closed_won' | 'closed_lost';
  score: number;
  source: string;
  createdAt: string;
}

// ROI Calculator types
export interface ROIData {
  currentLeads: number;
  conversionRate: number;
  averageDealValue: number;
  salesCycleMonths: number;
  sdrSalary: number;
  projectedROI?: number;
}

export interface ROISubmissionRequest {
  email: string;
  roiData: ROIData;
}

// API Error types
export interface ApiError {
  success: false;
  error: string;
  details?: any[];
}