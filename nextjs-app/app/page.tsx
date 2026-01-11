'use client';

import { useState } from 'react';
import Navigation from '@/components/custom/Navigation';
import HeroSection from '@/components/custom/HeroSection';
import ProductShowcase from '@/components/custom/ProductShowcase';
import FeaturesSection from '@/components/custom/FeaturesSection';
import StatsSection from '@/components/custom/StatsSection';
import TestimonialsSection from '@/components/custom/TestimonialsSection';
import CTASection from '@/components/custom/CTASection';
import Footer from '@/components/custom/Footer';
import CustomCursor from '@/components/custom/CustomCursor';
import LoadingScreen from '@/components/custom/LoadingScreen';
import EasterEgg from '@/components/custom/EasterEgg';

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-pure-black text-pure-white overflow-x-hidden">
      <CustomCursor />
      <EasterEgg />
      <Navigation />
      <HeroSection />
      <ProductShowcase />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
