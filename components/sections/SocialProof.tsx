import { RevealOnScroll } from '@/components/animations';
import { Building2, Award, Users, TrendingUp } from 'lucide-react';

export default function SocialProof() {
  const stats = [
    {
      icon: Building2,
      value: '500+',
      label: 'Empresas Ativas',
    },
    {
      icon: Users,
      value: '10.000+',
      label: 'Usuários Diários',
    },
    {
      icon: TrendingUp,
      value: '40%',
      label: 'Redução de Custos',
    },
    {
      icon: Award,
      value: '98%',
      label: 'Satisfação',
    },
  ];

  const certifications = [
    'ISO 27001',
    'LGPD Compliant',
    'AWS Partner',
    'Google Cloud Partner',
    'Microsoft Partner',
  ];

  const clientLogos = [
    { name: 'Empresa A', logo: '🏢' },
    { name: 'Empresa B', logo: '🏭' },
    { name: 'Empresa C', logo: '🏪' },
    { name: 'Empresa D', logo: '🏬' },
    { name: 'Empresa E', logo: '🏛️' },
    { name: 'Empresa F', logo: '🏢' },
  ];

  return (
    <section className="py-32 px-8 bg-gradient-to-b from-gray-950 to-pure-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-content mx-auto relative z-10">
        {/* Stats Grid */}
        <RevealOnScroll className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div className="text-5xl font-light text-primary-400 mb-2">{stat.value}</div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

        {/* Client Logos */}
        <RevealOnScroll delay={0.2}>
          <div className="text-center mb-12">
            <p className="text-sm text-text-muted uppercase tracking-wider mb-8">
              Empresas que confiam na ROI Labs
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12">
              {clientLogos.map((client, index) => (
                <div
                  key={index}
                  className="w-24 h-24 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group cursor-pointer"
                  title={client.name}
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {client.logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

        {/* Certifications */}
        <RevealOnScroll delay={0.4}>
          <div className="text-center">
            <p className="text-sm text-text-muted uppercase tracking-wider mb-8">
              Certificações e Parcerias
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-primary-500/50 transition-all"
                >
                  <span className="text-sm text-text-secondary">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Trust Message */}
        <RevealOnScroll delay={0.6}>
          <div className="text-center mt-16">
            <div className="glass-card p-8 max-w-3xl mx-auto">
              <p className="text-body text-text-secondary">
                <span className="text-primary-400 font-medium">
                  "A ROI Labs transformou completamente nossa operação.
                </span>{' '}
                Em 6 meses, conseguimos reduzir custos em 40% e triplicar nossa eficiência. O
                suporte é excepcional e a plataforma é muito intuitiva."
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-pure-white">João Silva</p>
                  <p className="text-xs text-text-muted">CEO, Empresa ABC</p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
