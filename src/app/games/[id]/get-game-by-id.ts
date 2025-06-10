'use server';

import GameService from '@/lib/services/game-service';

export async function getGameById(id: string) {
  const gameService = new GameService();

  const game = await gameService.gameById(id);

  if (!game) {
    throw new Error(`Game not found with id: ${id}`);
  }

  return game;
}
