import { RevealOnScroll } from '@/components/animations';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProductFeaturesProps {
  title?: string;
  description?: string;
  features: Feature[];
  iconColor: string;
  iconBg: string;
}

export default function ProductFeatures({
  title = 'Recursos Principais',
  description = 'Tudo que você precisa para transformar seus resultados',
  features,
  iconColor,
  iconBg,
}: ProductFeaturesProps) {
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <RevealOnScroll key={index} delay={0.1 * index}>
                <div className="glass-card p-8 h-full hover:bg-white/5 transition-all group">
                  <div
                    className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-7 h-7 ${iconColor}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-pure-white">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
