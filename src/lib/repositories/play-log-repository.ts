import { eq } from 'drizzle-orm';

import { playLogs } from '@/db/schema';

import BaseRepository from './base-repository';
import { PlayLogPlayer } from './play-log-player-repository';
import { UserGame } from './user-game-repository';
import { User } from './user-repository';

export type PlayLog = typeof playLogs.$inferSelect;
export type PlayLogWithRelations = PlayLog & {
  players?: PlayLogPlayer[];
  user_game?: UserGame;
  created_by?: User;
};
export type NewPlayLog = typeof playLogs.$inferInsert;

export default class PlayLogRepository extends BaseRepository<PlayLog> {
  constructor() {
    super(playLogs, playLogs.id);
  }

  async findByCreatorId(userId: string): Promise<PlayLog[]> {
    const logs = await this.db.query.playLogs.findMany({
      where: eq(playLogs.creator_id, userId),
      with: {
        players: true,
      },
    });

    return logs;
  }

  async findByUserGameId(userGameId: string): Promise<PlayLog[]> {
    const logs = await this.db.query.playLogs.findMany({
      where: eq(playLogs.user_game_id, userGameId),
      with: {
        players: true,
      },
    });

    return logs;
  }
}
