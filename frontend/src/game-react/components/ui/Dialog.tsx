// ============= DIALOG COMPONENT =============
// Modal dialog component using Radix UI

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
};

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0" />
      <DialogPrimitive.Content
        className={clsx(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'bg-gray-900 border border-gray-700 rounded-lg shadow-2xl',
          'animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-1/2',
          className
        )}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity">
          <X className="h-4 w-4 text-gray-400" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export const DialogHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={clsx('px-6 pt-6 pb-4 border-b border-gray-800', className)}>
    {children}
  </div>
);

export const DialogTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <DialogPrimitive.Title className={clsx('text-xl font-bold text-white', className)}>
    {children}
  </DialogPrimitive.Title>
);

export const DialogDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <DialogPrimitive.Description className={clsx('text-sm text-gray-400 mt-2', className)}>
    {children}
  </DialogPrimitive.Description>
);

export const DialogBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={clsx('px-6 py-4', className)}>{children}</div>;

export const DialogFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={clsx('px-6 py-4 border-t border-gray-800 flex justify-end gap-2', className)}>
    {children}
  </div>
);
