import { eq } from 'drizzle-orm';

import { userGames } from '@/db/schema';

import BaseClient from './base-repository';
import { Game } from './game-repository';
import { PlayLog } from './play-log-repository';
import { User } from './user-repository';

export type UserGame = typeof userGames.$inferSelect;
export type UserGameWithRelations = UserGame & {
  game?: Game;
  play_logs?: PlayLog[];
  user?: User;
};
export type NewUserGame = typeof userGames.$inferInsert;

export default class UserGameRepository extends BaseClient<UserGame> {
  constructor() {
    super(userGames, userGames.id);
  }

  async findByUserId(userId: string): Promise<UserGame[]> {
    const games = await this.db.query.userGames.findMany({
      where: eq(userGames.user_id, userId),
      with: {
        game: true,
        play_logs: true,
        user: true,
      },
    });

    return games;
  }

  async findById(id: string): Promise<UserGameWithRelations | undefined> {
    const game = await this.db.query.userGames.findFirst({
      where: eq(userGames.id, id),
      with: {
        game: true,
        play_logs: true,
        user: true,
      },
    });

    return game as UserGameWithRelations | undefined;
  }
}
