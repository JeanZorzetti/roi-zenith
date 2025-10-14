// ============= USE LONG PRESS HOOK =============
// Hook personalizado para detectar long press (útil para tooltips em mobile)

import { useCallback, useRef, useState } from 'react';

export interface UseLongPressOptions {
  onLongPress: (e: React.TouchEvent | React.MouseEvent) => void;
  onPress?: (e: React.TouchEvent | React.MouseEvent) => void;
  delay?: number; // Delay em ms para considerar long press (padrão: 500ms)
  shouldPreventDefault?: boolean;
  disabled?: boolean;
}

export const useLongPress = (options: UseLongPressOptions) => {
  const {
    onLongPress,
    onPress,
    delay = 500,
    shouldPreventDefault = true,
    disabled = false,
  } = options;

  const [isLongPressing, setIsLongPressing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const targetRef = useRef<EventTarget | null>(null);

  const start = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (disabled) return;

      if (shouldPreventDefault && e.target) {
        e.preventDefault();
      }

      targetRef.current = e.target;
      setIsLongPressing(false);

      timeoutRef.current = setTimeout(() => {
        onLongPress(e);
        setIsLongPressing(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault, disabled]
  );

  const clear = useCallback(
    (e: React.TouchEvent | React.MouseEvent, shouldTriggerPress = true) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Se não foi long press e shouldTriggerPress é true, chama onPress
      if (shouldTriggerPress && !isLongPressing && onPress) {
        onPress(e);
      }

      setIsLongPressing(false);
      targetRef.current = null;
    },
    [onPress, isLongPressing]
  );

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onTouchEnd: (e: React.TouchEvent) => clear(e),
    onTouchMove: (e: React.TouchEvent) => clear(e, false), // Cancela se o dedo se mover
    isLongPressing,
  };
};
