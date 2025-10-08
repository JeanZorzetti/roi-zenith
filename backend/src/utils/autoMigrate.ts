/**
 * Auto Migration - Executa migrações automaticamente na inicialização do servidor
 * Garante que o schema de pipelines está atualizado
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Verifica se a migração de pipelines já foi executada
 */
async function checkPipelineMigration(): Promise<boolean> {
  try {
    // Tenta buscar pipelines - se funcionar, a migração já foi feita
    const pipelines = await prisma.pipeline.findMany();
    return pipelines.length > 0;
  } catch (error: any) {
    // Se der erro, provavelmente a tabela não existe ou schema desatualizado
    if (error.code === 'P2021' || error.message?.includes('does not exist')) {
      return false;
    }
    throw error;
  }
}

/**
 * Cria o pipeline padrão automaticamente
 */
async function createDefaultPipeline() {
  console.log('📝 Criando pipeline padrão...');

  // Verificar se já existe
  const existing = await prisma.pipeline.findFirst({
    where: { isDefault: true }
  });

  if (existing) {
    console.log('✅ Pipeline padrão já existe:', existing.title);
    return existing;
  }

  // Criar pipeline padrão
  const defaultPipeline = await prisma.pipeline.create({
    data: {
      id: 'pipeline-default',
      title: 'Pipeline Padrão',
      description: 'Pipeline de vendas principal',
      color: '#3b82f6',
      isDefault: true,
      position: 0,
      stages: {
        create: [
          { id: 'stage-new', title: 'Novo Lead', color: '#6366f1', position: 0 },
          { id: 'stage-contacted', title: 'Contato Realizado', color: '#8b5cf6', position: 1 },
          { id: 'stage-qualified', title: 'Qualificado', color: '#ec4899', position: 2 },
          { id: 'stage-proposal', title: 'Proposta Enviada', color: '#f59e0b', position: 3 },
          { id: 'stage-negotiation', title: 'Em Negociação', color: '#eab308', position: 4 },
          { id: 'stage-closed-won', title: 'Ganho', color: '#10b981', position: 5 },
          { id: 'stage-closed-lost', title: 'Perdido', color: '#ef4444', position: 6 },
          { id: 'stage-on-hold', title: 'Em Espera', color: '#6b7280', position: 7 }
        ]
      }
    },
    include: {
      stages: true
    }
  });

  console.log('✅ Pipeline padrão criado:', defaultPipeline.title);
  console.log(`   Etapas: ${defaultPipeline.stages.length}`);

  return defaultPipeline;
}

/**
 * Migra deals antigos para o novo sistema de pipelines
 */
async function migrateOldDeals() {
  try {
    // Buscar deals sem pipeline (usando findMany sem where para evitar erro de tipo)
    const allDeals = await prisma.deal.findMany();
    const dealsWithoutPipeline = allDeals.filter(deal => !deal.pipelineId || !deal.stageId);

    if (dealsWithoutPipeline.length === 0) {
      console.log('✅ Nenhum deal antigo para migrar');
      return;
    }

    console.log(`🔄 Migrando ${dealsWithoutPipeline.length} deals antigos...`);

    // Mapeamento de stages antigas para novas
    const stageMapping: Record<string, string> = {
      'NEW': 'stage-new',
      'CONTACTED': 'stage-contacted',
      'QUALIFIED': 'stage-qualified',
      'PROPOSAL_SENT': 'stage-proposal',
      'NEGOTIATION': 'stage-negotiation',
      'CLOSED_WON': 'stage-closed-won',
      'CLOSED_LOST': 'stage-closed-lost',
      'ON_HOLD': 'stage-on-hold'
    };

    let migrated = 0;
    for (const deal of dealsWithoutPipeline) {
      // Se o deal já tem stage, mapear. Senão, usar 'stage-new'
      const currentStage = (deal as any).stage; // Compatibilidade com schema antigo
      const newStageId = currentStage ? (stageMapping[currentStage] || 'stage-new') : 'stage-new';

      await prisma.deal.update({
        where: { id: deal.id },
        data: {
          pipelineId: 'pipeline-default',
          stageId: newStageId
        }
      });

      migrated++;
    }

    console.log(`✅ ${migrated} deals migrados com sucesso`);
  } catch (error: any) {
    // Se der erro de coluna não existe, significa que ainda não migrou o schema
    if (error.code === 'P2010' || error.message?.includes('column')) {
      console.log('⏭️  Deals serão migrados após atualização do schema');
      return;
    }
    throw error;
  }
}

/**
 * Executa auto-migração completa
 */
export async function runAutoMigration() {
  console.log('\n🔄 Verificando migrações...\n');

  try {
    // Verificar se a migração já foi feita
    const migrationDone = await checkPipelineMigration();

    if (migrationDone) {
      console.log('✅ Sistema de pipelines já configurado\n');
      return;
    }

    console.log('🚀 Executando auto-migração de pipelines...\n');

    // Criar pipeline padrão
    await createDefaultPipeline();

    // Migrar deals antigos
    await migrateOldDeals();

    console.log('\n🎉 Auto-migração concluída com sucesso!\n');

  } catch (error: any) {
    // Erros de schema podem acontecer - não são fatais
    if (error.code === 'P2021' || error.message?.includes('does not exist')) {
      console.log('⚠️  Schema de pipelines ainda não aplicado');
      console.log('💡 Execute: npx prisma migrate dev ou npx prisma db push\n');
      return;
    }

    console.error('❌ Erro na auto-migração:', error.message);
    console.log('💡 Execute manualmente: node scripts/migrate-pipelines.js\n');

    // Não falhar o servidor por causa disso
    return;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Versão silenciosa para produção (sem logs detalhados)
 */
export async function runAutoMigrationSilent() {
  try {
    const pipelines = await prisma.pipeline.findMany();

    if (pipelines.length === 0) {
      await createDefaultPipeline();
      await migrateOldDeals();
    }
  } catch (error) {
    // Falha silenciosa - não quebra o servidor
  } finally {
    await prisma.$disconnect();
  }
}
