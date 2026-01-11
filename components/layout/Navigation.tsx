'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Users, Building2, TrendingUp, Factory, Calculator, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { label: 'Soluções', path: '#', hasDropdown: true },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Contato', path: '/contato' },
  { label: 'Preços', path: '/precos' },
];

const solutionsDropdown = [
  {
    name: 'Sirius CRM',
    path: '/sirius-crm',
    status: 'available' as const,
    description: 'Gestão completa de relacionamento com clientes',
    icon: Users,
    color: 'text-blue-400',
  },
  {
    name: 'Orion ERP',
    path: '/orion-erp',
    status: 'available' as const,
    description: 'Sistema integrado de gestão empresarial',
    icon: Building2,
    color: 'text-purple-400',
  },
  {
    name: 'Vértice Marketing',
    path: '/vertice-marketing',
    status: 'available' as const,
    description: 'Automação e análise de marketing digital',
    icon: TrendingUp,
    color: 'text-green-400',
  },
  {
    name: 'PCP Industrial',
    path: '/pcp-industrial',
    status: 'coming-soon' as const,
    description: 'Planejamento e controle de produção',
    icon: Factory,
    color: 'text-orange-400',
  },
  {
    name: 'BPO Financeiro',
    path: '/bpo-financeiro',
    status: 'coming-soon' as const,
    description: 'Terceirização de processos financeiros',
    icon: Calculator,
    color: 'text-yellow-400',
  },
];

export default function Navigation({ className = '' }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

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
        <Link href="/" className="flex items-center gap-4 group">
          <div className="text-xl font-thin tracking-[0.3rem] text-pure-white group-hover:opacity-70 transition-opacity">
            ROI LABS
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navigationItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setDropdownOpen(true)}
                onMouseLeave={() => item.hasDropdown && setDropdownOpen(false)}
              >
                {item.hasDropdown ? (
                  <button
                    className={`text-sm font-light tracking-wide transition-colors flex items-center gap-1 ${
                      dropdownOpen
                        ? 'text-primary-400'
                        : 'text-text-secondary hover:text-pure-white'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        dropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={`text-sm font-light tracking-wide transition-colors ${
                      pathname === item.path
                        ? 'text-primary-400'
                        : 'text-text-secondary hover:text-pure-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Mega Menu Dropdown */}
                {item.hasDropdown && dropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]">
                    <div className="glass-card p-6 shadow-2xl">
                      {/* Solutions Grid */}
                      <div className="grid grid-cols-1 gap-3 mb-4">
                        {solutionsDropdown.map((solution) => (
                          <Link
                            key={solution.name}
                            href={solution.path}
                            className="flex items-start gap-4 p-4 rounded-lg transition-all hover:bg-white/5 group"
                          >
                            {/* Icon */}
                            <div
                              className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors ${solution.color}`}
                            >
                              <solution.icon className="w-5 h-5" />
                            </div>

                            {/* Content */}
                            <div className="flex-grow">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-pure-white">
                                  {solution.name}
                                </span>
                                {solution.status === 'available' ? (
                                  <Badge variant="available" className="text-xs">
                                    Disponível
                                  </Badge>
                                ) : (
                                  <Badge variant="coming-soon" className="text-xs">
                                    Em breve
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-text-muted">{solution.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* View All Link */}
                      <div className="border-t border-white/10 pt-4">
                        <Link
                          href="/#produto"
                          className="text-sm text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-2"
                        >
                          Ver todas as soluções →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link
            href="/contato"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded text-sm font-light tracking-wide transition-all hover:scale-105"
          >
            Agendar Demo →
          </Link>
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
            {/* Soluções Section in Mobile */}
            <div className="space-y-2">
              <p className="text-sm text-text-secondary uppercase tracking-wider mb-3">
                Soluções
              </p>
              {solutionsDropdown.map((solution) => (
                <Link
                  key={solution.name}
                  href={solution.path}
                  onClick={handleMobileMenuClose}
                  className="flex items-center gap-3 py-3 px-3 rounded-lg transition-all hover:bg-white/5"
                >
                  <div
                    className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 ${solution.color}`}
                  >
                    <solution.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm ${
                          solution.status === 'coming-soon'
                            ? 'text-text-muted'
                            : 'text-pure-white'
                        }`}
                      >
                        {solution.name}
                      </span>
                      {solution.status === 'available' ? (
                        <Badge variant="available" className="text-xs">
                          Disponível
                        </Badge>
                      ) : (
                        <Badge variant="coming-soon" className="text-xs">
                          Em breve
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Other Navigation Items */}
            <div className="border-t border-gray-800 pt-4 space-y-2">
              {navigationItems
                .filter((item) => !item.hasDropdown)
                .map((item) => (
                  <Link
                    key={item.label}
                    href={item.path}
                    onClick={handleMobileMenuClose}
                    className={`block text-left transition-colors py-2 ${
                      pathname === item.path
                        ? 'text-primary-400'
                        : 'text-text-secondary hover:text-pure-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
            </div>

            {/* Mobile CTA */}
            <div className="border-t border-gray-800 pt-4">
              <Link
                href="/contato"
                onClick={handleMobileMenuClose}
                className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded text-sm font-light tracking-wide transition-colors"
              >
                Agendar Demo →
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
