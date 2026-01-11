'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Github, Youtube, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const footerSections = {
  solutions: [
    { label: 'Sirius CRM', href: '/sirius-crm' },
    { label: 'Orion ERP', href: '/orion-erp' },
    { label: 'Vértice Marketing', href: '/vertice-marketing' },
    { label: 'PCP Industrial', href: '/pcp-industrial' },
    { label: 'BPO Financeiro', href: '/bpo-financeiro' },
  ],
  company: [
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
    { label: 'Preços', href: '/precos' },
    { label: 'Blog', href: '#' },
  ],
  resources: [
    { label: 'Documentação', href: '#' },
    { label: 'Central de Ajuda', href: '#' },
    { label: 'Status', href: '#' },
    { label: 'API', href: '#' },
  ],
  legal: [
    { label: 'Privacidade', href: '/privacidade' },
    { label: 'Termos de Serviço', href: '/termos' },
    { label: 'Cookies', href: '#' },
    { label: 'LGPD', href: '#' },
  ],
};

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'YouTube', href: '#', icon: Youtube },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Por favor, insira um e-mail válido');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement newsletter subscription API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Inscrição realizada com sucesso!');
      setEmail('');
    } catch (error) {
      toast.error('Erro ao realizar inscrição. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-pure-black border-t border-white/10">
      {/* Newsletter Section */}
      <div className="border-b border-white/10 bg-gradient-to-b from-gray-950 to-pure-black">
        <div className="max-w-content mx-auto px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-h3 font-light mb-3">Fique por dentro das novidades</h3>
            <p className="text-sm text-text-secondary mb-6">
              Receba atualizações sobre novos recursos, dicas e insights sobre gestão empresarial
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-grow px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-pure-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 text-white px-6 py-3 rounded-lg text-sm font-light tracking-wide transition-all hover:scale-105 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Inscrevendo...' : 'Inscrever'}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <p className="text-xs text-text-muted mt-3">
              Ao se inscrever, você concorda com nossa{' '}
              <Link href="/privacidade" className="text-primary-400 hover:text-primary-300">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-content mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="text-2xl font-thin tracking-[0.3rem] text-pure-white">
                ROI LABS
              </div>
            </Link>
            <p className="text-sm text-text-secondary mb-6 max-w-xs">
              Ecossistema completo de soluções empresariais integradas para transformar seu negócio
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-secondary hover:text-primary-400 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-sm font-medium text-pure-white mb-4">Soluções</h4>
            <ul className="space-y-3">
              {footerSections.solutions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-pure-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-medium text-pure-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerSections.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-pure-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-medium text-pure-white mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerSections.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-pure-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-medium text-pure-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerSections.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-pure-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © 2026 ROI Labs Tecnologia Ltda. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-text-muted">
              Feito com ❤️ no Brasil
            </span>
            <span className="text-xs text-text-muted">
              CNPJ: 00.000.000/0001-00
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
