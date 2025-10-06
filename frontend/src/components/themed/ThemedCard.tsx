import React from 'react';

interface ThemedCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'selected';
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * Card component that automatically uses theme colors
 *
 * Usage:
 *   <ThemedCard>Content</ThemedCard>
 *   <ThemedCard variant="hover">Hover state</ThemedCard>
 *   <ThemedCard variant="selected">Selected state</ThemedCard>
 */
export const ThemedCard: React.FC<ThemedCardProps> = ({
  children,
  variant = 'default',
  className = '',
  onClick,
  style = {}
}) => {
  const backgroundColor = variant === 'selected'
    ? 'var(--color-card-bg-hover)'
    : 'var(--color-card-bg)';

  return (
    <div
      className={`rounded-xl ${className}`}
      onClick={onClick}
      style={{
        backgroundColor,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--color-card-border)',
        ...style
      }}
    >
      {children}
    </div>
  );
};
