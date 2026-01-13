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
  title: 'Vértice Marketing - Agência de Performance com CRM Próprio | ROI Labs',
  description:
    'Agência de marketing digital com tráfego pago (Google Ads + Meta Ads), CRM próprio, consultoria de performance, SEO, criação de sites e e-commerce completo.',
};

export default function VerticeMarketingPage() {
  const features = [
    {
      icon: Target,
      title: 'Gestão de Tráfego Pago',
      description:
        'Monitoramos o comportamento do seu público diariamente no Google Ads e Meta Ads (Facebook/Instagram). Garantimos que você atrai compradores, não apenas curiosos. Otimização contínua de campanhas para máximo ROI.',
    },
    {
      icon: Users,
      title: 'CRM & Tecnologia Própria',
      description:
        'Implementamos nosso CRM exclusivo para organizar sua operação comercial e garantir que nenhum lead fique sem resposta. Integração completa entre marketing e vendas com automações inteligentes.',
    },
    {
      icon: TrendingUp,
      title: 'Consultoria de Performance',
      description:
        'Analisamos os resultados junto com você semanalmente para corrigir rotas e definir os próximos passos do crescimento. Relatórios detalhados de CAC, LTV, ROI e conversão por canal.',
    },
    {
      icon: Globe,
      title: 'Criação de Sites Profissionais',
      description:
        'Desenvolvemos sites modernos, responsivos e otimizados para conversão. Design que transmite profissionalismo e transforma visitantes em clientes. Integração com ferramentas de analytics e automação.',
    },
    {
      icon: Brain,
      title: 'Consultoria de SEO',
      description:
        'Otimizamos seu site para aparecer nas primeiras posições do Google e atrair tráfego orgânico qualificado. Pesquisa de palavras-chave, otimização técnica, conteúdo estratégico e link building.',
    },
    {
      icon: BarChart3,
      title: 'E-commerce Completo',
      description:
        'Criamos e gerenciamos lojas virtuais completas, focadas em experiência do usuário e alta conversão. Integração com meios de pagamento, gestão de estoque, marketing e análise de performance.',
    },
  ];

  const useCases = [
    {
      industry: 'E-commerce de Moda',
      title: 'Loja de roupas triplica faturamento em 6 meses',
      description:
        'E-commerce regional implementou estratégia completa de tráfego pago + SEO com a Vértice Marketing.',
      results: [
        'Faturamento cresceu de R$ 80k para R$ 240k/mês',
        'ROAS (Return on Ad Spend) de 8:1 no Google Ads',
        'Tráfego orgânico aumentou 420% com SEO',
        'Taxa de conversão do site subiu de 1,1% para 3,2%',
      ],
    },
    {
      industry: 'Clínica Odontológica',
      title: 'Clínica reduz CAC em 65% com tráfego pago',
      description:
        'Rede de clínicas odontológicas otimizou campanhas no Google Ads e Meta Ads com consultoria da Vértice.',
      results: [
        'CAC caiu de R$ 480 para R$ 168 por paciente',
        'Agendamentos mensais cresceram 280%',
        'CRM próprio organizou 100% dos leads',
        'ROI de marketing atingiu 520%',
      ],
    },
    {
      industry: 'Indústria B2B',
      title: 'Fábrica de embalagens aumenta leads qualificados em 5x',
      description:
        'Indústria B2B criou site profissional + estratégia de SEO + tráfego pago para captar distribuidores.',
      results: [
        'Leads qualificados aumentaram de 8 para 42/mês',
        'Site novo aumentou conversão em 350%',
        'Primeira página do Google em 4 meses',
        'Pipeline comercial cresceu R$ 2,8M em 8 meses',
      ],
    },
    {
      industry: 'Educação Online',
      title: 'Escola de cursos online dobra matrículas com funil completo',
      description:
        'Plataforma de cursos profissionalizantes implementou estratégia de tráfego pago + CRM + e-mail marketing.',
      results: [
        'Matrículas mensais dobraram (180 → 360)',
        'Custo por aluno caiu 52% com otimizações',
        'Taxa de conversão de landing page: 12,8%',
        'Ticket médio aumentou 35% com upsell',
      ],
    },
  ];

  const pricingPlans = [
    {
      name: 'Essencial',
      price: 'R$ 2.500',
      period: 'mês',
      description: 'Para começar a crescer online',
      features: [
        'Gestão de 1 canal (Google ou Meta)',
        'Até R$ 5k de investimento em mídia',
        'Acesso ao CRM Vértice',
        'Relatórios quinzenais',
        'Otimização contínua de campanhas',
        'Suporte por WhatsApp',
        'Consultoria mensal de performance',
      ],
    },
    {
      name: 'Performance',
      price: 'R$ 4.900',
      period: 'mês',
      description: 'Para escalar com performance',
      features: [
        'Gestão multi-canal (Google + Meta)',
        'Até R$ 15k de investimento em mídia',
        'Tudo do Essencial +',
        'Landing pages otimizadas',
        'SEO básico (on-page + técnico)',
        'Relatórios semanais detalhados',
        'Consultoria quinzenal de estratégia',
        'Gestor dedicado',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Sob consulta',
      period: 'mês',
      description: 'Para dominar seu mercado',
      features: [
        'Gestão completa multi-canal',
        'Sem limite de investimento em mídia',
        'Tudo do Performance +',
        'Criação/redesign de site ou e-commerce',
        'SEO avançado + Link Building',
        'Automações de marketing complexas',
        'Estrategista de crescimento dedicado',
        'SLA de resposta garantido',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      <ProductHero
        icon={TrendingUp}
        iconColor="text-yellow-600"
        iconBg="bg-gradient-to-br from-yellow-500/10 via-amber-500/10 to-yellow-600/10"
        productName="Vértice Marketing"
        tagline="Marketing que converte"
        description="Agência de performance com gestão completa de tráfego pago (Google Ads + Meta Ads), CRM próprio, consultoria estratégica, SEO, criação de sites e e-commerce. Transformamos investimento em mídia em resultados mensuráveis."
        gradientFrom="#ca8a04"
        gradientTo="#f59e0b"
        logoUrl="/assets/vertice-marketing-logo.png"
        benefits={[
          'Gestão especializada Google Ads + Meta Ads',
          'CRM próprio para organizar 100% dos leads',
          'Consultoria de performance com relatórios semanais',
          'SEO + Sites profissionais + E-commerce completo',
          'ROAS médio de 6:1 para clientes ativos',
        ]}
      />

      <ProductFeatures
        features={features}
        iconColor="text-yellow-600"
        iconBg="bg-gradient-to-br from-yellow-500/10 via-amber-500/10 to-yellow-600/10"
        title="Ecossistema completo de marketing"
        description="Todos os serviços integrados para gerar resultados previsíveis e escaláveis"
      />

      <ProductUseCases useCases={useCases} accentColor="text-yellow-600" />

      <ProductPricing
        plans={pricingPlans}
        accentColor="text-yellow-600"
        productName="Vértice Marketing"
        title="Planos que crescem com seu negócio"
        description="Do essencial ao enterprise, escolha o plano ideal para sua operação"
      />

      <CTASection
        title="Pronto para crescer com performance?"
        description="Junte-se a dezenas de empresas que já triplicaram faturamento e reduziram CAC com a Vértice Marketing."
        primaryCTA={{
          text: 'Falar com especialista',
          href: '/contato',
        }}
        secondaryCTA={{
          text: 'Ver cases de sucesso',
          href: '/contato',
        }}
      />

      <Footer />
    </div>
  );
}
