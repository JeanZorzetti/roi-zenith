import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="w-24 h-24 bg-gray-800/30 rounded-2xl flex items-center justify-center mb-6">
        <Icon className="h-12 w-12 text-gray-500" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3">
        {title}
      </h3>
      
      <p className="text-gray-400 mb-8 max-w-md">
        {description}
      </p>
      
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 hover:scale-105"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;