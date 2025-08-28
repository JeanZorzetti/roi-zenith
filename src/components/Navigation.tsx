import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import roiLabsLogo from '@/assets/roi-labs-logo.jpg';

interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { label: 'Produto', href: '#produto' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Contato', href: '#contato' },
];

export default function Navigation({ className = '' }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
        <div className="flex items-center gap-4 group cursor-pointer">
          <img 
            src={roiLabsLogo} 
            alt="ROI LABS" 
            className="h-8 w-auto opacity-90 group-hover:opacity-70 transition-opacity"
          />
          <div className="text-xl font-thin tracking-[0.3rem] text-pure-white group-hover:opacity-70 transition-opacity hidden sm:block">
            ROI LABS
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-12">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-light tracking-wide text-text-secondary hover:text-pure-white link-elegant transition-colors"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

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
          <ul className="px-8 py-6 space-y-4">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-text-secondary hover:text-pure-white transition-colors py-2"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}