'use client';

import { useState } from 'react';
import { RevealOnScroll } from '@/components/animations';
import { Check, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type BillingPeriod = 'monthly' | 'yearly';

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: string[];
  cta: string;
  ctaVariant?: 'primary' | 'secondary';
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'Ideal para pequenas empresas começando a digitalização',
    monthlyPrice: 497,
    yearlyPrice: 4970,
    features: [
      'Até 3 usuários',
      '1 solução ROI Labs (CRM ou ERP)',
      '10GB de armazenamento',
      'Suporte via email',
      'Atualizações automáticas',
      'Relatórios básicos',
    ],
    cta: 'Começar teste grátis',
    ctaVariant: 'secondary',
  },
  {
    name: 'Professional',
    description: 'Para empresas em crescimento que precisam de mais poder',
    monthlyPrice: 997,
    yearlyPrice: 9970,
    popular: true,
    features: [
      'Até 10 usuários',
      '2 soluções ROI Labs integradas',
      '50GB de armazenamento',
      'Suporte prioritário 24/7',
      'Atualizações automáticas',
      'Relatórios avançados',
      'API access',
      'Integrações ilimitadas',
      'Treinamento incluso',
    ],
    cta: 'Começar teste grátis',
    ctaVariant: 'primary',
  },
  {
    name: 'Enterprise',
    description: 'Solução completa para grandes empresas',
    monthlyPrice: 2497,
    yearlyPrice: 24970,
    features: [
      'Usuários ilimitados',
      'Todas as 5 soluções ROI Labs',
      'Armazenamento ilimitado',
      'Suporte dedicado 24/7',
      'Atualizações automáticas',
      'Relatórios personalizados',
      'API access completo',
      'Integrações ilimitadas',
      'Treinamento dedicado',
      'Gerente de conta exclusivo',
      'SLA garantido',
      'Customizações sob medida',
    ],
    cta: 'Falar com vendas',
    ctaVariant: 'secondary',
  },
];

export default function PricingPlans() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-24 px-8 bg-pure-black relative">
      <div className="max-w-content mx-auto">
        {/* Billing Toggle */}
        <RevealOnScroll>
          <div className="flex items-center justify-center gap-4 mb-16">
            <span
              className={`text-sm transition-colors ${
                billingPeriod === 'monthly' ? 'text-pure-white' : 'text-text-muted'
              }`}
            >
              Mensal
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 bg-gray-800 rounded-full transition-colors hover:bg-gray-700"
              aria-label="Toggle billing period"
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-primary-500 rounded-full transition-transform ${
                  billingPeriod === 'yearly' ? 'translate-x-7' : ''
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm transition-colors ${
                  billingPeriod === 'yearly' ? 'text-pure-white' : 'text-text-muted'
                }`}
              >
                Anual
              </span>
              <Badge variant="success" className="text-xs">
                -20%
              </Badge>
            </div>
          </div>
        </RevealOnScroll>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <RevealOnScroll key={plan.name} delay={0.1 * index} direction="up">
              <div
                className={`relative glass-card p-8 h-full flex flex-col ${
                  plan.popular ? 'border-primary-500/50' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="default" className="gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      Mais Popular
                    </Badge>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-h3 font-medium mb-2">{plan.name}</h3>
                  <p className="text-sm text-text-muted">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-light">
                      {formatPrice(
                        billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice / 12
                      )}
                    </span>
                    <span className="text-text-muted">/mês</span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <p className="text-sm text-text-muted">
                      {formatPrice(plan.yearlyPrice)} cobrado anualmente
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <a
                  href="#"
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all mb-8 text-center block ${
                    plan.ctaVariant === 'primary'
                      ? 'bg-primary-500 hover:bg-primary-600 text-pure-white'
                      : 'bg-white/5 hover:bg-white/10 text-pure-white border border-white/10'
                  }`}
                >
                  {plan.cta}
                </a>

                {/* Features List */}
                <div className="space-y-3 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary-400" />
                      </div>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Custom Enterprise Message */}
        <RevealOnScroll delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-text-muted">
              Precisa de algo diferente?{' '}
              <a href="/contato" className="text-primary-400 hover:text-primary-300 transition-colors">
                Fale conosco
              </a>{' '}
              para um plano personalizado
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
