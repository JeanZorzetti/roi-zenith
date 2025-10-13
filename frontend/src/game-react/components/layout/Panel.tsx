// ============= PANEL COMPONENT =============
// Reusable panel for organizing content

import React from 'react';
import { clsx } from 'clsx';

export interface PanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  contentClassName?: string;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  title,
  className,
  contentClassName,
}) => {
  return (
    <div className={clsx('bg-gray-900 border border-gray-800 rounded-lg overflow-hidden', className)}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-800 bg-gray-800/50">
          <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
      )}
      <div className={clsx('p-4', contentClassName)}>
        {children}
      </div>
    </div>
  );
};
