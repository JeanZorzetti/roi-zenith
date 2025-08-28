import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import roiLabsLogo from '@/assets/roi-labs-logo.jpg';
import { useAuthStore } from '@/stores/authStore';
import { useAuthModals } from '@/hooks/useAuthModals';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';

interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { label: 'Início', path: '/home' },
  { label: 'Sobre', path: '/about' },
  { label: 'Produtos', path: '/products' },
  { label: 'Soluções', path: '/solutions' },
  { label: 'Recursos', path: '/resources' },
  { label: 'Contato', path: '/contact' },
];

export default function Navigation({ className = '' }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { loginOpen, registerOpen, openLogin, openRegister, closeAll } = useAuthModals();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuClose = () => {
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-4 bg-pure-black/95 backdrop-blur-xl border-b border-white/10'
          : 'py-8 bg-pure-black/70 backdrop-blur-sm'
      } ${className}`}
    >
      <div className="max-w-content mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-4 group">
          <img 
            src={roiLabsLogo} 
            alt="ROI LABS" 
            className="h-8 w-auto opacity-90 group-hover:opacity-70 transition-opacity"
          />
          <div className="text-xl font-thin tracking-[0.3rem] text-pure-white group-hover:opacity-70 transition-opacity hidden sm:block">
            ROI LABS
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`text-sm font-light tracking-wide transition-colors link-elegant ${
                    location.pathname === item.path 
                      ? 'text-primary-400' 
                      : 'text-text-secondary hover:text-pure-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* User Menu */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard"
                className="text-sm font-light tracking-wide text-text-secondary hover:text-pure-white transition-colors"
              >
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="text-sm font-light tracking-wide text-text-secondary hover:text-pure-white transition-colors"
              >
                Sair
              </button>
              <div className="flex items-center gap-2 text-primary-400">
                <User size={16} />
                <span className="text-sm">{user?.name}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={openLogin}
                className="text-sm font-light tracking-wide text-text-secondary hover:text-pure-white transition-colors"
              >
                Entrar
              </button>
              <button 
                onClick={openRegister}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Começar Grátis
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-pure-white hover:opacity-70 transition-opacity"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-pure-black/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-8 py-6 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={handleMobileMenuClose}
                className={`block text-left transition-colors py-2 ${
                  location.pathname === item.path 
                    ? 'text-primary-400' 
                    : 'text-text-secondary hover:text-pure-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile User Menu */}
            <div className="border-t border-gray-800 pt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={handleMobileMenuClose}
                    className="block text-left text-text-secondary hover:text-pure-white transition-colors py-2"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      handleMobileMenuClose();
                    }}
                    className="block w-full text-left text-text-secondary hover:text-pure-white transition-colors py-2"
                  >
                    Sair
                  </button>
                  <div className="flex items-center gap-2 text-primary-400 py-2">
                    <User size={16} />
                    <span className="text-sm">{user?.name}</span>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      openLogin();
                      handleMobileMenuClose();
                    }}
                    className="block w-full text-left text-text-secondary hover:text-pure-white transition-colors py-2"
                  >
                    Entrar
                  </button>
                  <button 
                    onClick={() => {
                      openRegister();
                      handleMobileMenuClose();
                    }}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded text-sm transition-colors w-full"
                  >
                    Começar Grátis
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Auth Modals */}
      <LoginModal
        isOpen={loginOpen}
        onClose={closeAll}
        onSwitchToRegister={openRegister}
      />
      <RegisterModal
        isOpen={registerOpen}
        onClose={closeAll}
        onSwitchToLogin={openLogin}
      />
    </nav>
  );
}