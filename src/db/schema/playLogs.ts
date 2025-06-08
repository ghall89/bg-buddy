import { relations } from 'drizzle-orm';
import { date, pgTable } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';
import { games } from './games';
import { playLogPlayers } from './playLogPlayers';

export const playLogs = pgTable('play_log', {
  ...creationInfo,
  played_date: date().notNull(),
});

export const playLogRelations = relations(playLogs, ({ many, one }) => ({
  players: many(playLogPlayers),
  game: one(games),
}));
