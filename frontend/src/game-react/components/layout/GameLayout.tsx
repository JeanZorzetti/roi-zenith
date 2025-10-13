// ============= GAME LAYOUT =============
// Main layout wrapper for game screens

import React from 'react';
import { clsx } from 'clsx';

export interface GameLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const GameLayout: React.FC<GameLayoutProps> = ({
  children,
  header,
  footer,
  className,
}) => {
  return (
    <div className={clsx('flex flex-col h-screen bg-gray-950', className)}>
      {header && (
        <header className="shrink-0 border-b border-gray-800 bg-gray-900">
          {header}
        </header>
      )}

      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {footer && (
        <footer className="shrink-0 border-t border-gray-800 bg-gray-900">
          {footer}
        </footer>
      )}
    </div>
  );
};
