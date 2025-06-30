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
