import AnimatedSection from '@/components/AnimatedSection';

const ProductsPage = () => {
  const products = [
    {
      name: "ROI Analytics Pro",
      description: "Plataforma completa de analytics com IA integrada para insights em tempo real.",
      features: ["Dashboards personalizáveis", "ML automatizado", "Alertas inteligentes"],
      price: "A partir de R$ 2.500/mês"
    },
    {
      name: "Zenith Predictor",
      description: "Modelos preditivos avançados para forecasting e análise de tendências.",
      features: ["Previsões precisas", "Análise de cenários", "Integração API"],
      price: "A partir de R$ 4.000/mês"
    },
    {
      name: "Data Pipeline Suite",
      description: "Solução completa para ETL, processamento e governança de dados.",
      features: ["Automação total", "Monitoramento 24/7", "Compliance LGPD"],
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
            Soluções completas de IA e Analytics para transformar seus dados em vantagem competitiva.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-primary-400 transition-all">
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
    </div>
  );
};

export default ProductsPage;