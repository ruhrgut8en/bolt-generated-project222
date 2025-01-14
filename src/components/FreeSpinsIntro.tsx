import React from 'react';
import { motion } from 'framer-motion';
import { Symbol } from '../types';

interface FreeSpinsIntroProps {
  expandingSymbol: Symbol | null;
  onClose: () => void;
}

export const FreeSpinsIntro: React.FC<FreeSpinsIntroProps> = ({
  expandingSymbol,
  onClose
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-[#2A1810] p-8 rounded-lg max-w-md w-full text-center"
      >
        <motion.h2
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-3xl font-bold text-[#C4973B] mb-4"
        >
          10 Free Spins!
        </motion.h2>

        {expandingSymbol && (
          <div className="mb-6">
            <div className="text-xl mb-2">Special Expanding Symbol:</div>
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 mx-auto"
            >
              <img
                src={`/symbols/${expandingSymbol.id}.png`}
                alt={expandingSymbol.name}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        )}

        <button
          onClick={onClose}
          className="px-8 py-3 bg-[#C4973B] rounded-full text-white font-bold hover:bg-[#D6A84D]"
        >
          Start Free Spins
        </button>
      </motion.div>
    </motion.div>
  );
};
