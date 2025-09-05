const footerLinks = [
  { label: 'Produto', href: '#produto' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Empresa', href: '#empresa' },
  { label: 'Blog', href: '#blog' },
  { label: 'Carreiras', href: '#carreiras' },
  { label: 'Contato', href: '#contato' },
];

export default function Footer() {
  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-16 px-8 border-t border-white/10 bg-pure-black">
      <div className="max-w-content mx-auto text-center">
        {/* Logo */}
        <div className="text-2xl font-thin tracking-[0.3rem] text-pure-white mb-8">
          ROI LABS
        </div>
        
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
          © 2025 ROI LABS. Todos os direitos reservados. Inteligência redefinida.
        </div>
      </div>
    </footer>
  );
}