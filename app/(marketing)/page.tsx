'use client';

import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ProductShowcase from '@/components/sections/ProductShowcase';
import FeaturesSection from '@/components/sections/FeaturesSection';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';
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
