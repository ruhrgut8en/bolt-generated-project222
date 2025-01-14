import { Symbol, PaylineConfig } from './types';

export const SYMBOLS = {
  BOOK: { id: 'book', name: 'Book', value: 200, type: 'special', multiplier: [0, 0, 2, 20, 200] },
  EXPLORER: { id: 'explorer', name: 'Explorer', value: 500, type: 'high', multiplier: [0, 10, 100, 1000, 5000] },
  PHARAOH: { id: 'pharaoh', name: 'Pharaoh', value: 200, type: 'high', multiplier: [0, 5, 40, 400, 2000] },
  STATUE: { id: 'statue', name: 'Statue', value: 150, type: 'high', multiplier: [0, 5, 30, 100, 750] },
  SCARAB: { id: 'scarab', name: 'Scarab', value: 150, type: 'high', multiplier: [0, 5, 30, 100, 750] },
  ACE: { id: 'A', name: 'Ace', value: 100, type: 'low', multiplier: [0, 0, 5, 40, 150] },
  KING: { id: 'K', name: 'King', value: 100, type: 'low', multiplier: [0, 0, 5, 40, 150] },
  QUEEN: { id: 'Q', name: 'Queen', value: 75, type: 'low', multiplier: [0, 0, 5, 30, 100] },
  JACK: { id: 'J', name: 'Jack', value: 75, type: 'low', multiplier: [0, 0, 5, 30, 100] },
  TEN: { id: '10', name: 'Ten', value: 50, type: 'low', multiplier: [0, 0, 5, 30, 100] }
} as const;

export const REELS_CONFIG = {
  count: 5,
  rows: 3,
  paylines: 10,
  minBet: 0.10,
  maxBet: 100,
  betSteps: [0.10, 0.20, 0.50, 1, 2, 5, 10, 20, 50, 100],
  spinDuration: 3000,
  freespins: {
    count: 10,
    retrigger: true
  }
} as const;

export const PAYLINES: PaylineConfig[] = [
  { id: 1, positions: [1, 1, 1, 1, 1] }, // Middle straight
  { id: 2, positions: [0, 0, 0, 0, 0] }, // Top straight
  { id: 3, positions: [2, 2, 2, 2, 2] }, // Bottom straight
  { id: 4, positions: [0, 1, 2, 1, 0] }, // V shape
  { id: 5, positions: [2, 1, 0, 1, 2] }, // Inverted V
  { id: 6, positions: [0, 0, 1, 2, 2] }, // Top to bottom
  { id: 7, positions: [2, 2, 1, 0, 0] }, // Bottom to top
  { id: 8, positions: [1, 2, 2, 2, 1] }, // Bottom curve
  { id: 9, positions: [1, 0, 0, 0, 1] }, // Top curve
  { id: 10, positions: [1, 0, 1, 2, 1] }  // Zigzag
];

export const GAME_STATES = {
  IDLE: 'idle',
  SPINNING: 'spinning',
  WINNING: 'winning',
  FREE_SPINS: 'freespins',
  GAMBLE: 'gamble'
} as const;

export const SOUND_EFFECTS = {
  SPIN_START: '/sounds/spin-start.mp3',
  SPIN_STOP: '/sounds/spin-stop.mp3',
  WIN_NORMAL: '/sounds/win-normal.mp3',
  WIN_BIG: '/sounds/win-big.mp3',
  SCATTER: '/sounds/scatter.mp3',
  FREE_SPINS_TRIGGER: '/sounds/free-spins-trigger.mp3',
  FREE_SPINS_WIN: '/sounds/free-spins-win.mp3',
  GAMBLE_WIN: '/sounds/gamble-win.mp3',
  GAMBLE_LOSE: '/sounds/gamble-lose.mp3',
  BUTTON_CLICK: '/sounds/button-click.mp3',
  AMBIENT: '/sounds/ambient.mp3'
} as const;
