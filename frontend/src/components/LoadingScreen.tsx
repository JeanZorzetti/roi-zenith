import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function LoadingScreen({ onComplete, duration = 2000 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className={`fixed inset-0 bg-pure-black flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-thin tracking-[0.5rem] text-pure-white mb-8 fade-in-up visible">
          ROI LABS
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-px bg-white/20 mx-auto relative overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-white transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-xs text-text-tertiary mt-4 tracking-widest">
          CARREGANDO
        </div>
      </div>
    </div>
  );
}