import { RevealOnScroll } from '@/components/animations';
import { Check, X } from 'lucide-react';

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    starter: boolean | string;
    professional: boolean | string;
    enterprise: boolean | string;
  }[];
}

const comparisonData: ComparisonFeature[] = [
  {
    category: 'Recursos Principais',
    features: [
      {
        name: 'Número de usuários',
        starter: 'Até 3',
        professional: 'Até 10',
        enterprise: 'Ilimitado',
      },
      {
        name: 'Soluções ROI Labs',
        starter: '1 solução',
        professional: '2 soluções',
        enterprise: 'Todas (5)',
      },
      {
        name: 'Armazenamento',
        starter: '10GB',
        professional: '50GB',
        enterprise: 'Ilimitado',
      },
      {
        name: 'API Access',
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: 'Integrações',
        starter: 'Básicas',
        professional: 'Ilimitadas',
        enterprise: 'Ilimitadas',
      },
    ],
  },
  {
    category: 'Suporte',
    features: [
      {
        name: 'Suporte via email',
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: 'Suporte 24/7',
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: 'Gerente de conta dedicado',
        starter: false,
        professional: false,
        enterprise: true,
      },
      {
        name: 'SLA garantido',
        starter: false,
        professional: false,
        enterprise: '99.9%',
      },
      {
        name: 'Treinamento',
        starter: 'Documentação',
        professional: 'Incluso',
        enterprise: 'Dedicado',
      },
    ],
  },
  {
    category: 'Recursos Avançados',
    features: [
      {
        name: 'Relatórios personalizados',
        starter: false,
        professional: 'Avançados',
        enterprise: 'Customizados',
      },
      {
        name: 'Dashboards customizáveis',
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: 'Automações',
        starter: 'Básicas',
        professional: 'Avançadas',
        enterprise: 'Ilimitadas',
      },
      {
        name: 'White label',
        starter: false,
        professional: false,
        enterprise: true,
      },
      {
        name: 'Desenvolvimento customizado',
        starter: false,
        professional: false,
        enterprise: true,
      },
    ],
  },
  {
    category: 'Segurança e Compliance',
    features: [
      {
        name: 'Criptografia SSL',
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: 'Backup automático',
        starter: 'Semanal',
        professional: 'Diário',
        enterprise: 'Tempo real',
      },
      {
        name: 'Autenticação 2FA',
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: 'SSO (Single Sign-On)',
        starter: false,
        professional: false,
        enterprise: true,
      },
      {
        name: 'Auditoria de logs',
        starter: false,
        professional: '90 dias',
        enterprise: 'Ilimitado',
      },
    ],
  },
];

const renderFeatureValue = (value: boolean | string) => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-5 h-5 text-primary-400 mx-auto" />
    ) : (
      <X className="w-5 h-5 text-gray-600 mx-auto" />
    );
  }
  return <span className="text-sm text-text-secondary">{value}</span>;
};

export default function PricingComparison() {
  return (
    <section className="py-24 px-8 bg-gradient-to-b from-pure-black to-gray-950">
      <div className="max-w-content mx-auto">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-h2 font-light mb-4">Comparação Detalhada</h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Compare todos os recursos disponíveis em cada plano e escolha o melhor para sua
            empresa
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="glass-card overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-6 border-b border-white/10 bg-white/5">
              <div className="text-sm font-medium">Recursos</div>
              <div className="text-sm font-medium text-center">Starter</div>
              <div className="text-sm font-medium text-center">Professional</div>
              <div className="text-sm font-medium text-center">Enterprise</div>
            </div>

            {/* Table Body */}
            {comparisonData.map((category, categoryIndex) => (
              <div key={category.category}>
                {/* Category Header */}
                <div className="px-6 py-4 bg-white/5 border-b border-white/10">
                  <h3 className="text-sm font-medium text-primary-400">{category.category}</h3>
                </div>

                {/* Category Features */}
                {category.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="grid grid-cols-4 gap-4 p-6 border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <div className="text-sm text-text-secondary">{feature.name}</div>
                    <div className="text-center">{renderFeatureValue(feature.starter)}</div>
                    <div className="text-center">{renderFeatureValue(feature.professional)}</div>
                    <div className="text-center">{renderFeatureValue(feature.enterprise)}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Mobile Warning */}
        <RevealOnScroll delay={0.3}>
          <p className="text-xs text-text-muted text-center mt-6 md:hidden">
            Deslize horizontalmente para ver todos os planos
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
