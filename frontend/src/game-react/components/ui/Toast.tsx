// ============= TOAST NOTIFICATION SYSTEM =============
// Toast notifications for feedback

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';
import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    // Auto-remove after duration
    const duration = toast.duration || 3000;
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

// Hook for easy toast usage
export const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);

  return {
    success: (title: string, description?: string, duration?: number) => {
      addToast({ type: 'success', title, description, duration });
    },
    error: (title: string, description?: string, duration?: number) => {
      addToast({ type: 'error', title, description, duration });
    },
    info: (title: string, description?: string, duration?: number) => {
      addToast({ type: 'info', title, description, duration });
    },
    warning: (title: string, description?: string, duration?: number) => {
      addToast({ type: 'warning', title, description, duration });
    },
  };
};

// Toast component
interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const icons: Record<ToastType, React.ComponentType<any>> = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const colors: Record<ToastType, string> = {
    success: 'bg-green-900 border-green-500 text-green-100',
    error: 'bg-red-900 border-red-500 text-red-100',
    info: 'bg-blue-900 border-blue-500 text-blue-100',
    warning: 'bg-yellow-900 border-yellow-500 text-yellow-100',
  };

  const iconColors: Record<ToastType, string> = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-blue-400',
    warning: 'text-yellow-400',
  };

  const Icon = icons[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={clsx(
        'flex items-start gap-3 p-4 rounded-lg border-2 shadow-2xl backdrop-blur-sm min-w-[320px] max-w-[400px]',
        colors[toast.type]
      )}
    >
      <Icon className={clsx('w-5 h-5 flex-shrink-0 mt-0.5', iconColors[toast.type])} />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{toast.title}</p>
        {toast.description && (
          <p className="text-xs mt-1 opacity-90">{toast.description}</p>
        )}
      </div>

      <button
        onClick={onClose}
        className="flex-shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// Toast container component
export const ToastContainer: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onClose={() => removeToast(toast.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
