import React, { useEffect, useRef } from 'react';
import { Sparkles, Zap, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WinAnimationProps {
  amount: number;
  isBonus: boolean;
  onComplete: () => void;
}

export const WinAnimation: React.FC<WinAnimationProps> = ({ 
  amount, 
  isBonus, 
  onComplete 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isBonus) {
      // Create multiple confetti bursts for bonus wins
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }

    const timer = setTimeout(onComplete, isBonus ? 3000 : 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isBonus, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
    >
      <div className="relative">
        {/* Background glow */}
        <div className={`
          absolute inset-0 
          ${isBonus ? 'animate-pulse-fast bg-yellow-500/30' : 'animate-pulse bg-green-500/20'} 
          rounded-full blur-xl
        `} />

        {/* Main container */}
        <div className={`
          relative bg-gray-900/90 border-2 
          ${isBonus ? 'border-yellow-500' : 'border-green-500'}
          rounded-lg p-8
          ${isBonus ? 'animate-bounce-rotate' : 'animate-bounce'}
          transform transition-all duration-500
        `}>
          {/* Icons */}
          <div className="flex justify-center gap-2 mb-4">
            {isBonus ? (
              <>
                <Star className="w-8 h-8 text-yellow-400 animate-spin" />
                <Zap className="w-8 h-8 text-yellow-400 animate-bounce" />
                <Star className="w-8 h-8 text-yellow-400 animate-spin" />
              </>
            ) : (
              <Sparkles className="w-8 h-8 text-green-400 animate-spin" />
            )}
          </div>

          {/* Win amount */}
          <div className={`
            text-5xl font-bold text-center mb-2
            ${isBonus ? 'text-yellow-400' : 'text-green-400'}
            animate-scale-bounce
          `}>
            {isBonus ? 'BONUS WIN!' : 'WIN!'}
          </div>
          
          <div className={`
            text-4xl font-bold text-center
            ${isBonus ? 'text-yellow-300' : 'text-green-300'}
            animate-number-increment
          `}>
            {amount}
          </div>

          {/* Particle effects */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-2 h-2 rounded-full
                  ${isBonus ? 'bg-yellow-400' : 'bg-green-400'}
                  animate-particle
                `}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
