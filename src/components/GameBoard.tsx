import React, { useEffect, useRef } from 'react';
import { Reel } from './Reel';
import { WinLines } from './WinLines';
import { ExpandingSymbol } from './ExpandingSymbol';
import { GameState, Symbol } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface GameBoardProps {
  reels: Symbol[][];
  gameState: GameState;
  activePaylines: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  reels,
  gameState,
  activePaylines
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  // Handle expanding symbols in free spins
  useEffect(() => {
    if (gameState.gameMode === 'free' && gameState.expandingSymbol) {
      // Animate expanding symbols
    }
  }, [gameState.gameMode, gameState.expandingSymbol]);

  return (
    <div 
      ref={boardRef}
      className="relative bg-[#2A1810] rounded-t-lg p-4 overflow-hidden"
    >
      {/* Background with Egyptian theme */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/images/egyptian-bg.jpg" 
          alt="Egyptian Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Reels Container */}
      <div className="relative flex justify-center gap-2 mb-4">
        {reels.map((reel, index) => (
          <Reel
            key={index}
            symbols={reel}
            isSpinning={gameState.isSpinning}
            index={index}
          />
        ))}
      </div>

      {/* Win Lines */}
      <AnimatePresence>
        {!gameState.isSpinning && gameState.lastWin > 0 && (
          <WinLines
            wins={gameState.lastResult?.wins || []}
            activePaylines={activePaylines}
          />
        )}
      </AnimatePresence>

      {/* Expanding Symbols in Free Spins */}
      <AnimatePresence>
        {gameState.gameMode === 'free' && gameState.expandingSymbol && (
          <ExpandingSymbol
            symbol={gameState.expandingSymbol}
            positions={gameState.lastResult?.expandingPositions || []}
          />
        )}
      </AnimatePresence>

      {/* Free Spins Counter */}
      {gameState.gameMode === 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-[#C4973B] px-4 py-2 rounded"
        >
          Free Spins: {gameState.freeSpinsLeft}
        </motion.div>
      )}

      {/* Win Presentation */}
      <AnimatePresence>
        {gameState.lastWin > 0 && !gameState.isSpinning && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-black/80 px-8 py-4 rounded-lg">
              <div className="text-4xl font-bold text-[#C4973B]">
                WIN! {gameState.lastWin.toFixed(2)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
