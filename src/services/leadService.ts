import { apiClient } from './api';
import { 
  LeadCaptureRequest, 
  Lead, 
  ROISubmissionRequest,
  ApiResponse 
} from '@/types/api';

class LeadService {
  // Submit lead capture form
  async submitLead(leadData: LeadCaptureRequest): Promise<ApiResponse<{ 
    lead: Lead;
    nextSteps: string[];
  }>> {
    try {
      const response = await apiClient.post<{ 
        lead: Lead;
        nextSteps: string[];
      }>('/leads/submit', leadData);
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to submit lead form');
    }
  }

  // Submit ROI calculator data
  async submitROIData(roiData: ROISubmissionRequest): Promise<ApiResponse<{
    leadId: string;
    roiData: any;
    score: number;
  }>> {
    try {
      const response = await apiClient.post<{
        leadId: string;
        roiData: any;
        score: number;
      }>('/leads/roi-data', roiData);
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to save ROI data');
    }
  }

  // Get all leads (admin only)
  async getLeads(params?: {
    page?: number;
    limit?: number;
    status?: string;
    sector?: string;
    minScore?: number;
  }): Promise<ApiResponse<{ 
    leads: Lead[];
    analytics: any;
    pagination: {
      page: number;
      pages: number;
      total: number;
      limit: number;
    };
  }>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.status) searchParams.append('status', params.status);
    if (params?.sector) searchParams.append('sector', params.sector);
    if (params?.minScore) searchParams.append('minScore', params.minScore.toString());
    
    const endpoint = `/leads${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    return apiClient.get(endpoint);
  }

  // Get single lead (admin only)
  async getLead(id: string): Promise<ApiResponse<{ lead: Lead }>> {
    return apiClient.get<{ lead: Lead }>(`/leads/${id}`);
  }

  // Update lead status and info (admin only)
  async updateLead(id: string, updates: {
    status?: 'new' | 'contacted' | 'qualified' | 'demo_scheduled' | 'proposal_sent' | 'closed_won' | 'closed_lost';
    assignedTo?: string;
    notes?: string;
    nextFollowUpDate?: string;
  }): Promise<ApiResponse<{ lead: Lead }>> {
    return apiClient.put<{ lead: Lead }>(`/leads/${id}`, updates);
  }
}

export const leadService = new LeadService();