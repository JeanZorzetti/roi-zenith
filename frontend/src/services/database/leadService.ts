import { prisma } from '@/lib/database';
import { Lead } from '@/types/api';
import { LeadStatus, Prisma } from '@prisma/client';

export class DatabaseLeadService {
  async getAllLeads(params?: {
    page?: number;
    limit?: number;
    status?: string;
    sector?: string;
    search?: string;
  }): Promise<{ leads: Lead[]; total: number; pages: number }> {
    try {
      const { page = 1, limit = 25, status, sector, search } = params || {};

      // Build where clause
      const where: Prisma.LeadWhereInput = {};
      
      if (status && status !== 'all') {
        where.status = status.toUpperCase() as LeadStatus;
      }
      
      if (sector && sector !== 'all') {
        where.companySector = sector;
      }
      
      if (search) {
        where.OR = [
          { fullName: { contains: search } },
          { email: { contains: search } },
          { company: { contains: search } },
          { role: { contains: search } }
        ];
      }

      // Get total count
      const total = await prisma.lead.count({ where });

      // Get leads with pagination
      const leads = await prisma.lead.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      });

      return {
        leads: leads.map(this.transformLead),
        total,
        pages: Math.ceil(total / limit)
      };
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw new Error('Failed to fetch leads');
    }
  }

  async getLeadById(id: string): Promise<Lead | null> {
    try {
      const lead = await prisma.lead.findUnique({
        where: { id }
      });

      return lead ? this.transformLead(lead) : null;
    } catch (error) {
      console.error('Error fetching lead by ID:', error);
      return null;
    }
  }

  async createLead(data: Omit<Lead, '_id' | 'createdAt'>): Promise<Lead> {
    try {
      const lead = await prisma.lead.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          company: data.company,
          role: data.role,
          companySector: data.companySector,
          teamSize: data.teamSize,
          monthlyLeads: data.monthlyLeads,
          budget: data.budget,
          currentChallenges: data.currentChallenges,
          timeline: data.timeline,
          gdprConsent: data.gdprConsent,
          marketingConsent: data.marketingConsent,
          status: data.status.toUpperCase() as LeadStatus,
          score: data.score,
          source: data.source
        }
      });

      return this.transformLead(lead);
    } catch (error) {
      console.error('Error creating lead:', error);
      throw new Error('Failed to create lead');
    }
  }

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
    try {
      const updateData: Prisma.LeadUpdateInput = {};
      
      if (data.fullName) updateData.fullName = data.fullName;
      if (data.email) updateData.email = data.email;
      if (data.company) updateData.company = data.company;
      if (data.role) updateData.role = data.role;
      if (data.companySector) updateData.companySector = data.companySector;
      if (data.teamSize) updateData.teamSize = data.teamSize;
      if (data.monthlyLeads) updateData.monthlyLeads = data.monthlyLeads;
      if (data.budget) updateData.budget = data.budget;
      if (data.currentChallenges) updateData.currentChallenges = data.currentChallenges;
      if (data.timeline) updateData.timeline = data.timeline;
      if (data.gdprConsent !== undefined) updateData.gdprConsent = data.gdprConsent;
      if (data.marketingConsent !== undefined) updateData.marketingConsent = data.marketingConsent;
      if (data.status) updateData.status = data.status.toUpperCase() as LeadStatus;
      if (data.score !== undefined) updateData.score = data.score;
      if (data.source) updateData.source = data.source;

      const lead = await prisma.lead.update({
        where: { id },
        data: updateData
      });

      return this.transformLead(lead);
    } catch (error) {
      console.error('Error updating lead:', error);
      throw new Error('Failed to update lead');
    }
  }

  async deleteLead(id: string): Promise<boolean> {
    try {
      await prisma.lead.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting lead:', error);
      return false;
    }
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead> {
    return this.updateLead(id, { status: status as any });
  }

  async getLeadStats(): Promise<Record<string, number>> {
    try {
      const stats = await prisma.lead.groupBy({
        by: ['status'],
        _count: {
          status: true
        }
      });

      const result: Record<string, number> = {};
      stats.forEach(stat => {
        result[stat.status.toLowerCase()] = stat._count.status;
      });

      return result;
    } catch (error) {
      console.error('Error fetching lead stats:', error);
      return {};
    }
  }

  // Transform Prisma Lead to API Lead format
  private transformLead(prismaLead: any): Lead {
    return {
      _id: prismaLead.id,
      fullName: prismaLead.fullName,
      email: prismaLead.email,
      company: prismaLead.company,
      role: prismaLead.role,
      companySector: prismaLead.companySector,
      teamSize: prismaLead.teamSize,
      monthlyLeads: prismaLead.monthlyLeads,
      budget: prismaLead.budget,
      currentChallenges: prismaLead.currentChallenges,
      timeline: prismaLead.timeline,
      gdprConsent: prismaLead.gdprConsent,
      marketingConsent: prismaLead.marketingConsent,
      status: prismaLead.status.toLowerCase(),
      score: prismaLead.score,
      source: prismaLead.source,
      createdAt: prismaLead.createdAt.toISOString()
    };
  }
}

export const databaseLeadService = new DatabaseLeadService();