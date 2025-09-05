import AnimatedSection from '@/components/AnimatedSection';
import { ArrowLeft, CheckCircle, TrendingUp, Users, DollarSign, Clock, Target } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CaseStudySaasPage = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact', { 
      state: { 
        subject: 'Interesse em SDR AI para SaaS B2B',
        message: 'Vi o case study da TechFlow SaaS e tenho interesse em implementar uma solução similar para nossa empresa SaaS. Gostaria de entender como vocês podem nos ajudar a qualificar prospects enterprise e aumentar nossos MQLs.'
      } 
    });
  };

  const metrics = [
    { label: "Aumento em MQLs", value: "+385%", icon: <TrendingUp className="w-6 h-6" />, color: "text-green-400" },
    { label: "Redução no CAC", value: "-52%", icon: <DollarSign className="w-6 h-6" />, color: "text-blue-400" },
    { label: "ROI em Pré-vendas", value: "310%", icon: <Target className="w-6 h-6" />, color: "text-purple-400" },
    { label: "Time to Value", value: "45 dias", icon: <Clock className="w-6 h-6" />, color: "text-yellow-400" }
  ];

  const challenges = [
    "Prospects enterprise com ciclos de decisão longos e complexos",
    "Dificuldade em identificar pain points específicos de cada vertical",
    "Baixa taxa de conversão de leads para oportunidades qualificadas",
    "Equipe de SDR sobrecarregada com leads de baixa qualidade",
    "Falta de personalização nas abordagens para diferentes stakeholders"
  ];

  const solutions = [
    {
      title: "Qualificação Inteligente por Vertical",
      description: "IA especializada que identifica empresas SaaS em crescimento, analisa stack tecnológico e mapeia necessidades específicas de cada vertical.",
      results: "Aumento de 280% na precisão da qualificação"
    },
    {
      title: "Personalization Engine",
      description: "Sistema que cria mensagens personalizadas baseadas no cargo, empresa, pain points identificados e momento de compra do prospect.",
      results: "Taxa de resposta subiu de 2.3% para 18.7%"
    },
    {
      title: "Enterprise Decision Mapping",
      description: "Mapeamento automático de stakeholders e influenciadores dentro da empresa prospect, identificando o melhor ponto de entrada.",
      results: "Redução de 60% no tempo até primeira reunião"
    }
  ];

  const timeline = [
    { period: "Semana 1-2", activity: "Setup e integração com CRM/Marketing Stack", status: "completed" },
    { period: "Semana 3-4", activity: "Treinamento da IA com dados históricos da empresa", status: "completed" },
    { period: "Semana 5-6", activity: "Testes A/B e otimização das mensagens", status: "completed" },
    { period: "Semana 7-8", activity: "Go-live e monitoramento de performance", status: "completed" },
    { period: "Mês 3+", activity: "Otimização contínua e expansão para novos segmentos", status: "ongoing" }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-pure-black via-charcoal to-pure-black">
      {/* Header */}
      <AnimatedSection className="container mx-auto px-4 py-12">
        <Link to="/solutions" className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Solutions
        </Link>
        
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary-600/20 text-primary-400 px-4 py-2 rounded-full font-medium">
              SaaS B2B
            </span>
            <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              CASE STUDY
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-white">
            Como a TechFlow SaaS Aumentou MQLs em 385% com SDR AI
          </h1>
          <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
            Startup SaaS B2B especializada em ferramentas de produtividade para equipes remotas 
            escala de 50 para 500+ MQLs mensais sem aumentar headcount de SDR.
          </p>
        </div>
      </AnimatedSection>

      {/* Company Overview */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Sobre a TechFlow</h2>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                <strong className="text-primary-400">Empresa:</strong> TechFlow SaaS<br/>
                <strong className="text-primary-400">Setor:</strong> Productivity Software<br/>
                <strong className="text-primary-400">Tamanho:</strong> 45 funcionários<br/>
                <strong className="text-primary-400">Target:</strong> PMEs e Mid-market (50-500 funcionários)
              </p>
              <p className="leading-relaxed">
                A TechFlow oferece uma plataforma integrada de produtividade para equipes remotas, 
                competindo diretamente com Slack, Asana e Notion em um mercado altamente competitivo.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <div className={`mb-3 ${metric.color}`}>
                  {metric.icon}
                </div>
                <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-300">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Challenge */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            O Desafio
          </h2>
          <div className="glass-card p-8">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              "Estávamos gerando muito tráfego no site e leads através de conteúdo, mas nossa taxa de conversão 
              para oportunidades estava em apenas 3%. Nossa equipe de 2 SDRs estava sobrecarregada tentando 
              qualificar centenas de leads mensais, e 90% não tinham fit real com nosso produto."
            </p>
            <div className="text-right">
              <p className="font-semibold text-primary-400">— Sarah Chen, VP of Sales, TechFlow</p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6 text-white">Principais Desafios:</h3>
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-4 mt-2"></div>
                    <p className="text-gray-300">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Solution */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Nossa Solução
        </h2>
        
        <div className="grid gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <div key={index} className="glass-card p-8">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary-400">{solution.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{solution.description}</p>
                </div>
                <div className="lg:col-span-1">
                  <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4 text-center">
                    <div className="text-green-400 font-semibold">Resultado</div>
                    <div className="text-white font-bold mt-1">{solution.results}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Implementation Timeline */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Timeline de Implementação
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-center mb-8">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-6 ${
                item.status === 'completed' ? 'bg-green-400 border-green-400' :
                item.status === 'ongoing' ? 'bg-yellow-400 border-yellow-400' :
                'bg-gray-600 border-gray-600'
              }`}>
                {item.status === 'completed' && <CheckCircle className="w-5 h-5 text-white" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{item.period}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    item.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                    item.status === 'ongoing' ? 'bg-yellow-600/20 text-yellow-400' :
                    'bg-gray-600/20 text-gray-400'
                  }`}>
                    {item.status === 'completed' ? 'Concluído' :
                     item.status === 'ongoing' ? 'Em andamento' : 'Pendente'}
                  </span>
                </div>
                <p className="text-gray-300 mt-1">{item.activity}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Results */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">Resultados Após 6 Meses</h2>
          
          <div className="glass-card p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">385%</div>
                <div className="text-gray-300">Aumento em MQLs qualificados</div>
                <div className="text-sm text-gray-400 mt-1">De 50 para 242 MQLs/mês</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">52%</div>
                <div className="text-gray-300">Redução no CAC</div>
                <div className="text-sm text-gray-400 mt-1">De R$ 840 para R$ 403</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">310%</div>
                <div className="text-gray-300">ROI em Pré-vendas</div>
                <div className="text-sm text-gray-400 mt-1">Investimento pago em 3.2 meses</div>
              </div>
            </div>

            <div className="bg-primary-600/20 border border-primary-400/30 rounded-lg p-6">
              <p className="text-lg text-white mb-4">
                <strong>"O ROI Labs SDR AI transformou completamente nossa operação de pré-vendas. 
                Conseguimos escalar 5x sem contratar um único SDR adicional."</strong>
              </p>
              <p className="text-primary-400">— Sarah Chen, VP of Sales, TechFlow SaaS</p>
            </div>
          </div>

          <button 
            onClick={handleContactUs}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Quero Resultados Similares para Minha SaaS
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default CaseStudySaasPage;