import AnimatedSection from '@/components/AnimatedSection';

const SolutionsPage = () => {
  const solutions = [
    {
      industry: "E-commerce",
      title: "Otimização de Conversão",
      description: "Aumente suas vendas com análise preditiva de comportamento do cliente e otimização de funil.",
      benefits: ["35% aumento na conversão", "Redução de 40% no CAC", "ROI de 300% em 6 meses"]
    },
    {
      industry: "Fintech",
      title: "Risk & Fraud Detection", 
      description: "Detecte fraudes em tempo real e otimize modelos de risco com machine learning avançado.",
      benefits: ["99.7% precisão na detecção", "Redução de 60% em perdas", "Compliance automatizado"]
    },
    {
      industry: "SaaS",
      title: "Customer Success Analytics",
      description: "Previna churn e maximize LTV com insights profundos sobre saúde do cliente.",
      benefits: ["45% redução no churn", "25% aumento no LTV", "NPS 15 pontos maior"]
    },
    {
      industry: "Manufatura",
      title: "Predictive Maintenance",
      description: "Reduza downtime e custos operacionais com manutenção preditiva baseada em IoT.",
      benefits: ["70% menos downtime", "30% redução em custos", "Eficiência 25% maior"]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Soluções por Vertical
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluções especializadas para diferentes indústrias, adaptadas aos desafios específicos do seu setor.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-lg p-8 hover:border-primary-400 transition-all">
              <div className="flex items-center mb-4">
                <span className="bg-primary-600/20 text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
                  {solution.industry}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">{solution.title}</h3>
              <p className="text-gray-300 mb-6">{solution.description}</p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-primary-400">Resultados Típicos:</h4>
                {solution.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded transition-colors">
                Ver Case Study
              </button>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default SolutionsPage;