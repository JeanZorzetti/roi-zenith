/**
 * Script para executar a migração de pipelines
 * Execute: node scripts/migrate-pipelines.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrate() {
  console.log('🚀 Iniciando migração de pipelines...\n');

  try {
    // Verificar se já existe pipeline
    const existingPipelines = await prisma.pipeline.findMany();

    if (existingPipelines.length > 0) {
      console.log(`⚠️  Já existem ${existingPipelines.length} pipeline(s) no banco.`);
      console.log('Pipelines existentes:');
      existingPipelines.forEach(p => console.log(`  - ${p.title} (${p.id})`));

      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

      return new Promise((resolve) => {
        readline.question('\n❓ Deseja continuar e criar mais pipelines? (s/n): ', (answer) => {
          readline.close();
          if (answer.toLowerCase() !== 's') {
            console.log('❌ Migração cancelada.');
            resolve();
            return;
          }
          createDefaultPipeline().then(resolve);
        });
      });
    }

    await createDefaultPipeline();

  } catch (error) {
    console.error('❌ Erro na migração:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function createDefaultPipeline() {
  console.log('📝 Criando pipeline padrão...\n');

  // Verificar se existem deals sem pipeline
  const dealsWithoutPipeline = await prisma.deal.findMany({
    where: {
      OR: [
        { pipelineId: null },
        { stageId: null }
      ]
    }
  });

  console.log(`📊 Encontrados ${dealsWithoutPipeline.length} deals sem pipeline.\n`);

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

  console.log('✅ Pipeline padrão criado com sucesso!');
  console.log(`   ID: ${defaultPipeline.id}`);
  console.log(`   Etapas: ${defaultPipeline.stages.length}`);
  console.log('');

  // Migrar deals existentes se houver
  if (dealsWithoutPipeline.length > 0) {
    console.log('🔄 Migrando deals existentes para o pipeline padrão...\n');

    const stageMapping = {
      'NEW': 'stage-new',
      'CONTACTED': 'stage-contacted',
      'QUALIFIED': 'stage-qualified',
      'PROPOSAL_SENT': 'stage-proposal',
      'NEGOTIATION': 'stage-negotiation',
      'CLOSED_WON': 'stage-closed-won',
      'CLOSED_LOST': 'stage-closed-lost',
      'ON_HOLD': 'stage-on-hold'
    };

    for (const deal of dealsWithoutPipeline) {
      const newStageId = stageMapping[deal.stage] || 'stage-new';

      await prisma.deal.update({
        where: { id: deal.id },
        data: {
          pipelineId: 'pipeline-default',
          stageId: newStageId
        }
      });

      console.log(`   ✓ Deal "${deal.title}" migrado para "${newStageId}"`);
    }

    console.log(`\n✅ ${dealsWithoutPipeline.length} deals migrados com sucesso!\n`);
  }

  console.log('🎉 Migração concluída!\n');
  console.log('📋 Resumo:');
  console.log(`   - Pipeline padrão criado: ${defaultPipeline.title}`);
  console.log(`   - Etapas criadas: ${defaultPipeline.stages.length}`);
  console.log(`   - Deals migrados: ${dealsWithoutPipeline.length}`);
  console.log('');
}

// Executar migração
migrate()
  .then(() => {
    console.log('✨ Script finalizado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  });
