import AnimatedSection from '@/components/AnimatedSection';
import { ArrowLeft, CheckCircle, TrendingUp, Users, DollarSign, Clock, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CaseStudyStartupPage = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact', { 
      state: { 
        subject: 'Interesse em Growth SDR AI para Tech Startup',
        message: 'Vi o case study da InnovateTech e tenho interesse em implementar uma solução de Growth SDR AI para nossa startup. Gostaria de entender como vocês podem nos ajudar a escalar rapidamente sem overhead de contratação.'
      } 
    });
  };

  const metrics = [
    { label: "Prospects Qualificados", value: "12x", icon: <TrendingUp className="w-6 h-6" />, color: "text-green-400" },
    { label: "Redução Time-to-Market", value: "-65%", icon: <Clock className="w-6 h-6" />, color: "text-blue-400" },
    { label: "Growth MRR", value: "+890%", icon: <DollarSign className="w-6 h-6" />, color: "text-purple-400" },
    { label: "Team Efficiency", value: "+340%", icon: <Zap className="w-6 h-6" />, color: "text-yellow-400" }
  ];

  const challenges = [
    "Necessidade de crescer rapidamente com recursos limitados",
    "Equipe pequena sem experiência em vendas enterprise",
    "Pressão de investidores para acelerar revenue growth",
    "Concorrência com players estabelecidos no mercado",
    "Dificuldade em identificar product-market fit para diferentes segmentos"
  ];

  const solutions = [
    {
      title: "Rapid Scale SDR Engine",
      description: "Sistema que multiplica capacidade da equipe, funcionando 24/7 para identificar, qualificar e nutrir prospects enquanto o time foca em fechar deals.",
      results: "10x mais prospects qualificados por mês"
    },
    {
      title: "Market Intelligence AI",
      description: "IA que analisa competidores, identifica gaps de mercado e sugere estratégias de posicionamento baseadas em dados de milhares de startups.",
      results: "Identificação de 3 novos segmentos lucrativos"
    },
    {
      title: "Growth Automation Stack",
      description: "Automação completa desde lead capture até handoff para vendas, com otimização contínua baseada em performance e feedback do time.",
      results: "Redução de 80% no tempo manual de qualificação"
    }
  ];

  const growthStages = [
    { 
      stage: "Pre-Seed (Mês 1-2)", 
      focus: "Validação de mercado", 
      results: "150 prospects validados, 12 early adopters",
      status: "completed" 
    },
    { 
      stage: "Seed (Mês 3-6)", 
      focus: "Product-market fit", 
      results: "500+ prospects qualificados, $50k MRR",
      status: "completed" 
    },
    { 
      stage: "Series A (Mês 7-12)", 
      focus: "Scale & expansion", 
      results: "2000+ prospects/mês, $200k MRR",
      status: "completed" 
    },
    { 
      stage: "Growth (Mês 13+)", 
      focus: "Market leadership", 
      results: "5000+ prospects/mês, $500k MRR",
      status: "ongoing" 
    }
  ];

  const competitiveAdvantages = [
    {
      advantage: "Speed to Market",
      before: "6-12 meses para contratar e treinar SDRs",
      after: "2 semanas para estar operacional com SDR AI",
      impact: "8x mais rápido"
    },
    {
      advantage: "Custo Operacional",
      before: "R$ 15k/mês por SDR (salário + benefícios + treinamento)",
      after: "R$ 4k/mês por capacidade equivalente a 3 SDRs",
      impact: "75% economia"
    },
    {
      advantage: "Escalabilidade",
      before: "Crescimento linear limitado por contratações",
      after: "Crescimento exponencial sem limitações de headcount",
      impact: "Crescimento ilimitado"
    }
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
            <span className="bg-secondary-600/20 text-secondary-400 px-4 py-2 rounded-full font-medium">
              Tech Startup
            </span>
            <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              CASE STUDY
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-white">
            InnovateTech: De Zero a $500k MRR em 18 Meses com Growth SDR AI
          </h1>
          <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
            Startup de ML/AI para fintechs consegue crescimento sustentável e previsível, 
            escalando de 0 para 5000+ prospects qualificados mensais sem contratar um único SDR.
          </p>
        </div>
      </AnimatedSection>

      {/* Company Overview */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Sobre a InnovateTech</h2>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                <strong className="text-secondary-400">Empresa:</strong> InnovateTech AI<br/>
                <strong className="text-secondary-400">Setor:</strong> Machine Learning for Fintech<br/>
                <strong className="text-secondary-400">Fundação:</strong> 2023<br/>
                <strong className="text-secondary-400">Funding:</strong> Seed $2M (Sequoia, Andreessen)
              </p>
              <p className="leading-relaxed">
                A InnovateTech desenvolve soluções de ML para detecção de fraude e scoring de crédito 
                para fintechs, competindo em um mercado de crescimento acelerado pós-pandemia.
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

      {/* Startup Challenge */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            O Desafio Startup
          </h2>
          <div className="glass-card p-8">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              "Tínhamos 18 meses de runway e pressão dos investidores para mostrar tração real. 
              Nosso produto era excelente, mas não sabíamos como alcançar fintechs de forma escalável. 
              Não tínhamos budget para montar um time de vendas tradicional."
            </p>
            <div className="text-right">
              <p className="font-semibold text-secondary-400">— Miguel Rodriguez, CEO, InnovateTech</p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6 text-white">Desafios Típicos de Startups:</h3>
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

      {/* Growth Journey */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Jornada de Crescimento
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6">
            {growthStages.map((stage, index) => (
              <div key={index} className="glass-card p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-secondary-400">{stage.stage}</h3>
                  <span className={`px-4 py-2 rounded-full text-sm ${
                    stage.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                    stage.status === 'ongoing' ? 'bg-yellow-600/20 text-yellow-400' :
                    'bg-gray-600/20 text-gray-400'
                  }`}>
                    {stage.status === 'completed' ? 'Concluído' :
                     stage.status === 'ongoing' ? 'Em andamento' : 'Planejado'}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Foco Estratégico</h4>
                    <p className="text-gray-300">{stage.focus}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Resultados Alcançados</h4>
                    <p className="text-green-400 font-semibold">{stage.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Competitive Advantages */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Vantagens Competitivas Conquistadas
        </h2>
        
        <div className="grid gap-8 max-w-6xl mx-auto">
          {competitiveAdvantages.map((item, index) => (
            <div key={index} className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-secondary-400">{item.advantage}</h3>
              <div className="grid lg:grid-cols-3 gap-6 items-center">
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">❌ Método Tradicional</h4>
                  <p className="text-gray-300">{item.before}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">✅ Com Growth SDR AI</h4>
                  <p className="text-gray-300">{item.after}</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-secondary-600/20 to-primary-600/20 border border-secondary-400/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-secondary-400">{item.impact}</div>
                    <div className="text-sm text-gray-300">Melhoria</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Solution Components */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Como Conquistamos Esses Resultados
        </h2>
        
        <div className="grid gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <div key={index} className="glass-card p-8">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-4 text-secondary-400">{solution.title}</h3>
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
          <h2 className="text-4xl font-bold mb-8 text-white">Resultados Após 18 Meses</h2>
          
          <div className="glass-card p-8 mb-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">$500k</div>
                <div className="text-gray-300">MRR Alcançado</div>
                <div className="text-sm text-gray-400 mt-1">De $0 em 18 meses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">5000+</div>
                <div className="text-gray-300">Prospects/Mês</div>
                <div className="text-sm text-gray-400 mt-1">Qualificados pela IA</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">Series A</div>
                <div className="text-gray-300">$15M Levantados</div>
                <div className="text-sm text-gray-400 mt-1">Baseado na tração</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
                <div className="text-gray-300">Investor Confidence</div>
                <div className="text-sm text-gray-400 mt-1">Métricas previsíveis</div>
              </div>
            </div>

            <div className="bg-secondary-600/20 border border-secondary-400/30 rounded-lg p-6">
              <p className="text-lg text-white mb-4">
                <strong>"Growth SDR AI foi fundamental para nosso sucesso. Conseguimos focar 100% no produto 
                enquanto a IA cuidava da geração de demanda de forma previsível e escalável."</strong>
              </p>
              <p className="text-secondary-400">— Miguel Rodriguez, CEO, InnovateTech</p>
            </div>
          </div>

          <button 
            onClick={handleContactUs}
            className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Quero Acelerar o Crescimento da Minha Startup
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default CaseStudyStartupPage;