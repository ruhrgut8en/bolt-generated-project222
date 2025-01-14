import { supabase } from '../lib/supabase';
import { StoryFragment } from '../types';

export async function getAvailableStoryFragments(playerLevel: number) {
  const { data, error } = await supabase
    .from('story_fragments')
    .select('*')
    .lte('required_level', playerLevel)
    .order('required_level', { ascending: true });

  if (error) throw error;
  return data as StoryFragment[];
}

export async function unlockStoryFragment(fragmentId: string, playerId: string) {
  const { data, error } = await supabase
    .from('player_story_progress')
    .insert([
      {
        player_id: playerId,
        fragment_id: fragmentId,
        unlocked_at: new Date()
      }
    ]);

  if (error) throw error;
  return data;
}
