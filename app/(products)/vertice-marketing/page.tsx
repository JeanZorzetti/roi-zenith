import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ProductHero from '@/components/products/ProductHero';
import ProductFeatures from '@/components/products/ProductFeatures';
import ProductUseCases from '@/components/products/ProductUseCases';
import ProductPricing from '@/components/products/ProductPricing';
import CTASection from '@/components/sections/CTASection';
import {
  TrendingUp,
  Mail,
  MessageCircle,
  BarChart3,
  Users,
  Zap,
  Target,
  Globe,
  Brain,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vértice Marketing - Automação e Análise de Marketing Digital | ROI Labs',
  description:
    'Automatize campanhas, gere leads qualificados e mensure ROI com precisão. Plataforma completa de marketing digital para PMEs.',
};

export default function VerticeMarketingPage() {
  const features = [
    {
      icon: Mail,
      title: 'Email Marketing Avançado',
      description:
        'Editor drag-and-drop, segmentação inteligente, A/B testing e automações baseadas em comportamento. Envie o email certo na hora certa.',
    },
    {
      icon: Zap,
      title: 'Automação de Campanhas',
      description:
        'Crie fluxos automatizados multicanal. Nutrição de leads, onboarding, reativação e cross-sell no piloto automático.',
    },
    {
      icon: Target,
      title: 'Geração de Leads',
      description:
        'Landing pages de alta conversão, formulários inteligentes, pop-ups e lead scoring automático. Capture e qualifique leads continuamente.',
    },
    {
      icon: BarChart3,
      title: 'Analytics e ROI',
      description:
        'Dashboards em tempo real com métricas que importam. CAC, LTV, ROI por canal, taxa de conversão e atribuição multi-touch.',
    },
    {
      icon: MessageCircle,
      title: 'Marketing Conversacional',
      description:
        'Chatbots inteligentes para WhatsApp, Instagram e website. Qualifique leads e agende reuniões 24/7 automaticamente.',
    },
    {
      icon: Users,
      title: 'Gestão de Redes Sociais',
      description:
        'Agende posts, monitore menções, responda comentários e analise engajamento. Tudo em um único painel centralizado.',
    },
    {
      icon: Globe,
      title: 'SEO e Conteúdo',
      description:
        'Pesquisa de palavras-chave, análise de concorrentes, otimização on-page e tracking de rankings. Domine o Google organicamente.',
    },
    {
      icon: Brain,
      title: 'IA e Personalização',
      description:
        'Recomendações de conteúdo personalizadas, otimização de envio e predição de churn. IA trabalha para você 24/7.',
    },
    {
      icon: TrendingUp,
      title: 'Growth Hacking',
      description:
        'Experimentos A/B, testes multivariados, otimização de conversão e viral loops. Cresça rápido com dados.',
    },
  ];

  const useCases = [
    {
      industry: 'E-commerce',
      title: 'E-commerce dobra taxa de conversão',
      description:
        'Loja online implementou automações de carrinho abandonado e campanhas segmentadas.',
      results: [
        'Taxa de conversão aumentou de 1,2% para 2,8%',
        'Recuperação de 35% dos carrinhos abandonados',
        'CAC reduziu 45% com automações',
        'ROI de marketing atingiu 480%',
      ],
    },
    {
      industry: 'SaaS B2B',
      title: 'Startup SaaS reduz CAC em 60%',
      description:
        'Empresa de software B2B automatizou nutrição de leads e implementou lead scoring.',
      results: [
        'CAC caiu de R$ 850 para R$ 340',
        'Conversão de lead para trial aumentou 120%',
        'LTV/CAC ratio melhorou de 2:1 para 7:1',
        'Pipeline de vendas cresceu 3x',
      ],
    },
    {
      industry: 'Educação',
      title: 'Escola online triplica matrículas',
      description:
        'Instituição de ensino digital criou funis automatizados de captação de alunos.',
      results: [
        'Matrículas mensais triplicaram',
        'Custo por matrícula caiu 55%',
        'Taxa de retenção aumentou para 87%',
        'NPS de alunos atingiu 92 pontos',
      ],
    },
    {
      industry: 'Serviços Financeiros',
      title: 'Fintech aumenta geração de leads em 5x',
      description:
        'Startup financeira implementou estratégia omnichannel com automações inteligentes.',
      results: [
        'Geração de leads qualificados aumentou 5x',
        'Custo por lead qualificado caiu 70%',
        'Taxa de ativação de contas subiu 180%',
        'Receita recorrente cresceu 320% em 6 meses',
      ],
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'R$ 247',
      period: 'mês',
      description: 'Para começar com automação',
      features: [
        'Até 2.500 contatos',
        'Email marketing ilimitado',
        '3 landing pages',
        'Automações básicas',
        'Formulários e pop-ups',
        'Analytics essenciais',
        'Suporte por email',
      ],
    },
    {
      name: 'Professional',
      price: 'R$ 597',
      period: 'mês',
      description: 'Para escalar marketing',
      features: [
        'Até 10.000 contatos',
        'Tudo do Starter +',
        'Landing pages ilimitadas',
        'Automações avançadas',
        'A/B testing',
        'Lead scoring com IA',
        'Chatbots WhatsApp',
        'Suporte prioritário',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Sob consulta',
      period: 'mês',
      description: 'Para grandes operações',
      features: [
        'Contatos ilimitados',
        'Tudo do Professional +',
        'Multi-marca / Multi-idioma',
        'API avançada',
        'Domínio dedicado',
        'SLA garantido',
        'Onboarding personalizado',
        'Growth strategist dedicado',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      <ProductHero
        icon={TrendingUp}
        iconColor="text-green-400"
        iconBg="bg-green-400/10"
        productName="Vértice Marketing"
        tagline="Marketing que converte"
        description="Automatize suas campanhas, gere leads qualificados e mensure ROI com precisão cirúrgica. Plataforma completa de marketing digital feita para PMEs brasileiras."
        gradientFrom="#065f46"
        gradientTo="#10b981"
        benefits={[
          'Automação de campanhas multicanal',
          'Landing pages de alta conversão',
          'Analytics e atribuição de ROI',
          'Chatbots inteligentes (WhatsApp + IA)',
          'Teste grátis por 14 dias',
        ]}
      />

      <ProductFeatures
        features={features}
        iconColor="text-green-400"
        iconBg="bg-green-400/10"
        title="Ferramentas completas de growth"
        description="Tudo que você precisa para crescer de forma previsível e escalável"
      />

      <ProductUseCases useCases={useCases} accentColor="text-green-400" />

      <ProductPricing
        plans={pricingPlans}
        accentColor="text-green-400"
        productName="Vértice Marketing"
        title="Planos que crescem com você"
        description="Comece pequeno e escale conforme seus resultados melhoram"
      />

      <CTASection
        title="Pronto para escalar seu marketing?"
        description="Junte-se a centenas de empresas que já reduziram CAC e aumentaram conversão com o Vértice Marketing."
        primaryCTA={{
          text: 'Começar teste grátis',
          href: '/contato',
        }}
        secondaryCTA={{
          text: 'Ver demonstração',
          href: '/contato',
        }}
      />

      <Footer />
    </div>
  );
}
