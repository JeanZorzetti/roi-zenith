import { RevealOnScroll } from '@/components/animations';
import { Badge } from '@/components/ui/badge';
import { Maximize2, Shield, Zap } from 'lucide-react';
import Image from 'next/image';

interface DashboardPreviewProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  features?: string[];
  accentColor?: string;
}

export default function DashboardPreview({
  title = 'Interface intuitiva e poderosa',
  description = 'Dashboard completo com todas as métricas que você precisa em tempo real',
  imageSrc,
  imageAlt = 'Dashboard Preview',
  features = [
    'Interface limpa e moderna',
    'Dados em tempo real',
    'Segurança de nível empresarial',
  ],
  accentColor = 'text-primary-400',
}: DashboardPreviewProps) {
  const featureIcons = [Maximize2, Zap, Shield];

  return (
    <section className="py-24 md:py-32 px-8 bg-gradient-to-b from-pure-black to-gray-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <RevealOnScroll>
            <Badge className="mb-4 bg-primary-500/10 border-primary-500/20 text-primary-400">
              Dashboard
            </Badge>
            <h2 className="text-4xl md:text-5xl font-thin mb-4">{title}</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">{description}</p>
          </RevealOnScroll>
        </div>

        {/* Screenshot Container */}
        <RevealOnScroll delay={0.2}>
          <div className="relative mb-16">
            {/* Browser Chrome */}
            <div className="glass-card rounded-t-xl border-b-0 p-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 ml-4">
                  <div className="h-6 bg-white/5 rounded max-w-md flex items-center px-3">
                    <span className="text-xs text-text-muted">https://app.roilabs.com.br</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshot */}
            <div className="glass-card rounded-b-xl rounded-t-none border-t-0 overflow-hidden">
              {imageSrc ? (
                <div className="relative aspect-[16/10] bg-gradient-to-br from-white/5 to-white/0">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="relative aspect-[16/10] bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center">
                  <div className="text-center">
                    <Maximize2 className={`w-16 h-16 ${accentColor} mx-auto mb-4 opacity-50`} />
                    <p className="text-text-muted">Screenshot do Dashboard</p>
                  </div>
                </div>
              )}
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-px bg-gradient-to-br from-primary-500/20 to-transparent rounded-xl blur-xl opacity-50 -z-10" />
          </div>
        </RevealOnScroll>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = featureIcons[index] || Maximize2;
            return (
              <RevealOnScroll key={index} delay={0.3 + index * 0.1}>
                <div className="glass-card p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className={`w-6 h-6 ${accentColor}`} />
                  </div>
                  <p className="text-text-secondary">{feature}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
