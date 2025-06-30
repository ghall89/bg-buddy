import Dexie, { type EntityTable } from 'dexie';

import type { CollectionGame, PlayLog, PlayLogPlayer } from '@/lib/types';

const db = new Dexie('boardgames') as Dexie & {
  games: EntityTable<CollectionGame, 'id'>;
  playLogs: EntityTable<PlayLog, 'id'>;
  playLogPlayers: EntityTable<PlayLogPlayer, 'id'>;
};

db.version(1).stores({
  games: '++id, title, gameId',
  playLogs: '++id, gameCollectionId, date',
  playLogPlayers: '++id, playLogId, name, score',
});

export { db };
