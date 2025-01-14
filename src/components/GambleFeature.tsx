import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GambleFeatureProps {
  currentWin: number;
  onChoice: (choice: 'red' | 'black') => void;
  history: boolean[];
}

export const GambleFeature: React.FC<GambleFeatureProps> = ({
  currentWin,
  onChoice,
  history
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center"
    >
      <div className="bg-[#2A1810] p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">
          Gamble Feature
        </h2>

        <div className="text-center mb-6">
          <div className="text-xl">Current Win:</div>
          <div className="text-3xl font-bold text-[#C4973B]">
            {currentWin.toFixed(2)}
          </div>
        </div>

        {/* Card Animation */}
        <div className="relative h-48 mb-6">
          <motion.div
            animate={isRevealed ? { rotateY: 180 } : { rotateY: 0 }}
            className="w-32 h-48 mx-auto bg-white rounded-lg"
          >
            {/* Card Back */}
            <div className="absolute inset-0 bg-[#1A0F0A] rounded-lg border-2 border-[#C4973B]" />
            
            {/* Card Front (revealed) */}
            {isRevealed && (
              <div className="absolute inset-0 bg-red-600 rounded-lg" />
            )}
          </motion.div>
        </div>

        {/* Choice Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onChoice('red')}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
          >
            Red
          </button>
          <button
            onClick={() => onChoice('black')}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Black
          </button>
        </div>

        {/* History */}
        <div className="mt-4 flex justify-center gap-2">
          {history.map((win, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${
                win ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
