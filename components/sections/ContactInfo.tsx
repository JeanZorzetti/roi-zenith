import { Mail, Phone, MapPin, Clock, Linkedin, Twitter, Github, Youtube } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div className="glass-card p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Email</p>
            <a
              href="mailto:contato@roilabs.com.br"
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              contato@roilabs.com.br
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Telefone</p>
            <a
              href="tel:+5511999999999"
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              +55 (11) 9999-9999
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Localização</p>
            <p className="text-sm text-text-muted">
              São Paulo, SP
              <br />
              Brasil
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Horário</p>
            <p className="text-sm text-text-muted">
              Seg-Sex: 9h-18h
              <br />
              Sáb: 9h-13h
            </p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="glass-card p-6">
        <p className="text-sm font-medium mb-4">Redes Sociais</p>
        <div className="flex gap-3">
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Central de Ajuda */}
      <div className="glass-card p-6 space-y-4">
        <p className="text-sm font-medium mb-4">Central de Ajuda</p>

        <a
          href="#"
          className="flex items-center gap-3 text-sm text-text-secondary hover:text-pure-white transition-colors"
        >
          <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">📚</div>
          <span>Documentação</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 text-sm text-text-secondary hover:text-pure-white transition-colors"
        >
          <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">💬</div>
          <span>Chat ao vivo</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 text-sm text-text-secondary hover:text-pure-white transition-colors"
        >
          <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">❓</div>
          <span>FAQ</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 text-sm text-text-secondary hover:text-pure-white transition-colors"
        >
          <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">📊</div>
          <span>Status do Sistema</span>
        </a>
      </div>
    </div>
  );
}
