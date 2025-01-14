import React from 'react';

interface SpecialEffectsProps {
  isActive: boolean;
  type: 'glitch' | 'matrix' | 'scanline';
}

export const SpecialEffects: React.FC<SpecialEffectsProps> = ({ 
  isActive, 
  type 
}) => {
  if (!isActive) return null;

  switch (type) {
    case 'glitch':
      return (
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 animate-glitch-1 bg-red-500/10" />
          <div className="absolute inset-0 animate-glitch-2 bg-blue-500/10" />
          <div className="absolute inset-0 animate-glitch-3 bg-green-500/10" />
        </div>
      );

    case 'matrix':
      return (
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-500/30 font-matrix animate-matrix-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>
      );

    case 'scanline':
      return (
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scanline" />
        </div>
      );

    default:
      return null;
  }
};
