import { useGameStore, GameNotification } from '@/stores/gameStore';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X, CheckCircle2, Info, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const notificationIcons = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
};

const notificationColors = {
  success: 'border-green-500 bg-green-500/10 text-green-100',
  info: 'border-blue-500 bg-blue-500/10 text-blue-100',
  warning: 'border-yellow-500 bg-yellow-500/10 text-yellow-100',
  error: 'border-red-500 bg-red-500/10 text-red-100',
};

function GameNotificationItem({ notification }: { notification: GameNotification }) {
  const { removeNotification } = useGameStore();
  const Icon = notificationIcons[notification.type];

  return (
    <Alert
      className={cn(
        'relative border-2 backdrop-blur-md shadow-2xl animate-in slide-in-from-right-full duration-300',
        notificationColors[notification.type]
      )}
    >
      <Icon className="h-5 w-5" />
      <AlertTitle className="flex items-center justify-between">
        <span className="font-bold">{notification.title}</span>
        <button
          onClick={() => removeNotification(notification.id)}
          className="hover:opacity-70 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      </AlertTitle>
      <AlertDescription className="text-sm opacity-90">
        {notification.message}
      </AlertDescription>

      {/* Progress bar for duration */}
      {notification.duration && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full bg-white/30 animate-shrink-width"
            style={{
              animationDuration: `${notification.duration}ms`,
              animationTimingFunction: 'linear'
            }}
          />
        </div>
      )}
    </Alert>
  );
}

export function GameNotifications() {
  const { notifications } = useGameStore();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 max-w-md w-full">
      {notifications.map((notification) => (
        <GameNotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}

// Add this to your global CSS or tailwind.config.js
// @keyframes shrink-width {
//   from { width: 100%; }
//   to { width: 0%; }
// }
