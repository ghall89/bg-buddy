import { eq } from 'drizzle-orm';

import { userGames } from '@/db/schema';

import BaseClient from './BaseRepository';

export type UserGame = typeof userGames.$inferSelect;
export type NewUserGame = typeof userGames.$inferInsert;

export default class UserGameRepository extends BaseClient<UserGame> {
  constructor() {
    super(userGames, userGames.id);
  }

  async getByUserId(userId: string): Promise<UserGame[]> {
    const games = await this.db.query.userGames.findMany({
      where: eq(userGames.user_id, userId),
    });

    return games;
  }
}
