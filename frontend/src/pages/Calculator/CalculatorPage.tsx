import AnimatedSection from '@/components/AnimatedSection';
import ROICalculator from '@/components/calculator/ROICalculator';
import { useNavigate } from 'react-router-dom';

const CalculatorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-20 bg-pure-black">
      <AnimatedSection className="container mx-auto px-4 py-20">
        <ROICalculator />
      </AnimatedSection>
      
      {/* Additional Info Section */}
      <div className="bg-gradient-to-br from-gray-950 via-gray-900/50 to-pure-black py-20">
        <AnimatedSection className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-light text-pure-white mb-4 tracking-wide">
              Métricas Comprovadas
            </h3>
            <p className="text-gray-400 font-light max-w-2xl mx-auto">
              Resultados baseados em análise de mais de 150 implementações bem-sucedidas
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-primary-900/20 to-primary-800/10 backdrop-blur-sm rounded-3xl border border-primary-500/20">
              <div className="text-5xl font-extralight text-primary-400 mb-4">300%</div>
              <div className="text-gray-400 font-light tracking-wide">ROI médio dos clientes</div>
              <div className="text-xs text-gray-500 mt-2 font-light">em 12 meses</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-secondary-900/20 to-secondary-800/10 backdrop-blur-sm rounded-3xl border border-secondary-500/20">
              <div className="text-5xl font-extralight text-secondary-400 mb-4">90</div>
              <div className="text-gray-400 font-light tracking-wide">Dias de payback</div>
              <div className="text-xs text-gray-500 mt-2 font-light">tempo médio</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-900/20 to-green-800/10 backdrop-blur-sm rounded-3xl border border-green-500/20">
              <div className="text-5xl font-extralight text-green-400 mb-4">3x</div>
              <div className="text-gray-400 font-light tracking-wide">Aumento em leads</div>
              <div className="text-xs text-gray-500 mt-2 font-light">qualificados</div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 backdrop-blur-sm rounded-3xl border border-white/10 p-8 max-w-2xl mx-auto">
              <p className="text-gray-300 mb-6 font-light leading-relaxed">
                Quer uma análise personalizada e detalhada baseada nos seus dados reais de vendas?
              </p>
              <button 
                className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-pure-white px-10 py-4 rounded-full font-light text-lg tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                onClick={() => navigate('/contact', { 
                  state: { 
                    subject: 'Consultoria Gratuita ROI - Calculadora SDR AI',
                    message: 'Olá! Usei a calculadora ROI no site e gostaria de agendar uma consultoria gratuita para discutir como implementar SDR AI na minha empresa. Aguardo retorno para definirmos a melhor data e horário.'
                  } 
                })}
              >
                Agendar Consultoria Gratuita
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CalculatorPage;