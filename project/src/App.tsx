import React, { useState, useCallback } from 'react';
import { Reel } from './components/Reel';
import { Controls } from './components/Controls';
import { SYMBOLS, REELS_CONFIG } from './gameConfig';
import { GameState, SpinResult, Symbol } from './types';

const generateRandomReel = () => {
  const reel: Symbol[] = [];
  for (let i = 0; i < REELS_CONFIG.rows; i++) {
    reel.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }
  return reel;
};

const initialState: GameState = {
  balance: 1000,
  truthPoints: 0,
  fantasyPoints: 0,
  currentBet: REELS_CONFIG.minBet,
  isSpinning: false,
  lastResult: null,
  storyFragments: []
};

function App() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [reels, setReels] = useState<Symbol[][]>(
    Array(REELS_CONFIG.count).fill(null).map(generateRandomReel)
  );

  const handleSpin = useCallback(() => {
    if (gameState.isSpinning || gameState.balance < gameState.currentBet) return;

    setGameState(prev => ({ ...prev, isSpinning: true }));

    // Simulate spin delay
    setTimeout(() => {
      const newReels = Array(REELS_CONFIG.count)
        .fill(null)
        .map(generateRandomReel);

      setReels(newReels);

      // Simple win calculation (can be expanded)
      const hasScatter = newReels.some(reel => 
        reel.some(symbol => symbol.type === 'scatter')
      );

      const win = hasScatter ? gameState.currentBet * 2 : 0;

      setGameState(prev => ({
        ...prev,
        isSpinning: false,
        balance: prev.balance - prev.currentBet + win,
        lastResult: {
          reels: newReels,
          win,
          isBonus: hasScatter
        }
      }));
    }, 2000);
  }, [gameState.isSpinning, gameState.balance, gameState.currentBet]);

  const handleBetChange = useCallback((newBet: number) => {
    setGameState(prev => ({ ...prev, currentBet: newBet }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-400">
          Story or Truth?
        </h1>

        <div className="mb-8 p-6 bg-black/50 rounded-xl border border-green-500/30">
          <div className="flex justify-center gap-2 mb-8">
            {reels.map((reel, index) => (
              <Reel
                key={index}
                symbols={reel}
                isSpinning={gameState.isSpinning}
              />
            ))}
          </div>

          <Controls
            balance={gameState.balance}
            currentBet={gameState.currentBet}
            onBetChange={handleBetChange}
            onSpin={handleSpin}
            isSpinning={gameState.isSpinning}
            minBet={REELS_CONFIG.minBet}
            maxBet={REELS_CONFIG.maxBet}
            betStep={REELS_CONFIG.betStep}
          />
        </div>

        {gameState.lastResult?.win > 0 && (
          <div className="text-center text-2xl text-green-400 animate-pulse">
            Win: {gameState.lastResult.win}!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
