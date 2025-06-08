import { playLogs } from '@/db/schema';

import BaseRepository from './BaseRepository';

export type PlayLog = typeof playLogs.$inferSelect;
export type NewPlayLog = typeof playLogs.$inferInsert;

export default class PlayLogRepository extends BaseRepository<PlayLog> {
  constructor() {
    super(playLogs, playLogs.id);
  }
}
