import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  User,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Crown,
  Sparkles,
  Zap,
  Shield
} from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const searchableItems = [
    { title: 'Dashboard', description: 'Visão geral e métricas principais', path: '/dashboard', type: 'page' },
    { title: 'Analytics', description: 'Análises avançadas com IA', path: '/dashboard/analytics', type: 'page' },
    { title: 'Leads', description: 'Gestão completa de leads', path: '/dashboard/leads', type: 'page' },
    { title: 'Relatórios', description: 'Documentos e insights', path: '/dashboard/reports', type: 'page' },
    { title: 'Configurações', description: 'Preferências do sistema', path: '/dashboard/settings', type: 'page' }
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = searchableItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSelect = (item: any) => {
    navigate(item.path);
    setSearchTerm('');
    setSearchResults([]);
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications && !(event.target as Element).closest('.notifications-dropdown')) {
        setShowNotifications(false);
      }
      if (showProfileMenu && !(event.target as Element).closest('.profile-dropdown')) {
        setShowProfileMenu(false);
      }
      if (searchResults.length > 0 && !(event.target as Element).closest('.search-container')) {
        setSearchResults([]);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications, showProfileMenu, searchResults]);

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard', 
      active: location.pathname === '/dashboard',
      description: 'Visão geral',
      badge: 'Live'
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      path: '/dashboard/analytics', 
      active: location.pathname.startsWith('/dashboard/analytics'),
      description: 'Relatórios avançados',
      badge: 'IA'
    },
    { 
      icon: Users, 
      label: 'Leads', 
      path: '/dashboard/leads', 
      active: location.pathname.startsWith('/dashboard/leads'),
      description: 'Gestão de leads',
      count: 0
    },
    { 
      icon: FileText, 
      label: 'Relatórios', 
      path: '/dashboard/reports', 
      active: location.pathname.startsWith('/dashboard/reports'),
      description: 'Documentos e insights',
      count: 0
    },
    { 
      icon: Settings, 
      label: 'Configurações', 
      path: '/dashboard/settings', 
      active: location.pathname.startsWith('/dashboard/settings'),
      description: 'Preferências do sistema'
    },
  ];

  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Premium Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-gray-900/95 via-gray-900/98 to-black/95 backdrop-blur-2xl border-r border-gray-700/30 transform transition-all duration-500 ease-out lg:translate-x-0 shadow-2xl shadow-black/50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-0 w-40 h-40 bg-secondary-500/8 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-24 h-48 bg-gradient-to-b from-primary-600/5 to-secondary-600/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative h-full flex flex-col">
          {/* Premium Logo Section */}
          <div className="flex items-center justify-between h-24 px-8 border-b border-gray-700/20">
            <div className="flex items-center group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-400 to-secondary-500 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-white font-black text-xl">R</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-black bg-gradient-to-r from-white via-gray-100 to-primary-300 bg-clip-text text-transparent group-hover:from-primary-300 group-hover:to-secondary-300 transition-all duration-500">
                  ROI Labs
                </h1>
                <p className="text-xs text-gray-400 font-medium">Intelligence Platform</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Premium Card */}
          <div className="px-8 py-6 border-b border-gray-700/20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-5 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="h-14 w-14 bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                      <User className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <Crown className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-base truncate group-hover:text-primary-300 transition-colors duration-300">
                      {user?.name || 'Usuário Premium'}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">
                      {user?.email || 'premium@roilabs.com'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700/30">
                  <div className="flex items-center space-x-2">
                    <span className={`
                      inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold border
                      ${user?.role === 'admin' 
                        ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 border-purple-500/40' 
                        : user?.role === 'client'
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border-blue-500/40'
                        : 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-300 border-yellow-500/40'
                      }
                    `}>
                      {user?.role === 'admin' ? (
                        <>
                          <Crown className="h-3 w-3 mr-1" />
                          Admin
                        </>
                      ) : user?.role === 'client' ? (
                        <>
                          <Shield className="h-3 w-3 mr-1" />
                          Pro
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3 w-3 mr-1" />
                          Trial
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-emerald-400 font-medium">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Navigation */}
          <nav className="flex-1 px-6 py-6">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.path} className="relative group">
                    <div className={`absolute -inset-1 bg-gradient-to-r rounded-2xl transition-all duration-500 blur-sm ${
                      item.active 
                        ? 'from-primary-600/30 to-secondary-600/30 opacity-100' 
                        : 'from-primary-600/20 to-secondary-600/20 opacity-0 group-hover:opacity-100'
                    }`}></div>
                    
                    <button
                      onClick={() => {
                        navigate(item.path);
                        setSidebarOpen(false);
                      }}
                      className={`
                        relative w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-500 group-hover:scale-[1.02]
                        ${item.active 
                          ? 'bg-gradient-to-r from-primary-600/20 to-secondary-600/20 border border-primary-500/40 shadow-lg shadow-primary-500/10' 
                          : 'hover:bg-gray-800/50 border border-transparent group-hover:border-gray-700/50'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl transition-all duration-500 ${
                          item.active 
                            ? 'bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/25' 
                            : 'bg-gray-800/50 group-hover:bg-gray-700/50 group-hover:scale-110'
                        }`}>
                          <Icon className={`h-5 w-5 transition-all duration-300 ${
                            item.active ? 'text-white' : 'text-gray-400 group-hover:text-white'
                          }`} />
                        </div>
                        <div className="text-left">
                          <div className={`font-bold text-sm transition-colors duration-300 ${
                            item.active ? 'text-white' : 'text-gray-300 group-hover:text-white'
                          }`}>
                            {item.label}
                          </div>
                          <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            item.badge === 'Live' 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        {item.count && (
                          <span className="bg-primary-500/20 text-primary-400 px-2 py-1 rounded-lg text-xs font-bold border border-primary-500/40">
                            {item.count}
                          </span>
                        )}
                        <ChevronRight className={`h-4 w-4 transition-all duration-300 ${
                          item.active ? 'text-primary-400 rotate-90' : 'text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1'
                        }`} />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Premium Stats Section */}
          <div className="px-8 py-6 border-t border-gray-700/20">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Performance Hoje</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 group">
                  <div className="text-lg font-black text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    0%
                  </div>
                  <div className="text-xs text-gray-500">IA Score</div>
                </div>
                <div className="text-center p-3 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 group">
                  <div className="text-lg font-black text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    0%
                  </div>
                  <div className="text-xs text-gray-500">ROI Médio</div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Logout Section */}
          <div className="px-8 py-6 border-t border-gray-700/20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 text-red-400 hover:from-red-500/20 hover:to-red-600/20 hover:border-red-500/40 hover:text-red-300 transition-all duration-500 group hover:scale-[1.02]"
            >
              <LogOut className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-bold">Sair da Plataforma</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-80">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50">
          <div className="flex items-center justify-between h-20 px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-6 search-container">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar leads, relatórios, páginas..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                />
                
                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                    {searchResults.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearchSelect(item)}
                        className="w-full text-left p-4 hover:bg-gray-800/50 transition-colors border-b border-gray-700/30 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            item.type === 'page' ? 'bg-blue-500' :
                            item.type === 'lead' ? 'bg-green-500' :
                            item.type === 'report' ? 'bg-purple-500' :
                            item.type === 'campaign' ? 'bg-orange-500' : 'bg-cyan-500'
                          }`}></div>
                          <div className="flex-1">
                            <div className="font-medium text-white">{item.title}</div>
                            <div className="text-sm text-gray-400">{item.description}</div>
                          </div>
                          <div className="text-xs text-gray-500 capitalize">{item.type}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative notifications-dropdown">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-700/30">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white">Notificações</h3>
                        <span className="text-sm text-gray-400">{unreadCount} não lidas</span>
                      </div>
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <button
                            key={notification.id}
                            onClick={() => markNotificationAsRead(notification.id)}
                            className={`w-full text-left p-4 hover:bg-gray-800/30 transition-colors border-b border-gray-700/20 last:border-b-0 ${
                              notification.unread ? 'bg-gray-800/10' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                                notification.type === 'lead' ? 'bg-green-500' :
                                notification.type === 'success' ? 'bg-emerald-500' :
                                notification.type === 'report' ? 'bg-blue-500' :
                                notification.type === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                              }`}></div>
                              <div className="flex-1 min-w-0">
                                <div className={`font-medium ${notification.unread ? 'text-white' : 'text-gray-300'}`}>
                                  {notification.title}
                                </div>
                                <div className="text-sm text-gray-400 mt-1 line-clamp-2">
                                  {notification.message}
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                  {notification.time}
                                </div>
                              </div>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2"></div>
                              )}
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                          <div className="text-gray-400 font-medium">Nenhuma notificação</div>
                          <div className="text-sm text-gray-500 mt-1">Você está em dia!</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 border-t border-gray-700/30">
                      <button className="w-full text-center text-sm text-primary-400 hover:text-primary-300 font-medium">
                        Ver todas as notificações
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative profile-dropdown">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="h-8 w-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                  <User className="h-4 w-4 text-white" />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-gray-700/30">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-white">{user?.name || 'Usuário'}</div>
                          <div className="text-sm text-gray-400">{user?.email || 'user@roilabs.com'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button
                        onClick={() => {
                          navigate('/dashboard/settings');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Configurações</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate('/dashboard');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </button>
                      
                      <div className="border-t border-gray-700/30 my-2"></div>
                      
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sair</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 pt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;