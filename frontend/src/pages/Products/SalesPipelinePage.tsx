import AnimatedSection from '@/components/AnimatedSection';
import { ArrowLeft, CheckCircle, PlayCircle, Target, Zap, TrendingUp, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SalesPipelinePage = () => {
  const navigate = useNavigate();

  const handleScheduleDemo = () => {
    navigate('/contact', { 
      state: { 
        subject: 'Demonstração Sales Pipeline AI - Otimização de Funil',
        message: 'Tenho interesse em ver uma demonstração do Sales Pipeline AI para entender como pode otimizar nosso funil de vendas e aumentar nossa previsibilidade de receita.'
      } 
    });
  };

  const handleViewForecast = () => {
    navigate('/calculator');
  };
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-accent-400" />,
      title: "Forecast Inteligente",
      description: "Previsão de vendas com 95% de precisão baseada em IA e dados históricos da sua empresa"
    },
    {
      icon: <Zap className="w-8 h-8 text-accent-400" />,
      title: "Pipeline Automation",
      description: "Automatização completa do funil com triggers inteligentes e ações personalizadas"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-accent-400" />,
      title: "Revenue Optimization",
      description: "Otimização contínua para maximizar receita e reduzir ciclo de vendas"
    },
    {
      icon: <Target className="w-8 h-8 text-accent-400" />,
      title: "Deal Scoring",
      description: "Pontuação inteligente de oportunidades para priorizar esforços da equipe"
    }
  ];

  const practicalExamples = [
    {
      scenario: "Startup SaaS B2B",
      challenge: "Pipeline desorganizado, previsões imprecisas e vendedores focando em deals errados. Meta de R$ 2M ARR em risco",
      solution: "Sales Pipeline AI organizou o funil em estágios claros, implementou scoring automático de deals e criou dashboard preditivo",
      results: [
        "Precisão do forecast subiu de 60% para 94%",
        "Ciclo de vendas reduzido em 35%",
        "Conversão de oportunidades aumentou 180%"
      ]
    },
    {
      scenario: "Empresa de Consultoria",
      challenge: "Equipe de 15 consultores com processos diferentes, sem visibilidade de pipeline e perdendo propostas por falta de follow-up",
      solution: "Padronização do processo, automação de follow-ups e alertas inteligentes para ações críticas no pipeline",
      results: [
        "Aumento de 250% em propostas enviadas",
        "Taxa de fechamento subiu de 15% para 38%",
        "Receita por consultor aumentou 290%"
      ]
    }
  ];

  const pipelineVisualization = [
    { stage: "Prospecção", deals: 45, value: "R$ 2.3M", conversion: "25%", automation: "Lead scoring ativo" },
    { stage: "Qualificação", deals: 28, value: "R$ 1.8M", conversion: "68%", automation: "Calls automáticos" },
    { stage: "Proposta", deals: 15, value: "R$ 1.2M", conversion: "47%", automation: "Follow-up inteligente" },
    { stage: "Negociação", deals: 8, value: "R$ 890k", conversion: "75%", automation: "Alertas de timing" },
    { stage: "Fechamento", deals: 6, value: "R$ 670k", conversion: "89%", automation: "Docs automáticos" }
  ];

  const automationExamples = [
    {
      trigger: "Deal parado há 7 dias",
      action: "Enviar email automático + notificar vendedor + sugerir próximos passos"
    },
    {
      trigger: "Proposta visualizada 3x",
      action: "Agendar call de follow-up + preparar objeções comuns"
    },
    {
      trigger: "Orçamento aprovado",
      action: "Mover para negociação + preparar contrato + notificar jurídico"
    },
    {
      trigger: "Deadline próximo",
      action: "Acelerar processo + envolver decisor + oferecer incentivo"
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-pure-black via-charcoal to-pure-black">
      {/* Header */}
      <AnimatedSection className="container mx-auto px-4 py-12">
        <Link to="/products" className="inline-flex items-center text-accent-400 hover:text-accent-300 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Produtos
        </Link>
        
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-accent-400 to-secondary-400 bg-clip-text text-transparent">
            Sales Pipeline AI
          </h1>
          <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
            Otimização completa do funil de vendas com previsibilidade e automação. 
            Transforme seu pipeline em uma máquina de crescimento previsível.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleScheduleDemo}
              className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Ver Pipeline Demo
            </button>
            <button 
              onClick={handleViewForecast}
              className="border border-accent-400 text-accent-400 hover:bg-accent-400/10 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Forecast ao Vivo
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Previsibilidade e Automação Total
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

      {/* Pipeline Visualization */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Visão Completa do Pipeline
        </h2>
        <p className="text-center text-gray-300 mb-12 text-xl">
          Veja como organizamos e otimizamos seu funil de vendas
        </p>
        
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-8">
            <div className="overflow-x-auto">
              <div className="flex gap-6 min-w-max">
                {pipelineVisualization.map((stage, index) => (
                  <div key={index} className="min-w-[200px] bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                    <h3 className="font-bold text-white mb-4">{stage.stage}</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-accent-400">{stage.deals}</div>
                        <div className="text-sm text-gray-300">Deals</div>
                      </div>
                      
                      <div>
                        <div className="text-xl font-semibold text-white">{stage.value}</div>
                        <div className="text-sm text-gray-300">Valor Total</div>
                      </div>
                      
                      <div>
                        <div className="text-lg font-semibold text-green-400">{stage.conversion}</div>
                        <div className="text-sm text-gray-300">Taxa Conversão</div>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-600">
                        <div className="text-xs text-accent-300">{stage.automation}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center">
              <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-400">R$ 670k</div>
                <div className="text-green-300">Previsão para este mês</div>
                <div className="text-sm text-gray-300 mt-1">Confiança: 94%</div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Automation Examples */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Automação Inteligente
        </h2>
        
        <div className="max-w-5xl mx-auto grid gap-6">
          {automationExamples.map((example, index) => (
            <div key={index} className="glass-card p-6">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="font-semibold text-accent-400 mb-2">TRIGGER</h3>
                  <p className="text-white text-lg">{example.trigger}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-green-400 mb-2">AÇÃO AUTOMÁTICA</h3>
                  <p className="text-gray-300">{example.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Practical Examples */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Transformações Reais
        </h2>
        
        <div className="grid md:grid-cols-1 gap-12 max-w-6xl mx-auto">
          {practicalExamples.map((example, index) => (
            <div key={index} className="glass-card p-8">
              <div className="flex items-center mb-6">
                <div className="bg-accent-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  TRANSFORMAÇÃO {index + 1}
                </div>
                <h3 className="text-2xl font-bold ml-4 text-accent-400">{example.scenario}</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">Situação Inicial</h4>
                  <p className="text-gray-300 leading-relaxed">{example.challenge}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">Nossa Solução</h4>
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

      {/* ROI Calculator */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Calcule o ROI para sua Empresa
          </h2>
          
          <div className="glass-card p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400 mb-2">+180%</div>
                <div className="text-gray-300">Aumento médio em conversões</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">-35%</div>
                <div className="text-gray-300">Redução no ciclo de vendas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">94%</div>
                <div className="text-gray-300">Precisão do forecast</div>
              </div>
            </div>
            
            <div className="bg-accent-600/20 border border-accent-400/30 rounded-lg p-6">
              <p className="text-lg text-white mb-4">
                <strong>Exemplo:</strong> Empresa com pipeline de R$ 1M/mês
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-accent-400">Antes:</strong>
                  <ul className="text-gray-300 mt-2">
                    <li>• Taxa de conversão: 20%</li>
                    <li>• Ciclo médio: 60 dias</li>
                    <li>• Receita mensal: R$ 200k</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-green-400">Depois:</strong>
                  <ul className="text-gray-300 mt-2">
                    <li>• Taxa de conversão: 36%</li>
                    <li>• Ciclo médio: 39 dias</li>
                    <li>• Receita mensal: R$ 360k</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-600/20 rounded border-l-4 border-green-400">
                <strong className="text-green-400">Resultado: +R$ 160k/mês = R$ 1.9M/ano adicional</strong>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Pricing */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Otimize seu Pipeline Hoje
          </h2>
          <div className="glass-card p-8 mb-8">
            <div className="text-6xl font-bold text-accent-400 mb-4">R$ 3.200</div>
            <div className="text-xl text-gray-300 mb-6">por mês</div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Pipeline automation completa
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Forecast inteligente 24/7
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Deal scoring automático
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Integração total com CRM
              </li>
            </ul>
            <button className="w-full bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              Otimizar Pipeline Agora
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default SalesPipelinePage;