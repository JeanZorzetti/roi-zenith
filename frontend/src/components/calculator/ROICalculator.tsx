import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { leadService } from '@/services/leadService';
import type { ROIData } from '@/types/api';

interface ROIMetrics {
  currentLeads: number;
  conversionRate: number;
  averageDealValue: number;
  salesCycleMonths: number;
  sdrSalary: number;
  roiLabsCost: number;
}

interface ROIResults {
  currentRevenue: number;
  withSDRAI: {
    leads: number;
    revenue: number;
    timeSaved: number;
    costReduction: number;
    totalROI: number;
    paybackMonths: number;
    revenueIncrease: number;
    efficiencyGain: number;
    annualRevenue: number;
    currentAnnualRevenue: number;
  };
}

const ROICalculator = () => {
  const [metrics, setMetrics] = useState<ROIMetrics>({
    currentLeads: 100,
    conversionRate: 15,
    averageDealValue: 50000,
    salesCycleMonths: 6,
    sdrSalary: 8000,
    roiLabsCost: 4500
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    calculateROI();
  }, [metrics]);

  const calculateROI = () => {
    const currentMonthlyRevenue = (metrics.currentLeads * (metrics.conversionRate / 100) * metrics.averageDealValue) / metrics.salesCycleMonths;
    
    // Advanced SDR AI multipliers based on company size and current performance
    const baseLeadMultiplier = metrics.currentLeads < 50 ? 4 : metrics.currentLeads < 200 ? 3.5 : 3;
    const conversionMultiplier = metrics.conversionRate < 10 ? 2.5 : metrics.conversionRate < 20 ? 2 : 1.8;
    
    const newLeads = Math.round(metrics.currentLeads * baseLeadMultiplier);
    const newConversionRate = Math.min(metrics.conversionRate * conversionMultiplier, 45);
    const newMonthlyRevenue = (newLeads * (newConversionRate / 100) * metrics.averageDealValue) / metrics.salesCycleMonths;
    
    // Dynamic time savings based on lead volume
    const timeSavedHoursPerMonth = Math.min(40 + (metrics.currentLeads * 0.8), 200);
    const costReductionMonthly = metrics.sdrSalary * 0.65; // 65% reduction in SDR costs
    
    const revenueIncrease = newMonthlyRevenue - currentMonthlyRevenue;
    const monthlyROI = revenueIncrease + costReductionMonthly - metrics.roiLabsCost;
    const totalROI = monthlyROI > 0 ? (monthlyROI / metrics.roiLabsCost) * 100 : 0;
    const paybackMonths = monthlyROI > 0 ? metrics.roiLabsCost / monthlyROI : 0;

    setResults({
      currentRevenue: currentMonthlyRevenue,
      withSDRAI: {
        leads: newLeads,
        revenue: newMonthlyRevenue,
        timeSaved: Math.round(timeSavedHoursPerMonth),
        costReduction: costReductionMonthly,
        totalROI: totalROI,
        paybackMonths: paybackMonths,
        revenueIncrease: revenueIncrease,
        efficiencyGain: ((newLeads / metrics.currentLeads) - 1) * 100,
        annualRevenue: newMonthlyRevenue * 12,
        currentAnnualRevenue: currentMonthlyRevenue * 12
      }
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const handleSaveROIData = async () => {
    if (!userEmail.trim()) {
      toast({
        title: "Email necessário",
        description: "Por favor, informe seu email para salvar os dados.",
        variant: "destructive"
      });
      return;
    }

    if (!results) {
      toast({
        title: "Dados não calculados",
        description: "Aguarde o cálculo terminar antes de salvar.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);

    try {
      const roiData: ROIData = {
        currentLeads: metrics.currentLeads,
        conversionRate: metrics.conversionRate,
        averageDealValue: metrics.averageDealValue,
        salesCycleMonths: metrics.salesCycleMonths,
        sdrSalary: metrics.sdrSalary,
        projectedROI: results.withSDRAI.totalROI
      };

      const response = await leadService.submitROIData({
        email: userEmail,
        roiData
      });

      if (response.success) {
        setSavedSuccessfully(true);
        setShowEmailForm(false);
        
        toast({
          title: "Dados salvos com sucesso!",
          description: "Nossa equipe pode entrar em contato para apresentar uma proposta personalizada.",
          duration: 5000
        });
      } else {
        throw new Error(response.error || 'Erro ao salvar dados');
      }
    } catch (error: any) {
      toast({
        title: "Erro ao salvar dados",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-light mb-6 bg-gradient-to-r from-pure-white via-primary-400 to-secondary-400 bg-clip-text text-transparent tracking-wide">
          Calculadora ROI
        </h1>
        <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          Descubra o potencial de retorno do investimento com nossa solução de SDR AI personalizada para sua empresa
        </p>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card className="bg-gradient-to-br from-gray-900/40 via-gray-900/20 to-gray-800/40 backdrop-blur-lg border border-white/10 shadow-2xl">
          <CardHeader className="pb-8">
            <CardTitle className="text-pure-white text-2xl font-light tracking-wide">Suas Métricas Atuais</CardTitle>
            <p className="text-gray-400 text-sm font-light mt-2">Ajuste os parâmetros para refletir sua operação atual</p>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300 font-light">
                  Leads Qualificados por Mês
                </Label>
                <div className="bg-primary-600/20 px-3 py-1 rounded-full">
                  <span className="text-primary-400 font-medium">{metrics.currentLeads}</span>
                </div>
              </div>
              <Slider
                value={[metrics.currentLeads]}
                onValueChange={([value]) => setMetrics(prev => ({ ...prev, currentLeads: value }))}
                max={1000}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10</span>
                <span>1.000</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300 font-light">
                  Taxa de Conversão
                </Label>
                <div className="bg-secondary-600/20 px-3 py-1 rounded-full">
                  <span className="text-secondary-400 font-medium">{formatPercentage(metrics.conversionRate)}</span>
                </div>
              </div>
              <Slider
                value={[metrics.conversionRate]}
                onValueChange={([value]) => setMetrics(prev => ({ ...prev, conversionRate: value }))}
                max={30}
                min={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>5%</span>
                <span>30%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300 font-light">
                  Ticket Médio
                </Label>
                <div className="bg-green-600/20 px-3 py-1 rounded-full">
                  <span className="text-green-400 font-medium">{formatCurrency(metrics.averageDealValue)}</span>
                </div>
              </div>
              <Slider
                value={[metrics.averageDealValue]}
                onValueChange={([value]) => setMetrics(prev => ({ ...prev, averageDealValue: value }))}
                max={200000}
                min={5000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>R$ 5k</span>
                <span>R$ 200k</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300 font-light">
                  Ciclo de Vendas
                </Label>
                <div className="bg-purple-600/20 px-3 py-1 rounded-full">
                  <span className="text-purple-400 font-medium">{metrics.salesCycleMonths} {metrics.salesCycleMonths === 1 ? 'mês' : 'meses'}</span>
                </div>
              </div>
              <Slider
                value={[metrics.salesCycleMonths]}
                onValueChange={([value]) => setMetrics(prev => ({ ...prev, salesCycleMonths: value }))}
                max={12}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 mês</span>
                <span>12 meses</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300 font-light">
                  Custo SDR por Mês
                </Label>
                <div className="bg-orange-600/20 px-3 py-1 rounded-full">
                  <span className="text-orange-400 font-medium">{formatCurrency(metrics.sdrSalary)}</span>
                </div>
              </div>
              <Slider
                value={[metrics.sdrSalary]}
                onValueChange={([value]) => setMetrics(prev => ({ ...prev, sdrSalary: value }))}
                max={20000}
                min={3000}
                step={500}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>R$ 3k</span>
                <span>R$ 20k</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        {results && (
          <Card className="bg-gradient-to-br from-primary-900/10 via-secondary-900/5 to-gray-900/20 backdrop-blur-xl border border-primary-500/20 shadow-2xl">
            <CardHeader className="pb-8">
              <div className="flex items-center justify-between">
                <CardTitle className="text-pure-white text-2xl font-light tracking-wide">
                  Projeção com ROI Labs
                </CardTitle>
                <Badge className="bg-gradient-to-r from-primary-600 to-secondary-600 text-pure-white font-light px-4 py-2 rounded-full">
                  Simulação
                </Badge>
              </div>
              <p className="text-gray-400 text-sm font-light mt-3">
                Baseado em métricas reais de clientes com perfil similar
              </p>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-primary-600/10 to-primary-800/5 backdrop-blur-sm rounded-2xl border border-primary-500/20">
                  <div className="text-primary-400 text-sm font-light mb-2 tracking-wide">Leads Qualificados</div>
                  <div className="text-3xl font-light text-pure-white mb-2">
                    {results.withSDRAI.leads.toLocaleString('pt-BR')}
                  </div>
                  <div className="inline-flex items-center bg-green-500/20 px-3 py-1 rounded-full">
                    <span className="text-green-400 text-sm font-medium">
                      +{((results.withSDRAI.leads / metrics.currentLeads - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-secondary-600/10 to-secondary-800/5 backdrop-blur-sm rounded-2xl border border-secondary-500/20">
                  <div className="text-secondary-400 text-sm font-light mb-2 tracking-wide">Receita Mensal</div>
                  <div className="text-2xl font-light text-pure-white mb-2">
                    {formatCurrency(results.withSDRAI.revenue)}
                  </div>
                  <div className="text-green-400 text-sm font-medium">
                    +{formatCurrency(results.withSDRAI.revenue - results.currentRevenue)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-purple-600/10 to-purple-800/5 backdrop-blur-sm rounded-2xl border border-purple-500/20">
                  <div className="text-purple-400 text-sm font-light mb-2 tracking-wide">Tempo Economizado</div>
                  <div className="text-3xl font-light text-pure-white mb-1">
                    {results.withSDRAI.timeSaved}h
                  </div>
                  <div className="text-gray-400 text-sm font-light">por mês</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-800/5 backdrop-blur-sm rounded-2xl border border-green-500/20">
                  <div className="text-green-400 text-sm font-light mb-2 tracking-wide">Economia Mensal</div>
                  <div className="text-2xl font-light text-pure-white mb-1">
                    {formatCurrency(results.withSDRAI.costReduction)}
                  </div>
                  <div className="text-gray-400 text-sm font-light">em custos SDR</div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-primary-600/20 via-secondary-600/15 to-purple-600/10 backdrop-blur-sm rounded-3xl border border-gradient-to-r border-primary-500/30 text-center">
                <div className="text-gray-300 text-sm font-light mb-4 tracking-wide uppercase">Retorno sobre Investimento</div>
                <div className="text-6xl font-extralight text-transparent bg-gradient-to-r from-primary-300 via-secondary-300 to-purple-300 bg-clip-text mb-4">
                  {formatPercentage(results.withSDRAI.totalROI)}
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-light">
                  <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"></div>
                  <span>Payback em {results.withSDRAI.paybackMonths.toFixed(1)} meses</span>
                  <div className="w-2 h-2 bg-gradient-to-r from-secondary-400 to-purple-400 rounded-full"></div>
                </div>
              </div>

              {/* Advanced Metrics */}
              <div className="space-y-4 pt-6 border-t border-gray-700/30">
                <h4 className="text-center text-gray-300 font-light text-sm tracking-wide uppercase mb-6">
                  Métricas Detalhadas
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                    <div className="text-gray-400 text-xs font-light mb-2">Receita Anual</div>
                    <div className="text-lg font-light text-pure-white">
                      {formatCurrency(results.withSDRAI.annualRevenue)}
                    </div>
                    <div className="text-green-400 text-xs mt-1">
                      +{formatCurrency(results.withSDRAI.annualRevenue - results.currentAnnualRevenue)} vs atual
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                    <div className="text-gray-400 text-xs font-light mb-2">Ganho de Eficiência</div>
                    <div className="text-lg font-light text-purple-400">
                      +{results.withSDRAI.efficiencyGain.toFixed(0)}%
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      em geração de leads
                    </div>
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl border border-blue-500/20">
                  <div className="text-blue-400 text-xs font-light mb-2 tracking-wide">ECONOMIA TOTAL NO PRIMEIRO ANO</div>
                  <div className="text-2xl font-light text-blue-300">
                    {formatCurrency((results.withSDRAI.revenueIncrease + results.withSDRAI.costReduction - metrics.roiLabsCost) * 12)}
                  </div>
                </div>
              </div>

              <div className="text-center pt-6">
                <div className="inline-flex items-center gap-4 bg-gray-900/40 px-6 py-3 rounded-full border border-gray-700/50 mb-6">
                  <span className="text-gray-400 text-sm font-light">Investimento mensal:</span>
                  <span className="text-primary-400 font-medium">{formatCurrency(metrics.roiLabsCost)}</span>
                </div>
                <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-purple-600 text-pure-white px-8 py-4 rounded-2xl inline-block shadow-xl">
                  <div className="text-sm font-light opacity-90 mb-1">Ganho Líquido Mensal</div>
                  <div className="text-2xl font-light">
                    {formatCurrency((results.withSDRAI.revenue - results.currentRevenue) + results.withSDRAI.costReduction - metrics.roiLabsCost)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="text-center bg-gradient-to-br from-gray-900/30 to-gray-800/20 backdrop-blur-sm rounded-3xl border border-white/10 p-8">
        <p className="text-gray-400 text-sm font-light mb-8 max-w-md mx-auto leading-relaxed">
          * Projeções baseadas em métricas reais de mais de 150 clientes ROI Labs com perfis similares
        </p>
        
        {!savedSuccessfully ? (
          <div className="space-y-4">
            {!showEmailForm ? (
              <Button 
                onClick={() => setShowEmailForm(true)}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-pure-white px-10 py-4 rounded-full font-light text-lg tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Receber Proposta Personalizada
              </Button>
            ) : (
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-gray-300 font-light mb-4">Digite seu email para receber uma proposta personalizada</div>
                <Input
                  type="email"
                  placeholder="seu.email@empresa.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="bg-gray-900/50 border-gray-600/50 text-pure-white placeholder:text-gray-500 rounded-full px-6 py-4 font-light backdrop-blur-sm focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50"
                  disabled={isSaving}
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleSaveROIData}
                    disabled={isSaving || !userEmail.trim()}
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 flex-1 rounded-full font-light py-3 transition-all duration-300"
                  >
                    {isSaving ? 'Enviando...' : 'Enviar Solicitação'}
                  </Button>
                  <Button
                    onClick={() => setShowEmailForm(false)}
                    variant="outline"
                    className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 rounded-full font-light px-6 transition-all duration-300"
                    disabled={isSaving}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 rounded-2xl p-6 max-w-md mx-auto backdrop-blur-sm">
            <div className="text-green-400 mb-3 flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <span className="font-light">Solicitação enviada com sucesso!</span>
            </div>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Nossa equipe de especialistas analisará seu perfil e entrará em contato em até 24h com uma proposta personalizada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ROICalculator;