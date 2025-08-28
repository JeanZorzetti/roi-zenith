import AnimatedSection from '@/components/AnimatedSection';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Sobre a ROI Labs
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Revolucionamos a pré-venda com IA especializada em SDR, transformando prospects em oportunidades qualificadas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
            <p className="text-gray-300 mb-6">
              Revolucionar o processo de pré-venda através de SDR AI que qualifica prospects com precisão 
              cirúrgica, aumentando conversão e reduzindo custos de aquisição de clientes.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                SDR AI de alta performance
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                Qualificação inteligente de leads
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                ROI comprovado em pré-vendas
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
            <p className="text-gray-300">
              Fundada em 2020, a ROI Labs nasceu da frustração com processos de pré-venda ineficientes. 
              Desenvolvemos o primeiro SDR AI que realmente entende negócios. Hoje, nossos SDR AI qualificam 
              milhares de prospects diariamente, gerando 300%+ de ROI para mais de 200 empresas.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default AboutPage;