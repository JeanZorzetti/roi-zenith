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
  title: 'Sirius CRM - Gestão Completa de Relacionamento com Clientes | ROI Labs',
  description:
    'Transforme seu relacionamento com clientes. Pipeline visual, automação de marketing e analytics avançado em uma única plataforma.',
};

export default function SiriusCRMPage() {
  const features = [
    {
      icon: Target,
      title: 'Pipeline de Vendas Visual',
      description:
        'Visualize todo o funil de vendas em tempo real. Arraste e solte deals entre estágios e acompanhe a progressão de cada oportunidade.',
    },
    {
      icon: Zap,
      title: 'Automação de Marketing',
      description:
        'Crie campanhas automatizadas multicanal. Envie emails, SMS e notificações no momento certo da jornada do cliente.',
    },
    {
      icon: BarChart3,
      title: 'Analytics em Tempo Real',
      description:
        'Dashboards interativos com métricas que importam. Taxas de conversão, tempo de ciclo, forecast de vendas e muito mais.',
    },
    {
      icon: Users,
      title: 'Gestão de Contatos 360°',
      description:
        'Histórico completo de interações, preferências e comportamento. Toda informação do cliente centralizada em um único lugar.',
    },
    {
      icon: Mail,
      title: 'Integração com Email',
      description:
        'Conecte Gmail, Outlook ou qualquer provedor. Registre automaticamente todas as comunicações no CRM.',
    },
    {
      icon: Calendar,
      title: 'Agendamento Inteligente',
      description:
        'Sincronize calendários, agende reuniões e receba lembretes automáticos. Nunca perca um follow-up importante.',
    },
    {
      icon: Filter,
      title: 'Segmentação Avançada',
      description:
        'Crie listas dinâmicas baseadas em qualquer critério. Segmente clientes por comportamento, perfil ou estágio.',
    },
    {
      icon: MessageSquare,
      title: 'Chat e Comunicação',
      description:
        'Chat interno para colaboração da equipe. Mencione colegas, compartilhe insights e trabalhe em conjunto.',
    },
    {
      icon: TrendingUp,
      title: 'Previsão de Vendas',
      description:
        'IA prevê probabilidade de fechamento. Identifique deals em risco e oportunidades de upsell automaticamente.',
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
      name: 'Starter',
      price: 'R$ 197',
      period: 'mês',
      description: 'Para equipes de até 5 usuários',
      features: [
        'Até 5 usuários',
        'Pipeline de vendas visual',
        '1.000 contatos',
        'Automações básicas',
        'Relatórios essenciais',
        'Integrações: Email + Calendar',
        'Suporte por email',
      ],
    },
    {
      name: 'Professional',
      price: 'R$ 497',
      period: 'mês',
      description: 'Para equipes em crescimento',
      features: [
        'Até 20 usuários',
        'Tudo do Starter +',
        'Contatos ilimitados',
        'Automações avançadas',
        'Analytics completo',
        'IA de previsão de vendas',
        'API + Webhooks',
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
        'Usuários ilimitados',
        'Tudo do Professional +',
        'Customizações avançadas',
        'SLA garantido',
        'Gerente de conta dedicado',
        'Treinamento presencial',
        'Migração assistida',
        'Suporte white-glove',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      <ProductHero
        icon={Users}
        iconColor="text-blue-400"
        iconBg="bg-blue-400/10"
        productName="Sirius CRM"
        tagline="Relacionamentos que geram resultados"
        description="Gerencie todo o ciclo de relacionamento com clientes em uma única plataforma. Do primeiro contato ao pós-venda, com automação inteligente e insights que impulsionam vendas."
        gradientFrom="#1e3a8a"
        gradientTo="#3b82f6"
        benefits={[
          'Pipeline visual com arrastar e soltar',
          'Automação de marketing multicanal',
          'Analytics e previsão com IA',
          'Integração com email e calendário',
          'Até 14 dias de teste grátis',
        ]}
      />

      <ProductFeatures
        features={features}
        iconColor="text-blue-400"
        iconBg="bg-blue-400/10"
        title="Tudo que você precisa para vender mais"
        description="Recursos completos para transformar seu processo comercial"
      />

      <ProductUseCases useCases={useCases} accentColor="text-blue-400" />

      <ProductPricing
        plans={pricingPlans}
        accentColor="text-blue-400"
        productName="Sirius CRM"
        title="Escolha seu plano"
        description="Comece grátis por 14 dias. Sem cartão de crédito necessário."
      />

      <CTASection
        title="Pronto para transformar suas vendas?"
        description="Junte-se a centenas de empresas que já aumentaram suas vendas com o Sirius CRM."
        primaryCTA={{
          text: 'Começar teste grátis',
          href: '/contato',
        }}
        secondaryCTA={{
          text: 'Agendar demonstração',
          href: '/contato',
        }}
      />

      <Footer />
    </div>
  );
}
