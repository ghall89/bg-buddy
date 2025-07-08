import { type GameDetails, gameById } from 'bgg-client';
import { NextResponse } from 'next/server';

import GameService from '@/lib/services/game-service';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ bggId: string }> },
) {
  try {
    const { bggId } = await params;

    const gameService = new GameService();

    let game = await gameService.gameByBGGId(bggId);

    if (!game) {
      const bggGame = (await gameById(bggId)) as GameDetails;

      if (!bggGame || !bggGame.title) {
        return NextResponse.json(
          { error: 'Invalid game data received from BGG' },
          { status: 502 },
        );
      }

      game = await gameService.addGame({
        bgg_id: bggId,
        title: bggGame.title,
        image: bggGame.img,
        description: bggGame.description,
        min_players: bggGame.minPlayers,
        max_players: bggGame.maxPlayers,
        best_player_count: undefined,
        est_playtime: bggGame.avgPlaytime,
      });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error('Failed to handle GET /api/game/[bggId]:', error);
    return NextResponse.json(
      { error: 'Error while fetching game details' },
      { status: 500 },
    );
  }
}
