import { RevealOnScroll } from '@/components/animations';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export default function CTASection({
  title = 'Pronto para transformar seu negócio?',
  description = 'Junte-se a centenas de empresas que já estão crescendo com a ROI Labs.',
  primaryCTA = {
    text: 'Começar teste grátis',
    href: '#',
  },
  secondaryCTA = {
    text: 'Agendar demonstração',
    href: '/contato',
  },
}: CTASectionProps) {
  return (
    <section className="py-32 px-8 bg-gradient-to-b from-gray-950 to-pure-black relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <RevealOnScroll>
          <h2 className="text-display font-thin mb-6">{title}</h2>
          <p className="text-subtitle text-text-secondary mb-12">{description}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <a
              href={primaryCTA.href}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-light tracking-wide transition-all hover:scale-105 shadow-glow"
            >
              {primaryCTA.text}
              <ArrowRight className="w-5 h-5" />
            </a>

            {/* Secondary CTA */}
            <a
              href={secondaryCTA.href}
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-pure-white px-8 py-4 rounded-lg text-lg font-light tracking-wide transition-all border border-white/10 hover:border-white/20"
            >
              {secondaryCTA.text}
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
