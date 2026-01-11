import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import AboutHero from '@/components/sections/AboutHero';
import AboutStory from '@/components/sections/AboutStory';
import AboutValues from '@/components/sections/AboutValues';
import AboutStats from '@/components/sections/AboutStats';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Sobre | ROI Labs',
  description:
    'Conheça a ROI Labs. Estamos transformando a gestão empresarial com tecnologia inteligente e integrada.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      {/* Hero */}
      <AboutHero />

      {/* Nossa História */}
      <AboutStory />

      {/* Nossos Valores */}
      <AboutValues />

      {/* Números e Conquistas */}
      <AboutStats />

      {/* CTA */}
      <CTASection />

      <Footer />
    </div>
  );
}
