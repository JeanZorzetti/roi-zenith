import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { FadeIn, RevealOnScroll } from '@/components/animations';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, FileCheck, BarChart, CheckCircle2, ArrowRight, Bell } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'BPO Financeiro - Terceirização de Processos Financeiros | ROI Labs',
  description:
    'Terceirize contas a pagar/receber, conciliação bancária e relatórios fiscais. Foque no seu negócio enquanto cuidamos do financeiro. Em breve.',
};

export default function BPOFinanceiroPage() {
  const features = [
    {
      icon: DollarSign,
      title: 'Contas a Pagar e Receber',
      description:
        'Gestão completa do fluxo de caixa. Pagamentos, cobranças, conciliação e relatórios automatizados.',
    },
    {
      icon: FileCheck,
      title: 'Conciliação Bancária',
      description:
        'Conciliação automática de extratos. Integração bancária via Open Finance para reconciliação em tempo real.',
    },
    {
      icon: BarChart,
      title: 'Relatórios Fiscais',
      description:
        'Compliance tributário garantido. SPED, EFD, DCTF e todas obrigações acessórias geradas automaticamente.',
    },
  ];

  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #854d0e 0%, #0a0a0a 50%, #eab308 100%)',
        }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-600 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn delay={0.2}>
            <Badge className="mb-6 bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
              Em Desenvolvimento
            </Badge>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="inline-flex items-center justify-center p-6 rounded-3xl bg-yellow-400/10 border border-yellow-400/20 mb-8">
              <Calculator className="w-16 h-16 text-yellow-400" strokeWidth={1.5} />
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <h1 className="text-5xl md:text-6xl font-thin mb-6 leading-tight">
              BPO Financeiro
            </h1>
            <p className="text-2xl text-yellow-400 font-light mb-4">
              Foco no que realmente importa
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
              Terceirize sua rotina financeira com especialistas. Contas a pagar/receber, conciliação bancária e compliance fiscal. Você foca em crescer, nós cuidamos do resto.
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="glass-card p-8 max-w-lg mx-auto mb-8">
              <Bell className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Seja avisado no lançamento</h3>
              <p className="text-text-muted mb-6">
                Cadastre-se para receber acesso antecipado e condições especiais
              </p>
              <Link
                href="/contato?interesse=bpo-financeiro"
                className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-pure-black px-8 py-4 rounded-lg text-lg font-medium tracking-wide transition-all hover:scale-105"
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
                Serviços em desenvolvimento
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                O que faremos por você no BPO Financeiro
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <RevealOnScroll key={index} delay={0.1 * index}>
                  <div className="glass-card p-8 h-full">
                    <div className="w-14 h-14 rounded-xl bg-yellow-400/10 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-yellow-400" strokeWidth={1.5} />
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
                  'Desconto de 40% nos primeiros 6 meses',
                  'Migração e setup sem custo adicional',
                  'Equipe dedicada para sua empresa',
                  'SLA garantido e atendimento prioritário',
                  'Consultoria financeira incluída no plano',
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contato?interesse=bpo-financeiro"
                className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-pure-black px-8 py-4 rounded-lg text-lg font-medium tracking-wide transition-all hover:scale-105"
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
