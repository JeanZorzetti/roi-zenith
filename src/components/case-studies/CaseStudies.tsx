import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';

interface CaseStudyData {
  id: string;
  company: string;
  sector: string;
  size: string;
  challenge: string;
  solution: string;
  timeline: string;
  before: {
    leads: number;
    conversion: number;
    cac: number;
    revenue: number;
    teamSize: number;
    efficiency: number;
  };
  after: {
    leads: number;
    conversion: number;
    cac: number;
    revenue: number;
    teamSize: number;
    efficiency: number;
  };
  implementation: {
    week1: string;
    week2: string;
    week4: string;
    week8: string;
    week12: string;
  };
  testimonial: {
    text: string;
    author: string;
    role: string;
  };
}

const caseStudies: CaseStudyData[] = [
  {
    id: 'techflow',
    company: 'TechFlow SaaS',
    sector: 'SaaS B2B',
    size: '150 funcionários',
    challenge: 'Baixa qualificação de leads (12% conversão) e CAC insustentável de R$ 8.500. Equipe de 6 SDRs gerando apenas 45 MQLs/mês.',
    solution: 'Implementação do ROI Labs SDR AI com integração CRM e automação de follow-up personalizada.',
    timeline: '90 dias',
    before: {
      leads: 45,
      conversion: 12,
      cac: 8500,
      revenue: 180000,
      teamSize: 6,
      efficiency: 7.5
    },
    after: {
      leads: 165,
      conversion: 28,
      cac: 3200,
      revenue: 620000,
      teamSize: 3,
      efficiency: 55
    },
    implementation: {
      week1: 'Setup inicial e integração CRM',
      week2: 'Treinamento IA com dados históricos',
      week4: 'Primeiros resultados: +40% leads qualificados',
      week8: 'Otimização completa: conversão dobrada',
      week12: 'ROI final: 340% em 90 dias'
    },
    testimonial: {
      text: 'Em 90 dias, nosso pipeline triplicou e o CAC despencou. O SDR AI identifica oportunidades que perdíamos.',
      author: 'Carlos Mendes',
      role: 'CEO, TechFlow SaaS'
    }
  },
  {
    id: 'startupx',
    company: 'StartupX',
    sector: 'Tech Startup',
    size: '25 funcionários',
    challenge: 'Startup em crescimento precisava escalar vendas rapidamente sem explodir custos. Budget limitado para contratar SDRs.',
    solution: 'SDR AI como alternativa escalável, com foco em leads warm e automação inteligente de outbound.',
    timeline: '60 dias',
    before: {
      leads: 20,
      conversion: 8,
      cac: 12000,
      revenue: 50000,
      teamSize: 1,
      efficiency: 20
    },
    after: {
      leads: 110,
      conversion: 22,
      cac: 4500,
      revenue: 180000,
      teamSize: 1,
      efficiency: 110
    },
    implementation: {
      week1: 'Análise de ICP e setup estratégico',
      week2: 'Configuração de sequences personalizadas',
      week4: 'Primeiros 50 leads qualificados',
      week8: 'Pipeline previsível estabelecido',
      week12: 'Expansão para novos segmentos'
    },
    testimonial: {
      text: 'O SDR AI nos deu a capacidade de uma equipe de 10 SDRs com o custo de 1. Game changer total.',
      author: 'Roberto Silva',
      role: 'Diretor de Growth, StartupX'
    }
  },
  {
    id: 'financeai',
    company: 'FinanceAI Pro',
    sector: 'Fintech',
    size: '300 funcionários',
    challenge: 'Setor altamente regulado com leads complexos. Necessidade de compliance rigoroso e qualificação precisa.',
    solution: 'SDR AI especializado em compliance financeiro com regras customizadas e aprovação automática.',
    timeline: '120 dias',
    before: {
      leads: 80,
      conversion: 15,
      cac: 6800,
      revenue: 450000,
      teamSize: 8,
      efficiency: 10
    },
    after: {
      leads: 200,
      conversion: 32,
      cac: 2900,
      revenue: 890000,
      teamSize: 5,
      efficiency: 40
    },
    implementation: {
      week1: 'Mapeamento de compliance e regulações',
      week2: 'Customização de regras específicas fintech',
      week4: 'Testes com leads de baixo risco',
      week8: 'Aprovação para leads enterprise',
      week12: 'Full deployment com compliance 100%'
    },
    testimonial: {
      text: 'A precisão na qualificação de leads financeiros é impressionante. Pipeline mais previsível que já tivemos.',
      author: 'Ana Rodrigues',
      role: 'VP Vendas, FinanceAI Pro'
    }
  }
];

const CaseStudies = () => {
  const [selectedCase, setSelectedCase] = useState(caseStudies[0]);
  const [activeTab, setActiveTab] = useState('overview');

  const getImprovementColor = (before: number, after: number, inverse = false) => {
    const improvement = inverse ? before > after : after > before;
    return improvement ? 'text-green-400' : 'text-red-400';
  };

  const getImprovementPercentage = (before: number, after: number) => {
    const change = ((after - before) / before) * 100;
    return Math.abs(change).toFixed(0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          Cases de Sucesso Detalhados
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Mergulhe fundo nos resultados reais obtidos por nossos clientes
        </p>
      </div>

      {/* Case Study Selection */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {caseStudies.map((caseStudy) => (
          <Card
            key={caseStudy.id}
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedCase.id === caseStudy.id
                ? 'border-primary-500 ring-2 ring-primary-500/20 bg-primary-900/10'
                : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
            }`}
            onClick={() => setSelectedCase(caseStudy)}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary-600">{caseStudy.sector}</Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                  {caseStudy.size}
                </Badge>
              </div>
              <h3 className="font-semibold text-white mb-2">{caseStudy.company}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                {caseStudy.challenge}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-400 font-semibold">
                  +{getImprovementPercentage(caseStudy.before.revenue, caseStudy.after.revenue)}% Revenue
                </span>
                <span className="text-gray-500">{caseStudy.timeline}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Case Study */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="implementation">Implementação</TabsTrigger>
          <TabsTrigger value="testimonial">Depoimento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                {selectedCase.company}
                <Badge className="bg-primary-600">{selectedCase.sector}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    Situação Anterior
                  </h4>
                  <p className="text-gray-300 mb-4">{selectedCase.challenge}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Leads/mês:</span>
                      <span className="text-red-400">{selectedCase.before.leads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Conversão:</span>
                      <span className="text-red-400">{selectedCase.before.conversion}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">CAC:</span>
                      <span className="text-red-400">{formatCurrency(selectedCase.before.cac)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Após ROI Labs SDR AI
                  </h4>
                  <p className="text-gray-300 mb-4">{selectedCase.solution}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Leads/mês:</span>
                      <span className="text-green-400">
                        {selectedCase.after.leads} (+{getImprovementPercentage(selectedCase.before.leads, selectedCase.after.leads)}%)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Conversão:</span>
                      <span className="text-green-400">
                        {selectedCase.after.conversion}% (+{getImprovementPercentage(selectedCase.before.conversion, selectedCase.after.conversion)}%)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">CAC:</span>
                      <span className="text-green-400">
                        {formatCurrency(selectedCase.after.cac)} (-{getImprovementPercentage(selectedCase.after.cac, selectedCase.before.cac)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary-900/20 rounded-lg border border-primary-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-2">
                    {formatCurrency(selectedCase.after.revenue - selectedCase.before.revenue)}
                  </div>
                  <div className="text-sm text-gray-300">
                    Aumento de receita mensal em {selectedCase.timeline}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                label: 'Leads Qualificados',
                before: selectedCase.before.leads,
                after: selectedCase.after.leads,
                suffix: '/mês',
                icon: TrendingUp
              },
              {
                label: 'Taxa de Conversão',
                before: selectedCase.before.conversion,
                after: selectedCase.after.conversion,
                suffix: '%',
                icon: TrendingUp
              },
              {
                label: 'CAC (Custo Aquisição)',
                before: selectedCase.before.cac,
                after: selectedCase.after.cac,
                prefix: 'R$ ',
                icon: TrendingDown,
                inverse: true
              },
              {
                label: 'Receita Mensal',
                before: selectedCase.before.revenue,
                after: selectedCase.after.revenue,
                prefix: 'R$ ',
                icon: DollarSign,
                format: 'currency'
              },
              {
                label: 'Tamanho da Equipe',
                before: selectedCase.before.teamSize,
                after: selectedCase.after.teamSize,
                suffix: ' SDRs',
                icon: TrendingDown,
                inverse: true
              },
              {
                label: 'Eficiência (Leads/Pessoa)',
                before: selectedCase.before.efficiency,
                after: selectedCase.after.efficiency,
                suffix: '/mês',
                icon: TrendingUp
              }
            ].map((metric, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <metric.icon className="w-5 h-5 text-primary-400" />
                    <h4 className="font-semibold text-white text-sm">{metric.label}</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Antes</div>
                      <div className="text-lg font-semibold text-gray-300">
                        {metric.prefix}{metric.format === 'currency' ? formatCurrency(metric.before).replace('R$ ', '') : metric.before}{metric.suffix}
                      </div>
                    </div>
                    
                    <ArrowRight className="w-4 h-4 text-gray-500 mx-auto" />
                    
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Depois</div>
                      <div className={`text-lg font-semibold ${getImprovementColor(metric.before, metric.after, metric.inverse)}`}>
                        {metric.prefix}{metric.format === 'currency' ? formatCurrency(metric.after).replace('R$ ', '') : metric.after}{metric.suffix}
                      </div>
                      <div className={`text-xs mt-1 ${getImprovementColor(metric.before, metric.after, metric.inverse)}`}>
                        {metric.inverse ? '-' : '+'}{getImprovementPercentage(metric.before, metric.after)}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timeline de Implementação - {selectedCase.timeline}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(selectedCase.implementation).map(([week, description], index) => (
                  <div key={week} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        index === Object.keys(selectedCase.implementation).length - 1 
                          ? 'bg-green-600 text-white' 
                          : 'bg-primary-600 text-white'
                      }`}>
                        {week.replace('week', '')}
                      </div>
                      {index < Object.keys(selectedCase.implementation).length - 1 && (
                        <div className="w-px h-8 bg-gray-600 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="font-semibold text-white mb-2">
                        Semana {week.replace('week', '')}
                      </h4>
                      <p className="text-gray-300">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonial" className="space-y-6">
          <Card className="bg-gradient-to-br from-primary-900/20 to-secondary-900/20 border-primary-500/30">
            <CardContent className="p-8">
              <blockquote className="text-xl text-gray-200 leading-relaxed mb-6 italic">
                "{selectedCase.testimonial.text}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedCase.testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-white">{selectedCase.testimonial.author}</div>
                  <div className="text-sm text-gray-400">{selectedCase.testimonial.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
              Quero Resultados Similares
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaseStudies;