import { useState, useCallback } from 'react';
import { SYMBOLS, REELS_CONFIG, PAYLINES } from '../gameConfig';
import { GameState, SpinResult, Symbol } from '../types';
import { calculateWins } from '../utils/winCalculator';
import { generateReels } from '../utils/reelGenerator';

const initialState: GameState = {
  balance: 1000,
  bet: REELS_CONFIG.minBet,
  activePaylines: REELS_CONFIG.paylines,
  isSpinning: false,
  isAutoPlay: false,
  lastWin: 0,
  freeSpinsLeft: 0,
  expandingSymbol: null,
  gameMode: 'base',
  winHistory: []
};

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [reels, setReels] = useState<Symbol[][]>(generateReels());

  const spin = useCallback(async () => {
    if (gameState.isSpinning || 
        (gameState.gameMode === 'base' && gameState.balance < gameState.bet)) {
      return;
    }

    setGameState(prev => ({ ...prev, isSpinning: true }));

    // Simulate server-side spin calculation
    const newReels = generateReels();
    const result = calculateWins(newReels, gameState.bet, gameState.activePaylines);

    // Check for free spins trigger
    const scatterCount = newReels.flat().filter(s => s.id === SYMBOLS.BOOK.id).length;
    const triggerFreeSpins = scatterCount >= 3;

    setTimeout(() => {
      setReels(newReels);
      setGameState(prev => ({
        ...prev,
        isSpinning: false,
        balance: prev.gameMode === 'base' ? 
          prev.balance - prev.bet + result.totalWin : 
          prev.balance + result.totalWin,
        lastWin: result.totalWin,
        freeSpinsLeft: triggerFreeSpins ? 
          REELS_CONFIG.freespins.count : 
          Math.max(0, prev.freeSpinsLeft - 1),
        gameMode: triggerFreeSpins ? 'free' : 
          prev.freeSpinsLeft > 1 ? 'free' : 'base',
        expandingSymbol: prev.gameMode === 'free' ? prev.expandingSymbol : null,
        winHistory: [...prev.winHistory, result.totalWin]
      }));
    }, REELS_CONFIG.spinDuration);

  }, [gameState]);

  const setBet = useCallback((newBet: number) => {
    if (newBet >= REELS_CONFIG.minBet && 
        newBet <= REELS_CONFIG.maxBet && 
        !gameState.isSpinning) {
      setGameState(prev => ({ ...prev, bet: newBet }));
    }
  }, [gameState.isSpinning]);

  const setPaylines = useCallback((lines: number) => {
    if (lines > 0 && lines <= REELS_CONFIG.paylines && !gameState.isSpinning) {
      setGameState(prev => ({ ...prev, activePaylines: lines }));
    }
  }, [gameState.isSpinning]);

  const gamble = useCallback((choice: 'red' | 'black') => {
    if (gameState.lastWin === 0) return;

    const win = Math.random() > 0.5;
    if (win) {
      setGameState(prev => ({
        ...prev,
        balance: prev.balance + prev.lastWin,
        lastWin: prev.lastWin * 2,
        gameMode: 'base'
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        lastWin: 0,
        gameMode: 'base'
      }));
    }
  }, [gameState.lastWin]);

  return {
    gameState,
    reels,
    spin,
    setBet,
    setPaylines,
    gamble
  };
}
