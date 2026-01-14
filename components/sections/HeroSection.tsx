'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import { FadeIn } from '@/components/animations';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Create particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
      }
    }

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroContent = document.querySelector('.hero-content');
      const particles = document.querySelector('#particles');

      if (heroContent) {
        (heroContent as HTMLElement).style.transform = `translateY(${scrolled * 0.5}px)`;
        (heroContent as HTMLElement).style.opacity = String(1 - (scrolled / 800));
      }

      if (particles) {
        (particles as HTMLElement).style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToProduct = () => {
    const element = document.querySelector('#produto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-pure-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-ai-visualization.jpg"
          alt="AI Visualization"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pure-black/60 via-transparent to-pure-black/80" />
      </div>

      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent" />

      {/* Particles */}
      <div id="particles" className="absolute inset-0 overflow-hidden" />

      {/* Hero Content */}
      <div className="hero-content relative z-10 text-center max-w-6xl px-8">
        {/* Badge */}
        <FadeIn delay={0.3}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-text-secondary">
              500+ empresas transformadas
            </span>
          </div>
        </FadeIn>

        {/* Main Heading */}
        <FadeIn delay={0.5}>
          <h1 className="text-display font-thin mb-6">
            Inteligência Artificial
            <br />
            para gestão empresarial
          </h1>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.7}>
          <p className="text-subtitle text-text-secondary mb-12 max-w-3xl mx-auto">
            Plataforma completa com <span className="text-primary-400 font-medium">IA integrada</span> em CRM, ERP e Marketing.
            Automatize processos, preveja resultados e tome decisões mais inteligentes.
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.9}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="/contato"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-light tracking-wide transition-all hover:scale-105 shadow-glow"
            >
              Começar teste grátis
              <ArrowRight className="w-5 h-5" />
            </a>
            <button
              onClick={handleScrollToProduct}
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-pure-white px-8 py-4 rounded-lg text-lg font-light tracking-wide transition-all border border-white/10 hover:border-white/20"
            >
              <Play className="w-5 h-5" />
              Ver demonstração
            </button>
          </div>
        </FadeIn>

        {/* Trust Indicators */}
        <FadeIn delay={1.1}>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <span className="text-primary-400 font-medium">✓</span>
              Teste grátis 14 dias
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-400 font-medium">✓</span>
              Sem cartão de crédito
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-400 font-medium">✓</span>
              Suporte em português
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <FadeIn delay={1.3}>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-text-tertiary relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full h-1/3 bg-white animate-pulse"
                style={{
                  animation: 'scrollDown 2s infinite ease-in-out',
                  animationDelay: '1.5s'
                }}
              />
            </div>
            <ChevronDown className="w-4 h-4 text-text-tertiary animate-bounce" />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
