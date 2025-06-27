// /app/api/game/[bggId]/route.ts
import { NextResponse } from 'next/server';

import BoardGameGeekClient from '@/lib/clients/bgg-client';
import GameService from '@/lib/services/game-service';

export async function GET(
  req: Request,
  { params }: { params: { bggId: string } },
) {
  const { bggId } = params;

  const gameService = new GameService();
  const bgg = new BoardGameGeekClient();

  let game = await gameService.gameByBGGId(bggId);

  if (!game) {
    const bggGame = await bgg.gameById(bggId);
    game = await gameService.addGame({
      bgg_id: bggId,
      title: bggGame.title!,
      image: bggGame.img,
      description: bggGame.description,
      min_players: bggGame.minPlayers,
      max_players: bggGame.maxPlayers,
      best_player_count: 0,
      est_playtime: bggGame.avgPlaytime,
    });
  }

  return NextResponse.json(game);
}
