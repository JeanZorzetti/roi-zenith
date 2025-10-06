import React from 'react';

interface ThemedBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'priority-low' | 'priority-medium' | 'priority-high' | 'priority-urgent';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Badge component that automatically uses theme colors
 *
 * Usage:
 *   <ThemedBadge variant="success">Sucesso</ThemedBadge>
 *   <ThemedBadge variant="priority-urgent">Urgente</ThemedBadge>
 */
export const ThemedBadge: React.FC<ThemedBadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  style = {}
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: 'var(--color-success-bg)',
          color: 'var(--color-success)',
          borderColor: 'var(--color-success-border)'
        };
      case 'warning':
        return {
          backgroundColor: 'var(--color-warning-bg)',
          color: 'var(--color-warning)',
          borderColor: 'var(--color-warning-border)'
        };
      case 'error':
        return {
          backgroundColor: 'var(--color-error-bg)',
          color: 'var(--color-error)',
          borderColor: 'var(--color-error-border)'
        };
      case 'info':
        return {
          backgroundColor: 'var(--color-info-bg)',
          color: 'var(--color-info)',
          borderColor: 'var(--color-info-border)'
        };
      case 'priority-low':
        return {
          backgroundColor: 'var(--color-priority-low-bg)',
          color: 'var(--color-priority-low)',
          borderColor: 'var(--color-priority-low)'
        };
      case 'priority-medium':
        return {
          backgroundColor: 'var(--color-priority-medium-bg)',
          color: 'var(--color-priority-medium)',
          borderColor: 'var(--color-priority-medium)'
        };
      case 'priority-high':
        return {
          backgroundColor: 'var(--color-priority-high-bg)',
          color: 'var(--color-priority-high)',
          borderColor: 'var(--color-priority-high)'
        };
      case 'priority-urgent':
        return {
          backgroundColor: 'var(--color-priority-urgent-bg)',
          color: 'var(--color-priority-urgent)',
          borderColor: 'var(--color-priority-urgent)'
        };
      default:
        return {
          backgroundColor: 'var(--color-badge-bg)',
          color: 'var(--color-badge-text)',
          borderColor: 'var(--color-badge-border)'
        };
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}
      style={{
        ...getVariantStyles(),
        ...style
      }}
    >
      {children}
    </span>
  );
};
