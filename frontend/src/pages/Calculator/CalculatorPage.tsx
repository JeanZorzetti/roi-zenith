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
      <div className="bg-gray-950 py-20">
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
            <div className="text-center p-8 bg-gray-900/50 rounded-2xl border border-gray-700/50">
              <div className="text-4xl font-light text-primary-400 mb-4">300%</div>
              <div className="text-gray-300 font-light">ROI médio dos clientes</div>
              <div className="text-xs text-gray-500 mt-2">em 12 meses</div>
            </div>
            <div className="text-center p-8 bg-gray-900/50 rounded-2xl border border-gray-700/50">
              <div className="text-4xl font-light text-primary-400 mb-4">90</div>
              <div className="text-gray-300 font-light">Dias de payback</div>
              <div className="text-xs text-gray-500 mt-2">tempo médio</div>
            </div>
            <div className="text-center p-8 bg-gray-900/50 rounded-2xl border border-gray-700/50">
              <div className="text-4xl font-light text-primary-400 mb-4">3x</div>
              <div className="text-gray-300 font-light">Aumento em leads</div>
              <div className="text-xs text-gray-500 mt-2">qualificados</div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 p-8 max-w-2xl mx-auto">
              <p className="text-gray-300 mb-6 font-light leading-relaxed">
                Quer uma análise personalizada baseada nos seus dados reais de vendas?
              </p>
              <button 
                className="bg-primary-600 hover:bg-primary-700 text-pure-white px-8 py-3 rounded-lg font-light transition-colors"
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