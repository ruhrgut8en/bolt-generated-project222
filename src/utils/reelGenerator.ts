import { Symbol } from '../types';
import { SYMBOLS, REELS_CONFIG } from '../gameConfig';

const symbolWeights = {
  base: {
    book: 1,
    explorer: 2,
    pharaoh: 3,
    statue: 4,
    scarab: 4,
    A: 5,
    K: 5,
    Q: 6,
    J: 6,
    '10': 6
  },
  free: {
    book: 2,
    explorer: 3,
    pharaoh: 4,
    statue: 5,
    scarab: 5,
    A: 6,
    K: 6,
    Q: 7,
    J: 7,
    '10': 7
  }
};

export function generateReels(mode: 'base' | 'free' = 'base'): Symbol[][] {
  const weights = symbolWeights[mode];
  const reels: Symbol[][] = [];

  for (let i = 0; i < REELS_CONFIG.count; i++) {
    const reel: Symbol[] = [];
    for (let j = 0; j < REELS_CONFIG.rows; j++) {
      // Weighted random selection
      let totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
      let random = Math.random() * totalWeight;
      let selectedSymbol: Symbol | null = null;

      for (const [id, weight] of Object.entries(weights)) {
        random -= weight;
        if (random <= 0) {
          selectedSymbol = SYMBOLS[id as keyof typeof SYMBOLS];
          break;
        }
      }

      reel.push(selectedSymbol || SYMBOLS.TEN);
    }
    reels.push(reel);
  }

  return reels;
}
