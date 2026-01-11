'use client';

import { ArrowRight, Database, RefreshCw, BarChart } from 'lucide-react';
import { RevealOnScroll } from '@/components/animations';

export default function IntegrationSection() {
  return (
    <section className="py-32 px-8 bg-gradient-to-b from-pure-black to-gray-950 relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/5 via-transparent to-transparent" />

      <div className="max-w-content mx-auto relative z-10">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-20">
          <h2 className="text-display font-thin mb-6">
            Tudo conectado.
            <br />
            Tudo sincronizado.
          </h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Uma plataforma integrada onde todos os dados fluem entre sistemas em tempo real.
            Decisões mais rápidas, resultados melhores.
          </p>
        </RevealOnScroll>

        {/* Integration Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Sirius CRM */}
          <RevealOnScroll delay={0.1} direction="left">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-sirius-500/10 border border-sirius-500/20 flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-sirius-400" />
              </div>
              <h3 className="text-h4 font-light mb-2">Sirius CRM</h3>
              <p className="text-sm text-text-muted">Leads e relacionamentos</p>
            </div>
          </RevealOnScroll>

          {/* Hub Central */}
          <RevealOnScroll delay={0.2} className="flex items-center justify-center">
            <div className="glass-card p-12 text-center border-primary-500/30 bg-primary-500/5">
              <RefreshCw className="w-12 h-12 text-primary-400 mx-auto mb-4 animate-spin-slow" />
              <h3 className="text-h3 font-light mb-2">Hub Central</h3>
              <p className="text-sm text-text-secondary">Sincronização em tempo real</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-primary-400">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                <span>Ativo</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Orion ERP */}
          <RevealOnScroll delay={0.3} direction="right">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-orion-500/10 border border-orion-500/20 flex items-center justify-center mx-auto mb-4">
                <BarChart className="w-8 h-8 text-orion-400" />
              </div>
              <h3 className="text-h4 font-light mb-2">Orion ERP</h3>
              <p className="text-sm text-text-muted">Gestão financeira</p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Connection Arrows - Desktop only */}
        <div className="hidden lg:flex items-center justify-center gap-4 mb-16 opacity-50">
          <ArrowRight className="w-6 h-6 text-primary-400" />
          <ArrowRight className="w-6 h-6 text-primary-400" />
          <ArrowRight className="w-6 h-6 text-primary-400" />
          <ArrowRight className="w-6 h-6 text-primary-400 rotate-180" />
          <ArrowRight className="w-6 h-6 text-primary-400 rotate-180" />
          <ArrowRight className="w-6 h-6 text-primary-400 rotate-180" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RevealOnScroll delay={0.4}>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-primary-400 mb-3">
                <Database className="w-6 h-6" />
              </div>
              <h4 className="text-h5 font-light mb-2">Dashboard Único</h4>
              <p className="text-sm text-text-muted">
                Visão 360° do negócio em uma única interface. Dados de todos os sistemas
                consolidados.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.5}>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-primary-400 mb-3">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h4 className="text-h5 font-light mb-2">Sincronização em Tempo Real</h4>
              <p className="text-sm text-text-muted">
                Alterações instantâneas entre sistemas. Sem duplicação de dados, sem erros
                manuais.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.6}>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-primary-400 mb-3">
                <BarChart className="w-6 h-6" />
              </div>
              <h4 className="text-h5 font-light mb-2">Inteligência de Negócio</h4>
              <p className="text-sm text-text-muted">
                Relatórios cruzados e insights automáticos. Decisões baseadas em dados reais.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
