export interface Symbol {
  id: string;
  name: string;
  value: number;
  type: 'special' | 'high' | 'low';
  multiplier: number[];
}

export interface PaylineConfig {
  id: number;
  positions: number[];
}

export interface WinningLine {
  paylineId: number;
  symbols: Symbol[];
  win: number;
  positions: number[];
}

export interface SpinResult {
  reels: Symbol[][];
  wins: WinningLine[];
  totalWin: number;
  scatters: number;
  isBonus: boolean;
}

export interface GameState {
  balance: number;
  bet: number;
  activePaylines: number;
  isSpinning: boolean;
  isAutoPlay: boolean;
  lastWin: number;
  freeSpinsLeft: number;
  expandingSymbol: Symbol | null;
  gameMode: 'base' | 'free' | 'gamble';
  winHistory: number[];
}

export type GameStateType = 'idle' | 'spinning' | 'winning' | 'freespins' | 'gamble';
