import { FadeIn } from '@/components/animations';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';

interface ProductHeroProps {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  productName: string;
  tagline: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  benefits: string[];
  logoUrl?: string;
  screenshotUrl?: string;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
}

export default function ProductHero({
  icon: Icon,
  iconColor,
  iconBg,
  productName,
  tagline,
  description,
  gradientFrom,
  gradientTo,
  benefits,
  logoUrl,
  screenshotUrl,
  ctaPrimary = {
    text: 'Começar teste grátis',
    href: '/contato',
  },
  ctaSecondary = {
    text: 'Agendar demonstração',
    href: '/contato',
  },
}: ProductHeroProps) {
  return (
    <section
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-8 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom} 0%, #0a0a0a 50%, ${gradientTo} 100%)`,
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/5 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: gradientFrom }}
      />
      <div
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: gradientTo }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl ${iconBg} border border-white/10`}>
                  {logoUrl ? (
                    <div className="relative w-10 h-10">
                      <Image
                        src={logoUrl}
                        alt={`${productName} Logo`}
                        fill
                        className="object-contain drop-shadow-lg"
                        sizes="40px"
                      />
                    </div>
                  ) : (
                    <Icon className={`w-10 h-10 ${iconColor}`} strokeWidth={1.5} />
                  )}
                </div>
                <div className="text-sm text-text-muted uppercase tracking-wider">{productName}</div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h1 className="text-5xl md:text-6xl font-thin mb-6 leading-tight">{tagline}</h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">{description}</p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <ul className="space-y-3 mb-10">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
                    <span className="text-text-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={ctaPrimary.href}
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-light tracking-wide transition-all hover:scale-105 shadow-glow"
                >
                  {ctaPrimary.text}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={ctaSecondary.href}
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-pure-white px-8 py-4 rounded-lg text-lg font-light tracking-wide transition-all border border-white/10 hover:border-white/20"
                >
                  {ctaSecondary.text}
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Visual/Screenshot */}
          <FadeIn delay={0.7}>
            <div className="relative">
              <div className="glass-card p-8 rounded-2xl border-2 border-white/10">
                <div className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/0 rounded-lg overflow-hidden">
                  {screenshotUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={screenshotUrl}
                        alt={`Screenshot do ${productName}`}
                        fill
                        className="object-cover rounded-lg"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        {logoUrl ? (
                          <div className="relative w-48 h-48 mx-auto mb-4">
                            <Image
                              src={logoUrl}
                              alt={`${productName} Logo`}
                              fill
                              className="object-contain drop-shadow-2xl"
                              priority
                            />
                          </div>
                        ) : (
                          <Icon className={`w-24 h-24 ${iconColor} mx-auto mb-4 opacity-50`} />
                        )}
                        <p className="text-text-muted text-sm">Screenshot do {productName}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Decorative elements */}
              <div
                className="absolute -top-4 -right-4 w-32 h-32 rounded-full blur-2xl opacity-30"
                style={{ backgroundColor: gradientFrom }}
              />
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full blur-2xl opacity-30"
                style={{ backgroundColor: gradientTo }}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
