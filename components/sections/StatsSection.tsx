'use client';

import { useEffect, useState, useRef } from 'react';

const stats = [
  { value: 5, suffix: '', label: 'Soluções Integradas' },
  { value: 100, prefix: '+', suffix: '%', label: 'Aumento de Eficiência' },
  { value: 24, suffix: '/7', label: 'Suporte Disponível' },
];

export default function StatsSection() {
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateNumbers();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateNumbers = () => {
    // Animate first stat (5)
    animateValue(0, 5, 1500, 0);

    // Animate second stat (100)
    animateValue(0, 100, 2000, 1);

    // Animate third stat (24)
    animateValue(0, 24, 1800, 2);
  };

  const animateValue = (start: number, end: number, duration: number, index: number) => {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const current = start + (end - start) * easeOutQuart(progress);

      setAnimatedValues(prev => {
        const newValues = [...prev];
        newValues[index] = Math.round(current);
        return newValues;
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  return (
    <section
      ref={sectionRef}
      id="resultados"
      className="py-24 md:py-32 px-8 bg-charcoal"
    >
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-4xl mx-auto text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${hasAnimated ? 'fade-in-up visible' : 'fade-in-up'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-6xl md:text-7xl font-thin tracking-tight mb-2 text-pure-white tabular-nums">
                {stat.prefix}
                {animatedValues[index]}
                {stat.suffix}
              </div>
              <div className="text-lg font-light text-text-secondary tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
