import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import AnimatedSection from '@/components/AnimatedSection';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign,
  Target,
  Clock,
  Zap,
  Star,
  Calendar,
  PlayCircle,
  Eye,
  MousePointer,
  TrendingDown,
  Award,
  Sparkles
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMetric, setSelectedMetric] = useState('leads');
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Clean metrics ready for real data
  const metrics = [
    {
      title: 'Total de Leads',
      value: '0',
      previousValue: '0',
      change: '0%',
      changeValue: '0',
      trend: 'neutral',
      icon: Users,
      gradient: 'from-blue-600 via-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 via-blue-600/5 to-cyan-500/10',
      borderGradient: 'from-blue-400/50 via-blue-500/30 to-cyan-400/50',
      shadowColor: 'shadow-blue-500/20'
    },
    {
      title: 'Taxa de Conversão',
      value: '0%',
      previousValue: '0%',
      change: '0%',
      changeValue: '0%',
      trend: 'neutral',
      icon: Target,
      gradient: 'from-emerald-600 via-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 via-emerald-600/5 to-teal-500/10',
      borderGradient: 'from-emerald-400/50 via-emerald-500/30 to-teal-400/50',
      shadowColor: 'shadow-emerald-500/20'
    },
    {
      title: 'ROI Médio',
      value: '0%',
      previousValue: '0%',
      change: '0%',
      changeValue: '0%',
      trend: 'neutral',
      icon: DollarSign,
      gradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
      bgGradient: 'from-violet-500/10 via-purple-600/5 to-fuchsia-500/10',
      borderGradient: 'from-violet-400/50 via-purple-500/30 to-fuchsia-400/50',
      shadowColor: 'shadow-violet-500/20'
    },
    {
      title: 'Tempo Médio de Ciclo',
      value: '0 dias',
      previousValue: '0 dias',
      change: '0%',
      changeValue: '0 dias',
      trend: 'neutral',
      icon: Clock,
      gradient: 'from-orange-600 via-red-500 to-pink-500',
      bgGradient: 'from-orange-500/10 via-red-600/5 to-pink-500/10',
      borderGradient: 'from-orange-400/50 via-red-500/30 to-pink-400/50',
      shadowColor: 'shadow-orange-500/20'
    }
  ];

  const recentActivities: any[] = [];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const quickStats = [
    { label: 'Visualizações hoje', value: '1,247', icon: Eye, color: 'text-blue-400' },
    { label: 'Cliques CTR', value: '8.3%', icon: MousePointer, color: 'text-green-400' },
    { label: 'Score IA', value: '94%', icon: Zap, color: 'text-yellow-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-600/3 to-secondary-600/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        <AnimatedSection>
          {/* Premium Header */}
          <div className="mb-16 pt-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-5xl lg:text-7xl font-black mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    {getGreeting()},
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-300 bg-clip-text text-transparent">
                    {user?.name?.split(' ')[0] || 'Usuário'}!
                  </span>
                </h1>
                <p className="text-2xl text-gray-400 font-light">
                  Aqui está seu painel de comando inteligente
                </p>
              </div>
              
              {/* Live Stats */}
              <div className="flex flex-col lg:items-end gap-4">
                <div className="text-right text-gray-400">
                  <div className="text-sm font-medium">Agora</div>
                  <div className="text-xl font-mono">
                    {currentTime.toLocaleTimeString('pt-BR')}
                  </div>
                </div>
                <div className="flex gap-6">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Premium Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <AnimatedSection key={metric.title} delay={index * 0.15}>
                  <div className="group relative">
                    {/* Enhanced Glow Effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${metric.borderGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-xl`}></div>
                    
                    <div className={`relative bg-gradient-to-br ${metric.bgGradient} backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 ${metric.shadowColor} shadow-2xl hover:shadow-3xl hover:-translate-y-2`}>
                      {/* Top Section */}
                      <div className="flex items-start justify-between mb-8">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${metric.gradient} shadow-lg ${metric.shadowColor} group-hover:scale-110 transition-transform duration-500`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-right">
                          <div className={`flex items-center text-lg font-bold ${
                            metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                            {metric.trend === 'up' ? (
                              <TrendingUp className="h-5 w-5 mr-1" />
                            ) : (
                              <TrendingDown className="h-5 w-5 mr-1" />
                            )}
                            {metric.change}
                          </div>
                          <div className="text-sm text-gray-400 font-medium">
                            {metric.changeValue}
                          </div>
                        </div>
                      </div>
                      
                      {/* Main Value */}
                      <div className="mb-4">
                        <div className="text-4xl lg:text-5xl font-black text-white mb-2 font-mono">
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-400 font-medium">
                          {metric.title}
                        </div>
                      </div>

                      {/* Previous Value Comparison */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="text-xs text-gray-500">
                          Anterior: {metric.previousValue}
                        </div>
                        <div className={`text-xs font-semibold ${
                          metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {metric.trend === 'up' ? '↗️ Crescendo' : '↘️ Otimizando'}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Advanced Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mb-16">
            {/* Premium Chart Area */}
            <AnimatedSection className="xl:col-span-2" delay={0.6}>
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/30 via-secondary-600/30 to-primary-600/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/40 to-gray-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-all duration-500 shadow-2xl">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
                        Performance Analytics
                      </h2>
                      <p className="text-gray-400">Últimos 30 dias com IA preditiva</p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setAnalyticsTimeframe('realtime')}
                        className={`px-6 py-3 border rounded-xl font-semibold transition-all ${
                          analyticsTimeframe === 'realtime'
                            ? 'bg-primary-600/20 border-primary-500/30 text-primary-300'
                            : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
                        }`}
                      >
                        Tempo Real
                      </button>
                      <button 
                        onClick={() => setAnalyticsTimeframe('historical')}
                        className={`px-6 py-3 border rounded-xl font-semibold transition-all ${
                          analyticsTimeframe === 'historical'
                            ? 'bg-primary-600/20 border-primary-500/30 text-primary-300'
                            : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
                        }`}
                      >
                        Histórico
                      </button>
                    </div>
                  </div>
                  
                  {/* Interactive Analytics Chart */}
                  <div className="h-96 bg-gradient-to-br from-gray-950/80 via-gray-900/60 to-gray-950/80 rounded-2xl border border-white/5 p-6 backdrop-blur group-hover:shadow-2xl transition-all duration-500">
                    {analyticsTimeframe === 'realtime' ? (
                      <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            Dados em Tempo Real
                          </h3>
                          <button 
                            onClick={refreshData}
                            disabled={isRefreshing}
                            className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-all"
                          >
                            <Activity className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                            <div className="text-2xl font-black text-white">2,847</div>
                            <div className="text-sm text-blue-400">Leads Ativos</div>
                          </div>
                          <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                            <div className="text-2xl font-black text-white">18.4%</div>
                            <div className="text-sm text-emerald-400">Taxa Conversão</div>
                          </div>
                          <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                            <div className="text-2xl font-black text-white">R$ 89.2K</div>
                            <div className="text-sm text-purple-400">Revenue</div>
                          </div>
                          <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                            <div className="text-2xl font-black text-white">342%</div>
                            <div className="text-sm text-orange-400">ROI Médio</div>
                          </div>
                        </div>

                        <div className="flex-1 bg-gray-900/50 rounded-xl p-4 border border-gray-700/20">
                          <div className="text-center py-8">
                            <BarChart3 className="h-12 w-12 text-primary-400 mx-auto mb-4" />
                            <p className="text-gray-400">Gráfico interativo em desenvolvimento</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col">
                        <div className="mb-6">
                          <h3 className="text-lg font-bold text-white mb-4">Dados Históricos - Últimos 30 dias</h3>
                          <div className="flex gap-2">
                            {['7d', '30d', '90d'].map((period) => (
                              <button
                                key={period}
                                onClick={() => setSelectedMetric(period)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                                  selectedMetric === period
                                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/40'
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                                }`}
                              >
                                {period}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          {[
                            { day: 'Seg', value: 85, leads: 247 },
                            { day: 'Ter', value: 92, leads: 289 },
                            { day: 'Qua', value: 78, leads: 198 },
                            { day: 'Qui', value: 95, leads: 342 },
                            { day: 'Sex', value: 88, leads: 267 },
                            { day: 'Sáb', value: 73, leads: 156 },
                            { day: 'Dom', value: 69, leads: 134 }
                          ].map((data, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <span className="text-sm text-gray-400 w-8">{data.day}</span>
                              <div className="flex-1 bg-gray-800/30 rounded-full h-3 relative overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full transition-all duration-1000"
                                  style={{ width: `${data.value}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-white font-bold w-12">{data.leads}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Premium Activity Feed */}
            <AnimatedSection delay={0.8}>
              <div className="group relative h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/30 via-teal-600/30 to-emerald-600/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/40 to-gray-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 shadow-2xl h-full">
                  <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <Activity className="h-6 w-6 mr-3 text-emerald-400" />
                    Atividades Premium
                  </h2>
                  
                  <div className="space-y-6">
                    {recentActivities.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={activity.id} className="group/item relative">
                          <div className="absolute -inset-2 bg-gradient-to-r from-white/5 to-transparent rounded-xl opacity-0 group-hover/item:opacity-100 transition-all duration-300"></div>
                          <div className="relative flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                            <div className={`flex-shrink-0 p-3 rounded-xl ${
                              activity.status === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              activity.status === 'celebration' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                              activity.status === 'ai' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                              'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            } group-hover/item:scale-110 transition-transform duration-300`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white group-hover/item:text-gray-100 transition-colors">
                                {activity.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-gray-500">
                                  {activity.time}
                                </p>
                                <span className="text-sm font-bold text-primary-400">
                                  {activity.value}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400">47 atividades hoje</span>
                      <button 
                        onClick={refreshData}
                        disabled={isRefreshing}
                        className="p-1 rounded text-gray-400 hover:text-white transition-all"
                      >
                        <Activity className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                    <button className="w-full text-primary-400 hover:text-primary-300 text-sm font-bold py-3 hover:bg-white/5 transition-all duration-300 rounded-xl">
                      Ver todas as atividades →
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Interactive Premium Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Centro de Comando',
                description: 'IA avançada para gestão inteligente de leads e automação premium',
                icon: Users,
                gradient: 'from-blue-600 via-cyan-500 to-blue-600',
                bgGradient: 'from-blue-500/10 via-cyan-500/5 to-blue-500/10',
                borderGradient: 'from-blue-400/50 via-cyan-400/30 to-blue-400/50',
                stats: '2.8K leads ativos',
                action: () => window.open('/dashboard/leads', '_self')
              },
              {
                title: 'Analytics Preditivo',
                description: 'Machine learning para previsões de vendas e insights estratégicos',
                icon: FileText,
                gradient: 'from-emerald-600 via-teal-500 to-emerald-600',
                bgGradient: 'from-emerald-500/10 via-teal-500/5 to-emerald-500/10',
                borderGradient: 'from-emerald-400/50 via-teal-400/30 to-emerald-400/50',
                stats: '94% precisão IA',
                action: () => window.open('/dashboard/analytics', '_self')
              },
              {
                title: 'ROI Intelligence',
                description: 'Otimização automática com algoritmos avançados e deep learning',
                icon: Activity,
                gradient: 'from-violet-600 via-purple-500 to-fuchsia-600',
                bgGradient: 'from-violet-500/10 via-purple-500/5 to-fuchsia-500/10',
                borderGradient: 'from-violet-400/50 via-purple-400/30 to-fuchsia-400/50',
                stats: '342% ROI médio',
                action: () => window.open('/dashboard/reports', '_self')
              }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <AnimatedSection key={action.title} delay={1.0 + index * 0.2}>
                  <div onClick={action.action} className="group relative cursor-pointer h-full">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${action.borderGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-xl`}></div>
                    <div className={`relative bg-gradient-to-br ${action.bgGradient} backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 h-full shadow-2xl hover:shadow-3xl hover:-translate-y-3 group-hover:scale-[1.02]`}>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${action.gradient} shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
                            Premium
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-400 text-base mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {action.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <button className="inline-flex items-center text-primary-400 hover:text-primary-300 text-lg font-bold group-hover:translate-x-2 transition-all duration-300">
                          Acessar
                          <ArrowUpRight className="h-5 w-5 ml-2 group-hover:scale-125 transition-transform" />
                        </button>
                        <div className="text-sm font-semibold text-gray-500">
                          {action.stats}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default DashboardPage;