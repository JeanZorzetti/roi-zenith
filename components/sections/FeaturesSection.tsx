'use client';

import { useEffect, useRef, useState } from 'react';
import { Layers, Zap, Shield, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: 'Totalmente Integrado',
    description: 'Todos os sistemas conectados. Uma única fonte de verdade para seus dados.',
  },
  {
    icon: Zap,
    title: 'Máxima Eficiência',
    description: 'Automatize processos e elimine trabalho manual. Foque no que importa.',
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Dados protegidos com as melhores práticas de segurança e compliance.',
  },
  {
    icon: TrendingUp,
    title: 'Crescimento Escalável',
    description: 'Cresça sem limites. Nossas soluções acompanham a evolução do seu negócio.',
  },
];

export default function FeaturesSection() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleItems(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="recursos" className="py-24 md:py-32 px-8 bg-pure-black">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display mb-4 fade-in-up">
            Por que escolher ROI Labs?
          </h2>
          <p className="text-xl font-light text-text-secondary fade-in-up" style={{ animationDelay: '0.2s' }}>
            Um ecossistema completo pensado para o sucesso do seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={el => { itemRefs.current[index] = el; }}
                className={`glass-card text-center group cursor-pointer ${
                  visibleItems[index] ? 'visible' : ''
                } fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-6 text-text-secondary group-hover:text-pure-white transition-colors duration-300">
                  <Icon className="w-12 h-12 mx-auto" strokeWidth={1} />
                </div>
                <h3 className="text-title mb-3 group-hover:text-pure-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-caption leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
