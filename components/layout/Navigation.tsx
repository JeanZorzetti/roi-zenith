'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { label: 'Soluções', path: '#', hasDropdown: true },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Contato', path: '/contato' },
  { label: 'Preços', path: '/precos' },
];

// TODO: Implementar dropdown de soluções conforme wireframes
const solutionsDropdown = [
  { name: 'Sirius CRM', path: '/sirius-crm', status: 'available' },
  { name: 'Orion ERP', path: '/orion-erp', status: 'available' },
  { name: 'Vértice Marketing', path: '/vertice-marketing', status: 'available' },
  { name: 'PCP Industrial', path: '/pcp-industrial', status: 'coming-soon' },
  { name: 'BPO Financeiro', path: '/bpo-financeiro', status: 'coming-soon' },
];

export default function Navigation({ className = '' }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
              <li key={item.label}>
                <Link
                  href={item.path}
                  className={`text-sm font-light tracking-wide transition-colors link-elegant ${
                    pathname === item.path
                      ? 'text-primary-400'
                      : 'text-text-secondary hover:text-pure-white'
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && ' ▼'}
                </Link>
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
              <p className="text-sm text-text-secondary uppercase tracking-wider">Soluções</p>
              {solutionsDropdown.map((solution) => (
                <Link
                  key={solution.name}
                  href={solution.path}
                  onClick={handleMobileMenuClose}
                  className={`block text-left transition-colors py-2 ${
                    solution.status === 'coming-soon'
                      ? 'text-text-muted'
                      : 'text-text-secondary hover:text-pure-white'
                  }`}
                >
                  {solution.status === 'available' && '● '}
                  {solution.status === 'coming-soon' && '○ '}
                  {solution.name}
                </Link>
              ))}
            </div>

            {/* Other Navigation Items */}
            <div className="border-t border-gray-800 pt-4 space-y-2">
              {navigationItems.filter(item => !item.hasDropdown).map((item) => (
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
