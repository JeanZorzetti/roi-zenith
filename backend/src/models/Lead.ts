import { Lead, LeadStatus } from '@prisma/client';
import { prisma } from '../utils/database';

export interface CreateLeadData {
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
  source: string;
}

export interface UpdateLeadData {
  status?: LeadStatus;
  score?: number;
  fullName?: string;
  company?: string;
  role?: string;
  companySector?: string;
  teamSize?: string;
  monthlyLeads?: string;
  budget?: string;
  currentChallenges?: string;
  timeline?: string;
}

export interface LeadFilters {
  status?: string;
  sector?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class LeadService {
  static calculateScore(leadData: CreateLeadData): number {
    let score = 0;
    
    // Budget scoring (30 points max)
    if (leadData.budget === '30k+') score += 30;
    else if (leadData.budget === '15k-30k') score += 25;
    else if (leadData.budget === '5k-15k') score += 15;
    else score += 5;
    
    // Team size scoring (20 points max)
    if (leadData.teamSize === '51+') score += 20;
    else if (leadData.teamSize === '16-50') score += 15;
    else if (leadData.teamSize === '6-15') score += 10;
    else score += 5;
    
    // Timeline scoring (20 points max)
    if (leadData.timeline === 'immediate') score += 20;
    else if (leadData.timeline === '30days') score += 15;
    else if (leadData.timeline === '90days') score += 10;
    else score += 5;
    
    // Volume scoring (15 points max)
    if (leadData.monthlyLeads === '1000+') score += 15;
    else if (leadData.monthlyLeads === '500-1000') score += 12;
    else if (leadData.monthlyLeads === '100-500') score += 8;
    else score += 3;
    
    // Sector scoring (10 points max)
    if (['saas', 'fintech', 'startup'].includes(leadData.companySector)) score += 10;
    else score += 5;
    
    // Marketing consent bonus (5 points)
    if (leadData.marketingConsent) score += 5;
    
    return Math.min(score, 100);
  }

  static async createLead(leadData: CreateLeadData): Promise<Lead> {
    const score = this.calculateScore(leadData);
    
    return prisma.lead.create({
      data: {
        ...leadData,
        score,
        marketingConsent: leadData.marketingConsent || false,
      },
    });
  }

  static async findLeadById(id: string): Promise<Lead | null> {
    return prisma.lead.findUnique({
      where: { id },
    });
  }

  static async findLeadByEmail(email: string): Promise<Lead | null> {
    return prisma.lead.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  static async updateLead(id: string, leadData: UpdateLeadData): Promise<Lead> {
    return prisma.lead.update({
      where: { id },
      data: leadData,
    });
  }

  static async deleteLead(id: string): Promise<Lead> {
    return prisma.lead.delete({
      where: { id },
    });
  }

  static async getLeads(filters: LeadFilters = {}): Promise<{
    leads: Lead[];
    total: number;
    pages: number;
  }> {
    const { status, sector, search, page = 1, limit = 25 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Apply status filter
    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }

    // Apply sector filter
    if (sector && sector !== 'all') {
      where.companySector = sector;
    }

    // Apply search filter
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { role: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.lead.count({ where }),
    ]);

    return {
      leads,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  static async getLeadStats(): Promise<Record<string, number>> {
    const stats = await prisma.lead.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    const result: Record<string, number> = {
      NEW: 0,
      CONTACTED: 0,
      QUALIFIED: 0,
      DEMO_SCHEDULED: 0,
      PROPOSAL_SENT: 0,
      CLOSED_WON: 0,
      CLOSED_LOST: 0,
    };

    stats.forEach((stat) => {
      result[stat.status] = stat._count.status;
    });

    return result;
  }

  static async getAllLeads(): Promise<Lead[]> {
    return prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}