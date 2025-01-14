import React from 'react';
import { motion } from 'framer-motion';
import { PAYLINES } from '../gameConfig';

interface PaylineDisplayProps {
  activePaylines: number;
  onPaylineChange: (lines: number) => void;
  isSpinning: boolean;
}

export const PaylineDisplay: React.FC<PaylineDisplayProps> = ({
  activePaylines,
  onPaylineChange,
  isSpinning
}) => {
  return (
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
      {PAYLINES.map((payline, index) => (
        <motion.button
          key={payline.id}
          className={`
            w-8 h-8 rounded-full mb-2 flex items-center justify-center
            ${index < activePaylines ? 'bg-[#C4973B]' : 'bg-[#2A1810]'}
            ${isSpinning ? 'cursor-not-allowed' : 'hover:bg-[#D6A84D]'}
          `}
          whileHover={!isSpinning ? { scale: 1.1 } : {}}
          onClick={() => !isSpinning && onPaylineChange(index + 1)}
          disabled={isSpinning}
        >
          {payline.id}
        </motion.button>
      ))}
    </div>
  );
};
