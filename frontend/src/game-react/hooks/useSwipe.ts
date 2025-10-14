// ============= USE SWIPE HOOK =============
// Hook personalizado para gestos de swipe (navegação touch)

import { useEffect, useRef, useState } from 'react';

export interface SwipeDirection {
  direction: 'left' | 'right' | 'up' | 'down' | null;
  distance: number;
}

export interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  minSwipeDistance?: number; // Mínimo de pixels para considerar um swipe
  preventScroll?: boolean; // Prevenir scroll durante swipe
  disabled?: boolean; // Desabilitar swipe
}

export const useSwipe = (options: UseSwipeOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    minSwipeDistance = 50,
    preventScroll = false,
    disabled = false,
  } = options;

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>({
    direction: null,
    distance: 0,
  });

  useEffect(() => {
    if (disabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (preventScroll) {
        e.preventDefault();
      }
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      setIsSwiping(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      if (preventScroll) {
        e.preventDefault();
      }

      touchEndRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      // Calcular distância para feedback visual
      const deltaX = touchEndRef.current.x - touchStartRef.current.x;
      const deltaY = touchEndRef.current.y - touchStartRef.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Determinar direção
      let direction: 'left' | 'right' | 'up' | 'down' | null = null;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      setSwipeDirection({ direction, distance });
    };

    const handleTouchEnd = () => {
      if (!touchStartRef.current || !touchEndRef.current) {
        setIsSwiping(false);
        return;
      }

      const deltaX = touchEndRef.current.x - touchStartRef.current.x;
      const deltaY = touchEndRef.current.y - touchStartRef.current.y;

      const horizontalDistance = Math.abs(deltaX);
      const verticalDistance = Math.abs(deltaY);

      // Determinar direção principal (horizontal ou vertical)
      if (horizontalDistance > verticalDistance && horizontalDistance > minSwipeDistance) {
        // Swipe horizontal
        if (deltaX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      } else if (verticalDistance > horizontalDistance && verticalDistance > minSwipeDistance) {
        // Swipe vertical
        if (deltaY > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }

      // Reset
      touchStartRef.current = null;
      touchEndRef.current = null;
      setIsSwiping(false);
      setSwipeDirection({ direction: null, distance: 0 });
    };

    // Adicionar event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: !preventScroll });
    document.addEventListener('touchmove', handleTouchMove, { passive: !preventScroll });
    document.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    minSwipeDistance,
    preventScroll,
    disabled,
  ]);

  return {
    isSwiping,
    swipeDirection,
  };
};
