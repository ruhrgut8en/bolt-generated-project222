import { Symbol, WinningLine, PaylineConfig } from '../types';
import { SYMBOLS, PAYLINES } from '../gameConfig';

export function calculateWins(
  reels: Symbol[][],
  bet: number,
  activePaylines: number
): { wins: WinningLine[], totalWin: number } {
  const wins: WinningLine[] = [];
  let totalWin = 0;

  // Calculate line wins
  PAYLINES.slice(0, activePaylines).forEach(payline => {
    const lineSymbols = payline.positions.map(
      (pos, reelIndex) => reels[reelIndex][pos]
    );

    const win = calculateLineWin(lineSymbols, bet);
    if (win > 0) {
      wins.push({
        paylineId: payline.id,
        symbols: lineSymbols,
        win,
        positions: payline.positions
      });
      totalWin += win;
    }
  });

  // Calculate scatter wins
  const scatterCount = reels.flat().filter(s => s.id === SYMBOLS.BOOK.id).length;
  if (scatterCount >= 3) {
    const scatterWin = calculateScatterWin(scatterCount, bet);
    totalWin += scatterWin;
  }

  return { wins, totalWin };
}

function calculateLineWin(symbols: Symbol[], bet: number): number {
  const firstSymbol = symbols[0];
  let count = 1;

  // Count matching symbols from left to right
  for (let i = 1; i < symbols.length; i++) {
    const symbol = symbols[i];
    if (symbol.id === SYMBOLS.BOOK.id || symbol.id === firstSymbol.id) {
      count++;
    } else {
      break;
    }
  }

  // Get win multiplier based on symbol count
  const multiplier = firstSymbol.multiplier[count - 1];
  return multiplier * bet;
}

function calculateScatterWin(count: number, bet: number): number {
  const multipliers = [0, 0, 2, 20, 200];
  return multipliers[count - 1] * bet;
}
