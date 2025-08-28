import AnimatedSection from '@/components/AnimatedSection';
import SDRSimulator from '@/components/demo/SDRSimulator';

const ProductsPage = () => {
  const products = [
    {
      name: "ROI Labs SDR AI Pro",
      description: "SDR AI completo para qualificação inteligente de prospects e geração de oportunidades.",
      features: ["Qualificação automática", "Engajamento personalizado", "Handoff inteligente"],
      price: "A partir de R$ 4.500/mês",
      core: true
    },
    {
      name: "Lead Intelligence",
      description: "Analytics avançado para insights profundos sobre comportamento de prospects.",
      features: ["Scoring preditivo", "Análise de jornada", "Triggers comportamentais"],
      price: "A partir de R$ 2.500/mês"
    },
    {
      name: "Sales Pipeline AI",
      description: "Otimização completa do funil de vendas com previsibilidade e automação.",
      features: ["Forecast inteligente", "Pipeline automation", "Revenue optimization"],
      price: "A partir de R$ 3.200/mês"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Nossos Produtos
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            SDR AI e soluções complementares para revolucionar sua estratégia de pré-vendas e crescimento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className={`bg-gray-900/50 backdrop-blur-sm border rounded-lg p-6 hover:border-primary-400 transition-all ${
              product.core ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-gray-800'
            }`}>
              {product.core && (
                <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-4 inline-block">
                  CORE BUSINESS
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4 text-primary-400">{product.name}</h3>
              <p className="text-gray-300 mb-6">{product.description}</p>
              
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-400">
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-gray-800 pt-4">
                <p className="text-lg font-semibold text-white">{product.price}</p>
                <button className="w-full mt-3 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded transition-colors">
                  Saiba Mais
                </button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* SDR Simulator Section */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <SDRSimulator />
      </AnimatedSection>
    </div>
  );
};

export default ProductsPage;