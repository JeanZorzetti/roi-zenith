'use client';

import { useEffect, useState, useRef } from 'react';
import { Users, Package, TrendingUp, Factory, DollarSign } from 'lucide-react';

interface Product {
  name: string;
  description: string;
  icon: typeof Users;
  status: 'available' | 'coming-soon';
  features: string[];
}

const products: Product[] = [
  {
    name: 'Sirius CRM',
    description: 'Gestão completa de relacionamento com clientes',
    icon: Users,
    status: 'available',
    features: ['Pipeline de vendas', 'Automação de marketing', 'Analytics avançado']
  },
  {
    name: 'Orion ERP',
    description: 'Sistema integrado de gestão empresarial',
    icon: Package,
    status: 'available',
    features: ['Financeiro', 'Estoque', 'Compras e vendas']
  },
  {
    name: 'Vértice Marketing',
    description: 'Plataforma completa de marketing digital',
    icon: TrendingUp,
    status: 'available',
    features: ['Campanhas multi-canal', 'Automação', 'ROI tracking']
  },
  {
    name: 'PCP Industrial',
    description: 'Planejamento e controle de produção',
    icon: Factory,
    status: 'coming-soon',
    features: ['Planejamento de produção', 'Controle de qualidade', 'OEE em tempo real']
  },
  {
    name: 'BPO Financeiro',
    description: 'Terceirização de processos financeiros',
    icon: DollarSign,
    status: 'coming-soon',
    features: ['Contas a pagar/receber', 'Conciliação bancária', 'Relatórios fiscais']
  }
];

export default function ProductShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="produto"
      className="relative py-24 md:py-32 px-8 bg-gradient-to-b from-pure-black via-charcoal to-pure-black"
    >
      <div className="max-w-content mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-display mb-4 ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
            Nossas Soluções
          </h2>
          <p className={`text-xl font-light text-text-secondary ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}
             style={{ animationDelay: '0.2s' }}>
            Um ecossistema completo para transformar seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className={`glass-card p-8 hover:scale-105 transition-all duration-300 ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-lg bg-white/10 border border-white/20">
                    <Icon className="w-8 h-8 text-pure-white" strokeWidth={1.5} />
                  </div>
                  {product.status === 'coming-soon' && (
                    <span className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20 text-text-secondary">
                      Em breve
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-light mb-3 text-pure-white">
                  {product.name}
                </h3>

                <p className="text-text-secondary mb-6 leading-relaxed">
                  {product.description}
                </p>

                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
