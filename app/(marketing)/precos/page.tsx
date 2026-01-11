import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PricingHero from '@/components/sections/PricingHero';
import PricingPlans from '@/components/sections/PricingPlans';
import PricingComparison from '@/components/sections/PricingComparison';
import PricingFAQ from '@/components/sections/PricingFAQ';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Preços | ROI Labs',
  description:
    'Planos flexíveis para empresas de todos os tamanhos. Escolha a solução ideal para o seu negócio e comece a transformar resultados.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      {/* Hero Section */}
      <PricingHero />

      {/* Pricing Plans */}
      <PricingPlans />

      {/* Feature Comparison Table */}
      <PricingComparison />

      {/* FAQ */}
      <PricingFAQ />

      {/* CTA */}
      <CTASection />

      <Footer />
    </div>
  );
}
