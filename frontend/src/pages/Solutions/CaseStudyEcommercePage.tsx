import AnimatedSection from '@/components/AnimatedSection';
import { ArrowLeft, CheckCircle, TrendingUp, ShoppingCart, DollarSign, Clock, Target } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CaseStudyEcommercePage = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact', { 
      state: { 
        subject: 'Interesse em Revenue Optimization AI para E-commerce',
        message: 'Vi o case study da MegaStore Online e tenho interesse em implementar Revenue Optimization AI para nosso e-commerce. Gostaria de entender como vocês podem nos ajudar a otimizar nossa conversão e reduzir CAC.'
      } 
    });
  };

  const metrics = [
    { label: "Aumento na Conversão", value: "+42%", icon: <ShoppingCart className="w-6 h-6" />, color: "text-green-400" },
    { label: "Redução no CAC", value: "-38%", icon: <DollarSign className="w-6 h-6" />, color: "text-blue-400" },
    { label: "Revenue Growth", value: "+156%", icon: <TrendingUp className="w-6 h-6" />, color: "text-purple-400" },
    { label: "Customer LTV", value: "+89%", icon: <Target className="w-6 h-6" />, color: "text-yellow-400" }
  ];

  const challenges = [
    "Alto CAC em campanhas de Facebook e Google Ads sem ROI claro",
    "Baixa taxa de conversão de visitantes para compradores (1.8%)",
    "Carrinho abandonado em 73% dos casos sem recovery efetiva",
    "Dificuldade em segmentar clientes para campanhas personalizadas",
    "Falta de previsibilidade sobre qual produto promover e quando"
  ];

  const solutions = [
    {
      title: "Predictive Customer Scoring",
      description: "IA que analisa comportamento de navegação, histórico de compras e dados demográficos para identificar prospects com maior propensão de compra em tempo real.",
      results: "Aumento de 67% na taxa de conversão de prospects identificados"
    },
    {
      title: "Dynamic Pricing & Promotion Engine",
      description: "Sistema que otimiza preços e promoções automaticamente baseado em demanda, estoque, comportamento do cliente e ações da concorrência.",
      results: "Margem líquida aumentou 23% com vendas 34% maiores"
    },
    {
      title: "Abandoned Cart Recovery AI",
      description: "Automação inteligente que personaliza timing, canal e oferta para recuperar carrinhos abandonados baseado no perfil e comportamento de cada cliente.",
      results: "Recovery de 31% dos carrinhos abandonados vs 8% anterior"
    }
  ];

  const customerJourney = [
    {
      stage: "Awareness",
      before: "Campanhas genéricas com CTR 0.9%",
      after: "Targeting preditivo com CTR 3.4%",
      improvement: "+278%"
    },
    {
      stage: "Interest",
      before: "Email marketing mass com 2.1% conversão",
      after: "Personalização IA com 8.7% conversão", 
      improvement: "+314%"
    },
    {
      stage: "Consideration",
      before: "73% carrinho abandonado sem recovery",
      after: "Recovery inteligente recupera 31%",
      improvement: "+423%"
    },
    {
      stage: "Purchase",
      before: "Taxa conversão 1.8% na landing page",
      after: "Taxa conversão 3.9% com otimização IA",
      improvement: "+117%"
    },
    {
      stage: "Retention",
      before: "15% repeat customers sem upsell",
      after: "42% repeat customers com recomendações IA",
      improvement: "+180%"
    }
  ];

  const analyticsInsights = [
    {
      metric: "Seasonal Demand Prediction",
      insight: "IA identifica padrões sazonais 45 dias antes dos concorrentes",
      action: "Estoque e campanhas ajustados antecipadamente",
      result: "Redução de 60% em stockout durante picos"
    },
    {
      metric: "Customer Segment Intelligence",
      insight: "Identificação automática de 12 personas de alta conversão",
      action: "Campanhas personalizadas por segmento",
      result: "ROAS aumentou de 3.2x para 8.7x"
    },
    {
      metric: "Product Performance Analytics",
      insight: "Predição de produtos que vão 'bombar' 30 dias antes",
      action: "Inventory planning e marketing focus otimizados",
      result: "Margem aumentou 34% focando em winners"
    }
  ];

  const monthlyGrowth = [
    { month: "Mês 1", revenue: "R$ 340k", conversion: "1.8%", cac: "R$ 89", status: "baseline" },
    { month: "Mês 2", revenue: "R$ 395k", conversion: "2.1%", cac: "R$ 82", status: "improving" },
    { month: "Mês 3", revenue: "R$ 467k", conversion: "2.6%", cac: "R$ 74", status: "improving" },
    { month: "Mês 4", revenue: "R$ 548k", conversion: "3.1%", cac: "R$ 65", status: "improving" },
    { month: "Mês 5", revenue: "R$ 634k", conversion: "3.6%", cac: "R$ 58", status: "improving" },
    { month: "Mês 6", revenue: "R$ 741k", conversion: "3.9%", cac: "R$ 55", status: "target" }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-pure-black via-charcoal to-pure-black">
      {/* Header */}
      <AnimatedSection className="container mx-auto px-4 py-12">
        <Link to="/solutions" className="inline-flex items-center text-accent-400 hover:text-accent-300 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Solutions
        </Link>
        
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-accent-600/20 text-accent-400 px-4 py-2 rounded-full font-medium">
              E-commerce
            </span>
            <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              CASE STUDY
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-white">
            MegaStore: Aumento de 156% no Revenue com Optimization AI
          </h1>
          <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
            E-commerce de moda e lifestyle otimiza funil completo com IA, saltando de R$ 340k 
            para R$ 741k mensais em 6 meses com redução de 38% no CAC.
          </p>
        </div>
      </AnimatedSection>

      {/* Company Overview */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Sobre a MegaStore</h2>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                <strong className="text-accent-400">Empresa:</strong> MegaStore Online<br/>
                <strong className="text-accent-400">Setor:</strong> Fashion & Lifestyle E-commerce<br/>
                <strong className="text-accent-400">Fundação:</strong> 2019<br/>
                <strong className="text-accent-400">GMV:</strong> R$ 24M/ano (antes da otimização)
              </p>
              <p className="leading-relaxed">
                E-commerce consolidado com 150+ marcas parceiras, focado no público feminino 25-45 anos, 
                competindo diretamente com grandes players como Dafiti e Zalando.
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

      {/* E-commerce Challenges */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Desafios do E-commerce Moderno
          </h2>
          <div className="glass-card p-8">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              "Estávamos queimando R$ 120k/mês em ads com ROAS de apenas 2.8x. A cada real investido 
              em marketing, só conseguíamos R$ 2,80 de volta. Com iOS 14 e fim dos cookies, 
              nossa capacidade de targeting despencou e o CAC disparou 140% em 8 meses."
            </p>
            <div className="text-right">
              <p className="font-semibold text-accent-400">— Carla Santos, CMO, MegaStore Online</p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6 text-white">Principais Dores do E-commerce:</h3>
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

      {/* Customer Journey Optimization */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Otimização da Jornada do Cliente
        </h2>
        
        <div className="max-w-6xl mx-auto space-y-6">
          {customerJourney.map((stage, index) => (
            <div key={index} className="glass-card p-8">
              <div className="grid lg:grid-cols-4 gap-6 items-center">
                <div>
                  <h3 className="text-xl font-bold text-accent-400 mb-2">{stage.stage}</h3>
                  <div className="text-sm text-gray-400">Etapa da Jornada</div>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-1">❌ Situação Anterior</h4>
                  <p className="text-gray-300 text-sm">{stage.before}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">✅ Com IA</h4>
                  <p className="text-gray-300 text-sm">{stage.after}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{stage.improvement}</div>
                  <div className="text-sm text-gray-400">Melhoria</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Analytics Insights */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Insights de Analytics Preditivos
        </h2>
        
        <div className="grid gap-8 max-w-6xl mx-auto">
          {analyticsInsights.map((insight, index) => (
            <div key={index} className="glass-card p-8">
              <div className="grid lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-accent-400 mb-2">{insight.metric}</h3>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">🔍 Insight</h4>
                  <p className="text-gray-300 text-sm">{insight.insight}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">⚡ Ação</h4>
                  <p className="text-gray-300 text-sm">{insight.action}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">📈 Resultado</h4>
                  <p className="text-green-300 text-sm font-medium">{insight.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Monthly Growth */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Evolução Mensal dos Resultados
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-4">
            {monthlyGrowth.map((data, index) => (
              <div key={index} className={`glass-card p-6 ${
                data.status === 'target' ? 'border-green-400/50 ring-1 ring-green-400/20' :
                data.status === 'improving' ? 'border-yellow-400/30' :
                'border-gray-600/30'
              }`}>
                <div className="grid lg:grid-cols-4 gap-6 items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{data.month}</h3>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{data.revenue}</div>
                    <div className="text-sm text-gray-400">Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{data.conversion}</div>
                    <div className="text-sm text-gray-400">Taxa Conversão</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{data.cac}</div>
                    <div className="text-sm text-gray-400">CAC Médio</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Solution Components */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Componentes da Solução
        </h2>
        
        <div className="grid gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <div key={index} className="glass-card p-8">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-4 text-accent-400">{solution.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{solution.description}</p>
                </div>
                <div>
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

      {/* Final Results */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">Resultados Após 6 Meses</h2>
          
          <div className="glass-card p-8 mb-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">R$ 741k</div>
                <div className="text-gray-300">Revenue Mensal</div>
                <div className="text-sm text-gray-400 mt-1">+156% vs baseline</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">3.9%</div>
                <div className="text-gray-300">Taxa Conversão</div>
                <div className="text-sm text-gray-400 mt-1">+117% improvement</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">R$ 55</div>
                <div className="text-gray-300">CAC Médio</div>
                <div className="text-sm text-gray-400 mt-1">-38% redução</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">8.7x</div>
                <div className="text-gray-300">ROAS</div>
                <div className="text-sm text-gray-400 mt-1">vs 2.8x anterior</div>
              </div>
            </div>

            <div className="bg-accent-600/20 border border-accent-400/30 rounded-lg p-6">
              <p className="text-lg text-white mb-4">
                <strong>"Revenue Optimization AI transformou nosso e-commerce. Agora cada real em marketing 
                gera R$ 8,70 de retorno, e nossa operação se tornou completamente data-driven."</strong>
              </p>
              <p className="text-accent-400">— Carla Santos, CMO, MegaStore Online</p>
            </div>
          </div>

          <button 
            onClick={handleContactUs}
            className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Quero Otimizar Meu E-commerce com IA
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default CaseStudyEcommercePage;