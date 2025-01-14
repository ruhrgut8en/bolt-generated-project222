import { supabase } from '../lib/supabase';
import { SpinResult, Symbol } from '../types';

export async function saveSpin(result: SpinResult) {
  const { data, error } = await supabase
    .from('spins')
    .insert([
      {
        reels: result.reels,
        win_amount: result.win,
        is_bonus: result.isBonus
      }
    ]);

  if (error) throw error;
  return data;
}

export async function updateProgress(truthPoints: number, fantasyPoints: number) {
  const { data, error } = await supabase
    .from('player_progress')
    .upsert([
      {
        truth_points: truthPoints,
        fantasy_points: fantasyPoints,
        last_updated: new Date()
      }
    ]);

  if (error) throw error;
  return data;
}
