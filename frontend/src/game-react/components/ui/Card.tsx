// ============= CARD COMPONENT =============
// Reusable card container component

import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const variants = {
    default: 'bg-gray-800 bg-opacity-90',
    elevated: 'bg-gray-800 bg-opacity-95 shadow-xl',
    outlined: 'bg-gray-900 bg-opacity-80 border border-gray-700',
  };

  return (
    <div
      className={clsx(
        'rounded-lg p-4',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={clsx('mb-4 pb-3 border-b border-gray-700', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3 className={clsx('text-lg font-bold text-white', className)} {...props}>
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={clsx('text-gray-300', className)} {...props}>
    {children}
  </div>
);
