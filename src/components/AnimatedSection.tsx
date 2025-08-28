import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'scale-in' | 'fade-in';
  delay?: number;
  id?: string;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-in-up',
  delay = 0,
  id
}: AnimatedSectionProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <section
      ref={elementRef}
      id={id}
      className={`${animation} ${isIntersecting ? 'visible' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}