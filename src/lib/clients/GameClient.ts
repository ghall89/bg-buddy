import { eq } from 'drizzle-orm';

import { games } from '@/db/schema';

import BaseClient from './BaseClient';

export type Game = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;

export default class UserClient extends BaseClient<Game> {
  constructor() {
    super(games, games.id);
  }

  async findByBGGId(bggId: string): Promise<Game[]> {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(games.bggId, bggId));

    return result as Game[];
  }
}
