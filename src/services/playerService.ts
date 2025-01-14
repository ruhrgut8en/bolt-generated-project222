import { supabase } from '../lib/supabase';

export async function getOrCreatePlayer(userId: string) {
  // First try to get existing player
  let { data: player } = await supabase
    .from('players')
    .select('*')
    .eq('user_id', userId)
    .single();

  // If no player exists, create one
  if (!player) {
    const { data: newPlayer, error } = await supabase
      .from('players')
      .insert([
        { 
          user_id: userId,
          balance: 1000, // Starting balance
          level: 1
        }
      ])
      .select()
      .single();

    if (error) throw error;
    player = newPlayer;

    // Create initial player progress
    await supabase
      .from('player_progress')
      .insert([
        {
          player_id: player.id,
          truth_points: 0,
          fantasy_points: 0
        }
      ]);
  }

  return player;
}

export async function updateBalance(playerId: string, amount: number) {
  const { data, error } = await supabase
    .from('players')
    .update({ balance: amount })
    .eq('id', playerId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getProgress(playerId: string) {
  const { data, error } = await supabase
    .from('player_progress')
    .select('*')
    .eq('player_id', playerId)
    .single();

  if (error) throw error;
  return data;
}
