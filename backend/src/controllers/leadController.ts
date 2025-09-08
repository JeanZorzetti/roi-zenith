import { Request, Response } from 'express';
import { prisma } from '../utils/database';

// Get all leads
export const getLeads = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 25;
    const status = req.query.status as string;
    const sector = req.query.sector as string;
    
    const skip = (page - 1) * limit;
    
    // Build where clause based on filters
    const where: any = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (sector && sector !== 'all') {
      where.companySector = sector;
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.lead.count({ where })
    ]);

    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    console.error('Get leads error:', error);
    
    // Check if it's a database connection error
    if (error.message && error.message.includes("Can't reach database server")) {
      return res.status(503).json({
        success: false,
        error: 'Serviço temporariamente indisponível. Sistema em manutenção.'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error fetching leads'
    });
  }
};

// Create a new lead
export const createLead = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      company,
      role,
      companySector,
      teamSize,
      monthlyLeads,
      budget,
      currentChallenges,
      timeline,
      status,
      source
    } = req.body;

    const lead = await prisma.lead.create({
      data: {
        fullName,
        email,
        company,
        role,
        companySector,
        teamSize,
        monthlyLeads,
        budget,
        currentChallenges,
        timeline,
        status: status || 'NEW',
        source: source || 'WEBSITE'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead
    });

  } catch (error: any) {
    console.error('Create lead error:', error);
    
    if (error.message && error.message.includes("Can't reach database server")) {
      return res.status(503).json({
        success: false,
        error: 'Serviço temporariamente indisponível. Sistema em manutenção.'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error creating lead'
    });
  }
};

// Get single lead
export const getLeadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const lead = await prisma.lead.findUnique({
      where: { id }
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      data: lead
    });

  } catch (error: any) {
    console.error('Get lead error:', error);
    
    if (error.message && error.message.includes("Can't reach database server")) {
      return res.status(503).json({
        success: false,
        error: 'Serviço temporariamente indisponível. Sistema em manutenção.'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error fetching lead'
    });
  }
};

// Update lead
export const updateLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Convert value to float if provided
    if (updateData.value) {
      updateData.value = parseFloat(updateData.value);
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead
    });

  } catch (error: any) {
    console.error('Update lead error:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    if (error.message && error.message.includes("Can't reach database server")) {
      return res.status(503).json({
        success: false,
        error: 'Serviço temporariamente indisponível. Sistema em manutenção.'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error updating lead'
    });
  }
};

// Delete lead
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.lead.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete lead error:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    if (error.message && error.message.includes("Can't reach database server")) {
      return res.status(503).json({
        success: false,
        error: 'Serviço temporariamente indisponível. Sistema em manutenção.'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error deleting lead'
    });
  }
};