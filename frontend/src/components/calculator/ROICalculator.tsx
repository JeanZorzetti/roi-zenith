import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

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

  useEffect(() => {
    calculateROI();
  }, [metrics]);

  const calculateROI = () => {
    const currentMonthlyRevenue = (metrics.currentLeads * (metrics.conversionRate / 100) * metrics.averageDealValue) / metrics.salesCycleMonths;
    
    // SDR AI increases leads by 3x and conversion by 2x
    const newLeads = metrics.currentLeads * 3;
    const newConversionRate = Math.min(metrics.conversionRate * 2, 45); // Cap at 45%
    const newMonthlyRevenue = (newLeads * (newConversionRate / 100) * metrics.averageDealValue) / metrics.salesCycleMonths;
    
    const timeSavedHoursPerMonth = 120; // SDR AI saves 120 hours/month
    const costReductionMonthly = metrics.sdrSalary * 0.6; // 60% reduction in SDR costs
    
    const monthlyROI = (newMonthlyRevenue - currentMonthlyRevenue) + costReductionMonthly - metrics.roiLabsCost;
    const totalROI = (monthlyROI / metrics.roiLabsCost) * 100;
    const paybackMonths = metrics.roiLabsCost / monthlyROI;

    setResults({
      currentRevenue: currentMonthlyRevenue,
      withSDRAI: {
        leads: newLeads,
        revenue: newMonthlyRevenue,
        timeSaved: timeSavedHoursPerMonth,
        costReduction: costReductionMonthly,
        totalROI: totalROI,
        paybackMonths: paybackMonths
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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          Calculadora ROI SDR AI
        </h2>
        <p className="text-xl text-gray-300">
          Descubra quanto você pode economizar e ganhar com nosso SDR AI
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Suas Métricas Atuais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-gray-300 mb-2 block">
                Leads Qualificados/Mês: {metrics.currentLeads}
              </Label>
              <Slider
                value={[metrics.currentLeads]}
                onValueChange={([value]) => setMetrics(prev => ({ ...prev, currentLeads: value }))}
                max={1000}
                min={10}
                step={10}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">
                Taxa de Conversão: {formatPercentage(metrics.conversionRate)}
              </Label>
              <Slider
                value={[metrics.conversionRate]}
                onValueChange={([value]) => setMetrics(prev => ({ ...prev, conversionRate: value }))}
                max={30}
                min={5}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">
                Ticket Médio: {formatCurrency(metrics.averageDealValue)}
              </Label>
              <Slider
                value={[metrics.averageDealValue]}
                onValueChange={([value]) => setMetrics(prev => ({ ...prev, averageDealValue: value }))}
                max={200000}
                min={5000}
                step={5000}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">
                Ciclo de Vendas: {metrics.salesCycleMonths} meses
              </Label>
              <Slider
                value={[metrics.salesCycleMonths]}
                onValueChange={([value]) => setMetrics(prev => ({ ...prev, salesCycleMonths: value }))}
                max={12}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">
                Custo SDR/Mês: {formatCurrency(metrics.sdrSalary)}
              </Label>
              <Slider
                value={[metrics.sdrSalary]}
                onValueChange={([value]) => setMetrics(prev => ({ ...prev, sdrSalary: value }))}
                max={20000}
                min={3000}
                step={500}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        {results && (
          <Card className="bg-gradient-to-br from-primary-900/20 to-secondary-900/20 border-primary-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                Resultados com ROI Labs SDR AI
                <Badge className="bg-primary-600">Projeção</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 text-sm">Leads Qualificados</p>
                  <p className="text-2xl font-bold text-primary-400">
                    {results.withSDRAI.leads}
                    <span className="text-green-400 text-sm ml-1">
                      (+{((results.withSDRAI.leads / metrics.currentLeads - 1) * 100).toFixed(0)}%)
                    </span>
                  </p>
                </div>

                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 text-sm">Receita Mensal</p>
                  <p className="text-xl font-bold text-primary-400">
                    {formatCurrency(results.withSDRAI.revenue)}
                    <span className="text-green-400 text-sm block">
                      +{formatCurrency(results.withSDRAI.revenue - results.currentRevenue)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 text-sm">Tempo Economizado</p>
                  <p className="text-2xl font-bold text-secondary-400">
                    {results.withSDRAI.timeSaved}h
                    <span className="text-gray-400 text-sm block">por mês</span>
                  </p>
                </div>

                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 text-sm">Redução de Custos</p>
                  <p className="text-xl font-bold text-secondary-400">
                    {formatCurrency(results.withSDRAI.costReduction)}
                    <span className="text-gray-400 text-sm block">por mês</span>
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-lg text-center">
                <p className="text-gray-300 text-sm mb-2">ROI Total</p>
                <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text">
                  {formatPercentage(results.withSDRAI.totalROI)}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Payback em {results.withSDRAI.paybackMonths.toFixed(1)} meses
                </p>
              </div>

              <div className="text-center pt-4">
                <p className="text-gray-400 text-sm mb-4">
                  Investimento: {formatCurrency(metrics.roiLabsCost)}/mês
                </p>
                <div className="bg-primary-600 text-white px-6 py-3 rounded-lg inline-block">
                  <p className="font-semibold">
                    Ganho Líquido Mensal: {formatCurrency((results.withSDRAI.revenue - results.currentRevenue) + results.withSDRAI.costReduction - metrics.roiLabsCost)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="text-center">
        <p className="text-gray-400 text-sm mb-4">
          * Projeções baseadas em dados reais de clientes ROI Labs
        </p>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Quero uma Análise Personalizada
        </button>
      </div>
    </div>
  );
};

export default ROICalculator;