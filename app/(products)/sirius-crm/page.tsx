import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ProductHero from '@/components/products/ProductHero';
import ProductFeatures from '@/components/products/ProductFeatures';
import ProductUseCases from '@/components/products/ProductUseCases';
import ProductPricing from '@/components/products/ProductPricing';
import CTASection from '@/components/sections/CTASection';
import {
  Users,
  BarChart3,
  Zap,
  Mail,
  Calendar,
  Target,
  TrendingUp,
  Filter,
  MessageSquare,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sirius CRM - CRM com IA, Multi-Pipeline e Automações Inteligentes | ROI Labs',
  description:
    'CRM brasileiro completo com Kanban drag & drop, 8 KPIs avançados, automações de email + WhatsApp, Google Calendar integrado e API pública. Teste grátis por 14 dias.',
};

export default function SiriusCRMPage() {
  const features = [
    {
      icon: Target,
      title: 'Kanban Multi-Pipeline',
      description:
        'Drag & drop entre colunas com reordenação vertical. FREE: 1 pipeline fixo. PRO: pipelines ilimitados customizáveis. Cards coloridos por valor, contadores em tempo real por coluna.',
    },
    {
      icon: Zap,
      title: 'Automações Inteligentes',
      description:
        '4 tipos de automação: Welcome Email, Deal Created, Deal Stage Changed, Upgrade Nudge. Editor de templates com variáveis dinâmicas. Delay configurável (0min, 1h, 24h). Tracking completo: sent/delivered/opened/clicked.',
    },
    {
      icon: BarChart3,
      title: '8 KPIs Avançados',
      description:
        'Conversion Rate, Win Rate, Avg Deal Value, Sales Cycle, Pipeline Velocity, Forecast 30/60/90 dias, Churn Rate, LTV/CAC. 4 gráficos: Pipeline Trend, Funnel, Win/Loss, Revenue Forecast. Snapshots diários históricos.',
    },
    {
      icon: Users,
      title: 'Gestão de Contatos Ilimitados',
      description:
        'Database sem limites, busca avançada, filtros e pagination. Vinculação automática com deals. Integração WhatsApp click-to-message. Histórico completo de atividades e notas (PRO).',
    },
    {
      icon: Mail,
      title: 'Email Automations (Resend)',
      description:
        'Templates React Email customizáveis. Webhooks automáticos de status. Open tracking e click tracking. Histórico de 50+ emails enviados. Condições customizadas (JSON) por automação.',
    },
    {
      icon: Calendar,
      title: 'Google Calendar Integrado',
      description:
        'OAuth2 completo, sync bidirecional de eventos. Lembretes automáticos via cron job. Follow-up dates vinculados a deals. Tracking de sincronização (PENDING/SYNCED/FAILED).',
    },
    {
      icon: Filter,
      title: 'API Pública + Webhooks',
      description:
        'REST API v1 com endpoints CRUD para deals, contacts, pipelines. API keys com bcrypt hash. Webhooks customizados via Svix com retry automático. Rate limiting via Upstash Redis.',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp via Evolution API',
      description:
        'Envie mensagens WhatsApp direto do CRM. Tracking de status (PENDING/SENT/DELIVERED/READ). Media support (imagens, PDFs). Histórico completo de conversas vinculado a deals e contatos.',
    },
    {
      icon: TrendingUp,
      title: 'Previsão de Vendas + PWA',
      description:
        'Forecast baseado em conversion rate histórico. Cálculo de LTV/CAC. Progressive Web App com offline queue. Push notifications (VAPID). Service Worker para caching strategy.',
    },
  ];

  const useCases = [
    {
      industry: 'Tecnologia & SaaS',
      title: 'Startup de SaaS dobra taxa de conversão',
      description:
        'Uma startup de software B2B implementou o Sirius CRM para organizar seu processo de vendas e automatizar follow-ups.',
      results: [
        'Conversão de trial para pago aumentou 95%',
        'Tempo de resposta para leads reduzido em 70%',
        'Ciclo de vendas encurtado de 45 para 28 dias',
        'Forecast de receita com 92% de precisão',
      ],
    },
    {
      industry: 'Consultoria',
      title: 'Consultoria aumenta faturamento em 180%',
      description:
        'Empresa de consultoria estratégica usou automação de marketing e pipeline visual para escalar vendas.',
      results: [
        'Geração de leads qualificados aumentou 3x',
        'Taxa de agendamento de reuniões subiu 65%',
        'Receita recorrente cresceu 180% em 6 meses',
        'NPS de clientes atingiu 85 pontos',
      ],
    },
    {
      industry: 'E-commerce',
      title: 'E-commerce recupera 40% de carrinhos abandonados',
      description:
        'Loja online implementou automações inteligentes para recuperar vendas e aumentar retenção de clientes.',
      results: [
        '40% de carrinhos abandonados recuperados',
        'LTV (Lifetime Value) aumentou 120%',
        'Automações economizam 20h/semana da equipe',
        'Churn rate reduziu de 8% para 3% ao mês',
      ],
    },
    {
      industry: 'Imobiliário',
      title: 'Imobiliária triplica vendas de imóveis',
      description:
        'Corretora de imóveis organizou todo o pipeline de vendas e automatizou comunicação com leads.',
      results: [
        'Vendas mensais triplicaram em 4 meses',
        'Organização de leads melhorou 100%',
        'Tempo de resposta caiu para menos de 5min',
        'Satisfação de clientes atingiu 4.8/5.0',
      ],
    },
  ];

  const pricingPlans = [
    {
      name: 'FREE',
      price: 'R$ 0',
      period: 'mês',
      description: 'Para começar e validar',
      features: [
        'Usuários ilimitados',
        '1 pipeline fixo ("Vendas")',
        'Contatos ilimitados',
        'Kanban drag & drop básico',
        'Analytics básico (4 KPIs)',
        'Deals ilimitados',
        'Suporte por email',
        'Sem cartão necessário',
      ],
    },
    {
      name: 'PRO',
      price: 'R$ 97',
      period: 'mês',
      description: 'Para escalar vendas',
      features: [
        'Usuários ilimitados',
        'Tudo do FREE +',
        'Pipelines ilimitados',
        'Analytics avançado (8 KPIs + 4 gráficos)',
        '4 automações de email customizáveis',
        'WhatsApp + Google Calendar integrado',
        'API REST v1 + Webhooks (Svix)',
        'Tags, notas e histórico de atividades',
        'Team management (convites, roles)',
        'PWA + Push notifications',
        'Suporte prioritário 24/7',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Sob consulta',
      period: 'mês',
      description: 'Para grandes operações',
      features: [
        'Tudo do PRO +',
        'Customizações avançadas',
        'White-label disponível (v2.0)',
        'SLA garantido 99.9%',
        'Gerente de conta dedicado',
        'Treinamento presencial',
        'Migração assistida + onboarding',
        'Suporte white-glove',
        'N8N workflows customizados',
        'Multi-region deployment',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      <ProductHero
        icon={Users}
        iconColor="text-indigo-400"
        iconBg="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"
        productName="Sirius CRM"
        tagline="Relacionamentos que geram resultados"
        description="CRM brasileiro completo construído com Next.js 16, React 19 e PostgreSQL. Multi-tenancy seguro, 8 KPIs avançados, automações via Resend, WhatsApp via Evolution API, Google Calendar OAuth2 e API REST v1 com webhooks."
        gradientFrom="#4338ca"
        gradientTo="#c026d3"
        logoUrl="/assets/sirius-crm-logo.png"
        screenshotUrl="/assets/sirius-crm-screenshot.png"
        benefits={[
          'Kanban multi-pipeline com drag & drop (@dnd-kit)',
          '4 automações de email + tracking completo',
          '8 KPIs: Conversion, Win Rate, Sales Cycle, LTV/CAC',
          'API REST v1 + Webhooks (Svix) + Rate limiting',
          'PWA com offline queue e push notifications',
          'FREE forever + PRO R$ 97/mês',
        ]}
      />

      <ProductFeatures
        features={features}
        iconColor="text-indigo-400"
        iconBg="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"
        title="Stack técnico completo e production-ready"
        description="Arquitetura moderna: Next.js 16 RSC, Prisma ORM, NextAuth, Upstash Redis, Sentry e Vercel Edge"
      />

      <ProductUseCases useCases={useCases} accentColor="text-indigo-400" />

      <ProductPricing
        plans={pricingPlans}
        accentColor="text-indigo-400"
        productName="Sirius CRM"
        title="Planos transparentes e sem surpresas"
        description="Comece FREE forever com usuários e contatos ilimitados. Upgrade para PRO (R$ 97/mês) para desbloquear multi-pipeline e automações."
      />

      <CTASection
        title="Comece grátis agora mesmo"
        description="CRM completo, FREE forever. Sem cartão necessário. Upgrade para PRO quando fizer sentido. Código aberto e documentado."
        primaryCTA={{
          text: 'Criar conta FREE',
          href: '/contato',
        }}
        secondaryCTA={{
          text: 'Ver documentação técnica',
          href: '/contato',
        }}
      />

      <Footer />
    </div>
  );
}
