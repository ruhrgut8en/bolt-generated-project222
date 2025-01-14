import React from 'react';

interface ControlsProps {
  balance: number;
  currentBet: number;
  onBetChange: (bet: number) => void;
  onSpin: () => void;
  isSpinning: boolean;
  minBet: number;
  maxBet: number;
  betStep: number;
}

export const Controls: React.FC<ControlsProps> = ({
  balance,
  currentBet,
  onBetChange,
  onSpin,
  isSpinning,
  minBet,
  maxBet,
  betStep
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-900 rounded-lg border border-green-500">
      <div className="flex justify-between items-center">
        <div className="text-green-400">
          <span className="text-sm">Balance:</span>
          <span className="ml-2 text-lg font-bold">{balance}</span>
        </div>
        <div className="text-green-400">
          <span className="text-sm">Bet:</span>
          <span className="ml-2 text-lg font-bold">{currentBet}</span>
        </div>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={() => onBetChange(Math.max(minBet, currentBet - betStep))}
          className="px-4 py-2 bg-gray-800 text-green-400 rounded-lg hover:bg-gray-700 disabled:opacity-50"
          disabled={currentBet <= minBet || isSpinning}
        >
          -
        </button>
        
        <button
          onClick={() => onSpin()}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50"
          disabled={isSpinning || balance < currentBet}
        >
          {isSpinning ? 'Spinning...' : 'SPIN'}
        </button>
        
        <button
          onClick={() => onBetChange(Math.min(maxBet, currentBet + betStep))}
          className="px-4 py-2 bg-gray-800 text-green-400 rounded-lg hover:bg-gray-700 disabled:opacity-50"
          disabled={currentBet >= maxBet || isSpinning}
        >
          +
        </button>
      </div>
    </div>
  );
};
