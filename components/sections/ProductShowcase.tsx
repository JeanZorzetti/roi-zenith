'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Building2, TrendingUp, Factory, Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Product {
  name: string;
  description: string;
  icon: typeof Users;
  status: 'available' | 'coming-soon';
  features: string[];
  color: string;
  bgColor: string;
  borderColor: string;
  path: string;
  tagline: string;
  logoUrl?: string;
}

const products: Product[] = [
  {
    name: 'Sirius CRM',
    description: 'CRM com AGI Sirius - consultora de vendas que qualifica leads, cria scripts e analisa pipeline',
    tagline: 'Relacionamentos que geram resultados',
    icon: Users,
    status: 'available',
    features: [
      '🤖 AGI Sirius: BANT scoring, SPIN selling e quebra de objeções',
      '📊 Previsão de vendas com IA + 8 KPIs em tempo real',
      '⚡ Automações inteligentes de email e WhatsApp',
    ],
    color: 'text-indigo-400',
    bgColor: 'bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10',
    borderColor: 'border-indigo-400/20 hover:border-indigo-400/50',
    path: '/sirius-crm',
    logoUrl: '/assets/sirius-crm-logo.png',
  },
  {
    name: 'Orion ERP',
    description: 'ERP com IA para insights financeiros, previsões de estoque e otimização de processos',
    tagline: 'Toda sua empresa em um só lugar',
    icon: Building2,
    status: 'available',
    features: [
      '🧠 IA para análise de fluxo de caixa e previsões financeiras',
      '🏢 Financeiro completo + Portal do Fornecedor com IA',
      '📦 9 marketplaces integrados com sync inteligente',
    ],
    color: 'text-purple-400',
    bgColor: 'bg-white',
    borderColor: 'border-purple-400/20 hover:border-purple-400/50',
    path: '/orion-erp',
    logoUrl: '/assets/orion-erp-logo.png',
  },
  {
    name: 'Vértice Marketing',
    description: 'Agência com IA para campanhas, segmentação inteligente e otimização de ROI',
    tagline: 'Marketing que converte',
    icon: TrendingUp,
    status: 'available',
    features: [
      '🎯 IA para targeting, lances automáticos e copy otimizada',
      '📈 Análise preditiva de performance e tendências',
      '💬 CRM próprio + Consultoria baseada em dados',
    ],
    color: 'text-yellow-600',
    bgColor: 'bg-white',
    borderColor: 'border-yellow-600/20 hover:border-yellow-600/50',
    path: '/vertice-marketing',
    logoUrl: '/assets/vertice-marketing-logo.png',
  },
  {
    name: 'PCP Industrial',
    description: 'Planejamento e controle de produção',
    tagline: 'Produção eficiente e previsível',
    icon: Factory,
    status: 'coming-soon',
    features: ['Planejamento de produção', 'Controle de qualidade', 'OEE em tempo real'],
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/20 hover:border-orange-400/50',
    path: '/pcp-industrial',
  },
  {
    name: 'BPO Financeiro',
    description: 'Terceirização de processos financeiros',
    tagline: 'Foco no que realmente importa',
    icon: Calculator,
    status: 'coming-soon',
    features: ['Contas a pagar/receber', 'Conciliação bancária', 'Relatórios fiscais'],
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20 hover:border-yellow-400/50',
    path: '/bpo-financeiro',
  },
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
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-content mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-display mb-4 ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
            Nossas Soluções
          </h2>
          <p
            className={`text-xl font-light text-text-secondary ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}
            style={{ animationDelay: '0.2s' }}
          >
            Um ecossistema completo para transformar seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            const isAvailable = product.status === 'available';

            return (
              <Link
                key={index}
                href={product.path}
                className={`group glass-card p-8 border-2 ${product.borderColor} hover:scale-[1.02] transition-all duration-500 ${isVisible ? 'fade-in-up visible' : 'fade-in-up'
                  } ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header with logo/icon and badge */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-4 rounded-xl ${product.bgColor} border border-white/10 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}
                  >
                    {product.logoUrl ? (
                      <div className="relative w-12 h-12">
                        <Image
                          src={product.logoUrl}
                          alt={`${product.name} Logo`}
                          fill
                          className="object-contain drop-shadow-lg"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <Icon className={`w-8 h-8 ${product.color}`} strokeWidth={1.5} />
                    )}
                  </div>
                  {product.status === 'available' ? (
                    <Badge variant="available" className="text-xs">
                      Disponível
                    </Badge>
                  ) : (
                    <Badge variant="coming-soon" className="text-xs">
                      Em breve
                    </Badge>
                  )}
                </div>

                {/* Title and tagline */}
                <h3 className="text-2xl font-medium mb-2 text-pure-white group-hover:text-primary-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-text-muted mb-3 italic">{product.tagline}</p>

                <p className="text-text-secondary mb-6 leading-relaxed text-sm">{product.description}</p>

                {/* Features list */}
                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${product.color}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Link */}
                {isAvailable && (
                  <div className="flex items-center gap-2 text-sm font-medium text-primary-400 group-hover:gap-3 transition-all">
                    Saiba mais
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-text-secondary mb-6">
            Não encontrou o que procura? Desenvolvemos soluções personalizadas para seu negócio.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-pure-white px-6 py-3 rounded-lg text-sm font-light tracking-wide transition-all border border-white/10 hover:border-white/20"
          >
            Falar com especialista
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
