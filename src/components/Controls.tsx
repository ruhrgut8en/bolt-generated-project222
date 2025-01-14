import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Pause, Plus, Minus, Settings, 
  Volume2, VolumeX, HelpCircle, Coins
} from 'lucide-react';

interface ControlsProps {
  balance: number;
  bet: number;
  onBetChange: (bet: number) => void;
  onSpin: () => void;
  isSpinning: boolean;
  onAutoPlayToggle: () => void;
  isAutoPlay: boolean;
  onPaylineChange: (lines: number) => void;
  activePaylines: number;
  onCollect: () => void;
  canCollect: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  balance,
  bet,
  onBetChange,
  onSpin,
  isSpinning,
  onAutoPlayToggle,
  isAutoPlay,
  onPaylineChange,
  activePaylines,
  onCollect,
  canCollect
}) => {
  return (
    <div className="bg-[#1A0F0A] p-4 rounded-b-lg border-t-2 border-[#3D2816]">
      <div className="flex items-center justify-between gap-4">
        {/* Bet Controls */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onBetChange(Math.max(0.1, bet - 0.1))}
            className="btn-secondary"
            disabled={isSpinning}
          >
            <Minus className="w-4 h-4" />
          </motion.button>
          
          <div className="text-xl font-bold min-w-[80px] text-center">
            {bet.toFixed(2)}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onBetChange(Math.min(100, bet + 0.1))}
            className="btn-secondary"
            disabled={isSpinning}
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Spin Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSpin}
          disabled={isSpinning}
          className={`
            px-8 py-4 rounded-full text-xl font-bold relative
            ${isSpinning ? 
              'bg-[#3D2816] cursor-not-allowed' : 
              'bg-[#C4973B] hover:bg-[#D6A84D]'}
          `}
        >
          <span className="relative z-10">SPIN</span>
          {!isSpinning && (
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            />
          )}
        </motion.button>

        {/* Additional Controls */}
        <div className="flex items-center gap-4">
          {/* Auto Play */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onAutoPlayToggle}
            className={`
              btn-secondary
              ${isAutoPlay ? 'bg-[#C4973B]' : ''}
            `}
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </motion.button>

          {/* Collect Win */}
          {canCollect && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCollect}
              className="btn-primary"
            >
              <Coins className="w-4 h-4" />
              <span>Collect</span>
            </motion.button>
          )}

          {/* Balance Display */}
          <div className="text-xl font-bold min-w-[120px] text-right">
            {balance.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Paylines Control */}
      <div className="mt-4 flex justify-center gap-2">
        {[1, 3, 5, 7, 10].map(lines => (
          <motion.button
            key={lines}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPaylineChange(lines)}
            className={`
              px-3 py-1 rounded
              ${activePaylines === lines ? 'bg-[#C4973B]' : 'bg-[#2A1810]'}
              ${isSpinning ? 'cursor-not-allowed' : 'hover:bg-[#3D2816]'}
            `}
            disabled={isSpinning}
          >
            {lines} Lines
          </motion.button>
        ))}
      </div>
    </div>
  );
};
