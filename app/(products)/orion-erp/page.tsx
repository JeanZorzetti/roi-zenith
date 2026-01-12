import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ProductHero from '@/components/products/ProductHero';
import ProductFeatures from '@/components/products/ProductFeatures';
import ProductUseCases from '@/components/products/ProductUseCases';
import ProductPricing from '@/components/products/ProductPricing';
import CTASection from '@/components/sections/CTASection';
import {
  Building2,
  DollarSign,
  Package,
  ShoppingCart,
  FileText,
  BarChart2,
  Users,
  Truck,
  Settings,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Orion ERP - Sistema Integrado de Gestão Empresarial | ROI Labs',
  description:
    'Gerencie financeiro, estoque, compras e vendas em uma única plataforma. ERP completo para PMEs que querem crescer com organização.',
};

export default function OrionERPPage() {
  const features = [
    {
      icon: DollarSign,
      title: 'Financeiro Integrado',
      description:
        'Contas a pagar e receber, fluxo de caixa, conciliação bancária e DRE em tempo real. Tenha controle total sobre as finanças.',
    },
    {
      icon: Package,
      title: 'Gestão de Estoque',
      description:
        'Controle de entrada e saída, rastreamento por lote, inventário e alertas de estoque mínimo. Nunca fique sem produto.',
    },
    {
      icon: ShoppingCart,
      title: 'Compras Inteligentes',
      description:
        'Gestão de fornecedores, cotações automáticas, ordens de compra e histórico de negociações. Compre melhor, pague menos.',
    },
    {
      icon: FileText,
      title: 'Vendas e Faturamento',
      description:
        'Emissão de NF-e, controle de pedidos, gestão de clientes e comissionamento. Do orçamento à nota fiscal em minutos.',
    },
    {
      icon: BarChart2,
      title: 'Relatórios Gerenciais',
      description:
        'Dashboards customizáveis com KPIs do seu negócio. DRE, balanço, margem de lucro e análises preditivas.',
    },
    {
      icon: Users,
      title: 'Gestão de Pessoas',
      description:
        'Cadastro de funcionários, controle de ponto, férias e folha de pagamento básica. RH integrado ao financeiro.',
    },
    {
      icon: Truck,
      title: 'Logística e Distribuição',
      description:
        'Planejamento de rotas, tracking de entregas, gestão de transportadoras e cálculo de frete automático.',
    },
    {
      icon: FileText,
      title: 'Fiscal e Tributário',
      description:
        'Cálculo automático de impostos, SPED Fiscal, SPED Contribuições e compliance total com legislação brasileira.',
    },
    {
      icon: Settings,
      title: 'Customização Avançada',
      description:
        'Adapte campos, workflows e relatórios para seu negócio. API aberta para integrações personalizadas.',
    },
  ];

  const useCases = [
    {
      industry: 'Indústria de Transformação',
      title: 'Indústria reduz custos em 35%',
      description:
        'Fabricante de peças automotivas implementou o Orion ERP para integrar produção, estoque e financeiro.',
      results: [
        'Redução de 35% nos custos operacionais',
        'Giro de estoque aumentou 2,5x',
        'Acuracidade de inventário atingiu 99%',
        'Tempo de fechamento contábil caiu de 15 para 3 dias',
      ],
    },
    {
      industry: 'Distribuição',
      title: 'Distribuidora triplica faturamento',
      description:
        'Distribuidor de alimentos organizou toda operação logística e ganhou eficiência para crescer.',
      results: [
        'Faturamento triplicou em 18 meses',
        'Margem de lucro aumentou 12 pontos percentuais',
        'Ruptura de estoque caiu para menos de 1%',
        '100% de compliance fiscal e tributário',
      ],
    },
    {
      industry: 'Varejo',
      title: 'Rede varejista elimina retrabalho',
      description:
        'Rede com 15 lojas integrou todas unidades em um único sistema e ganhou visibilidade total.',
      results: [
        'Retrabalho manual eliminado completamente',
        'Visibilidade em tempo real de todas as lojas',
        'Fechamento de caixa acelerado em 80%',
        'Tomada de decisão baseada em dados reais',
      ],
    },
    {
      industry: 'Serviços',
      title: 'Empresa de serviços aumenta margem',
      description:
        'Prestadora de serviços B2B organizou contratos, faturamento recorrente e contas a receber.',
      results: [
        'Margem EBITDA aumentou 18%',
        'Inadimplência caiu de 12% para 2%',
        'Faturamento automatizado economiza 30h/mês',
        'Previsibilidade financeira atingiu 95%',
      ],
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'R$ 297',
      period: 'mês',
      description: 'Para pequenas empresas',
      features: [
        'Até 3 usuários',
        'Financeiro completo',
        'Estoque básico',
        'Emissão de NF-e',
        '1 empresa',
        'Suporte por email',
        'Treinamento online',
      ],
    },
    {
      name: 'Professional',
      price: 'R$ 697',
      period: 'mês',
      description: 'Para médias empresas',
      features: [
        'Até 15 usuários',
        'Tudo do Starter +',
        'Gestão de compras',
        'Múltiplos estoques',
        'API + Integrações',
        'Até 3 empresas',
        'Suporte prioritário',
        'Customizações básicas',
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
        'Gestão multi-filial',
        'Business Intelligence',
        'Customizações avançadas',
        'SLA garantido 99,9%',
        'Gerente de conta dedicado',
        'Migração de dados assistida',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      <ProductHero
        icon={Building2}
        iconColor="text-purple-400"
        iconBg="bg-purple-400/10"
        productName="Orion ERP"
        tagline="Toda sua empresa em um só lugar"
        description="Sistema completo de gestão empresarial. Integre financeiro, estoque, compras, vendas e muito mais em uma única plataforma moderna e fácil de usar."
        gradientFrom="#581c87"
        gradientTo="#a855f7"
        benefits={[
          'Financeiro, estoque e vendas integrados',
          'Emissão de NF-e e compliance fiscal',
          'Relatórios gerenciais em tempo real',
          'API aberta para integrações',
          'Implementação rápida (15-30 dias)',
        ]}
      />

      <ProductFeatures
        features={features}
        iconColor="text-purple-400"
        iconBg="bg-purple-400/10"
        title="Gestão empresarial completa"
        description="Tudo que você precisa para gerenciar seu negócio em um só lugar"
      />

      <ProductUseCases useCases={useCases} accentColor="text-purple-400" />

      <ProductPricing
        plans={pricingPlans}
        accentColor="text-purple-400"
        productName="Orion ERP"
        title="Planos para cada etapa do seu crescimento"
        description="Escolha o plano ideal e escale conforme sua empresa cresce"
      />

      <CTASection
        title="Pronto para organizar sua empresa?"
        description="Migre para o Orion ERP e tenha controle total da sua operação."
        primaryCTA={{
          text: 'Começar agora',
          href: '/contato',
        }}
        secondaryCTA={{
          text: 'Conhecer na prática',
          href: '/contato',
        }}
      />

      <Footer />
    </div>
  );
}
