import { useEffect, useState } from 'react';

const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'KeyB', 'KeyA'
];

export default function EasterEgg() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.code;
      
      setSequence(prev => {
        const newSequence = [...prev, key];
        
        // Keep only the last 10 keys
        if (newSequence.length > konamiCode.length) {
          newSequence.shift();
        }
        
        // Check if sequence matches Konami code
        if (newSequence.length === konamiCode.length) {
          const matches = konamiCode.every((code, index) => code === newSequence[index]);
          
          if (matches) {
            activateEasterEgg();
            return [];
          }
        }
        
        return newSequence;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activateEasterEgg = () => {
    // Invert colors temporarily
    document.body.style.filter = 'invert(1)';
    setTimeout(() => {
      document.body.style.filter = 'invert(0)';
    }, 3000);
    
    // Show message
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  if (!showMessage) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
      <div className="bg-white text-pure-black px-8 py-4 rounded-xl text-2xl font-light animate-in fade-in scale-in duration-500">
        🚀 Você descobriu o futuro!
      </div>
    </div>
  );
}
