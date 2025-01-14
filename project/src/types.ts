export interface Symbol {
  id: string;
  name: string;
  value: number;
  type: 'low' | 'high' | 'wild' | 'scatter';
  icon: string;
}

export interface SpinResult {
  reels: Symbol[][];
  win: number;
  storyFragment?: StoryFragment;
  isBonus: boolean;
}

export interface StoryFragment {
  id: string;
  title: string;
  description: string;
  type: 'truth' | 'fantasy';
  points: number;
}

export interface GameState {
  balance: number;
  truthPoints: number;
  fantasyPoints: number;
  currentBet: number;
  isSpinning: boolean;
  lastResult: SpinResult | null;
  storyFragments: StoryFragment[];
}
