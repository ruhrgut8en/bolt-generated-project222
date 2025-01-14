import { useState, useCallback, useEffect } from 'react';
import { GameState } from '../types';

interface AutoPlayConfig {
  maxSpins?: number;
  stopOnFeature?: boolean;
  stopOnWin?: number;
  stopOnBalanceIncrease?: number;
  stopOnBalanceDecrease?: number;
}

export function useAutoPlay(
  spin: () => void,
  gameState: GameState,
  config: AutoPlayConfig = {}
) {
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(0);
  const [initialBalance, setInitialBalance] = useState(0);

  const startAutoPlay = useCallback((spins: number = 50) => {
    setIsAutoPlaying(true);
    setSpinsLeft(spins);
    setInitialBalance(gameState.balance);
  }, [gameState.balance]);

  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    setSpinsLeft(0);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || gameState.isSpinning) return;

    // Check stop conditions
    const shouldStop = 
      spinsLeft <= 0 ||
      (config.stopOnFeature && gameState.gameMode === 'free') ||
      (config.stopOnWin && gameState.lastWin >= config.stopOnWin) ||
      (config.stopOnBalanceIncrease && gameState.balance >= initialBalance + config.stopOnBalanceIncrease) ||
      (config.stopOnBalanceDecrease && gameState.balance <= initialBalance - config.stopOnBalanceDecrease);

    if (shouldStop) {
      stopAutoPlay();
      return;
    }

    // Continue auto play
    const timeout = setTimeout(() => {
      spin();
      setSpinsLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [
    isAutoPlaying,
    gameState.isSpinning,
    gameState.gameMode,
    gameState.lastWin,
    gameState.balance,
    spinsLeft,
    spin,
    stopAutoPlay
  ]);

  return {
    isAutoPlaying,
    spinsLeft,
    startAutoPlay,
    stopAutoPlay
  };
}
