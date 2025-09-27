import React from 'react';
import { ActivityStats } from '../../types/Activity';
import { useActivityStats } from '../../hooks/useActivity';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, Users, Clock, Target, Award, Calendar } from 'lucide-react';

interface ActivityAnalyticsProps {
  boardId?: string;
  timeRange?: '7d' | '30d' | '90d';
}

export const ActivityAnalytics: React.FC<ActivityAnalyticsProps> = ({
  boardId,
  timeRange = '30d'
}) => {
  const { stats, loading } = useActivityStats(boardId);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3">Carregando analytics...</span>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center p-8 text-gray-400">
        <BarChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Nenhum dado disponível</p>
      </div>
    );
  }

  // Preparar dados para gráficos
  const activityTypeData = Object.entries(stats.activitiesByType).map(([type, count]) => ({
    name: type.replace('-', ' '),
    value: count,
    fullName: type
  }));

  const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
    hour: `${hour.toString().padStart(2, '0')}:00`,
    activities: stats.activitiesByHour[hour] || 0
  }));

  const dailyData = Object.entries(stats.activitiesByDay)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, count]) => ({
      date: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      activities: count,
      fullDate: date
    }))
    .slice(-7); // Últimos 7 dias

  const weeklyData = Object.entries(stats.activitiesByWeek)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([week, count]) => ({
      week: new Date(week).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      activities: count
    }));

  // Cores para gráficos
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
  ];

  // Métricas de resumo
  const metrics = [
    {
      label: 'Total de Atividades',
      value: stats.totalActivities,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-blue-400',
      change: '+12%'
    },
    {
      label: 'Usuário Mais Ativo',
      value: stats.mostActiveUser.name || 'N/A',
      icon: <Users className="w-5 h-5" />,
      color: 'text-green-400',
      subtitle: `${stats.mostActiveUser.count} atividades`
    },
    {
      label: 'Horário de Pico',
      value: `${stats.peakHour}:00`,
      icon: <Clock className="w-5 h-5" />,
      color: 'text-purple-400',
      subtitle: 'Mais ativo'
    },
    {
      label: 'Média Diária',
      value: Math.round(stats.averageActivitiesPerDay),
      icon: <Target className="w-5 h-5" />,
      color: 'text-yellow-400',
      subtitle: 'atividades/dia'
    },
    {
      label: 'Streak Atual',
      value: stats.streak.current,
      icon: <Award className="w-5 h-5" />,
      color: 'text-red-400',
      subtitle: `Recorde: ${stats.streak.longest} dias`
    },
    {
      label: 'Dia Mais Produtivo',
      value: stats.peakDay ? new Date(stats.peakDay).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : 'N/A',
      icon: <Calendar className="w-5 h-5" />,
      color: 'text-indigo-400',
      subtitle: 'Maior atividade'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Métricas de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`${metric.color}`}>
                {metric.icon}
              </div>
              {metric.change && (
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                  {metric.change}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white">
                {metric.value}
              </div>
              <div className="text-sm text-gray-400">
                {metric.label}
              </div>
              {metric.subtitle && (
                <div className="text-xs text-gray-500">
                  {metric.subtitle}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades por tipo */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Tipos de Atividade
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={activityTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {activityTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                formatter={(value: any) => [value, 'Atividades']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Atividades por hora */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Atividade por Horário
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="hour"
                stroke="#9CA3AF"
                fontSize={12}
                interval={2}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Area
                type="monotone"
                dataKey="activities"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Atividades por dia */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Últimos 7 Dias
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Line
                type="monotone"
                dataKey="activities"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribuição por usuário */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Atividade por Usuário
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={Object.entries(stats.activitiesByUser).map(([userId, count]) => ({
                user: userId.slice(-8), // Últimos 8 caracteres do ID
                activities: count
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="user"
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Bar
                dataKey="activities"
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights e recomendações */}
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Insights e Recomendações
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <h4 className="text-white font-medium">Pico de Produtividade</h4>
                <p className="text-sm text-gray-400">
                  Seu horário mais produtivo é às {stats.peakHour}:00.
                  Considere agendar tarefas importantes neste período.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div>
                <h4 className="text-white font-medium">Consistência</h4>
                <p className="text-sm text-gray-400">
                  Você tem um streak de {stats.streak.current} dias.
                  Seu recorde é {stats.streak.longest} dias!
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <div>
                <h4 className="text-white font-medium">Colaboração</h4>
                <p className="text-sm text-gray-400">
                  {stats.mostActiveUser.name} é o usuário mais ativo com {stats.mostActiveUser.count} atividades.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
              <div>
                <h4 className="text-white font-medium">Meta Diária</h4>
                <p className="text-sm text-gray-400">
                  Sua média é {Math.round(stats.averageActivitiesPerDay)} atividades por dia.
                  Continue assim!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityAnalytics;