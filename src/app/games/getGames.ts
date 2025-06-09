'use server';

import { Game } from '@/lib/repositories/GameRepository';
import GameService from '@/lib/services/GameService';

export async function getGames(): Promise<Game[]> {
  const gameService = new GameService();

  const games = await gameService.allGames();

  return games;
}
