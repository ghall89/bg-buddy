import { relations } from 'drizzle-orm';
import { boolean, date, integer, pgTable, text } from 'drizzle-orm/pg-core';

import { creationInfo } from './columns.helpers';
import { games } from './games';
import { users } from './users';

export const playLogs = pgTable('play_log', {
  ...creationInfo,
  playedDate: date('played_date').notNull(),
});

export const playLogRelations = relations(playLogs, ({ many, one }) => ({
  players: many(playLogPlayers),
  game: one(games),
}));

export const playLogPlayers = pgTable('play_log_player', {
  ...creationInfo,
  name: text('name').notNull(),
  score: integer('score'),
  isWinner: boolean('is_winner'),
});

export const playLogPlayerRelations = relations(playLogPlayers, ({ one }) => ({
  associatedUser: one(users),
}));
