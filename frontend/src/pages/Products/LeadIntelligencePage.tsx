import AnimatedSection from '@/components/AnimatedSection';
import { ArrowLeft, CheckCircle, PlayCircle, Brain, TrendingUp, Zap, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LeadIntelligencePage = () => {
  const navigate = useNavigate();

  const handleScheduleDemo = () => {
    navigate('/contact', { 
      state: { 
        subject: 'Demonstração Lead Intelligence - Analytics Avançado',
        message: 'Tenho interesse em ver uma demonstração do Lead Intelligence para entender como pode revelar insights profundos sobre nossos prospects e aumentar nossa taxa de conversão.'
      } 
    });
  };

  const handleViewDashboard = () => {
    navigate('/calculator');
  };
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-secondary-400" />,
      title: "Scoring Preditivo",
      description: "IA analisa 300+ sinais comportamentais para prever propensão de compra com 92% de precisão"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-secondary-400" />,
      title: "Análise de Jornada",
      description: "Mapeia cada touchpoint do prospect para identificar padrões de conversão únicos"
    },
    {
      icon: <Zap className="w-8 h-8 text-secondary-400" />,
      title: "Triggers Comportamentais",
      description: "Detecta momentos de alta intenção de compra para acionamento imediato da equipe"
    },
    {
      icon: <Eye className="w-8 h-8 text-secondary-400" />,
      title: "Insights Profundos",
      description: "Revela insights ocultos sobre prospects que outros sistemas não conseguem capturar"
    }
  ];

  const practicalExamples = [
    {
      scenario: "Agência de Marketing Digital",
      challenge: "Recebia 800+ leads/mês mas apenas 2% convertiam. Precisava identificar quais leads tinham real potencial",
      solution: "Lead Intelligence implementou scoring baseado em: orçamento declarado, urgência do projeto, tamanho da equipe interna, e comportamento no site",
      results: [
        "Taxa de conversão subiu de 2% para 18%",
        "Redução de 75% em leads frios contatados",
        "Aumento de 340% na receita por lead"
      ]
    },
    {
      scenario: "Plataforma de E-learning",
      challenge: "Tinha milhares de usuários freemium mas não sabia quais estavam prontos para upgrade",
      solution: "Análise comportamental identificou 15 padrões de uso que indicavam propensão ao upgrade premium",
      results: [
        "Identificação 89% precisa de leads quentes",
        "Aumento de 220% nas conversões premium",
        "ROI de 580% na primeira campanha"
      ]
    }
  ];

  const intelligenceExample = [
    {
      metric: "Tempo no Site",
      value: "12min 34s",
      insight: "47% acima da média - alta intenção",
      score: "+25 pontos"
    },
    {
      metric: "Páginas Visitadas",
      value: "Pricing → Case Studies → FAQ",
      insight: "Jornada típica de decisor final",
      score: "+35 pontos"
    },
    {
      metric: "Tecnologias Detectadas",
      value: "HubSpot, Salesforce, Intercom",
      insight: "Stack compatível com nossa solução",
      score: "+20 pontos"
    },
    {
      metric: "Empresa",
      value: "500+ funcionários, SaaS, Série B",
      insight: "Fit perfeito com nosso ICP",
      score: "+40 pontos"
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-pure-black via-charcoal to-pure-black">
      {/* Header */}
      <AnimatedSection className="container mx-auto px-4 py-12">
        <Link to="/products" className="inline-flex items-center text-secondary-400 hover:text-secondary-300 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Produtos
        </Link>
        
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-secondary-400 to-primary-400 bg-clip-text text-transparent">
            Lead Intelligence
          </h1>
          <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
            Analytics avançado com IA que revela insights profundos sobre seus prospects. 
            Saiba exatamente quando, como e por que cada lead está pronto para comprar.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleScheduleDemo}
              className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Ver Demonstração
            </button>
            <button 
              onClick={handleViewDashboard}
              className="border border-secondary-400 text-secondary-400 hover:bg-secondary-400/10 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Dashboard ao Vivo
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Inteligência que Transforma Dados em Vendas
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

      {/* Intelligence Dashboard Example */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Análise em Tempo Real
        </h2>
        <p className="text-center text-gray-300 mb-12 text-xl">
          Veja como analisamos um lead em segundos
        </p>
        
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Maria Silva - TechStartup Inc.</h3>
                <p className="text-gray-300">Head of Marketing • Visitou há 2 minutos</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-secondary-400">92</div>
                <div className="text-sm text-gray-300">Lead Score</div>
                <div className="text-green-400 text-sm">🔥 QUENTE</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {intelligenceExample.map((item, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{item.metric}</h4>
                    <span className="text-secondary-400 font-bold">{item.score}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-1">{item.value}</p>
                  <p className="text-secondary-300 text-xs">{item.insight}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-secondary-600/20 border border-secondary-400/30 rounded-lg">
              <div className="flex items-center">
                <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                <div>
                  <p className="font-semibold text-white">Recomendação da IA</p>
                  <p className="text-gray-300 text-sm">Contatar AGORA! Lead demonstra alta intenção e fit perfeito. Sugestão: ligação direta do VP Sales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Practical Examples */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Resultados Comprovados
        </h2>
        
        <div className="grid md:grid-cols-1 gap-12 max-w-6xl mx-auto">
          {practicalExamples.map((example, index) => (
            <div key={index} className="glass-card p-8">
              <div className="flex items-center mb-6">
                <div className="bg-secondary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  SUCCESS STORY {index + 1}
                </div>
                <h3 className="text-2xl font-bold ml-4 text-secondary-400">{example.scenario}</h3>
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

      {/* Features List */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-white">
            O que Você Vai Descobrir sobre seus Leads
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-3">Comportamento</h3>
              <ul className="text-sm text-gray-300 space-y-1 text-left">
                <li>• Tempo gasto no site</li>
                <li>• Páginas mais visitadas</li>
                <li>• Downloads realizados</li>
                <li>• Padrão de navegação</li>
                <li>• Origem do tráfego</li>
              </ul>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-3">Empresa</h3>
              <ul className="text-sm text-gray-300 space-y-1 text-left">
                <li>• Tamanho e faturamento</li>
                <li>• Tecnologias utilizadas</li>
                <li>• Crescimento recente</li>
                <li>• Investidores e funding</li>
                <li>• Concorrentes diretos</li>
              </ul>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-3">Timing</h3>
              <ul className="text-sm text-gray-300 space-y-1 text-left">
                <li>• Momento ideal de contato</li>
                <li>• Urgência do projeto</li>
                <li>• Budget disponível</li>
                <li>• Processo de decisão</li>
                <li>• Influenciadores chave</li>
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Pricing */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Transforme seus Dados em Insights
          </h2>
          <div className="glass-card p-8 mb-8">
            <div className="text-6xl font-bold text-secondary-400 mb-4">R$ 2.500</div>
            <div className="text-xl text-gray-300 mb-6">por mês</div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Análise ilimitada de leads
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Dashboard em tempo real
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Integração com CRM/Marketing
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Relatórios personalizados
              </li>
            </ul>
            <button className="w-full bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              Começar Análise Gratuita
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default LeadIntelligencePage;