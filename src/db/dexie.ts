import Dexie, { type EntityTable } from 'dexie';

export interface CollectionGame {
  id: number;
  title: string;
  playStatus: PlayStatus;
  collectionStatus: CollectionStatus;
  gameId: string;
  playLogs: PlayLog[];
}

export interface PlayLog {
  id: number;
  collectionGameId: number;
  date: Date;
  winner: PlayLogPlayer;
  players: PlayLogPlayer[];
}

export interface PlayLogPlayer {
  id: number;
  playLogId: number;
  name: string;
  score: number;
}

export enum PlayStatus {
  played = 'Played',
  wantToPlay = 'Want to Play',
}

export enum CollectionStatus {
  notOwned = 'Not Owned',
  owned = 'Owned',
  previouslyOwned = 'Previously Owned',
  wishlist = 'Wishlist',
}

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
