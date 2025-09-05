import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface Prospect {
  id: string;
  name: string;
  company: string;
  role: string;
  sector: string;
  leadScore: number;
  painPoints: string[];
  engagement: 'cold' | 'warm' | 'hot';
  nextAction: string;
}

interface SDRMessage {
  id: string;
  type: 'analysis' | 'action' | 'result';
  content: string;
  timestamp: Date;
  confidence?: number;
}

const mockProspects: Prospect[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    company: 'TechStart Brasil',
    role: 'CEO',
    sector: 'SaaS B2B',
    leadScore: 85,
    painPoints: ['Baixa conversão de leads', 'Processo manual de qualificação', 'CAC alto'],
    engagement: 'hot',
    nextAction: 'Agendar demo personalizada'
  },
  {
    id: '2', 
    name: 'Ana Costa',
    company: 'FinanceAI',
    role: 'VP Vendas',
    sector: 'Fintech',
    leadScore: 72,
    painPoints: ['Compliance complexo', 'Dificuldade em escalar SDR', 'Pipeline instável'],
    engagement: 'warm',
    nextAction: 'Enviar case study compliance'
  },
  {
    id: '3',
    name: 'Roberto Lima',
    company: 'E-commerce Pro',
    role: 'CMO',
    sector: 'E-commerce',
    leadScore: 58,
    painPoints: ['Sazonalidade', 'ROI marketing baixo', 'Leads desqualificados'],
    engagement: 'cold',
    nextAction: 'Nutrir com conteúdo sobre ROI'
  }
];

const SDRSimulator = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<SDRMessage[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [progress, setProgress] = useState(0);

  const simulationSteps = [
    'Analisando perfil do prospect...',
    'Identificando pain points...',
    'Calculando lead score...',
    'Definindo estratégia de engajamento...',
    'Personalizando abordagem...',
    'Recomendando próximos passos...'
  ];

  useEffect(() => {
    if (isSimulating && currentStep < simulationSteps.length) {
      const timer = setTimeout(() => {
        setProgress((currentStep + 1) / simulationSteps.length * 100);
        
        // Add message for current step
        const newMessage: SDRMessage = {
          id: Date.now().toString(),
          type: currentStep < 3 ? 'analysis' : currentStep < 5 ? 'action' : 'result',
          content: simulationSteps[currentStep],
          timestamp: new Date(),
          confidence: Math.floor(Math.random() * 20) + 80 // 80-100%
        };
        
        setMessages(prev => [...prev, newMessage]);
        setCurrentStep(prev => prev + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
    
    if (currentStep >= simulationSteps.length && isSimulating) {
      setIsSimulating(false);
    }
  }, [isSimulating, currentStep]);

  const startSimulation = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setMessages([]);
    setCurrentStep(0);
    setProgress(0);
    setIsSimulating(true);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSelectedProspect(null);
    setMessages([]);
    setCurrentStep(0);
    setProgress(0);
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'hot': return 'bg-red-500';
      case 'warm': return 'bg-yellow-500';
      case 'cold': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getEngagementText = (engagement: string) => {
    switch (engagement) {
      case 'hot': return 'Pronto para compra';
      case 'warm': return 'Interessado';
      case 'cold': return 'Precisa nurturing';
      default: return 'Indefinido';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          SDR AI em Ação
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Veja como nosso SDR AI analisa prospects e define estratégias personalizadas em tempo real
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Prospects Panel */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              Prospects Disponíveis
              <Badge className="bg-primary-600">Demo</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockProspects.map((prospect) => (
              <div
                key={prospect.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedProspect?.id === prospect.id 
                    ? 'border-primary-500 bg-primary-900/20' 
                    : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                }`}
                onClick={() => !isSimulating && startSimulation(prospect)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary-600 text-white">
                        {prospect.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">{prospect.name}</h4>
                      <p className="text-sm text-gray-400">{prospect.role} • {prospect.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getEngagementColor(prospect.engagement)} text-white text-xs`}>
                      {getEngagementText(prospect.engagement)}
                    </Badge>
                    <span className="text-sm font-semibold text-primary-400">
                      {prospect.leadScore}%
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-2">Principais Pain Points:</div>
                <div className="flex flex-wrap gap-1">
                  {prospect.painPoints.slice(0, 2).map((pain, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-gray-600 text-gray-300">
                      {pain}
                    </Badge>
                  ))}
                  {prospect.painPoints.length > 2 && (
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                      +{prospect.painPoints.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            
            {!selectedProspect && (
              <div className="text-center py-4 text-gray-400 text-sm">
                Clique em um prospect para iniciar a análise SDR AI
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Panel */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Análise SDR AI
              {isSimulating && (
                <Badge className="bg-green-600 animate-pulse">Analisando...</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedProspect ? (
              <div className="space-y-6">
                {/* Progress Bar */}
                {isSimulating && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progresso da Análise</span>
                      <span className="text-primary-400">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {/* Selected Prospect Info */}
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Analisando: {selectedProspect.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Empresa:</span>
                      <p className="text-white">{selectedProspect.company}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Setor:</span>
                      <p className="text-white">{selectedProspect.sector}</p>
                    </div>
                  </div>
                </div>

                {/* AI Messages */}
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg ${
                        message.type === 'analysis' 
                          ? 'bg-blue-900/20 border border-blue-700/30' 
                          : message.type === 'action'
                          ? 'bg-yellow-900/20 border border-yellow-700/30'
                          : 'bg-green-900/20 border border-green-700/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge className={`text-xs ${
                          message.type === 'analysis' ? 'bg-blue-600' :
                          message.type === 'action' ? 'bg-yellow-600' : 'bg-green-600'
                        }`}>
                          {message.type === 'analysis' ? 'Análise' :
                           message.type === 'action' ? 'Ação' : 'Resultado'}
                        </Badge>
                        {message.confidence && (
                          <span className="text-xs text-gray-400">
                            {message.confidence}% confiança
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-300">{message.content}</p>
                    </div>
                  ))}
                </div>

                {/* Results */}
                {!isSimulating && messages.length > 0 && (
                  <div className="p-4 bg-gradient-to-r from-primary-900/20 to-secondary-900/20 rounded-lg border border-primary-500/30">
                    <h4 className="font-semibold text-white mb-3">Recomendação Final:</h4>
                    <p className="text-primary-400 font-medium mb-2">{selectedProspect.nextAction}</p>
                    <div className="text-sm text-gray-300">
                      <strong>Score Final:</strong> {selectedProspect.leadScore}% • 
                      <strong className="ml-2">Status:</strong> {getEngagementText(selectedProspect.engagement)}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {!isSimulating && messages.length > 0 && (
                    <Button
                      onClick={resetSimulation}
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Analisar Outro Prospect
                    </Button>
                  )}
                  
                  {!isSimulating && messages.length > 0 && (
                    <Button className="flex-1 bg-primary-600 hover:bg-primary-700">
                      Implementar SDR AI
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-white mb-2">SDR AI Pronto</h3>
                <p className="text-gray-400 mb-4">
                  Selecione um prospect à esquerda para ver a análise em ação
                </p>
                <div className="text-sm text-gray-500">
                  IA treinada com +10.000 interações de vendas reais
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SDRSimulator;