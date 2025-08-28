import AnimatedSection from '@/components/AnimatedSection';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Sobre a ROI Zenith
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Transformamos dados em insights poderosos que impulsionam o crescimento dos negócios.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
            <p className="text-gray-300 mb-6">
              Capacitar empresas com soluções de IA e analytics avançados que desbloqueiam o potencial 
              oculto nos dados, gerando ROI mensurável e vantagem competitiva sustentável.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                Inovação contínua em IA
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                Resultados mensuráveis
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                Parcerias de longo prazo
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
            <p className="text-gray-300">
              Fundada em 2020, a ROI Zenith nasceu da necessidade de democratizar o acesso 
              a insights de dados avançados. Hoje, atendemos mais de 500 empresas globalmente, 
              gerando milhões em ROI adicional através de nossas soluções.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default AboutPage;