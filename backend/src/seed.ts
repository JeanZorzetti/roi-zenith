import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create main user
  const mainUser = await prisma.user.upsert({
    where: { email: 'admin@roilabs.com.br' },
    update: {},
    create: {
      email: 'admin@roilabs.com.br',
      name: 'ROI Labs Admin',
      password: '$2b$10$8qJZYbKKgPgxGiP8UcRzYOuVfV6CJ7V5CKu8jKsL3nJxHvWH8nSxu', // password: admin123
      role: 'ADMIN'
    }
  });

  // Board 1: ERP (ID do localStorage)
  const erpBoard = await prisma.board.upsert({
    where: { id: '1758212964801' },
    update: {},
    create: {
      id: '1758212964801',
      title: 'ERP',
      description: 'Sistema de Gestão Empresarial',
      color: 'bg-blue-500',
      userId: mainUser.id,
      isFavorite: false
    }
  });

  // Board 2: ERP - Produto & Tecnologia (ID do localStorage)
  const erpTechBoard = await prisma.board.upsert({
    where: { id: '1758298168880' },
    update: {},
    create: {
      id: '1758298168880',
      title: 'ERP - Produto & Tecnologia',
      description: 'Desenvolvimento e tecnologia do sistema ERP',
      color: 'bg-pink-500',
      userId: mainUser.id,
      isFavorite: false
    }
  });

  // Board 3: Matchfios (ID do localStorage)
  const matchfiosBoard = await prisma.board.upsert({
    where: { id: '1758753862556' },
    update: {},
    create: {
      id: '1758753862556',
      title: 'Matchfios',
      description: 'Sistema de conexões e matching inteligente',
      color: 'bg-blue-500',
      userId: mainUser.id,
      isFavorite: false
    }
  });

  // Create columns for ERP Board
  const erpColumns = [
    { id: 'todo', title: 'Para Fazer', color: 'bg-gray-500', position: 0 },
    { id: 'doing', title: 'Em Andamento', color: 'bg-blue-500', position: 1 },
    { id: 'review', title: 'Em Revisão', color: 'bg-yellow-500', position: 2 },
    { id: 'done', title: 'Concluído', color: 'bg-green-500', position: 3 }
  ];

  for (const col of erpColumns) {
    await prisma.column.upsert({
      where: { id: `erp-${col.id}` },
      update: {},
      create: {
        id: `erp-${col.id}`,
        title: col.title,
        color: col.color,
        position: col.position,
        boardId: erpBoard.id
      }
    });
  }

  // Create columns for ERP - Produto & Tecnologia Board
  const erpTechColumns = [
    { id: 'backlog', title: '📌 BACKLOG', color: 'bg-gray-400', position: 0 },
    { id: 'analise', title: '🔍 EM ANÁLISE', color: 'bg-yellow-400', position: 1 },
    { id: 'desenvolvimento', title: '🚀 EM DESENVOLVIMENTO', color: 'bg-purple-500', position: 2 },
    { id: 'teste', title: '🧪 EM TESTE', color: 'bg-orange-500', position: 3 },
    { id: 'review', title: '👀 REVIEW', color: 'bg-indigo-500', position: 4 },
    { id: 'concluido', title: '✅ CONCLUÍDO', color: 'bg-green-500', position: 5 }
  ];

  for (const col of erpTechColumns) {
    await prisma.column.upsert({
      where: { id: `erptech-${col.id}` },
      update: {},
      create: {
        id: `erptech-${col.id}`,
        title: col.title,
        color: col.color,
        position: col.position,
        boardId: erpTechBoard.id
      }
    });
  }

  // Create columns for Matchfios Board
  const matchfiosColumns = [
    { id: 'ideias', title: 'Ideias', color: 'bg-yellow-500', position: 0 },
    { id: 'planejamento', title: 'Planejamento', color: 'bg-orange-500', position: 1 },
    { id: 'desenvolvimento', title: 'Desenvolvimento', color: 'bg-blue-500', position: 2 },
    { id: 'testes', title: 'Testes', color: 'bg-purple-500', position: 3 },
    { id: 'producao', title: 'Produção', color: 'bg-green-500', position: 4 }
  ];

  for (const col of matchfiosColumns) {
    await prisma.column.upsert({
      where: { id: `matchfios-${col.id}` },
      update: {},
      create: {
        id: `matchfios-${col.id}`,
        title: col.title,
        color: col.color,
        position: col.position,
        boardId: matchfiosBoard.id
      }
    });
  }

  // Add some sample tasks for ERP Board
  const erpTodoColumnId = `erp-todo`;
  const erpDoingColumnId = `erp-doing`;

  await prisma.task.upsert({
    where: { id: 'task-proposal' },
    update: {},
    create: {
      id: 'task-proposal',
      title: '📋 Proposta Comercial - Cliente X',
      description: 'Elaborar proposta detalhada para integração de IA',
      priority: 'HIGH',
      assignee: 'Equipe Comercial',
      dueDate: new Date('2024-12-15'),
      tags: ['comercial', 'urgente'],
      columnId: erpTodoColumnId,
      position: 0
    }
  });

  await prisma.task.upsert({
    where: { id: 'task-webhook' },
    update: {},
    create: {
      id: 'task-webhook',
      title: '🔗 Integração API Webhook',
      description: 'Implementar sistema de webhooks para notificações',
      priority: 'MEDIUM',
      assignee: 'Dev Backend',
      tags: ['desenvolvimento', 'api'],
      columnId: erpTodoColumnId,
      position: 1
    }
  });

  await prisma.task.upsert({
    where: { id: 'task-performance' },
    update: {},
    create: {
      id: 'task-performance',
      title: '📊 Relatório de Performance Q4',
      description: 'Análise completa dos resultados do trimestre',
      priority: 'HIGH',
      assignee: 'Analista BI',
      dueDate: new Date('2024-12-01'),
      tags: ['relatório', 'analytics'],
      columnId: erpDoingColumnId,
      position: 0
    }
  });


  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created boards: ${erpBoard.title}, ${erpTechBoard.title}, ${matchfiosBoard.title}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });