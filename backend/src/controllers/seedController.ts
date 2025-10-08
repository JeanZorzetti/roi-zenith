import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedTestDeals = async (req: Request, res: Response) => {
  try {
    console.log('🌱 Iniciando seed de deals de teste...');

    // Buscar pipeline padrão
    const pipeline = await prisma.pipeline.findFirst({
      where: { isDefault: true },
      include: { stages: true }
    });

    if (!pipeline) {
      return res.status(404).json({ error: 'Pipeline padrão não encontrado' });
    }

    // Criar empresa de teste se não existir
    let company = await prisma.company.findFirst({
      where: { name: 'Empresa Teste ACME Corp' }
    });

    if (!company) {
      company = await prisma.company.create({
        data: {
          id: `company-test-${Date.now()}`,
          name: 'Empresa Teste ACME Corp',
          sector: 'Tecnologia',
          size: 'MEDIUM',
          website: 'https://acme.example.com',
          phone: '(11) 98765-4321',
        }
      });
    }

    // Criar contato de teste se não existir
    let contact = await prisma.contact.findFirst({
      where: { email: 'joao.silva@acme.example.com' }
    });

    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          id: `contact-test-${Date.now()}`,
          firstName: 'João',
          lastName: 'Silva',
          email: 'joao.silva@acme.example.com',
          phone: '(11) 98765-4321',
          position: 'Diretor de TI',
          companyId: company.id
        }
      });
    }

    // Deals de teste distribuídos nas etapas
    const testDeals = [
      // Novo Lead (3 deals)
      { title: 'Venda de Licenças SaaS - Startup X', description: 'Empresa interessada em 50 licenças do nosso produto', value: 25000, probability: 20, stageIndex: 0 },
      { title: 'Implementação ERP - Indústria Y', description: 'Projeto de implementação completa do ERP', value: 180000, probability: 15, stageIndex: 0 },
      { title: 'Consultoria Digital - Varejo Z', description: 'Consultoria de transformação digital', value: 45000, probability: 25, stageIndex: 0 },

      // Contato Realizado (5 deals)
      { title: 'CRM Customizado - Fintech A', description: 'Desenvolvimento de CRM personalizado', value: 95000, probability: 35, stageIndex: 1 },
      { title: 'Migração Cloud - Empresa B', description: 'Migração de infraestrutura para cloud', value: 120000, probability: 30, stageIndex: 1 },
      { title: 'Automação de Marketing - Empresa C', description: 'Setup completo de automação', value: 35000, probability: 40, stageIndex: 1 },
      { title: 'Sistema de Gestão - Clínica D', description: 'Sistema de gestão para clínicas médicas', value: 78000, probability: 30, stageIndex: 1 },
      { title: 'E-commerce B2B - Distribuidora E', description: 'Plataforma de vendas B2B', value: 150000, probability: 25, stageIndex: 1 },

      // Qualificado (4 deals)
      { title: 'Integração APIs - Fintech F', description: 'Integração com sistemas bancários', value: 65000, probability: 50, stageIndex: 2 },
      { title: 'App Mobile - Startup G', description: 'Desenvolvimento de app iOS e Android', value: 110000, probability: 55, stageIndex: 2 },
      { title: 'BI e Analytics - Empresa H', description: 'Dashboard executivo com BI', value: 48000, probability: 45, stageIndex: 2 },
      { title: 'Expansão de Licenças - Cliente I', description: 'Cliente atual expandindo para 100 usuários', value: 85000, probability: 60, stageIndex: 2 },

      // Proposta Enviada (3 deals)
      { title: 'Sistema Logístico - Transportadora J', description: 'Sistema de gestão de frotas', value: 195000, probability: 65, stageIndex: 3 },
      { title: 'Portal do Cliente - Empresa K', description: 'Portal web para clientes B2B', value: 72000, probability: 70, stageIndex: 3 },
      { title: 'AI Chatbot - E-commerce L', description: 'Chatbot com IA para atendimento', value: 38000, probability: 60, stageIndex: 3 },

      // Em Negociação (2 deals)
      { title: 'Migração Legacy - Banco M', description: 'Modernização de sistema legado', value: 450000, probability: 75, stageIndex: 4 },
      { title: 'Plataforma Educacional - Escola N', description: 'EAD completo para 5000 alunos', value: 220000, probability: 80, stageIndex: 4 },

      // Ganho (2 deals)
      { title: 'Website Institucional - Empresa O', description: 'Site + SEO + Hospedagem', value: 28000, probability: 100, stageIndex: 5 },
      { title: 'Sistema RH - Empresa P', description: 'Sistema de gestão de RH', value: 65000, probability: 100, stageIndex: 5 },

      // Perdido (1 deal)
      { title: 'ERP Completo - Indústria Q', description: 'Optaram por concorrente', value: 180000, probability: 0, stageIndex: 6 }
    ];

    let created = 0;
    for (const dealData of testDeals) {
      const stage = pipeline.stages[dealData.stageIndex];

      await prisma.deal.create({
        data: {
          id: `deal-test-${Date.now()}-${created++}`,
          title: dealData.title,
          description: dealData.description,
          value: dealData.value,
          currency: 'BRL',
          pipelineId: pipeline.id,
          stageId: stage.id,
          probability: dealData.probability,
          expectedCloseDate: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
          position: created,
          companyId: company.id,
          contactId: contact.id
        }
      });
    }

    const totalValue = testDeals.reduce((sum, d) => sum + d.value, 0);

    res.json({
      success: true,
      message: `${created} deals criados com sucesso`,
      stats: {
        dealsCreated: created,
        totalValue,
        pipeline: pipeline.title,
        stages: pipeline.stages.length
      }
    });

  } catch (error: any) {
    console.error('Error seeding test deals:', error);
    res.status(500).json({ error: 'Failed to seed test deals', details: error.message });
  }
};
