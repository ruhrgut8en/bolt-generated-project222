import { useState, useCallback } from 'react';
import { StoryFragment } from '../types';
import { STORY_FRAGMENTS } from '../gameConfig';

export function useStoryProgression() {
  const [unlockedFragments, setUnlockedFragments] = useState<string[]>([]);
  const [activeFragment, setActiveFragment] = useState<StoryFragment | null>(null);
  const [truthPoints, setTruthPoints] = useState(0);
  const [fantasyPoints, setFantasyPoints] = useState(0);

  const checkForNewFragment = useCallback((playerLevel: number) => {
    const availableFragments = STORY_FRAGMENTS.filter(
      fragment => 
        fragment.requiredLevel <= playerLevel &&
        !unlockedFragments.includes(fragment.id)
    );

    if (availableFragments.length > 0) {
      const randomFragment = availableFragments[
        Math.floor(Math.random() * availableFragments.length)
      ];
      setActiveFragment(randomFragment);
    }
  }, [unlockedFragments]);

  const makeChoice = useCallback((fragmentId: string, choice: 'truth' | 'fantasy') => {
    const fragment = STORY_FRAGMENTS.find(f => f.id === fragmentId);
    if (!fragment) return;

    if (choice === 'truth') {
      setTruthPoints(prev => prev + fragment.points);
    } else {
      setFantasyPoints(prev => prev + fragment.points);
    }

    setUnlockedFragments(prev => [...prev, fragmentId]);
    setActiveFragment(null);
  }, []);

  const calculateLevel = useCallback(() => {
    const totalPoints = truthPoints + fantasyPoints;
    return Math.floor(totalPoints / 100) + 1;
  }, [truthPoints, fantasyPoints]);

  return {
    activeFragment,
    truthPoints,
    fantasyPoints,
    level: calculateLevel(),
    checkForNewFragment,
    makeChoice
  };
}
