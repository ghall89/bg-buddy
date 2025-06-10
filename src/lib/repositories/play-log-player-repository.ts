import { eq } from 'drizzle-orm';

import { playLogPlayers } from '@/db/schema';

import BaseRepository from './base-repository';

export type PlayLogPlayer = typeof playLogPlayers.$inferSelect;
export type NewPlayLogPlayer = typeof playLogPlayers.$inferInsert;

export default class PlayLogPlayerRepository extends BaseRepository<PlayLogPlayer> {
  constructor() {
    super(playLogPlayers, playLogPlayers.id);
  }

  async findByUserId(userId: string) {
    const players = await this.db.query.userGames.findMany({
      where: eq(playLogPlayers.user_id, userId),
      with: {
        game: true,
      },
    });

    return players;
  }
}
