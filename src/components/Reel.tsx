import React from 'react';
import { Symbol } from '../types';
import { motion } from 'framer-motion';

interface ReelProps {
  symbols: Symbol[];
  isSpinning: boolean;
  index: number;
}

export const Reel: React.FC<ReelProps> = ({ symbols, isSpinning, index }) => {
  return (
    <div 
      className={`
        flex flex-col gap-1 bg-[#2A1810] p-2 rounded
        ${isSpinning ? 'animate-spin-blur' : ''}
      `}
      style={{
        animationDelay: `${index * 0.1}s`,
        animationDuration: `${0.5 + index * 0.2}s`
      }}
    >
      {symbols.map((symbol, idx) => (
        <motion.div
          key={`${symbol.id}-${idx}`}
          className="w-20 h-20 flex items-center justify-center"
          initial={{ scale: 1 }}
          animate={isSpinning ? { y: [0, -100, 100, 0] } : { scale: 1 }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.1,
            type: "spring",
            stiffness: 200
          }}
        >
          <img 
            src={`/symbols/${symbol.id}.png`} 
            alt={symbol.name}
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
};
