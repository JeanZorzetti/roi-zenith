import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import LoadingScreen from '@/components/LoadingScreen';
import SDRTestimonials from '@/components/testimonials/SDRTestimonials';
import AnimatedSection from '@/components/AnimatedSection';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <HeroSection />
      <ProductShowcase />
      <FeaturesSection />
      <StatsSection />
      
      {/* New SDR Testimonials */}
      <AnimatedSection className="py-20 bg-gray-950">
        <SDRTestimonials />
      </AnimatedSection>
      
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default HomePage;