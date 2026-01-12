import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { FadeIn, RevealOnScroll } from '@/components/animations';
import { Badge } from '@/components/ui/badge';
import { Factory, Clock, BarChart2, Cog, CheckCircle2, ArrowRight, Bell } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PCP Industrial - Planejamento e Controle de Produção | ROI Labs',
  description:
    'Sistema completo de PCP para indústrias. Planejamento de produção, controle de qualidade e OEE em tempo real. Em breve.',
};

export default function PCPIndustrialPage() {
  const features = [
    {
      icon: Clock,
      title: 'Planejamento de Produção',
      description:
        'Planeje toda produção com precisão. Sequenciamento inteligente, cálculo de capacidade e simulações de cenários.',
    },
    {
      icon: Cog,
      title: 'Controle de Chão de Fábrica',
      description:
        'Apontamento de produção em tempo real. Controle de setup, paradas, refugos e rastreabilidade completa.',
    },
    {
      icon: BarChart2,
      title: 'OEE e Indicadores',
      description:
        'OEE calculado automaticamente. Dashboards de performance, produtividade e qualidade atualizados em tempo real.',
    },
  ];

  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #c2410c 0%, #0a0a0a 50%, #f97316 100%)',
        }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl opacity-20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn delay={0.2}>
            <Badge className="mb-6 bg-orange-400/20 text-orange-400 border-orange-400/30">
              Em Desenvolvimento
            </Badge>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="inline-flex items-center justify-center p-6 rounded-3xl bg-orange-400/10 border border-orange-400/20 mb-8">
              <Factory className="w-16 h-16 text-orange-400" strokeWidth={1.5} />
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <h1 className="text-5xl md:text-6xl font-thin mb-6 leading-tight">
              PCP Industrial
            </h1>
            <p className="text-2xl text-orange-400 font-light mb-4">
              Produção eficiente e previsível
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
              Sistema completo de Planejamento e Controle de Produção para indústrias que buscam excelência operacional. Reduza setup, elimine desperdícios e aumente OEE.
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="glass-card p-8 max-w-lg mx-auto mb-8">
              <Bell className="w-8 h-8 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Seja avisado no lançamento</h3>
              <p className="text-text-muted mb-6">
                Cadastre-se para receber acesso antecipado e condições especiais
              </p>
              <Link
                href="/contato?interesse=pcp-industrial"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-light tracking-wide transition-all hover:scale-105"
              >
                Quero ser avisado
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-24 md:py-32 px-8 bg-pure-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <h2 className="text-4xl md:text-5xl font-thin mb-4">
                Recursos em desenvolvimento
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Funcionalidades que farão parte do PCP Industrial
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <RevealOnScroll key={index} delay={0.1 * index}>
                  <div className="glass-card p-8 h-full">
                    <div className="w-14 h-14 rounded-xl bg-orange-400/10 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-orange-400" strokeWidth={1.5} />
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

      {/* Why Wait */}
      <section className="py-24 px-8 bg-gradient-to-b from-pure-black to-gray-950">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="glass-card p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-light mb-6">
                Por que se cadastrar agora?
              </h2>
              <ul className="space-y-4 text-left max-w-2xl mx-auto mb-8">
                {[
                  'Acesso antecipado antes do lançamento oficial',
                  'Desconto especial de early adopter (até 30% off)',
                  'Influencie as funcionalidades com seu feedback',
                  'Implementação prioritária e suporte dedicado',
                  'Treinamento presencial sem custo adicional',
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contato?interesse=pcp-industrial"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-light tracking-wide transition-all hover:scale-105"
              >
                Cadastrar interesse
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
