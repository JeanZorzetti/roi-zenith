import { leadService as apiLeadService } from './leadService';
import { databaseLeadService } from './database/leadService';
import { testDatabaseConnection } from '@/lib/database';
import { Lead, ApiResponse } from '@/types/api';

class HybridLeadService {
  private useDatabaseFallback = true;

  constructor() {
    this.checkDatabaseConnection();
  }

  private async checkDatabaseConnection() {
    this.useDatabaseFallback = await testDatabaseConnection();
  }

  // Get all leads with hybrid approach
  async getLeads(params?: {
    page?: number;
    limit?: number;
    status?: string;
    sector?: string;
    search?: string;
  }): Promise<{
    leads: Lead[];
    pagination: {
      page: number;
      pages: number;
      total: number;
      limit: number;
    };
    analytics?: any;
  }> {
    try {
      // Try API first
      const apiResponse = await apiLeadService.getLeads(params);
      if (apiResponse.success && apiResponse.data) {
        return {
          leads: apiResponse.data.leads,
          pagination: apiResponse.data.pagination,
          analytics: apiResponse.data.analytics
        };
      }
    } catch (error) {
      console.warn('API call failed, falling back to database:', error);
    }

    // Fallback to database if available
    if (this.useDatabaseFallback) {
      try {
        const result = await databaseLeadService.getAllLeads(params);
        return {
          leads: result.leads,
          pagination: {
            page: params?.page || 1,
            pages: result.pages,
            total: result.total,
            limit: params?.limit || 25
          }
        };
      } catch (error) {
        console.error('Database fallback failed:', error);
      }
    }

    // Return empty state instead of mock data
    return {
      leads: [],
      pagination: {
        page: params?.page || 1,
        pages: 1,
        total: 0,
        limit: params?.limit || 25
      }
    };
  }

  // Get single lead
  async getLead(id: string): Promise<Lead | null> {
    try {
      // Try API first
      const apiResponse = await apiLeadService.getLead(id);
      if (apiResponse.success && apiResponse.data) {
        return apiResponse.data.lead;
      }
    } catch (error) {
      console.warn('API call failed, falling back to database:', error);
    }

    // Fallback to database
    if (this.useDatabaseFallback) {
      try {
        return await databaseLeadService.getLeadById(id);
      } catch (error) {
        console.error('Database fallback failed:', error);
      }
    }

    return null;
  }

  // Update lead
  async updateLead(id: string, updates: any): Promise<Lead | null> {
    try {
      // Try API first
      const apiResponse = await apiLeadService.updateLead(id, updates);
      if (apiResponse.success && apiResponse.data) {
        return apiResponse.data.lead;
      }
    } catch (error) {
      console.warn('API call failed, falling back to database:', error);
    }

    // Fallback to database
    if (this.useDatabaseFallback) {
      try {
        return await databaseLeadService.updateLead(id, updates);
      } catch (error) {
        console.error('Database fallback failed:', error);
      }
    }

    return null;
  }

  // Update lead status
  async updateLeadStatus(id: string, status: string): Promise<Lead | null> {
    return this.updateLead(id, { status });
  }

  // Create lead
  async createLead(leadData: Omit<Lead, '_id' | 'createdAt'>): Promise<Lead | null> {
    // Try database first for new leads
    if (this.useDatabaseFallback) {
      try {
        return await databaseLeadService.createLead(leadData);
      } catch (error) {
        console.error('Database create failed:', error);
      }
    }

    // Fallback to API
    try {
      // Transform to API format if needed
      const response = await apiLeadService.submitLead(leadData as any);
      if (response.success && response.data) {
        return response.data.lead;
      }
    } catch (error) {
      console.error('API create failed:', error);
    }

    return null;
  }

  // Delete lead
  async deleteLead(id: string): Promise<boolean> {
    if (this.useDatabaseFallback) {
      try {
        return await databaseLeadService.deleteLead(id);
      } catch (error) {
        console.error('Database delete failed:', error);
      }
    }

    // API doesn't have delete endpoint, return false
    return false;
  }

  // Get lead statistics
  async getLeadStats(): Promise<Record<string, number>> {
    if (this.useDatabaseFallback) {
      try {
        return await databaseLeadService.getLeadStats();
      } catch (error) {
        console.error('Database stats failed:', error);
      }
    }

    // Return empty stats
    return {
      new: 0,
      contacted: 0,
      qualified: 0,
      demo_scheduled: 0,
      proposal_sent: 0,
      closed_won: 0,
      closed_lost: 0
    };
  }

  // Mock data fallback (existing implementation)
  private getMockLeads(params?: any) {
    const names = ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira', 'Carlos Lima', 'Lucia Ferreira', 'Rafael Nascimento', 'Beatriz Almeida', 'Diego Rocha', 'Camila Cardoso', 'Fernando Dias', 'Juliana Ribeiro', 'Gustavo Moreira', 'Patricia Lopes', 'Rodrigo Barbosa', 'Vanessa Cunha', 'Leonardo Freitas', 'Mariana Cavalcanti', 'Thiago Monteiro', 'Larissa Gomes', 'Eduardo Pinto', 'Renata Correia', 'Marcelo Vieira', 'Fernanda Melo', 'Bruno Araújo'];
    const companies = ['TechCorp', 'InovaSoft', 'DataMax', 'CloudSys', 'AI Solutions', 'NextGen Tech', 'SmartData', 'FutureCode', 'WebFlow Pro', 'DigitalFirst', 'TechHub', 'InnovateLab', 'CodeCraft', 'DataForge', 'CloudNine'];
    const roles = ['CEO', 'CTO', 'CMO', 'Diretor', 'Gerente', 'Coordenador', 'Analista', 'Especialista'];
    const sectors = ['saas', 'fintech', 'ecommerce', 'startup', 'consulting'];
    const statuses = ['new', 'contacted', 'qualified', 'demo_scheduled', 'proposal_sent', 'closed_won', 'closed_lost'];
    
    const allMockLeads = Array.from({ length: 247 }, (_, i) => ({
      _id: `lead_${i + 1}`,
      fullName: names[i % names.length],
      email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@${companies[i % companies.length].toLowerCase().replace(' ', '')}.com`,
      company: companies[i % companies.length],
      role: roles[i % roles.length],
      companySector: sectors[i % sectors.length],
      teamSize: ['1-5', '6-15', '16-50', '51+'][i % 4],
      monthlyLeads: ['<100', '100-500', '500-1000', '1000+'][i % 4],
      budget: ['<5k', '5k-15k', '15k-30k', '30k+'][i % 4],
      currentChallenges: [
        'Precisa melhorar a qualidade dos leads',
        'Quer automatizar o processo de vendas',
        'Busca aumentar a conversão de leads',
        'Deseja otimizar o ROI das campanhas',
        'Procura integrar sistemas de marketing'
      ][i % 5],
      timeline: ['immediate', '30days', '90days', 'planning'][i % 4],
      gdprConsent: true,
      marketingConsent: Math.random() > 0.3,
      status: statuses[i % statuses.length] as any,
      score: Math.floor(Math.random() * 100),
      source: ['Google Ads', 'Facebook Ads', 'LinkedIn', 'Website', 'Referral'][i % 5],
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
    }));

    // Apply filters
    let filteredLeads = [...allMockLeads];

    if (params?.search) {
      filteredLeads = filteredLeads.filter(lead =>
        lead.fullName.toLowerCase().includes(params.search.toLowerCase()) ||
        lead.email.toLowerCase().includes(params.search.toLowerCase()) ||
        lead.company.toLowerCase().includes(params.search.toLowerCase()) ||
        lead.role.toLowerCase().includes(params.search.toLowerCase())
      );
    }

    if (params?.status && params.status !== 'all') {
      filteredLeads = filteredLeads.filter(lead => lead.status === params.status);
    }

    if (params?.sector && params.sector !== 'all') {
      filteredLeads = filteredLeads.filter(lead => lead.companySector === params.sector);
    }

    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

    return {
      leads: paginatedLeads,
      pagination: {
        page,
        pages: Math.ceil(filteredLeads.length / limit),
        total: filteredLeads.length,
        limit
      }
    };
  }
}

export const hybridLeadService = new HybridLeadService();