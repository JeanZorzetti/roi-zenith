import { useState } from 'react';
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
  Search
} from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', active: location.pathname === '/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics', active: location.pathname.startsWith('/dashboard/analytics') },
    { icon: Users, label: 'Leads', path: '/dashboard/leads', active: location.pathname.startsWith('/dashboard/leads') },
    { icon: FileText, label: 'Relatórios', path: '/dashboard/reports', active: location.pathname.startsWith('/dashboard/reports') },
    { icon: Settings, label: 'Configurações', path: '/dashboard/settings', active: location.pathname.startsWith('/dashboard/settings') },
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

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50 transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-800/50">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              ROI Labs
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${item.active 
                      ? 'bg-gradient-to-r from-primary-600/20 to-secondary-600/20 text-primary-400 border border-primary-500/30 shadow-lg shadow-primary-500/10' 
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white group'
                    }
                  `}
                >
                  <Icon className={`mr-3 h-5 w-5 transition-transform duration-200 ${item.active ? '' : 'group-hover:scale-110'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800/50">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`
              inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
              ${user?.role === 'admin' 
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                : user?.role === 'client'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
              }
            `}>
              {user?.role === 'admin' ? 'Admin' : user?.role === 'client' ? 'Cliente' : 'Trial'}
            </span>
            
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
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
            <div className="flex-1 max-w-lg mx-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User avatar */}
              <div className="h-8 w-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="h-4 w-4 text-white" />
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