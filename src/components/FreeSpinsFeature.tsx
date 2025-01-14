import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Symbol } from '../types';

interface FreeSpinsFeatureProps {
  spinsLeft: number;
  expandingSymbol: Symbol | null;
  totalWin: number;
  isSpinning: boolean;
}

export const FreeSpinsFeature: React.FC<FreeSpinsFeatureProps> = ({
  spinsLeft,
  expandingSymbol,
  totalWin,
  isSpinning
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Free Spins Header */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-[#C4973B] px-6 py-2 rounded-b-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="text-xl font-bold">Free Spins</div>
        <div className="text-center">{spinsLeft} remaining</div>
      </motion.div>

      {/* Expanding Symbol Display */}
      {expandingSymbol && (
        <motion.div
          className="absolute top-4 right-4 bg-[#2A1810] p-2 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="text-sm mb-1">Special Symbol</div>
          <motion.div
            className="w-12 h-12"
            animate={{
              rotateY: [0, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <img
              src={`/symbols/${expandingSymbol.id}.png`}
              alt={expandingSymbol.name}
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Total Win Display */}
      <motion.div
        className="absolute bottom-4 left-4 bg-[#2A1810] px-4 py-2 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-sm">Total Free Spins Win</div>
        <div className="text-xl font-bold text-[#C4973B]">
          {totalWin.toFixed(2)}
        </div>
      </motion.div>

      {/* Spinning Effect Overlay */}
      <AnimatePresence>
        {isSpinning && (
          <motion.div
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
