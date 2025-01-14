import { useState, useEffect, useCallback } from 'react';
import { SOUND_EFFECTS } from '../gameConfig';

const sounds = {
  spin: new Audio(SOUND_EFFECTS.SPIN_START),
  win: new Audio(SOUND_EFFECTS.WIN_NORMAL),
  bigWin: new Audio(SOUND_EFFECTS.WIN_BIG),
  scatter: new Audio(SOUND_EFFECTS.SCATTER),
  freeSpins: new Audio(SOUND_EFFECTS.FREE_SPINS_TRIGGER),
  ambient: new Audio(SOUND_EFFECTS.AMBIENT)
};

// Configure sounds
Object.values(sounds).forEach(sound => {
  sound.preload = 'auto';
});

sounds.ambient.loop = true;
sounds.ambient.volume = 0.3;

export function useSound() {
  const [isMuted, setIsMuted] = useState(false);

  const playSound = useCallback((soundName: keyof typeof sounds) => {
    if (!isMuted) {
      const sound = sounds[soundName];
      sound.currentTime = 0;
      sound.play().catch(() => {
        console.log('Sound playback blocked');
      });
    }
  }, [isMuted]);

  const toggleSound = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  useEffect(() => {
    // Start ambient sound
    if (!isMuted) {
      sounds.ambient.play().catch(() => {
        console.log('Ambient sound blocked');
      });
    } else {
      sounds.ambient.pause();
    }

    return () => {
      sounds.ambient.pause();
    };
  }, [isMuted]);

  return { playSound, toggleSound, isMuted };
}
