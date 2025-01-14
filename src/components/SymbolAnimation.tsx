import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Symbol } from '../types';

interface SymbolAnimationProps {
  symbol: Symbol;
  isWinning?: boolean;
  isExpanding?: boolean;
  scale?: number;
}

export const SymbolAnimation: React.FC<SymbolAnimationProps> = ({
  symbol,
  isWinning = false,
  isExpanding = false,
  scale = 1
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`
          relative w-full h-full
          ${isWinning ? 'z-10' : ''}
          ${symbol.id === 'book' ? 'book-glow' : ''}
        `}
        initial={{ scale: 1 }}
        animate={isWinning ? {
          scale: [1, 1.1, 1],
          rotate: [0, -5, 5, 0],
          filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
        } : {
          scale: 1,
          rotate: 0,
          filter: 'brightness(1)'
        }}
        transition={{
          duration: 0.5,
          repeat: isWinning ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        <img
          src={`/symbols/${symbol.id}.png`}
          alt={symbol.name}
          className={`
            w-full h-full object-contain
            ${isExpanding ? 'expanding-symbol' : ''}
          `}
        />
        
        {/* Special effects for book symbol */}
        {symbol.id === 'book' && (
          <motion.div
            className="absolute inset-0 book-rays"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}

        {/* Win highlight effect */}
        {isWinning && (
          <motion.div
            className="absolute inset-0 win-highlight"
            animate={{
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
