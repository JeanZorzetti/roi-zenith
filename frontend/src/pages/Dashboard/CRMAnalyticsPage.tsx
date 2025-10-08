import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Clock,
  Users,
  BarChart3,
  PieChart,
  Activity,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Percent,
  TrendingUp as GrowthIcon
} from 'lucide-react';
import { useCRMTheme } from '../../contexts/CRMThemeContext';
import { crmService } from '../../services/crmService';
import { Pipeline, Deal } from '../../types/CRM';

const CRMAnalyticsPage = () => {
  const { currentTheme } = useCRMTheme();

  // State
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('all');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (pipelines.length > 0) {
      loadDeals();
    }
  }, [selectedPipelineId, pipelines]);

  const loadData = async () => {
    setLoading(true);
    const pipelinesData = await crmService.getPipelines();
    setPipelines(pipelinesData);

    if (pipelinesData.length > 0) {
      const allDeals = await crmService.getDeals();
      setDeals(allDeals);
    }
    setLoading(false);
  };

  const loadDeals = async () => {
    if (selectedPipelineId === 'all') {
      const allDeals = await crmService.getDeals();
      setDeals(allDeals);
    } else {
      const pipelineDeals = await crmService.getDeals(selectedPipelineId);
      setDeals(pipelineDeals);
    }
  };

  // Get current pipeline
  const currentPipeline = selectedPipelineId === 'all'
    ? null
    : pipelines.find(p => p.id === selectedPipelineId);

  // Calculate metrics
  const calculateMetrics = () => {
    const totalValue = deals.reduce((sum, deal) => sum + Number(deal.value), 0);
    const totalDeals = deals.length;
    const avgDealSize = totalDeals > 0 ? totalValue / totalDeals : 0;

    // Get last stage (won deals)
    const wonDeals = currentPipeline
      ? deals.filter(d => d.stageId === currentPipeline.stages[currentPipeline.stages.length - 1]?.id)
      : [];

    const lostStage = currentPipeline?.stages.find(s => s.title.toLowerCase().includes('perdido'));
    const lostDeals = lostStage ? deals.filter(d => d.stageId === lostStage.id) : [];

    const closedDeals = wonDeals.length + lostDeals.length;
    const winRate = closedDeals > 0 ? (wonDeals.length / closedDeals) * 100 : 0;

    // Weighted pipeline (value × probability)
    const weightedValue = deals.reduce((sum, deal) => sum + (Number(deal.value) * (deal.probability / 100)), 0);

    // Average sales cycle (mock for now)
    const avgCycle = 14; // dias

    return {
      totalValue,
      weightedValue,
      avgDealSize,
      winRate,
      avgCycle,
      totalDeals,
      wonDeals: wonDeals.length,
      lostDeals: lostDeals.length
    };
  };

  const metrics = calculateMetrics();

  // Calculate conversion rates per stage
  const calculateConversionRates = () => {
    if (!currentPipeline) return [];

    const stages = currentPipeline.stages;
    const conversionRates = [];

    for (let i = 0; i < stages.length - 1; i++) {
      const currentStageDeals = deals.filter(d => d.stageId === stages[i].id).length;
      const nextStageDeals = deals.filter(d => d.stageId === stages[i + 1].id).length;

      // Calculate how many deals moved forward from current stage
      const totalInCurrentAndBeyond = stages.slice(i).reduce((sum, stage) => {
        return sum + deals.filter(d => d.stageId === stage.id).length;
      }, 0);

      const conversionRate = totalInCurrentAndBeyond > 0
        ? ((stages.slice(i + 1).reduce((sum, stage) => {
            return sum + deals.filter(d => d.stageId === stage.id).length;
          }, 0) / totalInCurrentAndBeyond) * 100)
        : 0;

      conversionRates.push({
        stage: stages[i],
        nextStage: stages[i + 1],
        currentCount: currentStageDeals,
        nextCount: nextStageDeals,
        conversionRate: conversionRate.toFixed(1),
        totalValue: deals
          .filter(d => d.stageId === stages[i].id)
          .reduce((sum, deal) => sum + Number(deal.value), 0)
      });
    }

    return conversionRates;
  };

  const conversionRates = calculateConversionRates();

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const mainMetrics = [
    {
      title: 'Pipeline Total',
      value: formatCurrency(metrics.totalValue),
      change: '+0%',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-blue-500 to-cyan-500',
      description: `${metrics.totalDeals} negócios`
    },
    {
      title: 'Pipeline Ponderado',
      value: formatCurrency(metrics.weightedValue),
      change: '+0%',
      trend: 'up',
      icon: Target,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Valor × Probabilidade'
    },
    {
      title: 'Taxa de Vitória',
      value: `${metrics.winRate.toFixed(1)}%`,
      change: '+0%',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-500',
      description: `${metrics.wonDeals} ganhos / ${metrics.wonDeals + metrics.lostDeals} fechados`
    },
    {
      title: 'Ticket Médio',
      value: formatCurrency(metrics.avgDealSize),
      change: '+0%',
      trend: 'up',
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-500',
      description: 'Valor médio por deal'
    }
  ];

  const timeRanges = [
    { value: '7d', label: '7 dias' },
    { value: '30d', label: '30 dias' },
    { value: '90d', label: '90 dias' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: currentTheme.colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: currentTheme.colors.primary }}></div>
          <p style={{ color: currentTheme.colors.text }}>Carregando Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-8" style={{ backgroundColor: currentTheme.colors.background }}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black mb-2" style={{ color: currentTheme.colors.text }}>
            CRM Analytics
          </h1>
          <p className="flex items-center gap-2" style={{ color: currentTheme.colors.textMuted }}>
            <Activity className="h-4 w-4" />
            Análise de performance de vendas • {currentTime.toLocaleTimeString('pt-BR')}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Pipeline Selector */}
          <select
            value={selectedPipelineId}
            onChange={(e) => setSelectedPipelineId(e.target.value)}
            className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: currentTheme.colors.input,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          >
            <option value="all">Todos os Pipelines</option>
            {pipelines.map(pipeline => (
              <option key={pipeline.id} value={pipeline.id}>
                {pipeline.title}
              </option>
            ))}
          </select>

          {/* Time Range */}
          <div className="flex items-center gap-2 p-1 rounded-xl border" style={{ borderColor: currentTheme.colors.border, backgroundColor: currentTheme.colors.backgroundSecondary }}>
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all`}
                style={{
                  backgroundColor: timeRange === range.value ? currentTheme.colors.primary : 'transparent',
                  color: timeRange === range.value ? '#ffffff' : currentTheme.colors.textMuted
                }}
              >
                {range.label}
              </button>
            ))}
          </div>

          <button
            onClick={loadData}
            className="p-3 rounded-xl border transition-all hover:opacity-80"
            style={{
              backgroundColor: currentTheme.colors.backgroundSecondary,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.textMuted
            }}
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ArrowUpRight : ArrowDownRight;

          return (
            <div
              key={index}
              className="rounded-2xl p-6 border transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: currentTheme.colors.cardBg,
                borderColor: currentTheme.colors.border
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient}`}
                  style={{ boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)' }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold`}
                  style={{
                    backgroundColor: metric.trend === 'up' ? currentTheme.colors.success + '20' : currentTheme.colors.error + '20',
                    color: metric.trend === 'up' ? currentTheme.colors.success : currentTheme.colors.error
                  }}
                >
                  <TrendIcon className="h-3 w-3" />
                  {metric.change}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black mb-1" style={{ color: currentTheme.colors.text }}>
                  {metric.value}
                </h3>
                <p className="text-sm mb-1" style={{ color: currentTheme.colors.textMuted }}>
                  {metric.title}
                </p>
                <p className="text-xs" style={{ color: currentTheme.colors.textMuted }}>
                  {metric.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conversion Funnel - DESTAQUE PRINCIPAL */}
      <div className="rounded-3xl p-8 border" style={{ backgroundColor: currentTheme.colors.cardBg, borderColor: currentTheme.colors.border }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black flex items-center gap-3 mb-2" style={{ color: currentTheme.colors.text }}>
              <Percent className="h-7 w-7" style={{ color: currentTheme.colors.primary }} />
              Taxa de Conversão por Etapa
            </h2>
            <p style={{ color: currentTheme.colors.textMuted }}>
              {currentPipeline ? `Pipeline: ${currentPipeline.title}` : 'Selecione um pipeline específico para ver as taxas'}
            </p>
          </div>
        </div>

        {currentPipeline && conversionRates.length > 0 ? (
          <div className="space-y-6">
            {conversionRates.map((rate, index) => (
              <div key={index} className="relative">
                {/* Stage Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: rate.stage.color }}
                    ></div>
                    <div>
                      <div className="font-semibold" style={{ color: currentTheme.colors.text }}>
                        {rate.stage.title} → {rate.nextStage.title}
                      </div>
                      <div className="text-xs" style={{ color: currentTheme.colors.textMuted }}>
                        {rate.currentCount} deals • {formatCurrency(rate.totalValue)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black" style={{ color: currentTheme.colors.primary }}>
                      {rate.conversionRate}%
                    </div>
                    <div className="text-xs" style={{ color: currentTheme.colors.textMuted }}>
                      {rate.nextCount} convertidos
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: currentTheme.colors.backgroundTertiary }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${rate.conversionRate}%`,
                      backgroundColor: currentTheme.colors.primary
                    }}
                  ></div>
                </div>

                {/* Arrow to next stage */}
                {index < conversionRates.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ChevronRight className="h-5 w-5" style={{ color: currentTheme.colors.textMuted }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <PieChart className="h-16 w-16 mx-auto mb-4" style={{ color: currentTheme.colors.textMuted }} />
            <p style={{ color: currentTheme.colors.textMuted }}>
              {!currentPipeline
                ? 'Selecione um pipeline específico para visualizar as taxas de conversão por etapa'
                : 'Nenhum dado disponível para este pipeline'
              }
            </p>
          </div>
        )}
      </div>

      {/* Distribution by Stage */}
      {currentPipeline && (
        <div className="rounded-3xl p-8 border" style={{ backgroundColor: currentTheme.colors.cardBg, borderColor: currentTheme.colors.border }}>
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: currentTheme.colors.text }}>
            <PieChart className="h-7 w-7" style={{ color: currentTheme.colors.primary }} />
            Distribuição por Etapa
          </h2>

          <div className="space-y-4">
            {currentPipeline.stages.map((stage) => {
              const stageDeals = deals.filter(d => d.stageId === stage.id);
              const stageValue = stageDeals.reduce((sum, deal) => sum + Number(deal.value), 0);
              const percentage = metrics.totalDeals > 0 ? (stageDeals.length / metrics.totalDeals) * 100 : 0;

              return (
                <div key={stage.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      ></div>
                      <span className="font-medium" style={{ color: currentTheme.colors.text }}>
                        {stage.title}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold" style={{ color: currentTheme.colors.text }}>
                        {stageDeals.length} deals
                      </span>
                      <span className="text-sm ml-2" style={{ color: currentTheme.colors.textMuted }}>
                        ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 rounded-full h-2 overflow-hidden" style={{ backgroundColor: currentTheme.colors.backgroundTertiary }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: stage.color
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-32 text-right" style={{ color: currentTheme.colors.text }}>
                      {formatCurrency(stageValue)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMAnalyticsPage;
