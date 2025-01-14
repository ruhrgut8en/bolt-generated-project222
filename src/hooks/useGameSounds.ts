import { useCallback, useEffect, useRef } from 'react';

const SOUNDS = {
  SPIN_START: new Audio('/sounds/spin-start.mp3'),
  SPIN_STOP: new Audio('/sounds/spin-stop.mp3'),
  WIN_SMALL: new Audio('/sounds/win-small.mp3'),
  WIN_MEDIUM: new Audio('/sounds/win-medium.mp3'),
  WIN_BIG: new Audio('/sounds/win-big.mp3'),
  SCATTER: new Audio('/sounds/scatter.mp3'),
  FREE_SPINS_TRIGGER: new Audio('/sounds/free-spins-trigger.mp3'),
  FREE_SPINS_WIN: new Audio('/sounds/free-spins-win.mp3'),
  EXPANDING: new Audio('/sounds/expanding.mp3'),
  GAMBLE_WIN: new Audio('/sounds/gamble-win.mp3'),
  GAMBLE_LOSE: new Audio('/sounds/gamble-lose.mp3'),
  CLICK: new Audio('/sounds/click.mp3'),
  COINS: new Audio('/sounds/coins.mp3'),
  AMBIENT: new Audio('/sounds/ambient.mp3')
};

// Configure sounds
Object.values(SOUNDS).forEach(sound => {
  sound.preload = 'auto';
});

SOUNDS.AMBIENT.loop = true;
SOUNDS.AMBIENT.volume = 0.3;

export function useGameSounds() {
  const isMutedRef = useRef(false);

  const playSound = useCallback((soundName: keyof typeof SOUNDS, volume = 1) => {
    if (!isMutedRef.current) {
      const sound = SOUNDS[soundName];
      sound.volume = volume;
      sound.currentTime = 0;
      sound.play().catch(console.error);
    }
  }, []);

  const playWinSound = useCallback((amount: number, bet: number) => {
    if (isMutedRef.current) return;

    const multiplier = amount / bet;
    if (multiplier >= 50) {
      playSound('WIN_BIG', 1);
    } else if (multiplier >= 20) {
      playSound('WIN_MEDIUM', 0.8);
    } else {
      playSound('WIN_SMALL', 0.6);
    }
  }, [playSound]);

  const toggleMute = useCallback(() => {
    isMutedRef.current = !isMutedRef.current;
    if (isMutedRef.current) {
      SOUNDS.AMBIENT.pause();
    } else {
      SOUNDS.AMBIENT.play().catch(console.error);
    }
  }, []);

  useEffect(() => {
    // Start ambient sound
    if (!isMutedRef.current) {
      SOUNDS.AMBIENT.play().catch(console.error);
    }

    return () => {
      Object.values(SOUNDS).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
      });
    };
  }, []);

  return {
    playSound,
    playWinSound,
    toggleMute,
    isMuted: isMutedRef.current
  };
}
