'use client';

const footerLinks = [
  { label: 'Soluções', href: '#produto' },
  { label: 'Sirius CRM', href: '/sirius-crm' },
  { label: 'Orion ERP', href: '/orion-erp' },
  { label: 'Vértice Marketing', href: '/vertice-marketing' },
  { label: 'Sobre', href: '/about' },
  { label: 'Contato', href: '#contato' },
  { label: 'Política de Privacidade', href: '/privacidade' },
];

export default function Footer() {
  const handleLinkClick = (href: string) => {
    // Check if it's a hash link (anchor) or a route
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to the route
      window.location.href = href;
    }
  };

  return (
    <footer className="py-16 px-8 border-t border-white/10 bg-pure-black">
      <div className="max-w-content mx-auto text-center">
        {/* Logo */}
        <div className="text-2xl font-thin tracking-[0.3rem] text-pure-white mb-8">
          ROI LABS
        </div>

        {/* Tagline */}
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Ecossistema completo de soluções empresariais integradas
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {footerLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="text-sm text-text-secondary hover:text-pure-white link-elegant transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs text-text-tertiary tracking-wide">
          © 2025 ROI LABS. Todos os direitos reservados. Transformando negócios.
        </div>
      </div>
    </footer>
  );
}
