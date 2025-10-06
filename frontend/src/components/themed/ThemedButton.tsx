import React from 'react';

interface ThemedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  ariaLabel?: string;
}

/**
 * Button component that automatically uses theme colors
 *
 * Usage:
 *   <ThemedButton variant="primary">Primary</ThemedButton>
 *   <ThemedButton variant="secondary">Secondary</ThemedButton>
 *   <ThemedButton variant="ghost">Ghost</ThemedButton>
 */
export const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  title,
  ariaLabel
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-button-primary-bg)',
          color: 'var(--color-button-primary-text)',
          borderColor: 'transparent'
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--color-button-secondary-bg)',
          color: 'var(--color-button-secondary-text)',
          borderColor: 'transparent'
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-button-ghost-text)',
          borderColor: 'transparent'
        };
      case 'danger':
        return {
          backgroundColor: 'var(--color-error)',
          color: '#ffffff',
          borderColor: 'transparent'
        };
      default:
        return {};
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      className={`${getSizeClasses()} rounded-lg font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        ...getVariantStyles(),
        focusRingColor: 'var(--color-focus-ring)'
      }}
    >
      {children}
    </button>
  );
};
