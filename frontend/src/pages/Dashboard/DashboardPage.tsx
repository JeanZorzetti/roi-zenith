import AnimatedSection from '@/components/AnimatedSection';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <div className="container mx-auto px-4 py-20">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-xl text-gray-300">
              Área restrita - Em desenvolvimento
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-gray-400">Métricas em tempo real</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Relatórios</h3>
              <p className="text-gray-400">Insights personalizados</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Configurações</h3>
              <p className="text-gray-400">Personalize sua experiência</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default DashboardPage;