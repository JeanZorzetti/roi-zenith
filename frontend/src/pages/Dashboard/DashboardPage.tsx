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
  PlayCircle
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuthStore();

  // Mock data for dashboard metrics
  const metrics = [
    {
      title: 'Total de Leads',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      gradient: 'from-blue-600 to-cyan-600',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      borderGradient: 'from-blue-500/50 to-cyan-500/50'
    },
    {
      title: 'Taxa de Conversão',
      value: '24.8%',
      change: '+3.2%',
      trend: 'up',
      icon: Target,
      gradient: 'from-emerald-600 to-teal-600',
      bgGradient: 'from-emerald-500/20 to-teal-500/20',
      borderGradient: 'from-emerald-500/50 to-teal-500/50'
    },
    {
      title: 'ROI Médio',
      value: '342%',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-violet-600 to-purple-600',
      bgGradient: 'from-violet-500/20 to-purple-500/20',
      borderGradient: 'from-violet-500/50 to-purple-500/50'
    },
    {
      title: 'Tempo Médio de Ciclo',
      value: '14 dias',
      change: '-2 dias',
      trend: 'up',
      icon: Clock,
      gradient: 'from-orange-600 to-red-600',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      borderGradient: 'from-orange-500/50 to-red-500/50'
    }
  ];

  const recentActivities = [
    { 
      id: 1, 
      type: 'lead', 
      message: 'Novo lead qualificado: Tech Corp', 
      time: '2 min atrás', 
      status: 'success',
      icon: Users 
    },
    { 
      id: 2, 
      type: 'conversion', 
      message: 'Conversão realizada: StartupX', 
      time: '15 min atrás', 
      status: 'success',
      icon: Target
    },
    { 
      id: 3, 
      type: 'report', 
      message: 'Relatório mensal gerado', 
      time: '1 hora atrás', 
      status: 'info',
      icon: FileText
    },
    { 
      id: 4, 
      type: 'alert', 
      message: 'Meta de conversão atingida!', 
      time: '2 horas atrás', 
      status: 'warning',
      icon: Star
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="min-h-screen bg-pure-black">
      <div className="p-6 lg:p-8">
        <AnimatedSection>
          {/* Header */}
          <div className="mb-12 pt-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent">
                {getGreeting()}, {user?.name?.split(' ')[0] || 'Usuário'}!
              </span>
              <span className="ml-3">👋</span>
            </h1>
            <p className="text-xl text-gray-400 font-light">
              Aqui está um resumo das suas métricas de hoje
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <AnimatedSection key={metric.title} delay={index * 0.1}>
                  <div className="group relative">
                    {/* Glow effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${metric.borderGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition duration-1000 blur`}></div>
                    
                    <div className={`relative bg-gradient-to-br ${metric.bgGradient} backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-300`}>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg shadow-black/25`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className={`flex items-center text-sm font-semibold ${
                          metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {metric.trend === 'up' ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          {metric.change}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {metric.value}
                        </h3>
                        <p className="text-sm text-gray-400 font-medium">
                          {metric.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Chart Area */}
            <AnimatedSection className="lg:col-span-2" delay={0.4}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600/50 to-secondary-600/50 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-1000 blur"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Performance dos Últimos 30 Dias
                    </h2>
                    <button className="text-primary-400 hover:text-primary-300 text-sm font-semibold px-4 py-2 rounded-lg bg-primary-500/10 border border-primary-500/30 hover:bg-primary-500/20 transition-all">
                      Ver detalhes
                    </button>
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="h-80 bg-gradient-to-br from-gray-900/80 to-gray-800/40 rounded-xl border border-gray-700/50 flex items-center justify-center backdrop-blur">
                    <div className="text-center">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full opacity-20 blur-xl"></div>
                        <BarChart3 className="relative h-16 w-16 text-primary-400 mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Gráfico Interativo</h3>
                      <p className="text-gray-400 mb-4">
                        Dados em tempo real serão exibidos aqui
                      </p>
                      <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Visualizar dados
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Recent Activity */}
            <AnimatedSection delay={0.6}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600/50 to-teal-600/50 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-1000 blur"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">
                    Atividades Recentes
                  </h2>
                  
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
                          <div className={`flex-shrink-0 p-2 rounded-lg ${
                            activity.status === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                            activity.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">
                              {activity.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button className="w-full mt-6 text-primary-400 hover:text-primary-300 text-sm font-semibold py-3 border-t border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    Ver todas as atividades
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Gerenciar Leads',
                description: 'Visualize e gerencie todos os seus leads qualificados',
                icon: Users,
                gradient: 'from-blue-600 to-cyan-600',
                bgGradient: 'from-blue-500/10 to-cyan-500/10',
                borderGradient: 'from-blue-500/50 to-cyan-500/50'
              },
              {
                title: 'Relatórios Avançados',
                description: 'Gere relatórios detalhados sobre performance e ROI',
                icon: FileText,
                gradient: 'from-emerald-600 to-teal-600',
                bgGradient: 'from-emerald-500/10 to-teal-500/10',
                borderGradient: 'from-emerald-500/50 to-teal-500/50'
              },
              {
                title: 'Analytics Premium',
                description: 'Análises avançadas com insights de machine learning',
                icon: Activity,
                gradient: 'from-violet-600 to-purple-600',
                bgGradient: 'from-violet-500/10 to-purple-500/10',
                borderGradient: 'from-violet-500/50 to-purple-500/50'
              }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <AnimatedSection key={action.title} delay={0.8 + index * 0.1}>
                  <div className="group relative cursor-pointer">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${action.borderGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition duration-1000 blur`}></div>
                    <div className={`relative bg-gradient-to-br ${action.bgGradient} backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-300 h-full`}>
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg shadow-black/25 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="ml-4 text-lg font-semibold text-white">
                          {action.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        {action.description}
                      </p>
                      <button className="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-300">
                        Acessar
                        <ArrowUpRight className="h-4 w-4 ml-1" />
                      </button>
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