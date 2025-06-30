import { NextResponse } from 'next/server';

import BoardGameGeekClient from '@/lib/clients/bgg-client';
import GameService from '@/lib/services/game-service';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ bggId: string }> },
) {
  const { bggId } = await params;

  const gameService = new GameService();
  const bgg = new BoardGameGeekClient();

  let game = await gameService.gameByBGGId(bggId);

  /* If a record with a matching Board Game Geek ID is not found
  find it via API and add it to the database */
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
