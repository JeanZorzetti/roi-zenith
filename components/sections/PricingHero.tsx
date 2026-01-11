import { FadeIn } from '@/components/animations';
import { Check } from 'lucide-react';

export default function PricingHero() {
  const benefits = [
    'Sem taxas de setup ou implementação',
    'Cancele quando quiser',
    'Suporte 24/7 em português',
    'Garantia de 30 dias',
  ];

  return (
    <section className="pt-32 pb-16 px-8 bg-gradient-to-b from-pure-black to-gray-950 relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[120px]" />

      <div className="max-w-content mx-auto relative z-10">
        <FadeIn className="text-center">
          <h1 className="text-display font-thin mb-6">
            Planos que crescem
            <br />
            com o seu negócio
          </h1>
          <p className="text-subtitle text-text-secondary mb-12 max-w-2xl mx-auto">
            Escolha a solução ideal para sua empresa. Todos os planos incluem suporte completo,
            atualizações gratuitas e garantia de satisfação.
          </p>

          {/* Benefits Grid */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <FadeIn key={index} delay={0.1 * index} direction="up">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <div className="w-5 h-5 rounded-full bg-primary-500/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-400" />
                  </div>
                  <span>{benefit}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
