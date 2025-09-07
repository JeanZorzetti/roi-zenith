import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { LeadService } from '../models/Lead';
import { emailService } from '../services/emailService';

// Submit lead capture form
export const submitLead = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const leadData = req.body;

    // Check if lead with same email already exists
    const existingLead = await LeadService.findLeadByEmail(leadData.email);
    if (existingLead) {
      return res.status(400).json({
        success: false,
        error: 'Um lead com este email já foi cadastrado. Nossa equipe entrará em contato em breve.'
      });
    }

    // Create lead record (score is calculated automatically)
    const lead = await LeadService.createLead(leadData);

    // Send notification email to admin
    const emailSent = await emailService.sendLeadNotification(lead);

    // Send auto-reply to lead (different from contact form)
    await sendLeadAutoReply(lead.email, lead.fullName, lead.score);

    res.status(201).json({
      success: true,
      message: 'Obrigado pelo seu interesse! Nossa equipe especializada entrará em contato em breve com uma proposta personalizada.',
      data: {
        lead: {
          _id: lead.id,
          fullName: lead.fullName,
          email: lead.email,
          company: lead.company,
          score: lead.score,
          status: lead.status,
          createdAt: lead.createdAt
        },
        emailSent,
        nextSteps: getNextStepsBasedOnScore(lead.score)
      }
    });

  } catch (error: any) {
    console.error('Lead submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor. Tente novamente mais tarde.'
    });
  }
};

// Get all leads (admin only)
export const getLeads = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const companySector = req.query.sector as string;
    const minScore = req.query.minScore ? parseInt(req.query.minScore as string) : undefined;

    // Build filter
    const filter: any = {};
    if (status) filter.status = status;
    if (companySector) filter.companySector = companySector;
    if (minScore) filter.score = { $gte: minScore };

    // Get leads with pagination
    const leads = await Lead.find(filter)
      .populate('assignedTo', 'name email')
      .sort({ score: -1, createdAt: -1 }) // Sort by score desc, then date desc
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Lead.countDocuments(filter);

    // Get analytics
    const analytics = await getLeadAnalytics();

    res.status(200).json({
      success: true,
      data: {
        leads,
        analytics,
        pagination: {
          page,
          pages: Math.ceil(total / limit),
          total,
          limit
        }
      }
    });

  } catch (error: any) {
    console.error('Get leads error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Get single lead (admin only)
export const getLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedTo', 'name email');

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        lead
      }
    });

  } catch (error: any) {
    console.error('Get lead error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Update lead status and info (admin only)
export const updateLead = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { status, assignedTo, notes, nextFollowUpDate } = req.body;
    const leadId = req.params.id;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (assignedTo) updateData.assignedTo = assignedTo;
    if (nextFollowUpDate) updateData.nextFollowUpDate = nextFollowUpDate;
    if (notes) {
      // Add new note to notes array
      const lead = await Lead.findById(leadId);
      if (lead) {
        updateData.notes = [...lead.notes, notes];
      }
    }

    // Update last contact date if status changed
    if (status && status !== 'new') {
      updateData.lastContactDate = new Date();
    }

    const lead = await Lead.findByIdAndUpdate(
      leadId,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: {
        lead
      }
    });

  } catch (error: any) {
    console.error('Update lead error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Submit ROI calculation data
export const submitROIData = async (req: Request, res: Response) => {
  try {
    const { email, roiData } = req.body;

    if (!email || !roiData) {
      return res.status(400).json({
        success: false,
        error: 'Email and ROI data are required'
      });
    }

    // Find existing lead or create basic lead record
    let lead = await Lead.findOne({ email });
    
    if (lead) {
      // Update existing lead with ROI data
      lead.roiData = roiData;
      await lead.save();
    } else {
      // Create minimal lead record for ROI calculator
      lead = await Lead.create({
        fullName: 'ROI Calculator User',
        email,
        company: 'Unknown',
        role: 'Unknown',
        companySector: 'other',
        teamSize: '1-5',
        monthlyLeads: '<100',
        budget: '<5k',
        currentChallenges: 'Interested in ROI calculation',
        timeline: 'planning',
        gdprConsent: true,
        roiData,
        source: 'roi_calculator'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cálculo de ROI salvo com sucesso! Nossa equipe pode entrar em contato para apresentar uma proposta personalizada.',
      data: {
        leadId: lead._id,
        roiData: lead.roiData,
        score: lead.score
      }
    });

  } catch (error: any) {
    console.error('ROI data submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Helper functions
async function sendLeadAutoReply(email: string, name: string, score: number) {
  const priorityMessage = score >= 80 
    ? "Seu perfil é de alta prioridade e nossa equipe comercial entrará em contato nas próximas 2 horas!"
    : score >= 60 
    ? "Nossa equipe comercial entrará em contato em até 24 horas para apresentar uma proposta personalizada."
    : "Nossa equipe entrará em contato em breve com materiais relevantes e próximos passos.";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🎯 Obrigado pelo interesse, ${name}!</h1>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #333; margin-top: 0;">Sua solicitação foi recebida!</h2>
        
        <div style="background: ${score >= 80 ? '#dcfce7' : score >= 60 ? '#fef3c7' : '#e0e7ff'}; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid ${score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#6366f1'};">
          <p style="margin: 0; font-weight: bold; color: #333;">${priorityMessage}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #10b981; margin-top: 0;">🚀 Enquanto isso, prepare-se para transformar suas vendas:</h3>
          <ul style="color: #333; line-height: 1.6;">
            <li>✅ Aumento de 3x na qualificação de leads</li>
            <li>✅ Redução de até 60% nos custos de SDR</li>
            <li>✅ ROI médio de 300% em 90 dias</li>
            <li>✅ Implementação em menos de 30 dias</li>
          </ul>
          
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://roilabs.com.br/calculator" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Ver Minha Projeção de ROI</a>
          </div>
        </div>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p style="margin: 0; color: #0369a1; font-weight: bold;">💡 Dica Importante:</p>
          <p style="margin: 5px 0 0 0; color: #0369a1;">Empresas que implementam SDR AI primeiro ganham vantagem competitiva significativa no mercado.</p>
        </div>
      </div>
      
      <div style="text-align: center; padding: 15px; color: #666; font-size: 12px; background: #f0f0f0;">
        <p style="margin: 0;">© 2025 ROI Labs - SDR AI para Pré-Vendas</p>
        <p style="margin: 5px 0 0 0;">
          <a href="https://roilabs.com.br" style="color: #10b981;">roilabs.com.br</a>
        </p>
      </div>
    </div>
  `;

  return await emailService.sendEmail({
    to: email,
    subject: `Proposta SDR AI personalizada será enviada em breve - ROI Labs`,
    html
  });
}

function getNextStepsBasedOnScore(score: number): string[] {
  if (score >= 80) {
    return [
      "Nossa equipe comercial entrará em contato em até 2 horas",
      "Agendaremos uma demo personalizada do SDR AI",
      "Apresentaremos um plano de implementação específico para sua empresa",
      "Calcularemos o ROI projetado baseado nos seus dados"
    ];
  } else if (score >= 60) {
    return [
      "Nossa equipe comercial entrará em contato em até 24 horas",
      "Enviaremos casos de uso similares ao seu setor",
      "Agendaremos uma apresentação do SDR AI",
      "Discutiremos as melhores estratégias para sua realidade"
    ];
  } else {
    return [
      "Nossa equipe de marketing enviará conteúdos relevantes",
      "Você receberá casos de sucesso do seu setor",
      "Terá acesso a materiais educativos sobre SDR AI",
      "Poderá agendar uma consultoria gratuita quando desejar"
    ];
  }
}

async function getLeadAnalytics() {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const qualifiedLeads = await Lead.countDocuments({ status: 'qualified' });
    const closedWonLeads = await Lead.countDocuments({ status: 'closed_won' });
    
    const averageScore = await Lead.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$score' } } }
    ]);

    const leadsBySector = await Lead.aggregate([
      { $group: { _id: '$companySector', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const leadsBySource = await Lead.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    return {
      total: totalLeads,
      new: newLeads,
      qualified: qualifiedLeads,
      closedWon: closedWonLeads,
      conversionRate: totalLeads > 0 ? (closedWonLeads / totalLeads * 100).toFixed(2) : 0,
      averageScore: averageScore[0]?.avgScore.toFixed(1) || 0,
      bySector: leadsBySector,
      bySource: leadsBySource
    };
  } catch (error) {
    console.error('Analytics error:', error);
    return {};
  }
}

export default {
  submitLead,
  getLeads,
  getLead,
  updateLead,
  submitROIData
};