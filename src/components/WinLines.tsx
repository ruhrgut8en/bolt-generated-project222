import React from 'react';
import { motion } from 'framer-motion';
import { WinningLine } from '../types';

interface WinLinesProps {
  wins: WinningLine[];
  activePaylines: number;
}

export const WinLines: React.FC<WinLinesProps> = ({ wins, activePaylines }) => {
  return (
    <svg 
      className="absolute inset-0 pointer-events-none" 
      viewBox="0 0 500 300"
    >
      {wins.map((win, index) => (
        <motion.path
          key={`${win.paylineId}-${index}`}
          d={generatePaylinePath(win.positions)}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          stroke="#C4973B"
          strokeWidth="2"
          fill="none"
        />
      ))}
    </svg>
  );
};

function generatePaylinePath(positions: number[]): string {
  return positions.reduce((path, position, index) => {
    const x = 100 + index * 100;
    const y = 50 + position * 100;
    return path + (index === 0 ? `M ${x},${y}` : ` L ${x},${y}`);
  }, "");
}
