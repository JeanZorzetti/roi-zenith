import { useNavigate } from 'react-router-dom';
import AnimatedSection from '@/components/AnimatedSection';

const ResourcesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-20">
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Recursos
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conteúdos, documentação e recursos para maximizar o valor das suas implementações de IA.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-primary-400">Blog</h3>
            <p className="text-gray-300 mb-4">
              Insights sobre tendências em IA, cases de sucesso e melhores práticas.
            </p>
            <button 
              className="text-primary-400 hover:text-primary-300 font-light transition-colors"
              onClick={() => navigate('/resources/blog')}
            >
              Ver artigos →
            </button>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-primary-400">Documentação</h3>
            <p className="text-gray-300 mb-4">
              Guias técnicos, APIs e tutoriais para desenvolvedores.
            </p>
            <button className="text-primary-400 hover:text-primary-300">
              Acessar docs →
            </button>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-primary-400">Whitepapers</h3>
            <p className="text-gray-300 mb-4">
              Estudos aprofundados sobre ROI em IA e transformação digital.
            </p>
            <button className="text-primary-400 hover:text-primary-300">
              Download gratuito →
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ResourcesPage;