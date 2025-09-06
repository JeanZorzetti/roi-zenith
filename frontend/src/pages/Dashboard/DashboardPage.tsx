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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Advanced metrics with more sophisticated data
  const metrics = [
    {
      title: 'Total de Leads',
      value: '2,847',
      previousValue: '2,542',
      change: '+12%',
      changeValue: '+305',
      trend: 'up',
      icon: Users,
      gradient: 'from-blue-600 via-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 via-blue-600/5 to-cyan-500/10',
      borderGradient: 'from-blue-400/50 via-blue-500/30 to-cyan-400/50',
      shadowColor: 'shadow-blue-500/20'
    },
    {
      title: 'Taxa de Conversão',
      value: '24.8%',
      previousValue: '21.6%',
      change: '+3.2%',
      changeValue: '+3.2pp',
      trend: 'up',
      icon: Target,
      gradient: 'from-emerald-600 via-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 via-emerald-600/5 to-teal-500/10',
      borderGradient: 'from-emerald-400/50 via-emerald-500/30 to-teal-400/50',
      shadowColor: 'shadow-emerald-500/20'
    },
    {
      title: 'ROI Médio',
      value: '342%',
      previousValue: '290%',
      change: '+18%',
      changeValue: '+52pp',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
      bgGradient: 'from-violet-500/10 via-purple-600/5 to-fuchsia-500/10',
      borderGradient: 'from-violet-400/50 via-purple-500/30 to-fuchsia-400/50',
      shadowColor: 'shadow-violet-500/20'
    },
    {
      title: 'Tempo Médio de Ciclo',
      value: '14 dias',
      previousValue: '16 dias',
      change: '-12.5%',
      changeValue: '-2 dias',
      trend: 'up',
      icon: Clock,
      gradient: 'from-orange-600 via-red-500 to-pink-500',
      bgGradient: 'from-orange-500/10 via-red-600/5 to-pink-500/10',
      borderGradient: 'from-orange-400/50 via-red-500/30 to-pink-400/50',
      shadowColor: 'shadow-orange-500/20'
    }
  ];

  const recentActivities = [
    { 
      id: 1, 
      message: 'Novo lead qualificado: Tech Corp Solutions', 
      time: '2 min atrás', 
      status: 'success',
      icon: Users,
      value: 'R$ 45.000'
    },
    { 
      id: 2, 
      message: 'Conversão realizada: StartupX Digital', 
      time: '15 min atrás', 
      status: 'success',
      icon: Target,
      value: 'R$ 12.500'
    },
    { 
      id: 3, 
      message: 'Relatório mensal gerado com 98% precisão', 
      time: '1 hora atrás', 
      status: 'info',
      icon: FileText,
      value: '156 páginas'
    },
    { 
      id: 4, 
      message: 'Meta de conversão Q4 atingida! 🎉', 
      time: '2 horas atrás', 
      status: 'celebration',
      icon: Award,
      value: '124%'
    },
    { 
      id: 5, 
      message: 'IA detectou oportunidade premium', 
      time: '3 horas atrás', 
      status: 'ai',
      icon: Sparkles,
      value: 'R$ 89.000'
    }
  ];

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
                      <button className="px-6 py-3 bg-primary-600/20 border border-primary-500/30 text-primary-300 rounded-xl font-semibold hover:bg-primary-600/30 transition-all">
                        Tempo Real
                      </button>
                      <button className="px-6 py-3 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-xl font-semibold hover:bg-gray-700/50 transition-all">
                        Histórico
                      </button>
                    </div>
                  </div>
                  
                  {/* Premium Chart Placeholder */}
                  <div className="h-96 bg-gradient-to-br from-gray-950/80 via-gray-900/60 to-gray-950/80 rounded-2xl border border-white/5 flex items-center justify-center backdrop-blur group-hover:shadow-2xl transition-all duration-500">
                    <div className="text-center">
                      <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 rounded-full opacity-20 blur-2xl scale-150"></div>
                        <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full p-6 shadow-2xl">
                          <BarChart3 className="h-20 w-20 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Dashboard Inteligente</h3>
                      <p className="text-gray-400 mb-6 max-w-md">
                        IA avançada processando seus dados para insights em tempo real
                      </p>
                      <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-500 hover:scale-105">
                        <PlayCircle className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                        Ativar Visualização
                      </button>
                    </div>
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

                  <button className="w-full mt-8 text-primary-400 hover:text-primary-300 text-sm font-bold py-4 border-t border-white/10 hover:bg-white/5 transition-all duration-300 rounded-b-2xl">
                    Ver todas as 47 atividades →
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Premium Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Centro de Comando',
                description: 'IA avançada para gestão inteligente de leads e automação premium',
                icon: Users,
                gradient: 'from-blue-600 via-cyan-500 to-blue-600',
                bgGradient: 'from-blue-500/10 via-cyan-500/5 to-blue-500/10',
                borderGradient: 'from-blue-400/50 via-cyan-400/30 to-blue-400/50',
                stats: '2.8K leads ativos'
              },
              {
                title: 'Analytics Preditivo',
                description: 'Machine learning para previsões de vendas e insights estratégicos',
                icon: FileText,
                gradient: 'from-emerald-600 via-teal-500 to-emerald-600',
                bgGradient: 'from-emerald-500/10 via-teal-500/5 to-emerald-500/10',
                borderGradient: 'from-emerald-400/50 via-teal-400/30 to-emerald-400/50',
                stats: '94% precisão IA'
              },
              {
                title: 'ROI Intelligence',
                description: 'Otimização automática com algoritmos avançados e deep learning',
                icon: Activity,
                gradient: 'from-violet-600 via-purple-500 to-fuchsia-600',
                bgGradient: 'from-violet-500/10 via-purple-500/5 to-fuchsia-500/10',
                borderGradient: 'from-violet-400/50 via-purple-400/30 to-fuchsia-400/50',
                stats: '342% ROI médio'
              }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <AnimatedSection key={action.title} delay={1.0 + index * 0.2}>
                  <div className="group relative cursor-pointer h-full">
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