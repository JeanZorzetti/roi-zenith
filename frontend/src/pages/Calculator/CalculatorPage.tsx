import AnimatedSection from '@/components/AnimatedSection';
import ROICalculator from '@/components/calculator/ROICalculator';

const CalculatorPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-pure-black">
      <AnimatedSection className="container mx-auto px-4 py-20">
        <ROICalculator />
      </AnimatedSection>
      
      {/* Additional Info Section */}
      <div className="bg-gray-950 py-16">
        <AnimatedSection className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-primary-400 mb-2">300%</div>
              <div className="text-sm text-gray-400">ROI médio dos clientes</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-secondary-400 mb-2">90 dias</div>
              <div className="text-sm text-gray-400">Tempo médio de payback</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">3x</div>
              <div className="text-sm text-gray-400">Aumento médio em leads</div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">
              Quer uma análise personalizada baseada nos seus dados reais?
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Agendar Consultoria Gratuita
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CalculatorPage;