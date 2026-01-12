import { RevealOnScroll } from '@/components/animations';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

interface ProductPricingProps {
  title?: string;
  description?: string;
  plans: PricingPlan[];
  accentColor: string;
  productName: string;
}

export default function ProductPricing({
  title = 'Planos e Preços',
  description = 'Escolha o plano ideal para o tamanho da sua empresa',
  plans,
  accentColor,
  productName,
}: ProductPricingProps) {
  return (
    <section className="py-24 md:py-32 px-8 bg-pure-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-5xl font-thin mb-4">{title}</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">{description}</p>
          </RevealOnScroll>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <RevealOnScroll key={index} delay={0.1 * index}>
              <div
                className={`glass-card p-8 h-full flex flex-col ${
                  plan.highlighted
                    ? 'border-2 border-primary-500 relative'
                    : 'border border-white/10'
                }`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600">
                    Mais Popular
                  </Badge>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-medium mb-2 text-pure-white">{plan.name}</h3>
                  <p className="text-text-muted text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-light text-pure-white">{plan.price}</span>
                    <span className="text-text-muted">/ {plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle2
                        className={`w-4 h-4 ${accentColor} flex-shrink-0 mt-0.5`}
                        strokeWidth={2}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contato"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                    plan.highlighted
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-pure-white border border-white/10'
                  }`}
                >
                  Começar agora
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Link to full pricing page */}
        <RevealOnScroll>
          <div className="text-center">
            <p className="text-text-secondary mb-4">
              Precisa de uma solução personalizada ou quer comparar todos os planos?
            </p>
            <Link
              href="/precos"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              Ver tabela comparativa completa
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
