// ============= SECTION COMPONENT =============
// Section divider for content organization

import React from 'react';
import { clsx } from 'clsx';

export interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  className,
}) => {
  return (
    <section className={clsx('space-y-4', className)}>
      {(title || subtitle) && (
        <div className="space-y-1">
          {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
};
