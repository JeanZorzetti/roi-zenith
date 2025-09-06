import { useAuthStore } from '@/stores/authStore';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign,
  Target,
  Clock
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
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/50'
    },
    {
      title: 'Taxa de Conversão',
      value: '24.8%',
      change: '+3.2%',
      trend: 'up',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/50'
    },
    {
      title: 'ROI Médio',
      value: '342%',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/50'
    },
    {
      title: 'Tempo Médio de Ciclo',
      value: '14 dias',
      change: '-2 dias',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/50'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'lead', message: 'Novo lead qualificado: Tech Corp', time: '2 min atrás', status: 'success' },
    { id: 2, type: 'conversion', message: 'Conversão realizada: StartupX', time: '15 min atrás', status: 'success' },
    { id: 3, type: 'report', message: 'Relatório mensal gerado', time: '1 hora atrás', status: 'info' },
    { id: 4, type: 'alert', message: 'Meta de conversão atingida!', time: '2 horas atrás', status: 'warning' }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Aqui está um resumo das suas métricas hoje
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.title} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
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
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {metric.value}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart Placeholder */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Performance dos Últimos 30 Dias
              </h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Ver detalhes
              </button>
            </div>
            
            {/* Mock Chart */}
            <div className="h-80 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Gráfico de Performance</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Dados em tempo real serão exibidos aqui
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Atividades Recentes
            </h2>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 text-primary-600 hover:text-primary-700 text-sm font-medium py-2 border-t border-gray-200 dark:border-gray-700">
              Ver todas as atividades
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                Gerenciar Leads
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Visualize e gerencie todos os seus leads em um só lugar
            </p>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Acessar leads →
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                Relatórios
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Gere relatórios detalhados sobre performance e ROI
            </p>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Gerar relatório →
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                Analytics
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Análises avançadas e insights de performance
            </p>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Ver analytics →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;