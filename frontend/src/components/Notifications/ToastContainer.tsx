import React, { useState, useEffect } from 'react';
import { ToastNotification, notificationService } from '../../services/notificationService';
import { X, CheckCircle, Info, AlertTriangle, AlertCircle } from 'lucide-react';

interface ToastItemProps {
  toast: ToastNotification;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animação de entrada
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-fechar
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Duração da animação de saída
  };

  const getIcon = () => {
    if (toast.icon) {
      return <span className="text-lg">{toast.icon}</span>;
    }

    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  const getColorClasses = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-900/20 border-green-500/50 text-green-100';
      case 'info':
        return 'bg-blue-900/20 border-blue-500/50 text-blue-100';
      case 'warning':
        return 'bg-yellow-900/20 border-yellow-500/50 text-yellow-100';
      case 'error':
        return 'bg-red-900/20 border-red-500/50 text-red-100';
      default:
        return 'bg-gray-900/20 border-gray-500/50 text-gray-100';
    }
  };

  return (
    <div
      className={`
        relative flex items-start space-x-3 p-4 rounded-lg border backdrop-blur-sm shadow-xl
        transform transition-all duration-300 ease-out
        ${getColorClasses()}
        ${isVisible && !isExiting
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95'
        }
        ${isExiting ? 'translate-x-full opacity-0 scale-95' : ''}
        toast-glow
      `}
    >
      {/* Avatar ou ícone */}
      <div className="flex-shrink-0">
        {toast.avatar ? (
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
            ${toast.avatar.color} bg-opacity-20 border border-opacity-30
          `}>
            <span>{toast.avatar.src}</span>
          </div>
        ) : (
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        {/* Título */}
        <div className="font-semibold text-white">
          {toast.title}
        </div>

        {/* Mensagem */}
        {toast.message && (
          <div className="text-sm opacity-90 mt-1">
            {toast.message}
          </div>
        )}

        {/* Ações */}
        {toast.actions && toast.actions.length > 0 && (
          <div className="flex items-center space-x-2 mt-3">
            {toast.actions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`
                  px-3 py-1 text-xs font-medium rounded transition-colors
                  ${action.style === 'primary'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : action.style === 'danger'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  }
                `}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Botão de fechar */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Barra de progresso */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 h-1 bg-white/20 rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-white/40 rounded-b-lg animate-toast-progress"
            style={{
              animationDuration: `${toast.duration}ms`
            }}
          />
        </div>
      )}
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    const unsubscribe = notificationService.subscribeToToasts((toast) => {
      setToasts(prev => [toast, ...prev].slice(0, 5)); // Máximo 5 toasts
    });

    return unsubscribe;
  }, []);

  const removeToast = (toastId: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== toastId));
  };

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;

// Adicionar estilos CSS para animação da barra de progresso
const style = document.createElement('style');
style.textContent = `
  @keyframes toast-progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  .animate-toast-progress {
    animation: toast-progress linear forwards;
  }

  .toast-glow {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.1);
  }
`;
document.head.appendChild(style);