import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const animateCursor = () => {
      const distX = mouseX - cursorX;
      const distY = mouseY - cursorY;
      
      cursorX += distX * 0.1;
      cursorY += distY * 0.1;
      
      setPosition({ x: cursorX, y: cursorY });
      animationFrame = requestAnimationFrame(animateCursor);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseOut = () => setIsVisible(false);

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseout', handleMouseOut);

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    animateCursor();

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseout', handleMouseOut);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed pointer-events-none z-[9999] w-8 h-8 border border-white/50 rounded-full transition-all duration-100 ease-out mix-blend-difference ${
        isHovering ? 'scale-150 bg-white/10' : ''
      }`}
      style={{
        left: position.x - 16,
        top: position.y - 16,
      }}
    />
  );
}