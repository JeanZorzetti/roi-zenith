import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  MousePointer,
  Eye,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Zap,
  Crown,
  Sparkles
} from 'lucide-react';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const timeRanges = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7 dias' },
    { value: '30d', label: '30 dias' },
    { value: '90d', label: '90 dias' }
  ];

  const mainMetrics = [
    {
      title: 'Total de Leads',
      value: '12,847',
      change: '+23.5%',
      trend: 'up',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      borderGradient: 'from-blue-500/50 to-cyan-500/50'
    },
    {
      title: 'Taxa de Conversão',
      value: '18.4%',
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-500/20 to-green-500/20',
      borderGradient: 'from-emerald-500/50 to-green-500/50'
    },
    {
      title: 'ROI Médio',
      value: '342%',
      change: '+15.8%',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      borderGradient: 'from-purple-500/50 to-pink-500/50'
    },
    {
      title: 'Cliques',
      value: '89,432',
      change: '-2.1%',
      trend: 'down',
      icon: MousePointer,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      borderGradient: 'from-orange-500/50 to-red-500/50'
    }
  ];

  const chartData = [
    { name: 'Seg', leads: 120, conversions: 22, roi: 280 },
    { name: 'Ter', leads: 185, conversions: 34, roi: 320 },
    { name: 'Qua', leads: 245, conversions: 45, roi: 380 },
    { name: 'Qui', leads: 198, conversions: 38, roi: 340 },
    { name: 'Sex', leads: 289, conversions: 53, roi: 420 },
    { name: 'Sáb', leads: 156, conversions: 28, roi: 290 },
    { name: 'Dom', leads: 134, conversions: 25, roi: 310 }
  ];

  const topSources = [
    { name: 'Google Ads', percentage: 34, leads: 4367, color: 'blue' },
    { name: 'Facebook Ads', percentage: 28, leads: 3597, color: 'indigo' },
    { name: 'LinkedIn Ads', percentage: 18, leads: 2312, color: 'purple' },
    { name: 'Organic Search', percentage: 12, leads: 1542, color: 'emerald' },
    { name: 'Email Marketing', percentage: 8, leads: 1029, color: 'orange' }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-screen bg-pure-black text-pure-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-primary-300 to-secondary-300 bg-clip-text text-transparent">
            Analytics IA
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Relatórios avançados com inteligência artificial
            <span className="text-xs text-emerald-400">
              • Atualizado {currentTime.toLocaleTimeString('pt-BR')}
            </span>
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Time Range Selector */}
          <div className="flex items-center gap-2 bg-gray-800/50 rounded-xl p-1 border border-gray-700/50">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  timeRange === range.value
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          
          {/* Actions */}
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          
          <button className="p-3 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/40 text-primary-300 hover:from-primary-500/30 hover:to-secondary-500/30 transition-all duration-300 hover:scale-105">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r ${metric.borderGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm`}></div>
              <div className={`relative bg-gradient-to-br ${metric.bgGradient} backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500 hover:scale-[1.02]`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold ${
                    metric.trend === 'up' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}>
                    <TrendIcon className="h-3 w-3" />
                    {metric.change}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">{metric.value}</h3>
                  <p className="text-sm text-gray-400">{metric.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/30 to-secondary-600/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
          <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary-400" />
                  Performance Semanal
                </h3>
                <p className="text-sm text-gray-400 mt-1">Análise de leads, conversões e ROI</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-400">Leads</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-400">Conversões</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-400">ROI %</span>
                </div>
              </div>
            </div>
            
            {/* Simple chart visualization */}
            <div className="space-y-4">
              {chartData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 w-8">{data.name}</span>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-400">Leads</span>
                        <span className="text-white font-bold">{data.leads}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(data.leads / 300) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-400">Conversões</span>
                        <span className="text-white font-bold">{data.conversions}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(data.conversions / 60) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-purple-400">ROI</span>
                        <span className="text-white font-bold">{data.roi}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(data.roi / 500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Sources */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-secondary-600/30 to-primary-600/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
          <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="h-5 w-5 text-secondary-400" />
              <h3 className="text-xl font-black text-white">Top Fontes</h3>
            </div>
            
            <div className="space-y-4">
              {topSources.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{source.name}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white">{source.percentage}%</span>
                      <div className="text-xs text-gray-400">{source.leads.toLocaleString()} leads</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r from-${source.color}-500 to-${source.color}-400 h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Insights */}
            <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-bold text-purple-300">IA Insight</span>
              </div>
              <p className="text-xs text-gray-300">
                Google Ads apresenta 15% mais conversões que a média. Considere aumentar o budget em 20%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/30 via-orange-600/30 to-red-600/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Recomendações IA</h3>
                <p className="text-sm text-gray-400">Insights personalizados para otimização</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/40">
              <Crown className="h-3 w-3 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-300">Premium</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-bold text-emerald-300">Otimização</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                Aumente o budget do Google Ads em 25% para maximizar conversões de alta qualidade.
              </p>
              <div className="text-xs text-emerald-400 font-medium">Impacto estimado: +18% ROI</div>
            </div>

            <div className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-bold text-blue-300">Segmentação</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                Foque em leads entre 25-45 anos para melhorar taxa de conversão em 12%.
              </p>
              <div className="text-xs text-blue-400 font-medium">Confidence Score: 94%</div>
            </div>

            <div className="p-6 bg-purple-500/10 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-bold text-purple-300">Timing</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                Envie campanhas entre 14h-16h para aumentar engajamento em 23%.
              </p>
              <div className="text-xs text-purple-400 font-medium">Baseado em 30k leads</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;