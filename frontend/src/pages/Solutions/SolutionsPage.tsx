import AnimatedSection from '@/components/AnimatedSection';
import CaseStudies from '@/components/case-studies/CaseStudies';

const SolutionsPage = () => {
  const solutions = [
    {
      industry: "SaaS B2B",
      title: "SDR AI para SaaS",
      description: "Qualifique prospects enterprise com precisão, identifique pain points e conecte com decisores certos.",
      benefits: ["85% aumento em MQLs", "50% redução no CAC", "300% ROI em pré-vendas"],
      core: true
    },
    {
      industry: "Tech Startups",
      title: "Growth SDR AI", 
      description: "Acelere crescimento com SDR AI que escala conforme demanda, sem overhead de contratação.",
      benefits: ["10x mais prospects qualificados", "60% redução time-to-market", "Growth sustentável"],
      core: true
    },
    {
      industry: "E-commerce",
      title: "Revenue Optimization AI",
      description: "Otimize funil de vendas com analytics preditivos e automação de conversão.",
      benefits: ["35% aumento na conversão", "40% redução no CAC", "Revenue predictability"]
    },
    {
      industry: "Fintechs",
      title: "Compliance-First Sales AI",
      description: "SDR AI que navega regulamentações financeiras enquanto maximiza aquisição de clientes.",
      benefits: ["100% compliance garantido", "3x mais qualified leads", "Risk mitigation"]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            SDR AI por Vertical
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            SDR AI especializado para cada setor, com conhecimento profundo de mercado e estratégias de pré-venda customizadas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className={`bg-gray-900/30 backdrop-blur-sm border rounded-lg p-8 hover:border-primary-400 transition-all ${
              solution.core ? 'border-primary-500/50 ring-1 ring-primary-500/20' : 'border-gray-800'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary-600/20 text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
                  {solution.industry}
                </span>
                {solution.core && (
                  <span className="bg-secondary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    SDR AI CORE
                  </span>
                )}
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

      {/* Case Studies Section */}
      <div className="bg-gray-950 py-20">
        <AnimatedSection>
          <CaseStudies />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SolutionsPage;