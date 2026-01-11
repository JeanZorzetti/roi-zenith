'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      {/* Particles */}
      <div id="particles" className="absolute inset-0 overflow-hidden" />
      
      {/* Hero Content */}
      <div className="hero-content relative z-10 text-center max-w-6xl px-8">
        <h1 className="text-hero mb-8">
          <span className={`block ${mounted ? 'fade-in-up visible' : 'fade-in-up'}`} style={{ animationDelay: '0.5s' }}>
            SDR AI.
          </span>
          <span className={`block ${mounted ? 'fade-in-up visible' : 'fade-in-up'}`} style={{ animationDelay: '1s' }}>
            Revolucionário.
          </span>
          <span className={`block ${mounted ? 'fade-in-up visible' : 'fade-in-up'}`} style={{ animationDelay: '1.5s' }}>
            Resultados.
          </span>
        </h1>
        
        <p className={`text-xl md:text-2xl font-light text-text-secondary mb-12 ${mounted ? 'fade-in-up visible' : 'fade-in-up'}`} 
           style={{ animationDelay: '2s' }}>
          Transforme prospects em oportunidades com Inteligência Artificial de pré-vendas.
        </p>
        
        <Button
          onClick={handleScrollToProduct}
          variant="premium"
          size="lg"
          className={`text-lg px-12 py-4 ${mounted ? 'fade-in-up visible' : 'fade-in-up'}`}
          style={{ animationDelay: '2.5s' }}
        >
          Ver SDR AI em ação
        </Button>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 ${mounted ? 'fade-in-up visible' : 'fade-in-up'}`} 
           style={{ animationDelay: '3s' }}>
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-text-tertiary relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-white animate-pulse" 
                 style={{ 
                   animation: 'scrollDown 2s infinite ease-in-out',
                   animationDelay: '3s'
                 }} />
          </div>
          <ChevronDown className="w-4 h-4 text-text-tertiary animate-bounce" />
        </div>
      </div>

    </section>
  );
}