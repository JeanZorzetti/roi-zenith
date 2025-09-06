import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Key,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Trash2,
  Download,
  Upload,
  Crown,
  Sparkles,
  Zap,
  AlertTriangle,
  CheckCircle,
  Camera,
  Building,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Unlock,
  Monitor,
  Moon,
  Sun
} from 'lucide-react';

const SettingsPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Profile Settings
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    position: user?.position || '',
    phone: '+55 11 99999-9999',
    location: 'São Paulo, SP',
    timezone: 'America/Sao_Paulo',
    avatar: null as File | null
  });

  // Account Settings
  const [accountSettings, setAccountSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: '30',
    dataRetention: '365'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    marketingEmails: true,
    weeklyReports: true,
    realTimeAlerts: true,
    leadNotifications: true,
    systemUpdates: false
  });

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    theme: 'dark',
    language: 'pt-BR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: 'BRL',
    autoSave: true,
    compactMode: false,
    animationsEnabled: true
  });

  // Subscription Settings
  const [subscriptionData] = useState({
    plan: 'Premium',
    status: 'active',
    nextBilling: '2024-12-30',
    amount: 'R$ 297,00',
    features: ['IA Avançada', 'Relatórios Ilimitados', 'Suporte Premium', 'API Access']
  });

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User, description: 'Informações pessoais e profissionais' },
    { id: 'account', label: 'Conta', icon: Shield, description: 'Segurança e privacidade' },
    { id: 'notifications', label: 'Notificações', icon: Bell, description: 'Preferências de comunicação' },
    { id: 'system', label: 'Sistema', icon: Settings, description: 'Interface e experiência' },
    { id: 'billing', label: 'Assinatura', icon: CreditCard, description: 'Plano e faturamento' }
  ];

  const saveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setHasChanges(false);
  };

  const handleProfileChange = (field: string, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleAccountChange = (field: string, value: any) => {
    setAccountSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSystemChange = (field: string, value: any) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/30 to-secondary-600/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary-400" />
                  Foto do Perfil
                </h3>
                
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <User className="h-12 w-12 text-white" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                      <Camera className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <button className="px-4 py-2 rounded-xl bg-primary-500/20 border border-primary-500/40 text-primary-300 hover:bg-primary-500/30 transition-all duration-300 font-bold">
                      Alterar Foto
                    </button>
                    <p className="text-xs text-gray-500">JPG, PNG ou GIF. Máximo 5MB.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-400" />
                  Informações Pessoais
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Nome Completo</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Empresa</label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => handleProfileChange('company', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Cargo</label>
                    <input
                      type="text"
                      value={profileData.position}
                      onChange={(e) => handleProfileChange('position', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Localização</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-8">
            {/* Security Settings */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-400" />
                  Segurança da Conta
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Senha Atual</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={accountSettings.currentPassword}
                          onChange={(e) => handleAccountChange('currentPassword', e.target.value)}
                          className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Nova Senha</label>
                      <input
                        type="password"
                        value={accountSettings.newPassword}
                        onChange={(e) => handleAccountChange('newPassword', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Confirmar Senha</label>
                      <input
                        type="password"
                        value={accountSettings.confirmPassword}
                        onChange={(e) => handleAccountChange('confirmPassword', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
                          <Smartphone className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">Autenticação de Dois Fatores</h4>
                          <p className="text-sm text-gray-400">Proteja sua conta com verificação adicional</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={accountSettings.twoFactorEnabled}
                          onChange={(e) => handleAccountChange('twoFactorEnabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data & Privacy */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-400" />
                  Privacidade & Dados
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Timeout de Sessão</label>
                    <select
                      value={accountSettings.sessionTimeout}
                      onChange={(e) => handleAccountChange('sessionTimeout', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="15">15 minutos</option>
                      <option value="30">30 minutos</option>
                      <option value="60">1 hora</option>
                      <option value="240">4 horas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Retenção de Dados</label>
                    <select
                      value={accountSettings.dataRetention}
                      onChange={(e) => handleAccountChange('dataRetention', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="90">90 dias</option>
                      <option value="180">6 meses</option>
                      <option value="365">1 ano</option>
                      <option value="1095">3 anos</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <button className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 transition-all duration-300 font-bold flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Exportar Dados
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 transition-all duration-300 font-bold flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Excluir Conta
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-8">
            {/* Email Notifications */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-400" />
                  Notificações por Email
                </h3>
                
                <div className="space-y-4">
                  {Object.entries({
                    emailNotifications: 'Notificações Gerais',
                    marketingEmails: 'Emails de Marketing',
                    weeklyReports: 'Relatórios Semanais',
                    leadNotifications: 'Novos Leads',
                    systemUpdates: 'Atualizações do Sistema'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/20 hover:border-gray-600/30 transition-all duration-300">
                      <span className="font-medium text-white">{label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[key as keyof typeof notificationSettings]}
                          onChange={(e) => handleNotificationChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Push & SMS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 to-green-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
                  <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-emerald-400" />
                    Push
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">Notificações Push</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.pushNotifications}
                          onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">Alertas em Tempo Real</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.realTimeAlerts}
                          onChange={(e) => handleNotificationChange('realTimeAlerts', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
                  <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-orange-400" />
                    SMS
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">Notificações SMS</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.smsNotifications}
                          onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="space-y-8">
            {/* Appearance */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-400" />
                  Aparência
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3">Tema</label>
                    <div className="flex gap-3">
                      {[
                        { value: 'dark', label: 'Escuro', icon: Moon },
                        { value: 'light', label: 'Claro', icon: Sun },
                        { value: 'auto', label: 'Auto', icon: Monitor }
                      ].map((theme) => {
                        const Icon = theme.icon;
                        return (
                          <button
                            key={theme.value}
                            onClick={() => handleSystemChange('theme', theme.value)}
                            className={`flex-1 p-4 rounded-xl border transition-all duration-300 ${
                              systemSettings.theme === theme.value
                                ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                                : 'bg-gray-800/30 border-gray-700/30 text-gray-400 hover:border-gray-600/50'
                            }`}
                          >
                            <Icon className="h-5 w-5 mx-auto mb-2" />
                            <div className="text-xs font-bold">{theme.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Idioma</label>
                    <select
                      value={systemSettings.language}
                      onChange={(e) => handleSystemChange('language', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es-ES">Español</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Moeda</label>
                    <select
                      value={systemSettings.currency}
                      onChange={(e) => handleSystemChange('currency', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="BRL">Real (R$)</option>
                      <option value="USD">Dólar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-cyan-400" />
                  Experiência
                </h3>
                
                <div className="space-y-4">
                  {Object.entries({
                    autoSave: 'Salvamento Automático',
                    compactMode: 'Modo Compacto',
                    animationsEnabled: 'Animações'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/20 hover:border-gray-600/30 transition-all duration-300">
                      <span className="font-medium text-white">{label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={systemSettings[key as keyof typeof systemSettings] as boolean}
                          onChange={(e) => handleSystemChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-8">
            {/* Current Plan */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 shadow-lg">
                      <Crown className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Plano {subscriptionData.plan}</h3>
                      <p className="text-sm text-gray-400">Status: {subscriptionData.status === 'active' ? 'Ativo' : 'Inativo'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-white">{subscriptionData.amount}</div>
                    <div className="text-sm text-gray-400">por mês</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {subscriptionData.features.map((feature, index) => (
                    <div key={index} className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/20 text-center">
                      <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                      <div className="text-sm font-medium text-white">{feature}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-300">
                      Próximo faturamento: {new Date(subscriptionData.nextBilling).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/30 transition-all duration-300 font-bold">
                    Gerenciar
                  </button>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-green-400" />
                  Histórico de Pagamentos
                </h3>
                
                <div className="space-y-4">
                  {[
                    { date: '2024-11-30', amount: 'R$ 297,00', status: 'Pago' },
                    { date: '2024-10-30', amount: 'R$ 297,00', status: 'Pago' },
                    { date: '2024-09-30', amount: 'R$ 297,00', status: 'Pago' }
                  ].map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/20">
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                        <div>
                          <div className="font-medium text-white">{payment.amount}</div>
                          <div className="text-sm text-gray-400">{new Date(payment.date).toLocaleDateString('pt-BR')}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          {payment.status}
                        </span>
                        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-screen bg-pure-black text-pure-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-primary-300 to-secondary-300 bg-clip-text text-transparent">
            Configurações
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferências do sistema e configurações da conta
          </p>
        </div>

        {hasChanges && (
          <button
            onClick={saveSettings}
            disabled={isLoading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 hover:scale-105 flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-2 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-2xl transition-all duration-300 text-left ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/50 text-white'
                      : 'hover:bg-gray-800/50 text-gray-400 hover:text-white border border-transparent'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-2" />
                  <div className="font-bold text-sm">{tab.label}</div>
                  <div className="text-xs opacity-70 hidden md:block">{tab.description}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default SettingsPage;