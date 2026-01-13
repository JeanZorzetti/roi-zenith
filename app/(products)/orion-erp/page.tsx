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
  Store,
  Boxes,
  FileCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Orion ERP - ERP Completo com 9 Integrações de Marketplace | ROI Labs',
  description:
    'ERP brasileiro com Next.js 15, financeiro completo + portal do fornecedor, 9 marketplaces integrados (ML, Amazon, Shopee), Report Builder customizável e gestão fiscal automatizada.',
};

export default function OrionERPPage() {
  const features = [
    {
      icon: DollarSign,
      title: 'Financeiro Completo + Portal do Fornecedor',
      description:
        'Contas a Pagar (aprovações, conciliação bancária, descontos) + Contas a Receber (análise de risco, automação). Portal web dedicado para fornecedores acompanharem status de pagamentos em tempo real.',
    },
    {
      icon: Boxes,
      title: 'Gestão de Estoque Multi-Depósito',
      description:
        'Controle de múltiplos depósitos, rastreamento por lote, inventário automatizado, movimentações entre depósitos, alertas de estoque mínimo. Relatórios de giro, ABC e valuation.',
    },
    {
      icon: Store,
      title: '9 Marketplaces Integrados',
      description:
        'Mercado Livre, Amazon, Shopee, Magalu, B2W, TikTok Shop, Shopify, WooCommerce + Custom. Sincronização automática de produtos, pedidos e estoque. Gestão unificada de todas as vendas.',
    },
    {
      icon: FileCheck,
      title: 'Report Builder Customizável',
      description:
        'Construtor visual de relatórios (Report Builder) com templates prontos, agendamento automático, histórico completo e exportação Excel/PDF. Executive Dashboard com KPIs em tempo real.',
    },
    {
      icon: FileText,
      title: 'Fiscal e Tributário Automatizado',
      description:
        'Emissão de NF-e, cálculo automático de impostos, SPED Fiscal, SPED Contribuições. Configurações fiscais por produto e cliente. 100% compliance com legislação brasileira.',
    },
    {
      icon: ShoppingCart,
      title: 'Vendas com Funil e Analytics',
      description:
        'Funil de vendas visual, analytics avançado (conversão, ticket médio, LTV), logística integrada com tracking de entregas. Gestão de comissões e metas por vendedor.',
    },
    {
      icon: Package,
      title: 'Gestão de Produtos Avançada',
      description:
        'Cadastro completo de produtos, variações (cor, tamanho), kits e combos, precificação dinâmica, margem de lucro automática. Integração direta com marketplaces.',
    },
    {
      icon: DollarSign,
      title: 'Fluxo de Caixa Projetado',
      description:
        'Projeção de fluxo de caixa a 30, 60 e 90 dias. Alertas de vencimento, descontos para pagamento antecipado, conciliação bancária automática. DRE e balanço em tempo real.',
    },
    {
      icon: BarChart2,
      title: 'Dashboard Executivo Recharts',
      description:
        'Dashboards interativos com Recharts: gráficos de receita, vendas por canal, performance de marketplace, análise de margens. Filtros por período, canal e categoria de produto.',
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
        iconBg="bg-white"
        productName="Orion ERP"
        tagline="Toda sua empresa em um só lugar"
        description="ERP brasileiro completo construído com Next.js 15 e React 18. Financeiro com Portal do Fornecedor, 9 integrações de marketplace (ML, Amazon, Shopee, Magalu, B2W, TikTok Shop), Report Builder customizável e compliance fiscal automatizado."
        gradientFrom="#581c87"
        gradientTo="#a855f7"
        logoUrl="/assets/orion-erp-logo.png"
        screenshotUrl="/assets/orion-erp-screenshot.jpg"
        benefits={[
          'Financeiro completo + Portal do Fornecedor',
          '9 marketplaces integrados (ML, Amazon, Shopee, Magalu)',
          'Report Builder com templates e agendamento automático',
          'Estoque multi-depósito + rastreamento por lote',
          'NF-e + SPED Fiscal automatizado',
          'Dashboard Recharts + Analytics avançado',
        ]}
      />

      <ProductFeatures
        features={features}
        iconColor="text-purple-400"
        iconBg="bg-white"
        title="ERP moderno e production-ready"
        description="Next.js 15, Radix UI, TanStack Query, Recharts, ExcelJS/jsPDF. Arquitetura escalável e customizável."
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
