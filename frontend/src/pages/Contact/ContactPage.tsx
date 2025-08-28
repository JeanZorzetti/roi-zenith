import AnimatedSection from '@/components/AnimatedSection';

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pronto para transformar seus dados em resultados? Vamos conversar sobre suas necessidades.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-primary-400 focus:outline-none text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Empresarial
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-primary-400 focus:outline-none text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-primary-400 focus:outline-none text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-primary-400 focus:outline-none text-white resize-none"
                  placeholder="Conte-nos sobre seu projeto e como podemos ajudar..."
                />
              </div>
              
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors">
                Enviar Mensagem
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Informações de Contato</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-primary-400">Email:</strong><br />
                  contato@roizenith.com
                </p>
                <p>
                  <strong className="text-primary-400">Telefone:</strong><br />
                  +55 (11) 9999-9999
                </p>
                <p>
                  <strong className="text-primary-400">Endereço:</strong><br />
                  Av. Paulista, 1000<br />
                  São Paulo, SP - 01310-100
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Horário de Atendimento</h3>
              <div className="text-gray-300">
                <p>Segunda a Sexta: 9h às 18h</p>
                <p>Sábado: 9h às 12h</p>
                <p>Domingo: Fechado</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ContactPage;