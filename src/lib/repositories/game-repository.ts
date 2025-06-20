import { and, eq, gte, lte } from 'drizzle-orm';

import { games } from '@/db/schema';

import BaseClient from './base-repository';

export type Game = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;

export default class GameRepository extends BaseClient<Game> {
  constructor() {
    super(games, games.id);
  }

  async findByBGGId(bggId: string): Promise<Game | undefined> {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(games.bgg_id, bggId));

    return result[0] as Game | undefined;
  }

  async findByPlayerCount(players: number): Promise<Game[]> {
    const result = await this.db.query.games.findMany({
      where: and(
        gte(games.min_players, players),
        lte(games.max_players, players),
      ),
    });

    return result;
  }
}
