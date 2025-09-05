import AnimatedSection from '@/components/AnimatedSection';
import { ArrowLeft, CheckCircle, PlayCircle, BarChart3, MessageSquare, Target, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SDRProPage = () => {
  const navigate = useNavigate();

  const handleScheduleDemo = () => {
    navigate('/contact', { 
      state: { 
        subject: 'Demonstração ROI Labs SDR AI Pro',
        message: 'Tenho interesse em ver uma demonstração completa do ROI Labs SDR AI Pro. Gostaria de entender como pode qualificar nossos prospects automaticamente e aumentar nossa taxa de conversão.'
      } 
    });
  };

  const handleWatchDemo = () => {
    navigate('/calculator');
  };
  const features = [
    {
      icon: <Target className="w-8 h-8 text-primary-400" />,
      title: "Qualificação Automática",
      description: "IA identifica prospects qualificados com 94% de precisão usando 200+ pontos de dados"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary-400" />,
      title: "Engajamento Personalizado",
      description: "Mensagens contextuais baseadas no perfil, empresa e momento de compra do prospect"
    },
    {
      icon: <Users className="w-8 h-8 text-primary-400" />,
      title: "Handoff Inteligente",
      description: "Transição suave para vendedores com todo o contexto e histórico da conversa"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary-400" />,
      title: "Analytics Avançado",
      description: "Dashboards em tempo real com métricas de performance e ROI detalhado"
    }
  ];

  const practicalExamples = [
    {
      scenario: "E-commerce B2B",
      challenge: "Empresa com 50.000+ leads mensais precisava qualificar apenas os com potencial >R$50k/ano",
      solution: "ROI Labs SDR AI implementou scoring baseado em: tamanho da empresa, cargo do prospect, tecnologias usadas, e comportamento no site",
      results: [
        "Aumento de 340% na taxa de conversão lead → oportunidade",
        "Redução de 60% no tempo de qualificação",
        "ROI de 450% em 6 meses"
      ]
    },
    {
      scenario: "SaaS Enterprise",
      challenge: "Startup B2B precisava escalar de 10 para 100 reuniões qualificadas/mês sem contratar SDRs",
      solution: "SDR AI configurado para identificar empresas em expansão, decisores técnicos, e timing de renovação de contratos existentes",
      results: [
        "Escala de 10x em reuniões qualificadas",
        "Custo por lead qualificado 70% menor",
        "Ciclo de vendas reduzido em 25%"
      ]
    }
  ];

  const demoConversation = [
    { type: 'ai', message: 'Olá João! Vi que você baixou nosso e-book sobre automação de processos. Como gestor de TI da TechCorp, imagino que vocês estejam buscando otimizar operações. É isso mesmo?' },
    { type: 'prospect', message: 'Sim, estamos avaliando algumas opções. Nosso time está sobrecarregado.' },
    { type: 'ai', message: 'Entendo perfeitamente. Vejo que a TechCorp cresceu 60% no último ano (parabéns!). Empresas nessa fase geralmente enfrentam gargalos similares. Posso te mostrar como outras empresas de tecnologia resolveram isso em 30 dias. Teria 15min na terça às 14h?' },
    { type: 'prospect', message: 'Terça às 14h funciona. Pode agendar.' },
    { type: 'ai', message: 'Perfeito! Agendei e enviei os detalhes por email. Vou conectar você com nossa especialista Sarah, que já ajudou +50 empresas de tech a automatizar processos críticos. Até terça!' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-pure-black via-charcoal to-pure-black">
      {/* Header */}
      <AnimatedSection className="container mx-auto px-4 py-12">
        <Link to="/products" className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Produtos
        </Link>
        
        <div className="max-w-4xl">
          <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block">
            PRODUTO PRINCIPAL
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            ROI Labs SDR AI Pro
          </h1>
          <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
            O SDR AI mais avançado do mercado brasileiro. Qualificação inteligente de prospects, 
            engajamento personalizado e geração de oportunidades no piloto automático.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleScheduleDemo}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Agendar Demonstração
            </button>
            <button 
              onClick={handleWatchDemo}
              className="border border-primary-400 text-primary-400 hover:bg-primary-400/10 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Ver Demo ao Vivo
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Como Funciona na Prática
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-8">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Demo Conversation */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Exemplo de Conversa Real
        </h2>
        <p className="text-center text-gray-300 mb-12 text-xl">
          Veja como o SDR AI converte um lead frio em reunião agendada
        </p>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8">
            <div className="space-y-6">
              {demoConversation.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'prospect' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.type === 'prospect' 
                      ? 'bg-white text-charcoal' 
                      : 'bg-primary-600/20 border border-primary-400/30 text-white'
                  }`}>
                    <div className="text-sm font-medium mb-2 opacity-75">
                      {msg.type === 'prospect' ? 'João Silva - TechCorp' : 'ROI Labs SDR AI'}
                    </div>
                    <p className="leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Practical Examples */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Cases de Sucesso Reais
        </h2>
        
        <div className="grid md:grid-cols-1 gap-12 max-w-6xl mx-auto">
          {practicalExamples.map((example, index) => (
            <div key={index} className="glass-card p-8">
              <div className="flex items-center mb-6">
                <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  CASE {index + 1}
                </div>
                <h3 className="text-2xl font-bold ml-4 text-primary-400">{example.scenario}</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">Desafio</h4>
                  <p className="text-gray-300 leading-relaxed">{example.challenge}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">Solução</h4>
                  <p className="text-gray-300 leading-relaxed">{example.solution}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">Resultados</h4>
                  <ul className="space-y-2">
                    {example.results.map((result, idx) => (
                      <li key={idx} className="flex items-start text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Pricing */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Comece sua Transformação Hoje
          </h2>
          <div className="glass-card p-8 mb-8">
            <div className="text-6xl font-bold text-primary-400 mb-4">R$ 4.500</div>
            <div className="text-xl text-gray-300 mb-6">por mês</div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Qualificação ilimitada de prospects
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Engajamento personalizado 24/7
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Dashboard analytics completo
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Suporte técnico dedicado
              </li>
            </ul>
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              Iniciar Teste Gratuito de 14 Dias
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default SDRProPage;